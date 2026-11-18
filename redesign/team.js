// Our team page. Without this script every portrait shows in a plain grid.
// Wrapped in a block so its names don't clash with main.js.
{
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// ---------- Leadership spotlight: tabs that swap one large portrait ----------
const spot = document.querySelector('[data-spot]');
if (spot) {
  const list = spot.querySelector('.spot-list');
  const tabs = [...spot.querySelectorAll('.spot-tab')];
  const panels = [...spot.querySelectorAll('.spot-panel')];
  const controls = spot.querySelector('.spot-controls');
  const count = spot.querySelector('[data-spot-count]');
  const n = tabs.length;
  let current = 0;
  let leaveTimer;

  panels.forEach((p, i) => {
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', tabs[i].id);
    p.tabIndex = 0;
  });

  const show = (i, { focus = false } = {}) => {
    i = (i + n) % n;
    if (i === current && panels[i].classList.contains('is-active')) { if (focus) tabs[i].focus(); return; }
    spot.classList.remove('is-first');
    const old = panels[current];
    clearTimeout(leaveTimer);
    panels.forEach((p) => p.classList.remove('is-leaving'));
    if (old !== panels[i]) {
      old.classList.remove('is-active');
      old.classList.add('is-leaving');
      leaveTimer = setTimeout(() => old.classList.remove('is-leaving'), 800);
    }
    tabs.forEach((t, j) => {
      const on = j === i;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, j) => {
      p.classList.toggle('is-active', j === i);
      p.setAttribute('aria-hidden', String(j !== i));
    });
    panels[i].querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
    if (count) count.textContent = String(i + 1).padStart(2, '0');
    current = i;
    if (focus) tabs[i].focus({ preventScroll: false });
    // Keep the chosen face in view in the phone's swipe row.
    if (list.scrollWidth > list.clientWidth) {
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: motionOK ? 'smooth' : 'auto' });
    }
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    // Hovering a name previews that person (mouse only, after a short pause).
    let hoverTimer;
    t.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      hoverTimer = setTimeout(() => show(i), 140);
    });
    t.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
  });

  list.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) { e.preventDefault(); show(current + keys[e.key], { focus: true }); }
    else if (e.key === 'Home') { e.preventDefault(); show(0, { focus: true }); }
    else if (e.key === 'End') { e.preventDefault(); show(n - 1, { focus: true }); }
  });

  spot.querySelectorAll('[data-spot-step]').forEach((b) => {
    b.addEventListener('click', () => show(current + Number(b.dataset.spotStep)));
  });

  // Swipe the big portrait left or right on touch screens.
  const stage = spot.querySelector('.spot-panels');
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') startX = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => { startX = null; });

  // The list runs across on phones, down on larger screens.
  const narrow = window.matchMedia('(max-width: 40rem)');
  const setOrientation = () => list.setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
  narrow.addEventListener('change', setOrientation);
  setOrientation();

  list.hidden = false;
  controls.hidden = false;
  spot.classList.add('is-live', 'is-first');
  // Open on the person in the address (team.html#p-azir), otherwise the first.
  const fromHash = panels.findIndex((p) => '#' + p.id === location.hash);
  current = fromHash >= 0 ? fromHash : 0;
  panels.forEach((p) => p.classList.remove('is-active'));
  show(current);
  spot.classList.add('is-first');

  // The faces in the intro jump to that person.
  document.querySelectorAll('.faces a[data-person]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      show(Number(a.dataset.person));
      spot.closest('section').scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'start' });
      tabs[current].focus({ preventScroll: true });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });
}

// Stagger for the faces' entrance.
document.querySelectorAll('.faces li').forEach((li, i) => li.style.setProperty('--i', i));

// ---------- Scroll reveals for this page ----------
if (motionOK && 'IntersectionObserver' in window) {
  const targets = [];
  [['.spot-head'], ['.t-group-head'], ['.org-card'], ['.t-join-row'], ['.pager-link']].forEach((sels) => {
    document.querySelectorAll(sels.join(',')).forEach((el, i) => {
      el.dataset.reveal = '';
      el.style.setProperty('--i', Math.min(i, 8));
      targets.push(el);
    });
  });
  const org = document.querySelector('.org');
  if (org) targets.push(org);
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
  targets.forEach((el) => io.observe(el));
  document.documentElement.classList.add('reveal-on');
}
}
