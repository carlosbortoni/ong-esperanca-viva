import { defineConfig } from "vite";

// A página fica em html/index.html, então esse é o "root" do Vite.
// base "./" gera caminhos relativos e funciona em qualquer subcaminho (ex.: GitHub Pages).
export default defineConfig({
  root: "html",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    cssMinify: true,
    assetsInlineLimit: 0,
  },
  server: { fs: { allow: [".."] } },
});
