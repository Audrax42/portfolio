// Generates index.html (French) and en/index.html (English) from src/.
// Usage: node build.mjs

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { render, SITE } from './src/render.mjs';
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

// The small files around the pages: sitemap, robots, security contact and the "not found" page.
const today = new Date().toISOString().slice(0, 10);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['', 'en/'].map((p) => `  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}en/"/>
  </url>`).join('\n')}
</urlset>
`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

// RFC 9116. Renew the expiry date once a year.
mkdirSync('.well-known', { recursive: true });
writeFileSync('.well-known/security.txt', `Contact: mailto:${fr.contact.email}
Expires: 2027-11-01T00:00:00.000Z
Preferred-Languages: fr, en
Canonical: ${SITE}.well-known/security.txt
`);

writeFileSync('404.html', versioned(`<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page introuvable, Axel Denis</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#0c0a08">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<main class="lost">
  <h1 class="section-title">Page introuvable</h1>
  <p>Cette adresse ne mène nulle part. Le portfolio, lui, est bien gardé.</p>
  <p lang="en">This address leads nowhere. The portfolio itself is well guarded.</p>
  <p><a class="button" href="/">Retour à l’accueil</a> <a class="link" href="/en/" lang="en">Back to the home page</a></p>
</main>
</body>
</html>
`));
console.log('built sitemap.xml, robots.txt, .well-known/security.txt, 404.html');
