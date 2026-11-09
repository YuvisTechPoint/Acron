const fs = require('fs');
const file = 'node_modules/next/dist/compiled/@next/font/dist/google/loader.js';
let content = fs.readFileSync(file, 'utf8');

const target = 'const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1];';
const replacement = 'const match = /\\.(woff|woff2|eot|ttf|otf)/.exec(googleFontFileUrl); const ext = match ? match[1] : "woff2";';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Patched loader.js');
} else {
  console.log('Already patched');
}
