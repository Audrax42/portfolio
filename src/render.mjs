// Turns a content object (src/content/*.mjs) into a full HTML page.

const SITE = 'https://audrax42.github.io/portfolio/';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ==text== becomes the page's one highlight.
const rich = (s) => esc(s).replace(/==(.+?)==/g, '<mark>$1</mark>');

const STAGE = [
  ['gargouille', 'assets/gargouille.jpg', 1600, 1163, '64% 50%'],
  ['portail', 'assets/cathedrale-portail.jpg', 1200, 1668, '50% 40%'],
  ['tour', 'assets/tour-jules-verne.jpg', 1200, 1600, '50% 30%'],
  ['cisco', 'assets/cisco-2960.jpg', 1600, 1200, '30% 50%'],
  ['alicante', 'assets/alicante.jpg', 1600, 890, '8% 50%'],
];

const CREDITS = [
  ['Gargouille facade de nuit', 'Eusebius', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Gargouille_facade_de_nuit.jpg'],
  ['Amiens Cathédrale Nuit 190908 2', 'Vassil', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Amiens_Cath%C3%A9drale_Nuit_190908_2.jpg'],
  ['Amiens, tour de la maison de Jules Verne', 'Pierre André', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Amiens.-_Tour_de_la_maison_de_jules_Verne.jpg'],
  ['Broadcom BCM54684D1KFBG on a Cisco Catalyst 2960-S network switch', 'Grape.gay', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Broadcom_BCM54684D1KFBG_on_a_Cisco_Catalyst_2960-S_network_switch.jpg'],
  ['ESP32-CAM', 'Nowforever', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:ESP32-CAM.jpg'],
  ['Vista de Alicante, España, 2014-07-04, DD 49', 'Diego Delso', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Vista_de_Alicante,_Espa%C3%B1a,_2014-07-04,_DD_49.JPG'],
];

// Homelab plan: positions in a 1000 × 640 drawing.
const NODES = {
  internet: [500, 50],
  box: [500, 150],
  switch: [500, 262],
  proxmox: [290, 380],
  oldpc: [660, 380],
  pi: [885, 380],
  opnsense: [290, 482],
  lan: [75, 590],
  labnet: [218, 590],
  dmz: [361, 590],
  admin: [510, 590],
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
    .map(([id, [x, y]]) => {
      const n = c.lab.nodes[id];
      const style = `left:${x / 10}%;top:${(y / 640) * 100}%`;
      const cls = `node node--${n.status}`;
      return interactive
        ? `<button type="button" class="${cls}" style="${style}" data-node="${id}" aria-pressed="${id === 'switch'}" aria-controls="lab-detail">${esc(n.name)}</button>`
        : `<span class="${cls}" style="${style}">${esc(n.name)}</span>`;
    })
    .join('');
  return `<div class="map${interactive ? '' : ' map--still'}" data-ui${interactive ? '' : ' aria-hidden="true"'}>
      <svg class="map__wires" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
      ${nodes}
    </div>`;
}

function img({ src, w, h, alt, pos, lazy = true, cls = '' }, base) {
  return `<img${cls ? ` class="${cls}"` : ''} src="${base}${src}" width="${w}" height="${h}" alt="${esc(alt)}"${pos ? ` style="object-position:${pos}"` : ''}${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

function pane(p, side, base) {
  return `<figure class="pane pane--${side}${p.fit === 'contain' ? ' pane--contain' : ''}">${img({ ...p }, base)}<figcaption>${esc(p.label)}</figcaption></figure>`;
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

  const stage = STAGE.map(
    ([key, src, w, h, pos], i) =>
      `<figure class="stage__frame${i === 0 ? ' is-active' : ''}" data-scene="${key}" data-caption="${esc(c.stage[key])}">
        ${img({ src, w, h, alt: c.stage[key], pos, lazy: i !== 0 }, base)}
      </figure>`
  ).join('');

  const chapters = c.path.chapters
    .map(
      (ch) => `<div class="chapter" data-scene-trigger="${ch.scene}">
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
      (p) => `<article class="project" id="project-${p.id}" aria-labelledby="t-${p.id}">
        <div class="project__track">
          <div class="project__stage">
            ${pane(p.left, 'left', base)}
            ${pane(p.right, 'right', base)}
            <div class="project__head">
              <h3 class="plate" id="t-${p.id}">${esc(p.title)}</h3>
            </div>
            <p class="project__discipline">${esc(p.discipline)}</p>
          </div>
        </div>
        <div class="project__body">
          ${p.blocks.map(([h, t]) => `<div class="project__block"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
          <div class="project__block project__block--meta">
            <p class="project__stack">${esc(p.stack)}</p>
            ${p.demoNote ? `<p class="project__note">${esc(p.demoNote)}</p>` : ''}
            ${p.link ? `<a class="link" href="${p.link.href}" rel="noopener">${esc(p.link.label)}</a>` : ''}
          </div>
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
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${c.lang}" href="${url}">
<link rel="alternate" hreflang="${c.lang === 'fr' ? 'en' : 'fr'}" href="${otherUrl}">
<link rel="alternate" hreflang="x-default" href="${SITE}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(c.meta.title)}">
<meta property="og:description" content="${esc(c.meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:image" content="${SITE}assets/gargouille.jpg">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400;0,500;1,400&family=Imbue:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}styles.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">${esc(c.nav.skip)}</a>

<header class="bar">
  <a class="bar__mark" href="#top">${esc(c.hero.name)}</a>
  <nav class="bar__nav" aria-label="${esc(c.nav.menu)}">
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
    ${skills}
  </div>
</section>

<section class="names" id="proof" aria-labelledby="proof-title">
  <h2 id="proof-title" class="section-title">${esc(c.proof.title)}</h2>
  <div class="names__cols">${proof}</div>
</section>

<section class="contact" id="contact" aria-labelledby="contact-title">
  <h2 id="contact-title" class="visually-hidden">${esc(c.contact.title)}</h2>
  <p class="contact__sentence">${esc(c.contact.sentence)}</p>
  <figure class="contact__photo">${img({ src: 'assets/cathedrale-portail.jpg', w: 1200, h: 1668, alt: c.stage.portail, pos: '50% 62%' }, base)}</figure>
  <div class="contact__links">
    <p class="contact__question">${esc(c.contact.question)}</p>
    <a href="${mail}">${esc(c.contact.email)}</a>
    <a href="${c.contact.linkedin.href}" rel="noopener">${esc(c.contact.linkedin.label)}</a>
  </div>
  <p class="contact__place">${esc(c.contact.place)}</p>
</section>
</main>

<footer class="foot">
  <figure class="foot__photo">${img({ src: 'assets/gargouille.jpg', w: 1600, h: 1163, alt: c.contact.photoAlt, pos: '74% 58%' }, base)}</figure>
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
