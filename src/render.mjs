// Turns a content object (src/content/*.mjs) into a full HTML page.

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const SITE = 'https://axeldenis.me/';

// The one inline script of the page; its hash goes into the content security policy.
const INLINE_JS = "document.documentElement.classList.add('js')";
const sha = (text) => `'sha256-${createHash('sha256').update(text).digest('base64')}'`;
const csp = (css) => [
  "default-src 'self'",
  `script-src 'self' ${sha(INLINE_JS)}`,
  `style-src 'self' ${sha(css)}`,
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ==text== becomes the page's one highlight.
const rich = (s) => esc(s).replace(/==(.+?)==/g, '<mark>$1</mark>');

const STAGE = [
  ['gargouille', 'assets/gargouille.jpg', 1600, 1163, '64% 50%'],
  ['portail', 'assets/cathedrale-portail.jpg', 1200, 1668, '50% 40%'],
  ['tour', 'assets/tour-perret-nuit.jpg', 1200, 1775, '50% 35%'],
  ['veille', 'assets/saint-quentin-nuit.jpg', 1600, 1067, '38% 50%'],
  ['citadelle', 'assets/citadelle-doullens-1660.jpg', 1400, 1547, '50% 45%'],
  ['alicante', 'assets/alicante-nuit.jpg', 1600, 1060, '14% 50%'],
];
const SCENES = Object.fromEntries(STAGE.map(([key, ...rest]) => [key, rest]));

const CREDITS = [
  ['Gargouille facade de nuit', 'Eusebius', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Gargouille_facade_de_nuit.jpg'],
  ['Amiens Cathédrale Nuit 190908 2', 'Vassil', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Amiens_Cath%C3%A9drale_Nuit_190908_2.jpg'],
  ['AmiensTourPerretNuit', 'Mussklprozz', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:AmiensTourPerretNuit.jpg'],
  ['Broadcom BCM54684D1KFBG on a Cisco Catalyst 2960-S network switch', 'Grape.gay', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Broadcom_BCM54684D1KFBG_on_a_Cisco_Catalyst_2960-S_network_switch.jpg'],
  ['ESP32-CAM', 'Nowforever', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:ESP32-CAM.jpg'],
  ['Puerto de Alicante, noche', 'Jesús Alenda', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Puerto_de_Alicante_-_noche.jpg'],
  ['Plan de la citadelle de Doullens, 1660', 'auteur inconnu', 'domaine public', 'https://commons.wikimedia.org/wiki/File:Plan_de_la_citadelle_de_Doullens_1660.jpg'],
  ['Basilique de Saint-Quentin, le chevet la nuit C', 'Renhour48', 'CC0', 'https://commons.wikimedia.org/w/index.php?curid=151361987'],
  ['Cathédrale d’Amiens, façade de nuit', 'Florestan', 'CC BY 3.0', 'https://commons.wikimedia.org/w/index.php?curid=3551089'],
];

// Homelab plan: [x, y, depth] in a 1000 × 640 drawing, listed in tree order
// (the depth indents the plan when it is shown as a list on a phone).
const NODES = {
  internet: [500, 50, 0],
  box: [500, 150, 1],
  switch: [500, 262, 2],
  proxmox: [275, 380, 3],
  opnsense: [275, 482, 4],
  lan: [80, 590, 5],
  labnet: [210, 590, 5],
  dmz: [340, 590, 5],
  admin: [470, 590, 5],
  oldpc: [665, 380, 3],
  pi: [870, 380, 3],
};
const LINKS = [
  ['internet', 'box'], ['box', 'switch'], ['switch', 'proxmox'], ['switch', 'oldpc'], ['switch', 'pi'],
  ['proxmox', 'opnsense'], ['opnsense', 'lan'], ['opnsense', 'labnet'], ['opnsense', 'dmz'], ['opnsense', 'admin'],
];

function labMap(c, { interactive }) {
  const lines = LINKS.map(([a, b]) => {
    const [x1, y1] = NODES[a];
    const [x2, y2] = NODES[b];
    const ym = (y1 + y2) / 2;
    return `<path d="M${x1} ${y1} V${ym} H${x2} V${y2}" />`;
  }).join('');
  const nodes = Object.entries(NODES)
    .map(([id, [x, y, depth]]) => {
      const n = c.lab.nodes[id];
      const style = `left:${x / 10}%;top:${(y / 640) * 100}%;--depth:${depth}`;
      const cls = `node node--${n.status}`;
      return interactive
        ? `<button type="button" class="${cls}" style="${style}" data-node="${id}" aria-pressed="${id === 'switch'}" aria-controls="lab-detail">${esc(n.name).replace(', ', '<br>')}</button>`
        : `<span class="${cls}" style="${style}">${esc(n.name)}</span>`;
    })
    .join('');
  return `<div class="map${interactive ? '' : ' map--still'}" data-ui${interactive ? '' : ' aria-hidden="true"'}>
      <p class="map__zone"><span>${esc(c.lab.zone)}</span></p>
      <svg class="map__wires" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
      ${nodes}
    </div>`;
}

// Photographs are served as AVIF, then WebP, with the JPEG as a fallback.
// `modern: false` keeps a plain JPEG (the compressor demo compares real JPEG files).
// Photographs wider than 800px also exist in an 800px version; `sizes` tells the browser
// how wide the picture is drawn, so a phone does not download the large file.
function img({ src, w, h, alt, pos, lazy = true, cls = '', modern = true, sizes = '100vw' }, base) {
  const tag = `<img${cls ? ` class="${cls}"` : ''} src="${base}${src}" width="${w}" height="${h}" alt="${esc(alt)}"${pos ? ` style="object-position:${pos}"` : ''}${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
  if (!modern) return tag;
  const stem = base + src.replace(/\.jpg$/, '');
  const set = (ext) => (w > 800 ? `srcset="${stem}-800.${ext} 800w, ${stem}.${ext} ${w}w" sizes="${sizes}"` : `srcset="${stem}.${ext}"`);
  return `<picture><source ${set('avif')} type="image/avif"><source ${set('webp')} type="image/webp">${tag}</picture>`;
}

// One picture per project, shown whole: a photograph, a site on two screens, or a before/after slider.
function media(m, base) {
  if (m.kind === 'devices') {
    return `<figure class="shot shot--devices">
      <div class="devices">
        ${img({ ...m.desktop, cls: 'devices__desktop', sizes: '(max-width: 60rem) 86vw, 48vw' }, base)}
        ${img({ ...m.phone, cls: 'devices__phone' }, base)}
      </div>
      <figcaption>${esc(m.caption)}</figcaption>
    </figure>`;
  }
  if (m.kind === 'compare') {
    return `<figure class="shot shot--compare">
      <div class="compare" style="--x: 50%">
        ${img({ src: m.before.src, w: m.w, h: m.h, alt: m.alt, cls: 'compare__before', modern: false }, base)}
        ${img({ src: m.after.src, w: m.w, h: m.h, alt: '', cls: 'compare__after', modern: false }, base)}
        <span class="compare__label compare__label--before">${esc(m.before.label)}</span>
        <span class="compare__label compare__label--after">${esc(m.after.label)}</span>
        <span class="compare__handle" aria-hidden="true"></span>
        <input class="compare__range" type="range" min="0" max="100" value="50" aria-label="${esc(m.range)}">
      </div>
      <figcaption>${esc(m.caption)}</figcaption>
    </figure>`;
  }
  return `<figure class="shot">${img({ ...m, sizes: m.h > m.w ? '(max-width: 60rem) 100vw, 40vw' : '(max-width: 60rem) 100vw, 56vw' }, base)}<figcaption>${esc(m.caption)}</figcaption></figure>`;
}

export function render(c) {
  const base = c.dir ? '../' : '';
  const url = SITE + c.dir;
  const otherUrl = SITE + (c.dir ? '' : 'en/');
  const cv = `${base}assets/Axel_Denis_CV.pdf`;
  const mail = `mailto:${c.contact.email}`;
  const navItems = [
    ['path', c.nav.path],
    ['work', c.nav.work],
    ['lab', c.nav.lab],
    ['skills', c.nav.skills],
    ['contact', c.nav.contact],
  ];

  // The stage crops every picture to a tall frame, so a wide picture is drawn wider than the frame.
  const stageSizes = (w, h) => `(max-width: 60rem) ${Math.round(100 * Math.max(1, (w / h) / 0.75))}vw, ${Math.round(47 * Math.max(1, (w / h) / 0.78))}vw`;
  const css = readFileSync('styles.css', 'utf8').replaceAll("url('assets/", `url('${base}assets/`).trim();

  const stage = STAGE.map(
    ([key, src, w, h, pos], i) =>
      `<figure class="stage__frame${i === 0 ? ' is-active' : ''}" data-scene="${key}" data-caption="${esc(c.stage[key])}">
        ${img({ src, w, h, alt: c.stage[key], pos, lazy: i !== 0, sizes: stageSizes(w, h) }, base)}
      </figure>`
  ).join('');

  const chapters = c.path.chapters
    .map(
      (ch) => `<div class="chapter" data-scene-trigger="${ch.scene}">
          ${
            ch.scene === 'gargouille'
              ? ''
              : `<figure class="chapter__photo">${img({ src: SCENES[ch.scene][0], w: SCENES[ch.scene][1], h: SCENES[ch.scene][2], alt: c.stage[ch.scene], pos: SCENES[ch.scene][3] }, base)}</figure>`
          }
          <h3 class="chapter__title">${esc(ch.title)}</h3>
          <p class="chapter__text">${esc(ch.text)}</p>
          <ul class="rows">${ch.rows
            .map(([name, value]) => `<li><span class="rows__name">${esc(name)}</span><span class="rows__value">${esc(value)}</span></li>`)
            .join('')}</ul>
        </div>`
    )
    .join('');

  const projects = c.work.projects
    .map(
      (p) => `<article class="project project--${p.media.kind}${p.media.kind === 'compare' || p.media.h > p.media.w ? ' project--tall' : ''}" id="project-${p.id}" aria-labelledby="t-${p.id}">
        <div class="project__media">${media(p.media, base)}</div>
        <div class="project__text">
          <h3 class="project__title" id="t-${p.id}">${esc(p.title)}</h3>
          <p class="project__discipline">${esc(p.discipline)}</p>
          ${p.blocks.map(([h, t]) => `<h4>${esc(h)}</h4><p>${esc(t)}</p>`).join('')}
          <p class="project__stack">${esc(p.stack)}</p>
          ${p.link ? `<a class="link" href="${p.link.href}" rel="noopener">${esc(p.link.label)}</a>` : ''}
        </div>
      </article>`
    )
    .join('');

  const firstNode = c.lab.nodes.switch;
  const nodeData = JSON.stringify(c.lab.nodes).replace(/</g, '\\u003c');

  const skills = c.skills.groups
    .map(
      (g) => `<div class="menu__group">
        <h3>${esc(g.name)}</h3>
        <ul>${g.items
          .map(
            ([name, level, desc]) => `<li class="menu__item">
              <span class="menu__line"><span class="menu__name">${esc(name)}</span><span class="menu__dots" aria-hidden="true"></span><span class="menu__value menu__value--${level}">${esc(c.skills.legend[level])}</span></span>
              ${desc ? `<span class="menu__desc">${esc(desc)}</span>` : ''}
            </li>`
          )
          .join('')}</ul>
      </div>`
    )
    .join('');

  const proof = c.proof.kinds
    .map(
      (k) => `<ul class="names__col">
        <li class="names__kind">${esc(k.name)}</li>
        ${k.items.map(([t, href]) => `<li>${href ? `<a href="${href}" rel="noopener">${esc(t)}</a>` : esc(t)}</li>`).join('')}
      </ul>`
    )
    .join('');

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.meta.title)}</title>
<meta name="description" content="${esc(c.meta.description)}">
<meta name="theme-color" content="#0c0a08">
<meta http-equiv="Content-Security-Policy" content="${csp(css)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${c.lang}" href="${url}">
<link rel="alternate" hreflang="${c.lang === 'fr' ? 'en' : 'fr'}" href="${otherUrl}">
<link rel="alternate" hreflang="x-default" href="${SITE}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(c.meta.title)}">
<meta property="og:description" content="${esc(c.meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:image" content="${SITE}assets/share-${c.lang}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
<link rel="preload" href="${base}assets/fonts/albert-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/imbue.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
<script>${INLINE_JS}</script>
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: c.hero.name,
  url: SITE,
  jobTitle: c.about.role,
  description: c.meta.description,
  email: mail,
  address: { '@type': 'PostalAddress', addressLocality: 'Amiens', addressCountry: 'FR' },
  alumniOf: 'École d’Ingénieurs Jules Verne',
  knowsLanguage: ['fr', 'en', 'es'],
  sameAs: [c.contact.linkedin.href, 'https://github.com/Audrax42', 'https://tryhackme.com/p/axel802401'],
}).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">${esc(c.nav.skip)}</a>

<header class="bar">
  <a class="bar__mark" href="#top">${esc(c.hero.name)}</a>
  <button class="bar__toggle" type="button" aria-expanded="false" aria-controls="nav">${esc(c.nav.menu)}</button>
  <nav class="bar__nav" id="nav" aria-label="${esc(c.nav.menu)}">
    <ul>
      ${navItems.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}
      <li><a href="${c.switchHref}" hreflang="${c.lang === 'fr' ? 'en' : 'fr'}" lang="${c.lang === 'fr' ? 'en' : 'fr'}" aria-label="${esc(c.switchLabel)}">${esc(c.switchShort)}</a></li>
      <li><a class="bar__action" href="${cv}" download>${esc(c.nav.cv)}</a></li>
    </ul>
  </nav>
</header>

<main id="main">
<div class="split" id="top">
  <div class="stage" aria-hidden="false">
    <div class="stage__inner">${stage}</div>
    <p class="stage__caption" aria-live="off">${esc(c.stage.gargouille)}</p>
  </div>

  <div class="col">
    <section class="hero" data-scene-trigger="gargouille" aria-labelledby="name">
      <h1 class="wordmark" id="name">${esc(c.hero.name)}</h1>
      <div class="hero__text">
        <p class="hero__lead">${esc(c.hero.lead)}</p>
        <p class="hero__intro">${esc(c.hero.intro)}</p>
        <dl class="hero__facts">
          ${c.hero.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
        </dl>
        <p class="hero__actions">
          <a class="button" href="${cv}" download>${esc(c.hero.cta)}</a>
          <a class="link" href="#contact">${esc(c.hero.secondary)}</a>
        </p>
      </div>
    </section>

    <section class="about" id="about" data-scene-trigger="portail" aria-labelledby="about-title">
      <h2 id="about-title" class="section-title about__title">${esc(c.about.title)}</h2>
      ${c.about.paragraphs.map((p) => `<p>${rich(p)}</p>`).join('')}
      <p class="about__sign">${esc(c.about.sign)}<span>${esc(c.about.role)}</span></p>
    </section>

    <section class="path" id="path" aria-labelledby="path-title">
      <h2 id="path-title" class="section-title">${esc(c.path.title)}</h2>
      ${chapters}
    </section>
  </div>
</div>

<section class="work" id="work" aria-labelledby="work-title">
  <h2 id="work-title" class="section-title work__title">${esc(c.work.title)}</h2>
  ${projects}
</section>

<section class="lab" id="lab" aria-labelledby="lab-title">
  <div class="lab__head">
    <h2 id="lab-title" class="section-title">${esc(c.lab.title)}</h2>
    <p>${esc(c.lab.intro)}</p>
  </div>
  <div class="lab__body">
    ${labMap(c, { interactive: true })}
    <div class="lab__detail" id="lab-detail" aria-live="polite">
      <h3 data-field="name">${esc(firstNode.name)}</h3>
      <p class="lab__status lab__status--${firstNode.status}" data-field="status">${esc(c.lab.status[firstNode.status])}</p>
      <p class="lab__role" data-field="role">${esc(firstNode.role)}</p>
      <p class="lab__hosts-title">${esc(c.lab.hosts)}</p>
      <ul class="lab__hosts" data-field="services">${firstNode.services.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
    <div class="lab__roadmap">
      <h3>${esc(c.lab.roadmapTitle)}</h3>
      <ol>${c.lab.roadmap.map((r, i) => `<li class="${i === 0 ? 'is-done' : i === 1 ? 'is-next' : ''}">${esc(r)}</li>`).join('')}</ol>
      <p class="lab__note">${esc(c.lab.note)}</p>
    </div>
  </div>
  <script type="application/json" id="lab-data">${JSON.stringify({ nodes: JSON.parse(nodeData), status: c.lab.status })}</script>
</section>

<section class="skills" id="skills" aria-labelledby="skills-title">
  <div class="menu">
    <h2 id="skills-title" class="section-title menu__title">${esc(c.skills.title)}</h2>
    <div class="menu__groups">${skills}</div>
  </div>
</section>

<section class="names" id="proof" aria-labelledby="proof-title">
  <h2 id="proof-title" class="section-title">${esc(c.proof.title)}</h2>
  <div class="names__cols">${proof}</div>
</section>

<section class="contact" id="contact" aria-labelledby="contact-title">
  <h2 id="contact-title" class="visually-hidden">${esc(c.contact.title)}</h2>
  <p class="contact__sentence">${esc(c.contact.sentence)}</p>
  <div class="contact__links">
    <p class="contact__question">${esc(c.contact.question)}</p>
    <a href="${mail}">${esc(c.contact.email)}</a>
    <a href="${c.contact.linkedin.href}" rel="noopener">${esc(c.contact.linkedin.label)}</a>
  </div>
  <p class="contact__place">${esc(c.contact.place)}</p>
</section>
</main>

<footer class="foot">
  <figure class="foot__photo">${img({ src: 'assets/cathedrale-facade.jpg', w: 1600, h: 1190, alt: c.stage.facade, pos: '50% 40%', sizes: '(max-width: 60rem) 150vw, 85vw' }, base)}</figure>
  <div class="foot__side">
    <p class="foot__mark">${esc(c.hero.name)}</p>
    <ul class="foot__menu">
      ${navItems.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}
      <li><a href="${cv}" download>${esc(c.nav.cv)}</a></li>
    </ul>
    <div class="foot__blocks">
      <div><p class="foot__label">${esc(c.footer.contact)}</p><a href="${mail}">${esc(c.contact.email)}</a></div>
      <div><p class="foot__label">${esc(c.footer.social)}</p><a href="${c.contact.linkedin.href}" rel="noopener">LinkedIn</a><a href="https://github.com/Audrax42" rel="noopener">${esc(c.footer.github)}</a><a href="${c.switchHref}" lang="${c.lang === 'fr' ? 'en' : 'fr'}">${esc(c.switchLabel)}</a></div>
    </div>
    <p class="foot__credits">${esc(c.footer.credits)}, ${esc(c.footer.creditsIntro)} ${CREDITS.map(
      ([t, by, lic, href]) => `<a href="${href}" rel="noopener">${esc(t)}</a> (${esc(by)}, ${lic})`
    ).join(', ')}.</p>
    <p class="foot__legal">${esc(c.footer.legal)}</p>
  </div>
</footer>

<script src="${base}main.js" defer></script>
</body>
</html>
`;
}
