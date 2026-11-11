// Strings from the language switch (i18n.js); falls back to English if it did not load.
const t = (key, fallback) => (window.i18n ? window.i18n.t(key) : '') || fallback;
const isZh = () => window.i18n?.lang === 'zh';

// Phone menu toggle. Without this script the links show inline.
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
  const label = () => { toggle.textContent = toggle.getAttribute('aria-expanded') === 'true' ? t('menu.close', 'Close') : t('menu.open', 'Menu'); };
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    label();
  };
  label();
  document.addEventListener('langchange', label);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
}

// Licence finder: marks the licences a business type is likely to need and
// pre-fills the WhatsApp message with them. Without JS the full list still shows.
const finder = document.querySelector('[data-finder]');
if (finder) {
  finder.hidden = false;
  const chips = [...finder.querySelectorAll('.chip')];
  const answer = finder.querySelector('[data-finder-answer]');
  const cta = finder.querySelector('[data-finder-cta]');
  const rows = [...document.querySelectorAll('[data-licence]')];
  const nameOf = (key) => rows.find((r) => r.dataset.licence === key)?.querySelector('.licence-name')?.textContent.trim();
  const wa = 'https://wa.me/60164397178?text=';

  const render = () => {
    const chip = chips.find((c) => c.getAttribute('aria-pressed') === 'true');
    const needs = chip ? chip.dataset.need.split(' ') : [];
    rows.forEach((r) => r.classList.toggle('is-match', needs.includes(r.dataset.licence)));
    rows[0]?.parentElement.classList.toggle('has-filter', Boolean(chip));

    if (!chip) {
      answer.textContent = t('finder.prompt', 'Select a business type to see the licences typically required.');
      cta.href = wa + encodeURIComponent(t('wa.which', 'Hi Toh’s Sign, I’d like to ask which licences I need.'));
      return;
    }
    const names = needs.map(nameOf).filter(Boolean);
    const what = chip.textContent.trim();
    const strong = document.createElement('strong');

    if (isZh()) {
      const list = names.length > 1 ? names.slice(0, -1).join('、') + '及' + names.at(-1) : names[0];
      strong.textContent = list;
      answer.replaceChildren(`${what}通常需要：`, strong, '。我们会在免费咨询中为您确认具体要求。');
      cta.href = wa + encodeURIComponent(`您好 Toh’s Sign，我的项目是${what}，想咨询${list}的申请。`);
      return;
    }
    const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names.at(-1) : names[0];
    const lower = what.toLowerCase();
    const a = /^[aeiou]/.test(lower) ? 'an' : 'a';
    strong.textContent = list;
    answer.replaceChildren(`Typically required for ${a} ${lower}: `, strong, '. We confirm the exact requirements during a free consultation.');
    cta.href = wa + encodeURIComponent(`Hi Toh’s Sign, I’m planning ${a} ${lower}. Can you help with the ${list.toLowerCase()}?`);
  };

  chips.forEach((chip) => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', String(on));
    render();
  }));
  render();
  document.addEventListener('langchange', render);
}

// ---------- Motion ----------
// Everything below only adds movement; the page reads the same without it.
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Sticky masthead: hides while scrolling down, returns on scroll up; a hairline tracks progress.
const mast = document.querySelector('.mast');
const heroImg = document.querySelector('.hero-field > img');
let lastY = window.scrollY;
let ticking = false;
const onScroll = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (mast) {
    mast.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
    const menuOpen = toggle?.getAttribute('aria-expanded') === 'true';
    mast.classList.toggle('is-hidden', motionOK && !menuOpen && y > lastY && y > 160);
  }
  // Parallax: the city drifts slower than the page, capped inside the image's zoom margin.
  if (motionOK && heroImg) {
    const h = heroImg.parentElement.offsetHeight;
    if (y < h * 1.5) heroImg.style.translate = `0 ${Math.min(y * 0.3, h * 0.06).toFixed(1)}px`;
  }
  lastY = y;
  ticking = false;
};
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// Line illustrations: each outline traces in as its drawing enters the screen, the fills follow,
// then the small loops start. Without IntersectionObserver or under reduced motion they show finished.
const arts = [...document.querySelectorAll('svg.art')];
if (motionOK && 'IntersectionObserver' in window && arts.length) {
  arts.forEach((svg) => {
    svg.querySelectorAll('.s').forEach((el, i) => {
      el.setAttribute('pathLength', '1');
      el.style.setProperty('--d', `${Math.min(i * 70, 1400)}ms`);
    });
  });
  document.documentElement.classList.add('art-armed');
  const artIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const svg = e.target;
    svg.classList.add('is-drawn');
    const n = svg.querySelectorAll('.s').length;
    setTimeout(() => svg.classList.add('is-live'), Math.min(n * 70, 1400) + 1500);
    artIO.unobserve(svg);
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.25 });
  arts.forEach((svg) => artIO.observe(svg));
}

if (motionOK && 'IntersectionObserver' in window) {
  // Scroll reveals, staggered within each group.
  const groups = [
    ['.index-head', '.finder:not([hidden])'], ['.licence'],
    ['.figures h2'], ['.figure-item'],
    ['.why-head'], ['.why-item'], ['.why-cta'],
    ['.clients h2'], ['.logos li'],
    ['.about-text'], ['.about-facts > div'],
    ['.contact-main', '.contact-side'], ['.foot-logo'],
  ];
  const targets = [];
  groups.forEach((sels) => {
    document.querySelectorAll(sels.join(',')).forEach((el, i) => {
      el.dataset.reveal = '';
      el.style.setProperty('--i', Math.min(i, 8));
      targets.push(el);
    });
  });
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  // Anything already on screen at load shows at once, with no flash.
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
    io.observe(el);
  });
  document.documentElement.classList.add('reveal-on');

  // Figures count up once from zero; screen readers get the final value only.
  const figs = [...document.querySelectorAll('.figure-item dd')];
  figs.forEach((dd) => {
    const m = dd.textContent.trim().match(/^([\d,]+)(.*)$/);
    if (!m) return;
    const end = Number(m[1].replace(/,/g, ''));
    const suffix = m[2];
    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    shown.textContent = '0' + suffix;
    const real = document.createElement('span');
    real.className = 'visually-hidden';
    real.textContent = m[0];
    dd.replaceChildren(shown, real);
    dd._count = () => {
      const t0 = performance.now();
      const dur = 1800;
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(2, -10 * p);
        shown.textContent = Math.round(end * (p === 1 ? 1 : eased)).toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
  });
  const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target._count?.(); countIO.unobserve(e.target); }
  }), { threshold: 0.6 });
  figs.forEach((dd) => countIO.observe(dd));
}
