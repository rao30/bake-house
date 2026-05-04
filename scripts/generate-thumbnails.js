const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "Photoshoot square pics");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "menu");
const SIZE = 400;
const QUALITY = 80;

// Files cropped from a tighter region than the original — bump quality and add
// sharpening + saturation to compensate for the implicit upscale.
const ENHANCE_FILES = new Set(["red_velvet_cookie.jpg"]);

if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source folder not found: ${SRC_DIR}`);
    process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));

(async () => {
    let done = 0;
    let totalIn = 0;
    let totalOut = 0;
    const start = Date.now();

    for (const file of files) {
        const inPath = path.join(SRC_DIR, file);
        const outPath = path.join(OUT_DIR, `${path.parse(file).name}.webp`);

        const inStat = fs.statSync(inPath);
        const enhance = ENHANCE_FILES.has(file);
        let pipeline = sharp(inPath).rotate().resize(SIZE, SIZE, { fit: "inside" });
        if (enhance) {
            pipeline = pipeline.sharpen({ sigma: 1.5 }).modulate({ saturation: 1.15, brightness: 1.02 });
        }
        await pipeline.webp({ quality: enhance ? 85 : QUALITY }).toFile(outPath);
        const outStat = fs.statSync(outPath);

        totalIn += inStat.size;
        totalOut += outStat.size;
        done++;
        process.stdout.write(`[${done}/${files.length}] ${file} -> ${path.basename(outPath)} (${(outStat.size / 1024).toFixed(0)} KB)\n`);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    const mb = n => (n / 1024 / 1024).toFixed(1);
    console.log(`\nDone: ${done} files in ${elapsed}s`);
    console.log(`In:  ${mb(totalIn)} MB`);
    console.log(`Out: ${mb(totalOut)} MB (${((totalOut / totalIn) * 100).toFixed(1)}% of original)`);
})().catch(err => {
    console.error(err);
    process.exit(1);
});
