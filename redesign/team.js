// Our team page. Without this script every step shows as a list and every name has its photo.
// Wrapped in a block so its names don't clash with main.js.
{
  const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.querySelectorAll('.wall-tile a').forEach((a, i) => a.style.setProperty('--i', i));

  // ---------- How your case moves: a track of steps ----------
  const path = document.querySelector('[data-path]');
  if (path) {
    const track = path.querySelector('.track');
    const nodes = [...track.querySelectorAll('.track-node')];
    const steps = [...path.querySelectorAll('.step')];
    const controls = path.querySelector('.path-controls');
    const play = path.querySelector('.path-play');
    const n = nodes.length;
    let current = 0;
    let timer = null;

    steps.forEach((s, i) => {
      s.setAttribute('role', 'tabpanel');
      s.setAttribute('aria-labelledby', nodes[i].id);
      s.tabIndex = 0;
    });

    const show = (i, { focus = false } = {}) => {
      i = (i + n) % n;
      path.classList.remove('is-first');
      nodes.forEach((b, j) => {
        b.setAttribute('aria-selected', String(j === i));
        b.tabIndex = j === i ? 0 : -1;
        b.classList.toggle('is-past', j < i);
      });
      steps.forEach((s, j) => { s.hidden = j !== i; });
      track.style.setProperty('--p', (i / (n - 1)).toFixed(4));
      current = i;
      if (focus) nodes[i].focus();
    };

    const stop = () => {
      clearInterval(timer);
      timer = null;
      play.setAttribute('aria-pressed', 'false');
      play.textContent = play.dataset.play;
    };
    const start = () => {
      if (current === n - 1) show(0);
      play.setAttribute('aria-pressed', 'true');
      play.textContent = play.dataset.pause;
      timer = setInterval(() => {
        if (current >= n - 1) { stop(); return; }
        show(current + 1);
      }, 2600);
    };

    nodes.forEach((b, i) => b.addEventListener('click', () => { stop(); show(i); }));
    track.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in keys) { e.preventDefault(); stop(); show(current + keys[e.key], { focus: true }); }
      else if (e.key === 'Home') { e.preventDefault(); stop(); show(0, { focus: true }); }
      else if (e.key === 'End') { e.preventDefault(); stop(); show(n - 1, { focus: true }); }
    });
    play.addEventListener('click', () => (timer ? stop() : start()));

    // Swipe the step card on touch screens.
    const list = path.querySelector('.steps');
    let x0 = null;
    list.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
    list.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { stop(); show(current + (dx < 0 ? 1 : -1)); }
    });
    list.addEventListener('pointercancel', () => { x0 = null; });

    track.hidden = false;
    controls.hidden = !motionOK;
    path.classList.add('is-live', 'is-first');
    show(0);
    path.classList.add('is-first');
  }

  // ---------- Directory: the portrait follows the mouse ----------
  const dir = document.querySelector('.tm-dir');
  const float = dir?.querySelector('.dir-float');
  if (dir && float && finePointer && motionOK) {
    dir.classList.add('dir-live');
    const img = float.querySelector('img');
    let x = 0, y = 0, tx = 0, ty = 0, raf = null, last = null;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      const tilt = Math.max(-8, Math.min(8, (tx - x) * 0.08));
      float.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    dir.querySelectorAll('.dir-row').forEach((row) => {
      row.addEventListener('pointerenter', (e) => {
        if (last !== row) {
          img.src = row.dataset.photo;
          float.classList.remove('is-swap');
          void float.offsetWidth;
          float.classList.add('is-swap');
          last = row;
        }
        if (!float.classList.contains('is-on')) { x = tx = e.clientX + 32; y = ty = e.clientY - 120; }
        float.classList.add('is-on');
      });
      row.addEventListener('pointerleave', () => float.classList.remove('is-on'));
    });
    dir.addEventListener('pointermove', (e) => {
      tx = e.clientX + 32;
      ty = e.clientY - 120;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    window.addEventListener('scroll', () => float.classList.remove('is-on'), { passive: true });
  }

  // ---------- Certificates tilt a little toward the mouse ----------
  if (finePointer && motionOK) {
    document.querySelectorAll('.co-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); });
    });
  }

  // ---------- Scroll reveals ----------
  if (motionOK && 'IntersectionObserver' in window) {
    const groups = [['.tm-head'], ['.path'], ['.dir-row'], ['.co-card'], ['.t-join-row'], ['.pager-link']];
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
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
      io.observe(el);
    });
    document.documentElement.classList.add('reveal-on');
  }
}
