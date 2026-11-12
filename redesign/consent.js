// Cookie consent: analytics load only after "Accept analytics"; the choice is remembered
// and can be changed from the footer. With no measurement ID set, nothing loads at all.
(() => {
  const KEY = 'tohs-consent';
  const box = document.querySelector('[data-consent]');
  const reopen = document.querySelector('[data-consent-open]');
  if (!box) return;
  const id = document.querySelector('meta[name="ga-id"]')?.content.trim();
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  let loaded = false;
  const loadAnalytics = () => {
    if (loaded || !id) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
    const sc = document.createElement('script');
    sc.async = true;
    sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.append(sc);
  };
  // Remove _ga / _ga_<id> cookies on this host and its parent domains.
  const clearGa = () => {
    const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => /^_ga(_|$)|^_gid$|^_gat/.test(n));
    const parts = location.hostname.split('.');
    const domains = parts.map((_, i) => parts.slice(i).join('.')).filter((d) => d.includes('.'));
    names.forEach((n) => { document.cookie = `${n}=; Max-Age=0; path=/`; domains.forEach((d) => { document.cookie = `${n}=; Max-Age=0; path=/; domain=.${d}`; }); });
  };
  const choose = (v) => {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: ask again next visit */ }
    box.hidden = true;
    if (v === 'all') loadAnalytics();
    else {
      if (id) window[`ga-disable-${id}`] = true;
      clearGa();
    }
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-consent-choice]');
    if (b) choose(b.dataset.consentChoice);
  });
  if (reopen) {
    reopen.hidden = false;
    reopen.addEventListener('click', () => { box.hidden = false; box.querySelector('[data-consent-choice="all"]').focus(); });
  }
  const saved = read();
  if (saved === 'all') loadAnalytics();
  else if (!saved) box.hidden = false;
})();
