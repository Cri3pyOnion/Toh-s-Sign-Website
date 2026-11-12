// Strings from the language switch (i18n.js); falls back to English if it did not load.
const t = (key, fallback) => (window.i18n ? window.i18n.t(key) : '') || fallback;
const isZh = () => window.i18n?.lang === 'zh';

// Hero headline: the big word rises in letter by letter (re-split whenever the language changes).
const splitLetters = () => {
  document.querySelectorAll('[data-letters]').forEach((el) => {
    const text = el.textContent;
    const vis = document.createElement('span');
    vis.className = 'visually-hidden';
    vis.textContent = text;
    const shown = document.createElement('span');
    shown.className = 'letters';
    shown.setAttribute('aria-hidden', 'true');
    [...text].forEach((c, i) => {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', i);
      ch.textContent = c === ' ' ? '\u00a0' : c;
      shown.append(ch);
    });
    el.replaceChildren(vis, shown);
  });
};
splitLetters();
document.addEventListener('langchange', splitLetters);

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

// License finder: marks the licenses a business type is likely to need and
// pre-fills the WhatsApp message with them. Without JS the full list still shows.
const finder = document.querySelector('[data-finder]');
if (finder) {
  finder.hidden = false;
  const chips = [...finder.querySelectorAll('.chip')];
  const answer = finder.querySelector('[data-finder-answer]');
  const cta = finder.querySelector('[data-finder-cta]');
  const rows = [...document.querySelectorAll('[data-license]')];
  const nameOf = (key) => rows.find((r) => r.dataset.license === key)?.querySelector('.license-name')?.textContent.trim();
  const wa = 'https://wa.me/60164397178?text=';

  const render = () => {
    const chip = chips.find((c) => c.getAttribute('aria-pressed') === 'true');
    const needs = chip ? chip.dataset.need.split(' ') : [];
    rows.forEach((r) => r.classList.toggle('is-match', needs.includes(r.dataset.license)));
    rows[0]?.parentElement.classList.toggle('has-filter', Boolean(chip));

    if (!chip) {
      answer.textContent = t('finder.prompt', 'Select a business type to see the licenses typically required.');
      cta.href = wa + encodeURIComponent(t('wa.which', 'Hi Toh’s Sign, I’d like to ask which licenses I need.'));
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

// Hero "Start here" links: jump to the finder with that business type already chosen.
document.querySelectorAll('[data-path]').forEach((link) => link.addEventListener('click', () => {
  const chip = document.querySelector(`.chip[data-i18n="chip.${link.dataset.path}"]`);
  if (chip && chip.getAttribute('aria-pressed') !== 'true') chip.click();
}));



// Dropdown menus: one open at a time; Escape or a click elsewhere closes them.
const subs = [...document.querySelectorAll('.sub-toggle')];
const closeSubs = (except) => subs.forEach((b) => { if (b !== except) { b.setAttribute('aria-expanded', 'false'); b.parentElement.classList.remove('is-open'); } });
subs.forEach((b) => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') !== 'true';
  closeSubs(b);
  b.setAttribute('aria-expanded', String(open));
  b.parentElement.classList.toggle('is-open', open);
}));
document.addEventListener('click', (e) => { if (!e.target.closest('.has-sub')) closeSubs(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = subs.find((b) => b.getAttribute('aria-expanded') === 'true');
  if (open) { closeSubs(); open.focus(); }
});
document.querySelectorAll('.submenu a').forEach((a) => a.addEventListener('click', () => closeSubs()));

// Enquiry form: WhatsApp opens with the message written out; email opens the mail app.
const inquiry = document.querySelector('[data-inquiry]');
if (inquiry) {
  const compose = () => {
    const f = new FormData(inquiry);
    const sel = inquiry.querySelector('[name="service"]');
    const lines = [
      t('form.hello', 'Hi Toh’s Sign, I’d like to make an enquiry.'),
      `${t('form.name', 'Your name')}: ${f.get('name')}`,
      f.get('company') && `${t('form.company', 'Company (optional)').replace(/\s*[（(].*$/, '')}: ${f.get('company')}`,
      `${t('form.phone', 'Phone')}: ${f.get('phone')}`,
      f.get('email') && `${t('form.email', 'Email (optional)').replace(/\s*[（(].*$/, '')}: ${f.get('email')}`,
      `${t('form.service', 'What do you need help with?')} ${sel.options[sel.selectedIndex].textContent.trim()}`,
    ];
    return [...lines.filter(Boolean), '', f.get('message')].join('\n');
  };
  inquiry.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open('https://wa.me/60164397178?text=' + encodeURIComponent(compose()), '_blank', 'noopener');
  });
  inquiry.querySelector('[data-inquiry-email]').addEventListener('click', () => {
    if (!inquiry.reportValidity()) return;
    const subject = t('form.subject', 'Enquiry from the website');
    location.href = `mailto:info@tohssign.my?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose())}`;
  });
}

