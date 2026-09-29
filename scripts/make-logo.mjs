// Regenerates the logo files in public/logo (outlined SVG + PNG) plus
// icon-512.png / apple-icon.png (copy those two to src/app/icon.png and
// src/app/apple-icon.png). Run: npm run brand:logo
// Generates outlined (font-independent) SVG + PNG logo files.
import fs from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

const f = (p) => opentype.parse(fs.readFileSync(p).buffer);
const serif = f("node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff");
const serifBold = f("node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff");
const sans = f("node_modules/@fontsource/inter/files/inter-latin-600-normal.woff");

const C = { ink: "#14213d", brass: "#b08d57", brassLight: "#d9bd8c", ivory: "#faf7f0" };

// Lay out text with tracking; returns { d, width }
function text(font, str, size, tracking = 0) {
  let x = 0;
  const parts = [];
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    const d = g.getPath(x, 0, size).toPathData(2);
    if (d.includes("NaN")) throw new Error(`Invalid outline for "${ch}"; see make-og-image.mjs for the per-glyph workaround`);
    parts.push(d);
    x += (g.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return { d: parts.join(" "), width: x - tracking };
}

function bbox(font, str, size) {
  const p = font.getPath(str, 0, 0, size);
  return p.getBoundingBox();
}

// Monogram: square frame (outer + inner rule), serif "RT", short brass rule.
function monogram({ fg, accent, bg }) {
  const S = 200;
  const letters = text(serifBold, "RT", 112, -6);
  const bb = bbox(serifBold, "RT", 112);
  const capH = -bb.y1; // height above baseline
  const x = (S - letters.width) / 2;
  const baseline = S / 2 + capH / 2 - 6;
  return {
    size: S,
    body: `
  ${bg ? `<rect width="${S}" height="${S}" fill="${bg}"/>` : ""}
  <rect x="6" y="6" width="${S - 12}" height="${S - 12}" fill="none" stroke="${accent}" stroke-width="3"/>
  <rect x="16" y="16" width="${S - 32}" height="${S - 32}" fill="none" stroke="${accent}" stroke-width="1"/>
  <path transform="translate(${x.toFixed(2)} ${baseline.toFixed(2)})" fill="${fg}" d="${letters.d}"/>
  <rect x="${S / 2 - 18}" y="${baseline + 14}" width="36" height="2.5" fill="${accent}"/>`,
  };
}

function svg(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}\n</svg>\n`;
}

// Horizontal lockup: monogram + name + "ADVOCATE"
function horizontal({ fg, accent, sub, bg }) {
  const m = monogram({ fg, accent });
  const H = 200;
  const name = text(serif, "RAJESH A. THOSAR", 64, 5);
  const role = text(sans, "ADVOCATE", 22, 9);
  const tx = m.size + 44;
  const W = Math.ceil(tx + Math.max(name.width, role.width) + 12);
  const body = `
  ${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ""}
  <g>${m.body}</g>
  <path transform="translate(${tx} 104)" fill="${fg}" d="${name.d}"/>
  <rect x="${tx}" y="122" width="56" height="2" fill="${accent}"/>
  <path transform="translate(${tx} 160)" fill="${sub}" d="${role.d}"/>`;
  return { W, H, body };
}

const files = [];
const mono = monogram({ fg: C.ink, accent: C.brass });
const monoRev = monogram({ fg: C.ivory, accent: C.brassLight, bg: C.ink });
files.push(["rt-monogram.svg", svg(mono.size, mono.size, mono.body, "Rajesh A. Thosar, Advocate")]);
files.push(["rt-monogram-reverse.svg", svg(monoRev.size, monoRev.size, monoRev.body, "Rajesh A. Thosar, Advocate")]);
const hz = horizontal({ fg: C.ink, accent: C.brass, sub: "#7a5a2b" });
const hzRev = horizontal({ fg: C.ivory, accent: C.brassLight, sub: C.brassLight });
files.push(["rt-logo-horizontal.svg", svg(hz.W, hz.H, hz.body, "Rajesh A. Thosar, Advocate")]);
files.push(["rt-logo-horizontal-reverse.svg", svg(hzRev.W, hzRev.H, hzRev.body, "Rajesh A. Thosar, Advocate")]);

for (const [name, content] of files) fs.writeFileSync(`${out}/${name}`, content);

// High-resolution PNGs for print / WhatsApp / social use
for (const [name] of files) {
  const src = `${out}/${name}`;
  const bg = name.includes("reverse") ? C.ink : "#ffffff";
  await sharp(src, { density: 300 }).flatten({ background: bg }).png().toFile(src.replace(".svg", ".png"));
}
// Favicon / app icon from the reverse monogram
await sharp(`${out}/rt-monogram-reverse.svg`, { density: 300 }).resize(512, 512).png().toFile(`${out}/icon-512.png`);
await sharp(`${out}/rt-monogram-reverse.svg`, { density: 300 }).resize(180, 180).png().toFile(`${out}/apple-icon.png`);
console.log(fs.readdirSync(out).join("\n"));
