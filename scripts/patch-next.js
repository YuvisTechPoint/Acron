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

// 2. Patch server require.js for fallback pages
const requireFile = 'node_modules/next/dist/server/require.js';
if (fs.existsSync(requireFile)) {
  let content = fs.readFileSync(requireFile, 'utf8');
  const target = 'if (!pagePath) {\n        pagePath = checkManifest(pagesManifest);\n    }';
  const replacement = 'if (!pagePath) {\n        pagePath = checkManifest(pagesManifest);\n    }\n    if (!pagePath && _fs.existsSync(_path.default.join(serverBuildPath, "pages", `${page}.js`))) {\n        pagePath = _path.default.join("pages", `${page}.js`);\n    }';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(requireFile, content, 'utf8');
    console.log('✔ Patched require.js fallback for pages');
  } else {
    console.log('• require.js fallback already patched');
  }
}

