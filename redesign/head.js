// Runs in <head> before first paint (kept in a file so the Content Security Policy needs no inline script).
document.documentElement.classList.replace('no-js', 'js');
// The logo intro plays once per visit.
try {
  if (sessionStorage.getItem('tohs-intro')) document.documentElement.classList.add('intro-seen');
  else sessionStorage.setItem('tohs-intro', '1');
} catch (e) { /* storage blocked: the intro simply plays */ }
// Set the saved or requested language before first paint so Chinese readers never see English flash.
(function () {
  var lang = new URLSearchParams(location.search).get('lang');
  if (lang !== 'en' && lang !== 'zh') { try { lang = localStorage.getItem('tohs-lang'); } catch (e) { lang = null; } }
  if (lang === 'zh') {
    document.documentElement.setAttribute('data-lang-pending', 'zh');
    setTimeout(function () { document.documentElement.removeAttribute('data-lang-pending'); }, 2000);
  }
})();
