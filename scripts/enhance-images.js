const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MENU_DIR = path.join(__dirname, '..', 'public', 'images', 'menu');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'menu_enhanced');
const SKIP = new Set(['custom_cake_04.webp']);

// Auto-enhance feel: small brightness/saturation lift + contrast stretch around mid-grey.
const BRIGHTNESS = 1.06;
const SATURATION = 1.12;
const CONTRAST = 1.14;
const CONTRAST_OFFSET = -(128 * (CONTRAST - 1));

async function enhance(file) {
  const src = path.join(MENU_DIR, file);
  const dst = path.join(OUT_DIR, file);

  await sharp(src)
    .modulate({ brightness: BRIGHTNESS, saturation: SATURATION })
    .linear(CONTRAST, CONTRAST_OFFSET)
    .webp({ quality: 88 })
    .toFile(dst);
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(MENU_DIR)
    .filter((f) => f.endsWith('.webp') && !SKIP.has(f));

  console.log(`Enhancing ${files.length} images -> ${OUT_DIR}`);
  console.log(`Skipping: ${[...SKIP].join(', ')}`);

  let done = 0;
  for (const f of files) {
    try {
      await enhance(f);
      done++;
    } catch (err) {
      console.error(`FAIL ${f}:`, err.message);
    }
  }
  console.log(`Done: ${done}/${files.length}`);
})();
