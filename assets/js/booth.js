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

// Quote form — demo handler (no endpoint wired yet)
const form = document.getElementById('quoteForm');
const ok = document.getElementById('quoteOk');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  ok.hidden = false;
  form.querySelector('button[type=submit]').textContent = 'Request sent ✓';
  form.querySelector('button[type=submit]').disabled = true;
});

// Year
document.getElementById('yr').textContent = new Date().getFullYear();
