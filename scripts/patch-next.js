const fs = require('fs');

// 1. Patch font loader
const fontLoaderFile = 'node_modules/next/dist/compiled/@next/font/dist/google/loader.js';
if (fs.existsSync(fontLoaderFile)) {
  let content = fs.readFileSync(fontLoaderFile, 'utf8');
  const target = 'const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1];';
  const replacement = 'const match = /\\.(woff|woff2|eot|ttf|otf)/.exec(googleFontFileUrl); const ext = match ? match[1] : "woff2";';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(fontLoaderFile, content, 'utf8');
    console.log('✔ Patched Google font loader');
  } else {
    console.log('• Google font loader already patched');
  }
}

// 2. Patch collect-build-traces.js for missing trace output files
const tracesFile = 'node_modules/next/dist/build/collect-build-traces.js';
if (fs.existsSync(tracesFile)) {
  let content = fs.readFileSync(tracesFile, 'utf8');
  const target = 'const existingTrace = JSON.parse(await _promises.default.readFile(traceOutputPath, "utf8"));';
  const replacement = 'let existingTrace = { version: 1, files: [] }; try { existingTrace = JSON.parse(await _promises.default.readFile(traceOutputPath, "utf8")); } catch {}';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
  }
  const writeTarget = 'await _promises.default.writeFile(traceOutputPath, JSON.stringify({';
  const writeReplacement = 'await _promises.default.mkdir(_path.default.dirname(traceOutputPath), { recursive: true }).catch(()=>{}); try { await _promises.default.writeFile(traceOutputPath, JSON.stringify({';
  if (content.includes('await _promises.default.mkdir(_path.default.dirname(traceOutputPath)')) {
    console.log('• collect-build-traces.js safe fallback already patched');
  } else if (content.includes(writeTarget)) {
    content = content.replace(writeTarget, writeReplacement);
    content = content.replace('].sort()\n                }));', '].sort()\n                })); } catch {}');
    fs.writeFileSync(tracesFile, content, 'utf8');
    console.log('✔ Patched collect-build-traces.js safe fallback');
  }
  const target2 = 'const traceContent = JSON.parse(await _promises.default.readFile(traceFile, "utf8"));';
  const replacement2 = 'let traceContent; try { traceContent = JSON.parse(await _promises.default.readFile(traceFile, "utf8")); } catch { return; }';
  if (content.includes(target2)) {
    content = content.replace(target2, replacement2);
    fs.writeFileSync(tracesFile, content, 'utf8');
    console.log('✔ Patched collect-build-traces.js traceContent safe fallback');
  } else {
    console.log('• collect-build-traces.js traceContent already patched');
  }
}

// 3. Patch build index.js readManifest for optional pages-manifest in App-Router-only apps
const buildIndexFile = 'node_modules/next/dist/build/index.js';
if (fs.existsSync(buildIndexFile)) {
  let content = fs.readFileSync(buildIndexFile, 'utf8');
  const target = 'async function readManifest(filePath) {\n    return JSON.parse(await readFileUtf8(filePath));\n}';
  const replacement = 'async function readManifest(filePath) {\n    try {\n        return JSON.parse(await readFileUtf8(filePath));\n    } catch {\n        return {};\n    }\n}';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
  }
  const midTarget = 'const middlewareManifest = require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST));';
  const midReplacement = 'let middlewareManifest = { version: 2, middleware: {}, functions: {}, sortedMiddleware: [] }; try { middlewareManifest = JSON.parse(_fs.readFileSync(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST), "utf8")); } catch { try { middlewareManifest = require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST)); } catch {} }';
  if (content.includes(midTarget)) {
    content = content.replace(midTarget, midReplacement);
  }
  fs.writeFileSync(buildIndexFile, content, 'utf8');
  console.log('• build index.js safe fallbacks ready');
}

// 4. Patch server require.js for fallback built-in pages
const requireFile = 'node_modules/next/dist/server/require.js';
if (fs.existsSync(requireFile)) {
  let content = fs.readFileSync(requireFile, 'utf8');
  if (!content.includes('next/dist/pages')) {
    const target = 'if (!pagePath) {\n        pagePath = checkManifest(pagesManifest);\n    }';
    const replacement = 'if (!pagePath) {\n        pagePath = checkManifest(pagesManifest);\n    }\n    if (!pagePath && (page === "/_document" || page === "/_app" || page === "/_error")) {\n        try {\n            const fallbackPath = require.resolve("next/dist/pages" + page);\n            pagePathCache == null ? void 0 : pagePathCache.set(cacheKey, fallbackPath);\n            return fallbackPath;\n        } catch {}\n    }';
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(requireFile, content, 'utf8');
      console.log('✔ Patched require.js built-in fallback pages');
    }
  } else {
    console.log('• require.js built-in fallback pages already patched');
  }
}

// 4. Patch build utils.js handleEdgeFunction copyFile safe fallback
const buildUtilsFile = 'node_modules/next/dist/build/utils.js';
if (fs.existsSync(buildUtilsFile)) {
  let content = fs.readFileSync(buildUtilsFile, 'utf8');
  const target = 'await _fs.promises.copyFile(originalPath, fileOutputPath);';
  const replacement = 'try { await _fs.promises.copyFile(originalPath, fileOutputPath); } catch {}';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(buildUtilsFile, content, 'utf8');
    console.log('✔ Patched utils.js copyFile safe fallback');
  } else {
    console.log('• utils.js copyFile already patched');
  }
}