// Renewal reminder: from an expiry date, suggests when to start (two months ahead)
// and builds a calendar file with both dates.
const renewal = document.querySelector('[data-renewal]');
if (renewal) {
  const form = renewal.querySelector('[data-renewal-form]');
  const out = renewal.querySelector('[data-renewal-result]');
  const answer = renewal.querySelector('[data-renewal-answer]');
  const ics = renewal.querySelector('[data-renewal-ics]');
  const gcal = renewal.querySelector('[data-renewal-gcal]');
  const wa = renewal.querySelector('[data-renewal-wa]');
  const empty = renewal.querySelector('[data-renewal-empty]');
  const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const nice = (d) => d.toLocaleDateString(isZh() ? 'zh-CN' : 'en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  let last = null;
  const render = () => {
    if (!last) return;
    const { lic, expiry } = last;
    const start = new Date(expiry); start.setMonth(start.getMonth() - 2);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Math.round((expiry - today) / 864e5);
    const name = renewal.querySelector(`option[value="${lic}"]`).textContent.trim();
    const strong = document.createElement('strong');
    if (days < 0) {
      strong.textContent = nice(expiry);
      answer.replaceChildren(t('renew.past', 'This license expired on '), strong, t('renew.pastEnd', '. Contact us and we’ll help you renew it.'));
    } else if (start <= today) {
      strong.textContent = t('renew.now', 'start now');
      answer.replaceChildren(t('renew.soon', 'It expires on ') + nice(expiry) + t('renew.soonMid', ', so '), strong, t('renew.soonEnd', '.'));
    } else {
      strong.textContent = nice(start);
      answer.replaceChildren(t('renew.start', 'Start the renewal by '), strong, t('renew.startMid', ', two months before it expires on ') + nice(expiry) + t('renew.startEnd', '.'));
    }
    const startEv = start > today ? start : today;
    const sTitle = t('renew.evStart', 'Start license renewal: ') + name;
    const eTitle = t('renew.evExpiry', 'License expires: ') + name;
    const note = t('renew.evNote', 'Toh’s Sign can handle the renewal: 016-439 7178 (WhatsApp)');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const ev = (uid, d, title, alarm) => ['BEGIN:VEVENT', `UID:${uid}-${ymd(d)}@tohssign.my`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(d)}`, `DTEND;VALUE=DATE:${ymd(addDays(d, 1))}`, `SUMMARY:${title}`, `DESCRIPTION:${note}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${title}`, `TRIGGER:${alarm}`, 'END:VALARM', 'END:VEVENT'];
    const cal = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Toh’s Sign//Renewal reminder//EN', 'CALSCALE:GREGORIAN',
      ...ev('start', startEv, sTitle, 'PT9H'), ...ev('expiry', expiry, eTitle, '-P14D'), 'END:VCALENDAR'].join('\r\n');
    ics.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(cal);
    gcal.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(sTitle)
      + `&dates=${ymd(startEv)}/${ymd(addDays(startEv, 1))}&details=` + encodeURIComponent(note);
    wa.href = 'https://wa.me/60164397178?text=' + encodeURIComponent(t('renew.waMsg', 'Hi Toh’s Sign, please help me renew my ') + name + t('renew.waMid', '. It expires on ') + nice(expiry) + '.');
    out.hidden = false;
    if (empty) empty.hidden = true;
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = form.expiry.value;
    if (!v) return;
    const [y, mo, d] = v.split('-').map(Number);
    last = { lic: form.license.value, expiry: new Date(y, mo - 1, d) };
    render();
  });
  document.addEventListener('langchange', render);
}

// ---------- Motion ----------
// Everything below only adds movement; the page reads the same without it.
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Sticky masthead: hides while scrolling down, returns on scroll up; a hairline tracks progress.
const mast = document.querySelector('.mast');
const heroLayers = [['.layer-back', 0.12], ['.layer-mid', 0.06], ['.sun-rays', 0.2]]
  .map(([sel, k]) => [document.querySelector('.hero-art ' + sel), k]).filter(([el]) => el);
const heroField = document.querySelector('.hero-field');
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
  // Parallax: the far buildings and the sun sink slower than the street as the page scrolls.
  if (motionOK && heroField && y < heroField.offsetHeight * 1.5) {
    heroLayers.forEach(([el, k]) => { el.style.translate = `0 ${(y * k).toFixed(1)}px`; });
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
    ['.index-head', '.finder:not([hidden])'], ['.license'],
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
