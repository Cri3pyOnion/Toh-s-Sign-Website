// Phone menu toggle. Without this script the links show inline.
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
}

// ---------- Motion ----------
// Everything below only adds movement; the page reads the same without it.
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Sticky masthead: hides while scrolling down, returns on scroll up; a hairline tracks progress.
const mast = document.querySelector('.mast');
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
  lastY = y;
  ticking = false;
};
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

if (motionOK && 'IntersectionObserver' in window) {
  // Scroll reveals, staggered within each group.
  const groups = [
    ['#services .sec-head'], ['.license'],
    ['#why .sec-head'], ['.why-item'], ['#why .sec-cta'],
    ['.clients .sec-head'], ['.client-group'],
    ['#about .sec-head'], ['.about-text', '.about-facts > div'],
    ['#team .sec-head'], ['.group-co'], ['.person'],
    ['#contact .sec-head'], ['.contact-info', '.office'],
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
  const figs = [...document.querySelectorAll('.figure dd')];
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
      const dur = 1400;
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
  }), { threshold: 0.4 });
  figs.forEach((dd) => countIO.observe(dd));
}
