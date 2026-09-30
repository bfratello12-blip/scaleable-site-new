// Regenerates the dark-background logo and the icon-only marks from the source
// ScaleAble logo. Run with `node tools/generate-logo-variants.mjs` after replacing
// public/brand/scaleable-logo.svg with an updated master asset.
import fs from "node:fs";

const SRC = "public/brand/scaleable-logo.svg";
const src = fs.readFileSync(SRC, "utf8");

// Neutral marks in the master asset are #4d4d4d / #4f4f4f and the knockouts are
// #ffffff. On dark surfaces those roles invert.
const dark = src
  .replace(/fill:#ffffff/g, "fill:#0B1120")
  .replace(/#4d4d4d/g, "#FFFFFF")
  .replace(/#4f4f4f/g, "#FFFFFF");

fs.writeFileSync("public/brand/scaleable-logo-dark.svg", dark);

// Icon-only lockup: drop the wordmark glyph paths and crop to the gauge mark.
const MARK_VIEWBOX = "-52.15 -13.2 380 380";
const toMark = (svg) =>
  svg
    .replace(/<path\b[^>]*\bid="text1[^"]*"[^>]*\/>/g, "")
    .replace(/width="[^"]*"/, 'width="380"')
    .replace(/height="[^"]*"/, 'height="380"')
    .replace(/viewBox="[^"]*"/, `viewBox="${MARK_VIEWBOX}"`);

fs.writeFileSync("public/brand/scaleable-mark.svg", toMark(src));
fs.writeFileSync("public/brand/scaleable-mark-dark.svg", toMark(dark));

for (const file of [
  "public/brand/scaleable-logo.svg",
  "public/brand/scaleable-logo-dark.svg",
  "public/brand/scaleable-mark.svg",
  "public/brand/scaleable-mark-dark.svg",
]) {
  const contents = fs.readFileSync(file, "utf8");
  console.log(file, contents.length, "wordmark paths:", (contents.match(/id="text1/g) || []).length);
}
