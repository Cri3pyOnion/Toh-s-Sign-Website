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
  const prompt = 'Select a business type to see the licences typically required.';

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
    const a = /^[aeiou]/.test(what) ? 'an' : 'a';
    const strong = document.createElement('strong');
    strong.textContent = list;
    answer.replaceChildren(`Typically required for ${a} ${what}: `, strong, '. We confirm the exact requirements during a free consultation.');
    cta.href = wa + encodeURIComponent(`Hi Toh’s Sign, I’m planning ${a} ${what}. Can you help with the ${list.toLowerCase()}?`);
  }));
}
