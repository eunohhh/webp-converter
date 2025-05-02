import fs from "node:fs/promises";
import sharp from "sharp";

const inputDir = "./images";
const outputDir = "./output";

await fs.mkdir(outputDir, { recursive: true });
const files = await fs.readdir(inputDir);

for (const file of files) {
  if (!file.endsWith(".png")) continue;

  const filePath = `${inputDir}/${file}`;
  const { size } = await fs.stat(filePath);
  const quality = size > 300 * 1024 ? 60 : 100;

  await sharp(filePath)
    .webp({ quality })
    .toFile(`${outputDir}/${file.replace(".png", ".webp")}`);

  console.log(
    `${file} → ${file.replace(".png", ".webp")} (quality: ${quality})`
  );
}
