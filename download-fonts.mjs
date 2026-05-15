// Run this script to download Outfit fonts for DSGVO-compliant self-hosting
// Usage: node download-fonts.mjs

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import https from 'https';
import path from 'path';

const fonts = [
  { weight: 300, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4E.ttf' },
  { weight: 400, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf' },
  { weight: 600, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf' },
  { weight: 800, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4E.ttf' },
];

const fontsDir = path.join('public', 'fonts');
if (!existsSync(fontsDir)) {
  mkdirSync(fontsDir, { recursive: true });
  console.log('Created directory: public/fonts/');
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = [];
    https.get(url, (response) => {
      response.on('data', (chunk) => file.push(chunk));
      response.on('end', () => {
        writeFileSync(dest, Buffer.concat(file));
        resolve();
      });
      response.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const font of fonts) {
    const dest = path.join(fontsDir, `outfit-${font.weight}.ttf`);
    console.log(`Downloading Outfit ${font.weight}...`);
    await download(font.url, dest);
    console.log(`  ✓ Saved: ${dest}`);
  }
  console.log('\n✅ All fonts downloaded! DSGVO-compliant self-hosting ready.');
})();
