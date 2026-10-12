/**
 * Image pipeline (run: `npm run assets`).
 *
 *   assets/photos/<name>.(jpg|jpeg|png|webp)  →  public/images/<name>-<width>.(avif|webp)
 *   assets/brand/logo*.svg                    →  public/images/logo*.svg + logo.png
 *   assets/brand/logo-seal.png                →  src/app/favicon.ico, icon.png, apple-icon.png
 *   hero photo + seal + headline              →  public/images/og-card.png
 *
 * To add a photo: drop it into assets/photos/, run this script, then point a
 * slot in `src/content/media.ts` at <name>.
 *
 * logo.svg was traced once from the legacy gold-on-black PNG; it is a single
 * black shape that the site recolors with CSS (see components/brand/Logo.tsx).
 *
 * logo-seal.png (round "UYKA" label seal, transparent) was rendered once from
 * the vector logo-seal-source.pdf with PyMuPDF, cropped square to the artwork.
 */
import sharp from "sharp";
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PHOTO_DIR = path.resolve("assets/photos");
const LOGO_SVG = path.resolve("assets/brand/logo.svg");
/** Same paths, viewBox cropped to the "Uyka" script only (used as the giant footer mark). */
const WORDMARK_SVG = path.resolve("assets/brand/logo-wordmark.svg");
const OUT_DIR = path.resolve("public/images");
const SEAL_PNG = path.resolve("assets/brand/logo-seal.png");
/** Next.js serves favicon.ico / icon.png / apple-icon.png from the app root. */
const APP_DIR = path.resolve("src/app");

const PHOTO_WIDTHS = [640, 1280, 1920];
const PHOTO_QUALITY = { avif: 55, webp: 72 };
const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** Raster logo for structured data / social cards, in the brand's forest green. */
const LOGO_PNG_WIDTH = 512;
const LOGO_PNG_COLOR = "#12291d"; // keep in sync with --color-brand

/** Browser-tab sizes packed into favicon.ico, plus the larger app icons. */
const FAVICON_SIZES = [16, 32, 48];
const ICON_SIZE = 512;
const APPLE_ICON_SIZE = 180;
/** iOS home-screen icons must be opaque; the seal sits on white with a margin. */
const APPLE_ICON_BACKGROUND = "#ffffff";
const APPLE_ICON_PADDING = 16;

/**
 * Link-preview card (WhatsApp, social). Copy mirrors the hero in src/content/tr/home.ts.
 * Referenced explicitly by src/lib/seo.ts (SOCIAL_CARD) so pages that set their own
 * openGraph still carry it.
 */
const SOCIAL_CARD_FILE = "og-card.png";
const SOCIAL_IMAGE = { width: 1200, height: 630, sealSize: 300, margin: 90 };
const SOCIAL_PHOTO = path.join(PHOTO_DIR, "hero-grove.jpg");
const SOCIAL_COPY = {
  eyebrow: "İZNİK · BURSA · TÜRKİYE",
  title: ["İznik'ten gelen", "zeytin karakteri."],
  subtitle: "Restoran, otel ve catering için toplu zeytinyağı tedariki",
};
const SOCIAL_BRAND = "#12291d"; // keep in sync with --color-brand
const SOCIAL_ACCENT = "#a7c49a"; // keep in sync with --color-accent-soft

async function buildPhotoVariants() {
  const files = (await readdir(PHOTO_DIR)).filter((file) => PHOTO_EXTENSIONS.has(path.extname(file).toLowerCase()));

  for (const file of files) {
    const name = path.parse(file).name;
    for (const width of PHOTO_WIDTHS) {
      const pipeline = sharp(path.join(PHOTO_DIR, file)).rotate().resize({ width, withoutEnlargement: true });
      await pipeline.clone().avif({ quality: PHOTO_QUALITY.avif }).toFile(path.join(OUT_DIR, `${name}-${width}.avif`));
      await pipeline.clone().webp({ quality: PHOTO_QUALITY.webp }).toFile(path.join(OUT_DIR, `${name}-${width}.webp`));
    }
    console.log(`photo  ${name}`);
  }
}

