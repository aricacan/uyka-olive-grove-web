/**
 * Generates REPRESENTATIVE front labels for products that have no photo yet,
 * in the style of the real "Erken Hasat" label (black label, white logo
 * panel, serif product name). Replace with real packshots once photographed.
 *
 * Output (2× the label size measured on the photo, 170 × 846 px):
 *   assets/labels/<slug>.png            → used by scripts/cutout-bottle.mjs
 *   public/textures/label-<slug>.webp   → used by the 3D bottle
 *
 * Product names mirror src/content/tr/products.ts.
 * Run: node scripts/generate-labels.mjs
 */
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";

const WIDTH = 340;
const HEIGHT = 1692;
const LABEL_COLOR = "#0b0b0b";
const INK = "#f4f4f2";
const SERIF = "Georgia, 'Times New Roman', serif";

export const GENERATED_LABELS = [
  { slug: "naturel-sizma", grade: "natürel sızma zeytinyağı", name: ["Natürel", "Sızma"], english: "EXTRA VIRGIN OLIVE OIL" },
  { slug: "riviera", grade: "riviera zeytinyağı", name: ["Riviera"], english: "RIVIERA OLIVE OIL" },
  { slug: "naturel-birinci", grade: "natürel birinci zeytinyağı", name: ["Natürel", "Birinci"], english: "VIRGIN OLIVE OIL" },
];

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function logoMarkup() {
  // The traced logo is a single black path; reuse it inside the white panel.
  const svg = await readFile("assets/brand/logo.svg", "utf8");
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const path = svg.match(/<path[^>]*d="([^"]+)"/)[1];
  return `<svg x="60" y="70" width="220" height="200" viewBox="${viewBox}"><path fill-rule="evenodd" fill="${LABEL_COLOR}" d="${path}"/></svg>`;
}

function labelSvg({ grade, name, english }, logo) {
  const nameLines = name
    .map((line, index) => `<text x="170" y="${720 + index * 92}" font-size="84">${escapeXml(line)}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="100%" height="100%" fill="${LABEL_COLOR}"/>
  <rect x="24" y="24" width="292" height="300" rx="60" fill="${INK}"/>
  ${logo}
  <g fill="${INK}" font-family="${SERIF}" text-anchor="middle">
    <text x="170" y="560" font-size="30" letter-spacing="1">${escapeXml(grade)}</text>
    ${nameLines}
    <text x="170" y="${760 + name.length * 92}" font-size="20" letter-spacing="4">${english}</text>
    <text x="170" y="1080" font-size="34">500 ml</text>
    <line x1="120" y1="1330" x2="220" y2="1330" stroke="${INK}" stroke-width="2"/>
    <text x="170" y="1420" font-size="24" letter-spacing="3">DOĞADAN SOFRANIZA</text>
    <text x="170" y="1470" font-size="30" letter-spacing="3">İZNİK HİKÂYESİ</text>
  </g>
</svg>`;
}

await mkdir("assets/labels", { recursive: true });
await mkdir("public/textures", { recursive: true });
const logo = await logoMarkup();

for (const label of GENERATED_LABELS) {
  const png = await sharp(Buffer.from(labelSvg(label, logo))).png().toBuffer();
  await sharp(png).toFile(`assets/labels/${label.slug}.png`);
  await sharp(png).webp({ quality: 90 }).toFile(`public/textures/label-${label.slug}.webp`);
  console.log(`label  ${label.slug}`);
}
