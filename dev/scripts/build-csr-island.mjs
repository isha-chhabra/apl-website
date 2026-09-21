// Builds the React islands used by the static site into ../assets/ (the website folder, one level up).
//   stacking-card -> csr-stack.{js,css}   (csr.html)
//   hero-1        -> hero.{js,css}        (index.html)
//   radial-orbital-timeline -> offer.{js,css} (about.html)
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(root, "..", "assets");
const lenis = await readFile(path.join(root, "node_modules/lenis/dist/lenis.css"), "utf8");

const islands = [
  { entry: "csr-island-entry.tsx", css: "csr-island.css", name: "csr-stack", extraCss: lenis },
  { entry: "hero-island-entry.tsx", css: "hero-island.css", name: "hero", extraCss: "" },
  { entry: "offer-island-entry.tsx", css: "offer-island.css", name: "offer", extraCss: "" },
];

for (const { entry, css, name, extraCss } of islands) {
  await build({
    entryPoints: [path.join(root, "scripts", entry)],
    outfile: path.join(out, `${name}.js`),
    bundle: true,
    minify: true,
    format: "iife",
    target: "es2019",
    jsx: "automatic",
    alias: { "@": root },
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "info",
  });
  const from = path.join(root, "scripts", css);
  const result = await postcss([tailwind({ base: root })]).process(await readFile(from, "utf8"), { from });
  await writeFile(path.join(out, `${name}.css`), result.css + "\n" + extraCss);
  console.log(`${name}.css`, (result.css.length / 1024).toFixed(1) + " KB");
}
