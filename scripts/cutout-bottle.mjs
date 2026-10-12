/**
 * One-off: cuts the UYKA bottle out of a phone photo (assets/source/1.webp).
 *
 * The glass has strong sky reflections, so automatic edge detection breaks on
 * the neck and shoulders. Instead the silhouette is a vector path measured
 * once on the 1500×2000 source (cap, skirt, neck, shoulder curve, slightly
 * tapering body — the camera looks a little down on the bottle).
 *
 * Outputs:
 *   assets/photos/packshot-erken-hasat.png   real bottle, transparent cut-out (→ npm run assets)
 *   public/textures/label-erken-hasat.webp   its front label, used by the 3D bottle
 *   assets/photos/packshot-<slug>.png        REPRESENTATIVE packshots: the same bottle wearing
 *                                            the labels from scripts/generate-labels.mjs
 *
 * Run: npm run labels && npm run cutout
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { GENERATED_LABELS } from "./generate-labels.mjs";

const SOURCE = "assets/source/1.webp";
const EDGE_SOFTNESS = 0.8;
const PADDING = 40;
/** Front label on the source photo, px. */
const LABEL_BOX = { left: 876, top: 950, width: 170, height: 846 };
/** Darkens a pasted label towards its edges so it reads as wrapped on the glass. */
const LABEL_SHADING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${LABEL_BOX.width}" height="${LABEL_BOX.height}"><defs><linearGradient id="g"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.3" stop-color="#000" stop-opacity="0"/><stop offset="0.62" stop-color="#fff" stop-opacity="0.06"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;

const SILHOUETTE = [
  // cap (ribbed) + skirt
  "M 921 410 L 1069 410 Q 1077 410 1077 418 L 1077 512 L 1072 512 L 1072 678",
  // neck → right shoulder → right body (re-measured: the glass edge, 1 px inside)
  "L 1070 678 L 1070 742 C 1070 792 1146 806 1146 905",
  "L 1142 1000 L 1137 1080 L 1130 1120 L 1125 1200 L 1117 1280 L 1112 1360 L 1107 1600 L 1103 1760 L 1102 1868",
  // base: the glass ends on a shallow perspective curve (≈1896 at the centre), not on the stone below
  "C 1102 1904 838 1904 838 1868",
  // left body → left shoulder → neck
  "L 838 1400 L 834 1100 L 832 905 C 832 806 910 792 910 742 L 910 678",
  // skirt + cap, back to start
  "L 914 678 L 914 512 L 913 512 L 913 418 Q 913 410 921 410 Z",
].join(" ");

const { width, height } = await sharp(SOURCE).metadata();
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="${SILHOUETTE}" fill="#fff"/></svg>`,
);

await mkdir("assets/photos", { recursive: true });
await mkdir("public/textures", { recursive: true });

/**
 * Defringe: the hand-measured path hugs the cap and neck only to within a few
 * px (the real cap corners are rounder), leaving slivers of the bright sky
 * inside the mask. Starting from the outside, peel off light pixels that touch
 * the edge, at most DEFRINGE_DEPTH px deep. Only above the shoulders, where
 * the bottle itself is dark; the glass body below has light reflections.
 */
const DEFRINGE_DEPTH = 24;
const DEFRINGE_MAX_Y = 740; // end of the straight neck, where the shoulder curve (and its reflections) begins
const DEFRINGE_MIN_LUMINANCE = 110;
const MASK_INSIDE = 128;

async function defringedMask() {
  const inside = await sharp(mask).greyscale().raw().toBuffer();
  const { data: rgb } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const depth = new Int16Array(width * height).fill(-1);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  for (let index = 0; index < inside.length; index++) {
    if (inside[index] < MASK_INSIDE) {
      depth[index] = 0;
      queue[tail++] = index;
    }
  }
  const isLight = (index) => (rgb[index * 3] + rgb[index * 3 + 1] + rgb[index * 3 + 2]) / 3 > DEFRINGE_MIN_LUMINANCE;
  while (head < tail) {
    const index = queue[head++];
    if (depth[index] >= DEFRINGE_DEPTH) continue;
    const x = index % width;
    const y = (index - x) / width;
    for (const next of [x > 0 ? index - 1 : -1, x < width - 1 ? index + 1 : -1, y > 0 ? index - width : -1, index + width]) {
      if (next < 0 || next >= inside.length || depth[next] !== -1) continue;
      if ((next - (next % width)) / width > DEFRINGE_MAX_Y || !isLight(next)) continue;
      depth[next] = depth[index] + 1;
      inside[next] = 0;
      queue[tail++] = next;
    }
  }
  return sharp(inside, { raw: { width, height, channels: 1 } }).blur(EDGE_SOFTNESS).extractChannel(0).raw().toBuffer();
}

const alpha = await defringedMask();
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

/** Masks a (possibly re-labelled) copy of the source photo and trims it to the bottle. */
async function writePackshot(photo, outputFile) {
  const rgb = await sharp(photo).removeAlpha().raw().toBuffer();
  const cutout = await sharp(rgb, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  await sharp(cutout)
    .trim({ threshold: 1 })
    .extend({ top: PADDING, bottom: PADDING, left: PADDING, right: PADDING, background: transparent })
    .png()
    .toFile(outputFile);
}

async function relabel(labelFile) {
  const label = await sharp(labelFile)
    .resize(LABEL_BOX.width, LABEL_BOX.height)
    .composite([{ input: Buffer.from(LABEL_SHADING_SVG) }])
    .png()
    .toBuffer();
  return sharp(SOURCE).composite([{ input: label, left: LABEL_BOX.left, top: LABEL_BOX.top }]).png().toBuffer();
}

await writePackshot(SOURCE, "assets/photos/packshot-erken-hasat.png");
await sharp(SOURCE).extract(LABEL_BOX).webp({ quality: 90 }).toFile("public/textures/label-erken-hasat.webp");
console.log("packshot erken-hasat (real)");

for (const { slug } of GENERATED_LABELS) {
  await writePackshot(await relabel(`assets/labels/${slug}.png`), `assets/photos/packshot-${slug}.png`);
  console.log(`packshot ${slug} (representative)`);
}
