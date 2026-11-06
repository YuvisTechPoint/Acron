const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');
// Match href="..." or href={`...`} or router.push("...") etc.
const linkRegex = /(?:href\s*=\s*["']([^"']+)["']|href\s*=\s*\{`([^`]+)`\}|router\.push\(\s*["']([^"']+)["']|router\.push\(\s*`([^`]+)`\))/g;

const allLinks = new Map(); // target -> Set of files

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scan(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      let m;
      while ((m = linkRegex.exec(content)) !== null) {
        const target = m[1] || m[2] || m[3] || m[4];
        if (target) {
          if (!allLinks.has(target)) allLinks.set(target, new Set());
          allLinks.get(target).add(path.relative(process.cwd(), full));
        }
      }
    }
  }
}

scan(srcDir);

// Read all existing page routes
function getRoutes(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getRoutes(fullPath, path.join(base, file)));
    } else if (file === 'page.tsx') {
      const route = ('/' + base).replace(/\\/g, '/');
      results.push(route === '/' ? '/' : route);
    }
  }
  return results;
}

const existingRoutes = getRoutes(path.resolve('src/app'));
console.log('Existing page.tsx count:', existingRoutes.length);

const results = [];
for (const [target, files] of allLinks.entries()) {
  results.push({
    target,
    fileCount: files.size,
    files: Array.from(files)
  });
}

results.sort((a, b) => a.target.localeCompare(b.target));

console.log('Total unique targets detected:', results.length);

// Print internal links and check if they match routes
const internal = results.filter(r => r.target.startsWith('/'));
console.log('Internal links count:', internal.length);

const broken = [];
const valid = [];

function routeMatches(target, route) {
  // exact match
  if (target === route) return true;
  // target with hash or query
  const cleanTarget = target.split('?')[0].split('#')[0];
  if (cleanTarget === route) return true;
  // dynamic routes like /services/[slug] matching /services/corporate-governance
  // convert route [param] to regex
  const regexPattern = '^' + route.replace(/\[([^\]]+)\]/g, '[^/]+') + '$';
  const rx = new RegExp(regexPattern);
  return rx.test(cleanTarget);
}

for (const item of internal) {
  const cleanTarget = item.target.split('?')[0].split('#')[0];
  const matched = existingRoutes.some(r => routeMatches(item.target, r));
  if (matched) {
    valid.push(item);
  } else {
    broken.push(item);
  }
}

console.log('\n--- VALID INTERNAL LINKS (' + valid.length + ') ---');
valid.forEach(v => console.log('  [OK]', v.target, 'in', v.files.join(', ')));

console.log('\n--- POTENTIALLY BROKEN / UNMATCHED INTERNAL LINKS (' + broken.length + ') ---');
broken.forEach(b => console.log('  [BROKEN/MISSING]', b.target, 'in', b.files.join(', ')));
