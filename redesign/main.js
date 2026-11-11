// PREVIEW ONLY: compare headline options with ?h=1 … ?h=5 in the address bar.
// Remove this block once a headline is chosen.
const HEADLINES = {
  1: ['Get licensed.', 'Open sooner.'],
  2: ['Your licence,', 'approved.'],
  3: ['Approved.', 'No runaround.'],
  4: ['Licensing,', 'made simple.'],
  5: ['317,388 cases', 'approved.'],
};
const pick = HEADLINES[new URLSearchParams(location.search).get('h')];
if (pick) document.querySelectorAll('.hero-title [data-line]').forEach((el, i) => { el.textContent = pick[i]; });

// Phone menu toggle. The page works without this script (links show inline).
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
  const prompt = 'Pick one and we’ll mark the licences you’re likely to need.';

  chips.forEach((chip) => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', String(on));
    const needs = on ? chip.dataset.need.split(' ') : [];
    rows.forEach((r) => r.classList.toggle('is-match', needs.includes(r.dataset.licence)));

    if (!on) {
      answer.textContent = prompt;
      cta.href = wa + encodeURIComponent('Hi Toh’s Sign, I’d like to ask which licences I need.');
      return;
    }
    const names = needs.map(nameOf).filter(Boolean);
    const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names.at(-1) : names[0];
    const what = chip.textContent.trim().toLowerCase();
    const strong = document.createElement('strong');
    strong.textContent = list;
    const a = /^[aeiou]/.test(what) ? 'an' : 'a';
    answer.replaceChildren(`For ${a} ${what}, you’ll likely need: `, strong, '. We confirm the exact list on a free call.');
    cta.href = wa + encodeURIComponent(`Hi Toh’s Sign, I’m planning ${a} ${what}. Can you help with the ${list.toLowerCase()}?`);
  }));
}

// Section entrances: each part reveals once as it enters the screen.
const revealables = document.querySelectorAll('[data-reveal], .band');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}
