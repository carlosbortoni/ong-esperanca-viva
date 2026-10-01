// Minifica o HTML gerado pelo Vite (o Vite minifica CSS e JS, mas não o HTML).
import { readFile, writeFile } from "node:fs/promises";
import { minify } from "html-minifier-terser";

const arquivo = "dist/index.html";
const original = await readFile(arquivo, "utf8");
const minificado = await minify(original, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  minifyCSS: true,
  minifyJS: true,
});
await writeFile(arquivo, minificado);
console.log(`HTML: ${Buffer.byteLength(original)} B -> ${Buffer.byteLength(minificado)} B`);