async function buildLogo() {
  await copyFile(LOGO_SVG, path.join(OUT_DIR, "logo.svg"));
  await copyFile(WORDMARK_SVG, path.join(OUT_DIR, "logo-wordmark.svg"));
  await sharp(LOGO_SVG)
    .resize({ width: LOGO_PNG_WIDTH })
    .composite([{ input: { create: { width: 1, height: 1, channels: 4, background: LOGO_PNG_COLOR } }, tile: true, blend: "in" }])
    .png()
    .toFile(path.join(OUT_DIR, "logo.png"));
  console.log("logo   logo.svg + logo-wordmark.svg + logo.png");
}

/**
 * Packs PNG images into one .ico (PNG-in-ICO, supported by every current browser).
 * Layout: 6-byte header, 16-byte directory entry per image, then the PNG data.
 */
function packIco(pngs) {
  const HEADER_BYTES = 6;
  const ENTRY_BYTES = 16;
  const header = Buffer.alloc(HEADER_BYTES);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = HEADER_BYTES + ENTRY_BYTES * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY_BYTES);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

async function buildFavicons() {
  const pngs = await Promise.all(
    FAVICON_SIZES.map(async (size) => ({ size, data: await sharp(SEAL_PNG).resize(size, size).png().toBuffer() })),
  );
  await writeFile(path.join(APP_DIR, "favicon.ico"), packIco(pngs));
  await sharp(SEAL_PNG).resize(ICON_SIZE, ICON_SIZE).png().toFile(path.join(APP_DIR, "icon.png"));
  const appleInner = APPLE_ICON_SIZE - APPLE_ICON_PADDING * 2;
  await sharp(SEAL_PNG)
    .resize(appleInner, appleInner)
    .extend({ top: APPLE_ICON_PADDING, bottom: APPLE_ICON_PADDING, left: APPLE_ICON_PADDING, right: APPLE_ICON_PADDING, background: APPLE_ICON_BACKGROUND })
    .flatten({ background: APPLE_ICON_BACKGROUND })
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));
  console.log("icons  favicon.ico + icon.png + apple-icon.png");
}

async function buildSocialImage() {
  const { width, height, sealSize, margin } = SOCIAL_IMAGE;
  const textLeft = margin + sealSize + 60;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="shade">
        <stop offset="0" stop-color="${SOCIAL_BRAND}" stop-opacity="0.95"/>
        <stop offset="1" stop-color="${SOCIAL_BRAND}" stop-opacity="0.55"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#shade)"/>
    <g font-family="Georgia, 'Times New Roman', serif" fill="#ffffff">
      <text x="${textLeft}" y="215" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="${SOCIAL_ACCENT}">${SOCIAL_COPY.eyebrow}</text>
      <text x="${textLeft}" y="300" font-size="68">${SOCIAL_COPY.title[0]}</text>
      <text x="${textLeft}" y="380" font-size="68" font-style="italic" fill="${SOCIAL_ACCENT}">${SOCIAL_COPY.title[1]}</text>
      <text x="${textLeft}" y="450" font-family="Arial, sans-serif" font-size="24" fill-opacity="0.85">${SOCIAL_COPY.subtitle}</text>
    </g>
  </svg>`;
  const seal = await sharp(SEAL_PNG).resize(sealSize, sealSize).png().toBuffer();
  await sharp(SOCIAL_PHOTO)
    .resize(width, height, { fit: "cover" })
    .composite([{ input: Buffer.from(overlay) }, { input: seal, left: margin, top: Math.round((height - sealSize) / 2) }])
    .png()
    .toFile(path.join(OUT_DIR, SOCIAL_CARD_FILE));
  console.log(`social ${SOCIAL_CARD_FILE}`);
}

await mkdir(OUT_DIR, { recursive: true });
await buildPhotoVariants();
await buildLogo();
await buildFavicons();
await buildSocialImage();
