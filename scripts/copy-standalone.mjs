import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");

if (fs.existsSync(standaloneDir)) {
  console.log("Synchronizing standalone assets for permanent zero-break production...");

  // 1. Copy public directory to .next/standalone/public
  try {
    const publicSrc = path.join(rootDir, "public");
    const publicDest = path.join(standaloneDir, "public");
    if (fs.existsSync(publicSrc)) {
      fs.cpSync(publicSrc, publicDest, { recursive: true });
      console.log("✔ Copied public/ -> .next/standalone/public");
    }
  } catch (e) {
    console.warn("Notice copying public:", e.message);
  }

  // 2. Copy .next/static directory to .next/standalone/.next/static
  try {
    const staticSrc = path.join(rootDir, ".next", "static");
    const staticDest = path.join(standaloneDir, ".next", "static");
    if (fs.existsSync(staticSrc)) {
      fs.cpSync(staticSrc, staticDest, { recursive: true });
      console.log("✔ Copied .next/static/ -> .next/standalone/.next/static");
    }
  } catch (e) {
    console.warn("Notice copying static:", e.message);
  }

  // 3. Copy data directory to .next/standalone/data
  try {
    const dataSrc = path.join(rootDir, "data");
    const dataDest = path.join(standaloneDir, "data");
    if (fs.existsSync(dataSrc)) {
      fs.cpSync(dataSrc, dataDest, { recursive: true });
      console.log("✔ Copied data/ -> .next/standalone/data");
    }
  } catch (e) {
    console.warn("Notice copying data:", e.message);
  }

  // 4. Ensure server manifests are synchronized
  try {
    const serverSrc = path.join(rootDir, ".next", "server");
    const serverDest = path.join(standaloneDir, ".next", "server");
    fs.mkdirSync(serverDest, { recursive: true });

    if (fs.existsSync(serverSrc)) {
      const manifestFiles = [
        "middleware-manifest.json",
        "middleware-build-manifest.js",
        "middleware-react-loadable-manifest.js",
        "pages-manifest.json",
        "app-paths-manifest.json",
      ];
      for (const f of manifestFiles) {
        const srcFile = path.join(serverSrc, f);
        const destFile = path.join(serverDest, f);
        if (fs.existsSync(srcFile) && !fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
          console.log(`✔ Copied ${f} -> standalone`);
        }
      }
    }

    const mwManifestPath = path.join(serverDest, "middleware-manifest.json");
    if (!fs.existsSync(mwManifestPath)) {
      fs.writeFileSync(
        mwManifestPath,
        JSON.stringify({ version: 2, middleware: {}, functions: {}, sortedMiddleware: [] }),
        "utf8"
      );
      console.log("✔ Created fallback middleware-manifest.json for standalone");
    }
  } catch (e) {
    console.warn("Notice copying server manifests:", e.message);
  }

  console.log("✔ Standalone server is permanently resilient with all assets docked.");
}
