// Generates index.html (French) and en/index.html (English) from src/.
// Usage: node build.mjs

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
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

// A short fingerprint on styles.css and main.js, so browsers fetch the new files after each update.
const stamp = (file) => createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8);
const versioned = (html) =>
  html.replace(/(styles\.css|main\.js)"/g, (_, file) => `${file}?v=${stamp(file)}"`);

for (const content of [frenchSpaces(fr), en]) {
  const dir = content.dir || '.';
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, versioned(render(content)));
  console.log(`built ${dir}/index.html`);
}
