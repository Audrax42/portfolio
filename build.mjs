// Generates index.html (French) and en/index.html (English) from src/.
// Usage: node build.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { render } from './src/render.mjs';
import fr from './src/content/fr.mjs';
import en from './src/content/en.mjs';

// French typography: a non-breaking space before ? ! : ; so the mark never starts a line.
const frenchSpaces = (v) =>
  typeof v === 'string'
    ? v.replace(/ ([?!:;])/g, ' $1')
    : Array.isArray(v)
      ? v.map(frenchSpaces)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, frenchSpaces(x)]))
        : v;

for (const content of [frenchSpaces(fr), en]) {
  const dir = content.dir || '.';
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, render(content));
  console.log(`built ${dir}/index.html`);
}
