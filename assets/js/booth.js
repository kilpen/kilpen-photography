// KilPen Photography — 360° page interactions (zero dependencies)

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sticky nav solidify
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => io.observe(el));
}

// Count-up stats
const counters = document.querySelectorAll('.stat__v[data-count]');
const fmt = (n) => n.toLocaleString('en-US');
const countUp = (el) => {
  const target = +el.dataset.count;
  const dur = 1500, start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if (reduce || !('IntersectionObserver' in window)) {
  counters.forEach((el) => (el.textContent = fmt(+el.dataset.count)));
} else {
  const cio = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  counters.forEach((el) => cio.observe(el));
}

// Quote form → n8n webhook (workflow "kilpen.photography Quote Form → info@kilpen.photography")
const QUOTE_ENDPOINT = 'https://n8n.kilpen.com/webhook/photography-quote';
const form = document.getElementById('quoteForm');
const ok = document.getElementById('quoteOk');
const err = document.getElementById('quoteErr');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const btn = form.querySelector('button[type=submit]');
  const label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Sending…'; err.hidden = true;
  try {
    const res = await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed');
    ok.hidden = false;
    btn.textContent = 'Request sent ✓';
  } catch (ex) {
    err.textContent = ex.message && ex.message !== 'Failed to fetch' ? ex.message
      : "We couldn't send your request just now. Please email info@kilpen.photography and we'll get right back to you.";
    err.hidden = false;
    btn.disabled = false; btn.textContent = label;
  }
});

// Year
document.getElementById('yr').textContent = new Date().getFullYear();
