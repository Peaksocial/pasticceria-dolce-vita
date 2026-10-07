/* ---------- Range tabs ----------
   Without JS every panel shows in a list with its own heading.
   The .js class switches to the tabbed view (see the .js rules in global.css). */
document.documentElement.classList.add('js');

const tablist = document.querySelector<HTMLElement>('.tabs')!;
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab'));
tablist.hidden = false;
function selectTab(tab: HTMLButtonElement, focus?: boolean) {
  tabs.forEach(function (t) {
    const on = t === tab;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !on;
  });
  if (focus) tab.focus();
}
tabs.forEach(function (t, i) {
  t.addEventListener('click', function () { selectTab(t); });
  t.addEventListener('keydown', function (e) {
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
    if (n === null) return;
    e.preventDefault();
    selectTab(tabs[(n + tabs.length) % tabs.length], true);
  });
});
selectTab(tabs[0]);
