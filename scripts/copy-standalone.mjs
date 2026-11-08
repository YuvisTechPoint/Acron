import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");

if (fs.existsSync(standaloneDir)) {
  console.log("Synchronizing standalone assets for permanent zero-break production...");

  // 1. Copy public directory to .next/standalone/public
  const publicSrc = path.join(rootDir, "public");
  const publicDest = path.join(standaloneDir, "public");
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true });
    console.log("✔ Copied public/ -> .next/standalone/public");
  }

  // 2. Copy .next/static directory to .next/standalone/.next/static
  const staticSrc = path.join(rootDir, ".next", "static");
  const staticDest = path.join(standaloneDir, ".next", "static");
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true });
    console.log("✔ Copied .next/static/ -> .next/standalone/.next/static");
  }

  // 3. Copy data directory to .next/standalone/data
  const dataSrc = path.join(rootDir, "data");
  const dataDest = path.join(standaloneDir, "data");
  if (fs.existsSync(dataSrc)) {
    fs.cpSync(dataSrc, dataDest, { recursive: true });
    console.log("✔ Copied data/ -> .next/standalone/data");
  }

  console.log("✔ Standalone server is permanently resilient with all assets docked.");
}
