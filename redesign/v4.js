// Version 4 behaviour. The page reads the same without it.
const WA = 'https://wa.me/60164397178?text=';
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Consultation bar: opens WhatsApp with the business's need filled in.
const form = document.getElementById('consult');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const need = form.biz.value.trim();
  const text = need
    ? `Hi Toh’s Sign, I’d like a free consultation about: ${need}`
    : 'Hi Toh’s Sign, I’d like a free licensing consultation.';
  window.open(WA + encodeURIComponent(text), '_blank', 'noopener');
});

// Live counter since 1 January 1997 (Kuala Lumpur time): years / days / hours.
const units = { y: document.querySelector('[data-unit="y"]'), d: document.querySelector('[data-unit="d"]'), h: document.querySelector('[data-unit="h"]') };
const founded = new Date('1997-01-01T00:00:00+08:00');
const tick = () => {
  const now = new Date();
  const kl = new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60000);
  let years = kl.getFullYear() - 1997;
  const anniversary = new Date(kl.getFullYear(), 0, 1);
  const days = Math.floor((kl - anniversary) / 864e5);
  if (units.y) units.y.textContent = String(years);
  if (units.d) units.d.textContent = String(days).padStart(3, '0');
  if (units.h) units.h.textContent = String(kl.getHours()).padStart(2, '0');
};
if (founded && units.y) { tick(); setInterval(tick, 30000); }

// Scroll reveals, the promise mark locking together, and the phone pill after the hero.
if ('IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.block-head, .card, .promises li, .quote, .company, .clients-title, .logos, .final > *, .figures, .clock');
  if (motionOK) {
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const i = [...en.target.parentElement.children].indexOf(en.target);
        en.target.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => io.observe(el));
  }

  const split = document.querySelector('.split');
  if (split) {
    new IntersectionObserver(([en]) => split.classList.toggle('is-locked', en.isIntersecting), { threshold: .45 }).observe(split);
  }

  const pill = document.querySelector('.pill');
  const hero = document.querySelector('.hero');
  if (pill && hero) {
    new IntersectionObserver(([en]) => pill.classList.toggle('is-shown', !en.isIntersecting)).observe(hero);
  }
} else {
  document.querySelector('.split')?.classList.add('is-locked');
  document.querySelector('.pill')?.classList.add('is-shown');
}
