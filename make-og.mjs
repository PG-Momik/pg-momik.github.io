// Renders assets/og.png, the 1200x630 link preview card behind the og:image /
// twitter:image tags. Run it when the wording or the photo changes:
//
//   npm install --no-save sharp && node make-og.mjs
//
// (sharp is not a project dependency - this is a static site and the PNG is committed.)
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'assets', 'og.png');
const W = 1200, H = 630;
const AV = 320, AVX = 790, AVY = 155;   // avatar box

const grid = [
  ...Array.from({ length: Math.ceil(W / 60) }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${H}"/>`),
  ...Array.from({ length: Math.ceil(H / 60) }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${W}" y2="${i * 60}"/>`),
].join('');

const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#1a1a1a"/>
  <g stroke="#242424" stroke-width="1">${grid}</g>

  <text x="80" y="108" font-family="IBM Plex Mono, Menlo" font-size="20" letter-spacing="6" fill="#d4a574">MOMIK.DEV</text>

  <text x="78" y="248" font-family="Didot" font-size="92" letter-spacing="2" fill="#e0e0e0">MOMIK</text>
  <text x="78" y="340" font-family="Didot" font-size="92" letter-spacing="2" fill="#e0e0e0">SHRESTHA</text>
  <rect x="80" y="380" width="88" height="3" fill="#d4a574"/>

  <text x="80" y="446" font-family="Helvetica Neue" font-size="27" fill="#a0a0a0">Senior software engineer, Nepal &#183; 5 years</text>
  <text x="80" y="486" font-family="Helvetica Neue" font-size="27" fill="#a0a0a0">Full-stack Laravel &amp; Vue.js, and open source I&#8217;d use myself.</text>

  <text x="80" y="556" font-family="IBM Plex Mono, Menlo" font-size="19" letter-spacing="3" fill="#666666">LARAVEL / VUE / TYPESCRIPT / PYTHON / GO</text>
</svg>`;

const ring = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <circle cx="${AVX + AV / 2}" cy="${AVY + AV / 2}" r="${AV / 2 + 9}" fill="none" stroke="#d4a574" stroke-width="3"/>
</svg>`;

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`,
);
const avatar = await sharp(join(ROOT, 'assets', 'profile.jpg'))
  .extract({ left: 560, top: 1400, width: 3400, height: 3400 }) // the face, from the 4496x4863 selfie
  .resize(AV, AV)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(bg))
  .composite([{ input: Buffer.from(ring), top: 0, left: 0 }, { input: avatar, top: AVY, left: AVX }])
  .png({ compressionLevel: 9 })
  .toFile(OUT);
console.log(`✓ ${OUT}`);
