/* ---------- Settings ---------- */
const FORM_ENDPOINT = '';   // Where order requests are sent, e.g. an n8n webhook URL. Leave empty for preview mode.

/* ---------- Order form ---------- */
const doc = document;
const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function $<T extends HTMLElement = HTMLElement>(s: string) { return doc.querySelector<T>(s)!; }

const form = $<HTMLFormElement>('#order-form'), done = $('#order-done'), alertBox = $('#form-alert'), sendBtn = $<HTMLButtonElement>('#send-btn');
const dateEl = $<HTMLInputElement>('#f-date');

function pad(n: number) { return (n < 10 ? '0' : '') + n; }
function iso(d: Date) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
dateEl.min = iso(tomorrow);

function field(id: string) { return doc.getElementById('f-' + id) as HTMLInputElement; }
function setErr(id: string, msg: string) {
  const el = field(id), box = doc.getElementById('e-' + id)!;
  box.textContent = msg || '';
  if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  return !msg;
}
function val(id: string) { return field(id).value.trim(); }

const checks: Record<string, () => string> = {
  type:    function () { return val('type') ? '' : 'Choose a cake.'; },
  date:    function () {
    if (!val('date')) return 'Choose a date.';
    return val('date') < dateEl.min ? 'Choose a date from tomorrow onwards.' : '';
  },
  time:    function () { return val('time') ? '' : 'Choose a time.'; },
  name:    function () { return val('name') ? '' : 'Enter your name.'; },
  phone:   function () { return val('phone').replace(/\D/g, '').length >= 8 ? '' : 'Enter a phone number so we can confirm your order.'; },
  email:   function () { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')) ? '' : 'Enter an email address, like name@example.com.'; }
};
Object.keys(checks).forEach(function (id) {
  const el = field(id);
  el.addEventListener('blur', function () { if (el.getAttribute('aria-invalid')) setErr(id, checks[id]()); });
  el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) setErr(id, checks[id]()); });
});

function niceDate(s: string) {
  const p = s.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]);
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function niceTime(s: string) {
  const p = s.split(':'), h = +p[0], ap = h >= 12 ? 'pm' : 'am';
  return (h % 12 || 12) + ':' + p[1] + ap;
}

function showDone(data: Record<string, string>) {
  $('#done-msg').textContent = 'Thanks, ' + data.name.split(' ')[0] + '. We’ll call or email to confirm the details and price.';
  const rows = [
    ['Cake', data.type + (data.occasion ? ' (' + data.occasion + ')' : '')],
    ['For', data.serves ? data.serves + ' people' : ''],
    ['Pickup', niceDate(data.date) + ' at ' + niceTime(data.time) + '\nCarnes Hill Marketplace'],
    ['Notes', data.details],
    ['Contact', data.phone + '\n' + data.email]
  ];
  const dl = $('#done-summary'); dl.textContent = '';
  rows.forEach(function (r) {
    if (!r[1]) return;
    const row = doc.createElement('div'), dt = doc.createElement('dt'), dd = doc.createElement('dd');
    dt.textContent = r[0]; dd.textContent = r[1];
    row.appendChild(dt); row.appendChild(dd); dl.appendChild(row);
  });
  $('#preview-note').hidden = !!FORM_ENDPOINT;
  form.hidden = true; done.hidden = false;
  done.focus({ preventScroll: true });
  $('.form-card').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  alertBox.hidden = true;
  let firstBad: HTMLElement | null = null;
  Object.keys(checks).forEach(function (id) {
    if (!setErr(id, checks[id]()) && !firstBad) firstBad = field(id);
  });
  if (firstBad) { (firstBad as HTMLElement).focus(); return; }
  if (val('company')) return; // spam trap

  const data: Record<string, string> = {};
  ['type', 'occasion', 'serves', 'details', 'date', 'time', 'name', 'phone', 'email'].forEach(function (k) { data[k] = val(k); });

  if (!FORM_ENDPOINT) { showDone(data); return; }

  sendBtn.disabled = true; sendBtn.textContent = 'Sending…';
  fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(function (r) { if (!r.ok) throw new Error(String(r.status)); showDone(data); })
    .catch(function () {
      alertBox.textContent = 'Your request didn’t send. Check your connection and try again, or call us on 0478 774 466.';
      alertBox.hidden = false;
      alertBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    })
    .then(function () { sendBtn.disabled = false; sendBtn.textContent = 'Send order request'; });
});

$('#again-btn').addEventListener('click', function () {
  form.reset();
  done.hidden = true; form.hidden = false;
  $('#f-type').focus();
});
