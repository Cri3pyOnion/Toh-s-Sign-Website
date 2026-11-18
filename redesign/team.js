// Our team page. Everything here only adds movement and wayfinding; the page reads the same without it.
// Wrapped in a block so its names don't clash with main.js.
{
  const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // Seal petals draw one after another.
  document.querySelectorAll('.seal-petals .seal-d').forEach((el, i) => el.style.setProperty('--i', i));

  // ---------- Section menu: marks the section you are reading ----------
  const links = [...document.querySelectorAll('.subnav-list a')];
  const list = document.querySelector('.subnav-list');
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (links.length && 'IntersectionObserver' in window) {
    const setCurrent = (id) => {
      links.forEach((a) => {
        const on = a.getAttribute('href') === '#' + id;
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        // Keep the current item visible when the menu scrolls sideways on phones.
        if (on && list.scrollWidth > list.clientWidth) {
          list.scrollTo({ left: a.offsetLeft - 24, behavior: motionOK ? 'smooth' : 'auto' });
        }
      });
    };
    const visible = new Map();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
      const first = sections.find((s) => visible.get(s.id));
      if (first) setCurrent(first.id);
      else if (window.scrollY < sections[0].offsetTop) setCurrent('');
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // ---------- Chart names jump to that person's card and light it up ----------
  document.querySelectorAll('.chart .node').forEach((a) => {
    a.addEventListener('click', () => {
      const card = document.querySelector(a.getAttribute('href'));
      if (!card) return;
      card.classList.remove('is-flash');
      setTimeout(() => {
        card.classList.add('is-flash');
        setTimeout(() => card.classList.remove('is-flash'), 1600);
      }, motionOK ? 450 : 0);
    });
  });

  // ---------- Scroll reveals ----------
  if (motionOK && 'IntersectionObserver' in window) {
    const groups = [
      ['.thead'], ['.founder-photo', '.founder-text'], ['.tquote'],
      ['.lead-card'], ['.tier'], ['.co'], ['.t-join-row'], ['.talk-grid > *'], ['.pager-link'],
    ];
    const targets = [];
    groups.forEach((sels) => {
      document.querySelectorAll(sels.join(',')).forEach((el, i) => {
        el.dataset.reveal = '';
        el.style.setProperty('--i', Math.min(i, 8));
        targets.push(el);
      });
    });
    const chart = document.querySelector('.chart');
    if (chart) targets.push(chart);
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
      io.observe(el);
    });
    document.documentElement.classList.add('reveal-on');
  }
}
