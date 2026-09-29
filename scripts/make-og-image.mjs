// Generates the social-sharing image (Open Graph / Twitter / WhatsApp preview):
// public/og/og-image.jpg, 1200x630. Text is converted to outlines so the
// result does not depend on installed fonts. Run: npm run brand:og
import fs from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const W = 1200;
const H = 630;
const C = { ink: "#081325", brass: "#c5a059", brassLight: "#e2c88f", ivory: "#faf7f0" };
const font = (p) => opentype.parse(fs.readFileSync(`node_modules/@fontsource/${p}`).buffer);
const serif = font("cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff");
const serifItalic = font("cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff");
const sans = font("manrope/files/manrope-latin-700-normal.woff");
const sansMedium = font("manrope/files/manrope-latin-600-normal.woff");

// Text laid out as SVG paths with optional letter-spacing. Each glyph is drawn
// at the origin and translated into place: opentype.js can emit NaN control
// points for some glyphs when asked to draw them at an offset.
function text(f, str, size, x, y, fill, tracking = 0, opacity = 1) {
  let cx = x;
  const parts = [];
  for (const ch of str) {
    const g = f.charToGlyph(ch);
    const d = g.getPath(0, 0, size).toPathData(2);
    if (d.includes("NaN")) throw new Error(`Invalid outline for "${ch}"`);
    if (d) parts.push(`<path transform="translate(${cx.toFixed(2)} ${y})" d="${d}"/>`);
    cx += (g.advanceWidth / f.unitsPerEm) * size + tracking;
  }
  return `<g fill="${fill}" fill-opacity="${opacity}">${parts.join("")}</g>`;
}

// Arch: semicircular top, square bottom.
const arch = (x, y, w, h) => `M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`;

const P = { x: 800, y: 96, w: 330, h: 430 }; // portrait box

const grid = [];
for (let gx = 0; gx <= W; gx += 72) grid.push(`M${gx} 0V${H}`);
for (let gy = 0; gy <= H; gy += 72) grid.push(`M0 ${gy}H${W}`);

const base = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g1" cx="0.8" cy="0" r="0.8"><stop offset="0" stop-color="${C.brass}" stop-opacity="0.28"/><stop offset="1" stop-color="${C.brass}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0" cy="1" r="0.7"><stop offset="0" stop-color="#1d3a6b" stop-opacity="0.9"/><stop offset="1" stop-color="#1d3a6b" stop-opacity="0"/></radialGradient>
    <radialGradient id="fade" cx="0.35" cy="0.4" r="0.75"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="gm"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
    <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ink}"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <path d="${grid.join("")}" stroke="${C.brassLight}" stroke-opacity="0.07" stroke-width="1" mask="url(#gm)"/>
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="${C.brass}" stroke-opacity="0.45" stroke-width="1.5"/>
  <ellipse cx="${P.x + P.w / 2}" cy="${P.y + P.h + 10}" rx="150" ry="36" fill="${C.brass}" fill-opacity="0.45" filter="url(#blur)"/>
  <path d="${arch(P.x - 14, P.y - 14, P.w + 28, P.h + 28)}" fill="none" stroke="${C.brass}" stroke-opacity="0.65" stroke-width="1.5"/>
  ${text(sans, "ADVOCATE · ULHASNAGAR, THANE", 19, 84, 170, C.brassLight, 4.2)}
  ${text(serif, "Rajesh A.", 108, 78, 282, C.ivory)}
  ${text(serifItalic, "Thosar", 108, 80, 386, C.brass)}
  <rect x="84" y="420" width="84" height="2" fill="${C.brass}"/>
  ${text(sansMedium, "Bombay High Court · District & Sessions Courts", 24, 84, 474, C.ivory, 0, 0.85)}
  ${text(sansMedium, "Magistrate Courts · Consumer Commissions", 24, 84, 510, C.ivory, 0, 0.85)}
  ${text(sansMedium, "Bar Council of Maharashtra & Goa · LL.B.", 18, 84, 572, C.brassLight, 0.5, 0.8)}
</svg>`;

// Portrait on a warm studio backdrop (multiply), clipped to the arch.
const backdrop = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${P.w}" height="${P.h}">
  <defs><radialGradient id="s" cx="0.5" cy="0.25" r="0.9"><stop offset="0" stop-color="#fbf6ea"/><stop offset="0.55" stop-color="#efe2c4"/><stop offset="1" stop-color="#d9bf8c"/></radialGradient></defs>
  <rect width="${P.w}" height="${P.h}" fill="url(#s)"/>
</svg>`);
const shade = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${P.w}" height="${P.h}">
  <defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0.6" stop-color="${C.ink}" stop-opacity="0"/><stop offset="1" stop-color="${C.ink}" stop-opacity="0.45"/></linearGradient></defs>
  <rect width="${P.w}" height="${P.h}" fill="url(#d)"/>
</svg>`);
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${P.w}" height="${P.h}"><path d="${arch(0, 0, P.w, P.h)}" fill="#fff"/></svg>`);

const photo = await sharp("public/images/rajesh-thosar-portrait.jpg")
  .resize({ width: P.w, height: P.h, fit: "cover", position: "top" })
  .toBuffer();
const portrait = await sharp(backdrop)
  .composite([{ input: photo, blend: "multiply" }, { input: shade }, { input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();
const monogram = await sharp("public/logo/rt-monogram-reverse.svg", { density: 300 }).resize(56, 56).png().toBuffer();

fs.mkdirSync("public/og", { recursive: true });
const out = "public/og/og-image.jpg";
await sharp(Buffer.from(base))
  .composite([
    { input: portrait, left: P.x, top: P.y },
    { input: monogram, left: 84, top: 64 },
  ])
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(out);
console.log(`${out}: ${Math.round(fs.statSync(out).size / 1024)} KB`);
