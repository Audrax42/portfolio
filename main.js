// Behaviour for the portfolio: stage crossfade, top bar, scaling wordmark, the compressor demo,
// the homelab plan, and list entrances. Every part degrades to a readable static page.

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = window.matchMedia('(min-width: 60.0625rem)');

  // The fixed half changes picture as each part of the story reaches the middle of the screen.
  const frames = new Map([...document.querySelectorAll('.stage__frame')].map((f) => [f.dataset.scene, f]));
  const caption = document.querySelector('.stage__caption');
  const showScene = (key) => {
    if (!frames.has(key)) return;
    frames.forEach((f, k) => f.classList.toggle('is-active', k === key));
    if (caption) caption.textContent = frames.get(key).dataset.caption;
  };
  const sceneObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && showScene(e.target.dataset.sceneTrigger)),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  document.querySelectorAll('[data-scene-trigger]').forEach((el) => sceneObserver.observe(el));

  // Scroll-linked motion: the wordmark settles as the first screen leaves.
  const wordmark = document.querySelector('.wordmark');
  const bar = document.querySelector('.bar');
  const toggle = document.querySelector('.bar__toggle');
  let ticking = false;
  let lastY = window.scrollY;

  const update = () => {
    ticking = false;
    // The bar steps aside while reading down and returns as soon as the page moves up.
    const y = window.scrollY;
    if (bar) {
      bar.classList.toggle('is-scrolled', y > 40);
      if (!bar.classList.contains('is-open') && Math.abs(y - lastY) > 6) bar.classList.toggle('is-hidden', y > lastY && y > 200);
    }
    lastY = y;
    if (wordmark && wide.matches && !reduce) {
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      wordmark.style.scale = String(1 - 0.07 * p);
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // The phone menu opens under the bar and closes once a link is chosen.
  if (bar && toggle) {
    const setOpen = (open) => {
      bar.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!bar.classList.contains('is-open')));
    bar.querySelectorAll('.bar__nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  }

  // The compressor demo: drag to compare the original with the compressed photo.
  document.querySelectorAll('.compare').forEach((box) => {
    const range = box.querySelector('.compare__range');
    range.addEventListener('input', () => box.style.setProperty('--x', `${range.value}%`));
  });

  // The homelab plan: choose a piece, read its role, services and status.
  const data = JSON.parse(document.getElementById('lab-data')?.textContent || 'null');
  const detail = document.getElementById('lab-detail');
  if (data && detail) {
    const field = (name) => detail.querySelector(`[data-field="${name}"]`);
    const buttons = document.querySelectorAll('.lab button.node');
    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        const n = data.nodes[btn.dataset.node];
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        const status = field('status');
        status.textContent = data.status[n.status];
        status.className = `lab__status lab__status--${n.status}`;
        field('name').textContent = n.name;
        field('role').textContent = n.role;
        const list = field('services');
        list.replaceChildren(...n.services.map((s) => Object.assign(document.createElement('li'), { textContent: s })));
        if (!reduce) {
          detail.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], {
            duration: 420,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          });
        }
      })
    );
  }

  // Entrances: list rows arrive in reading order, once. Nothing is hidden up front:
  // the animation starts just before an element scrolls into view and fills backwards from there.
  if (!reduce && 'IntersectionObserver' in window && Element.prototype.animate) {
    // Only lists arrive row by row; paragraphs and pictures stay put.
    const groups = [
      '.chapter .rows li',
      '.lab__body > .map .node, .lab__roadmap li',
      '.menu__item',
      '.names__cols li',
      '.foot__menu li',
    ];
    const items = [];
    groups.forEach((sel) => {
      let i = 0;
      let parent = null;
      document.querySelectorAll(sel).forEach((el) => {
        const p = el.closest('section, .chapter, .project, footer, .menu__group');
        if (p !== parent) {
          parent = p;
          i = 0;
        }
        el.dataset.i = Math.min(i++, 6);
        items.push(el);
      });
    });
    const below = (el) => el.getBoundingClientRect().top > window.innerHeight;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          e.target.animate(
            [{ opacity: 0.2, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }],
            { duration: 700, delay: e.target.dataset.i * 60, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
          );
        }),
      { rootMargin: '0px 0px 25% 0px' }
    );
    // Only what still lies below the first screen gets an entrance.
    items.filter(below).forEach((el) => io.observe(el));
  }
})();
