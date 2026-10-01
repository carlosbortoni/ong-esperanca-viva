// Gera versões otimizadas (WebP e JPEG) das imagens originais de imagens/*.jpg
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";

const origem = "imagens";
const destino = "imagens/otimizadas";
const larguras = [400, 800];
await mkdir(destino, { recursive: true });

for (const arquivo of (await readdir(origem)).filter((f) => f.endsWith(".jpg"))) {
  const nome = arquivo.replace(".jpg", "");
  for (const w of larguras) {
    await sharp(`${origem}/${arquivo}`).resize({ width: w }).webp({ quality: 72 }).toFile(`${destino}/${nome}-${w}.webp`);
  }
  await sharp(`${origem}/${arquivo}`).resize({ width: 800 }).jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(`${destino}/${nome}-800.jpg`);
}
for (const f of await readdir(destino)) console.log(f, (await stat(`${destino}/${f}`)).size, "B");
