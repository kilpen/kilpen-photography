// KilPen Photography — Drone page: terrain-flyover hero + interactions (zero deps)

if (location.search.includes('capture')) document.documentElement.classList.add('capture');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Terrain hero ---------- */
(() => {
  const canvas = document.getElementById('terrain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, cx = 0, horizonY = 0, cols = 30;
  const ROWS = 26;
  let time = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; horizonY = H * 0.40;
    cols = W < 720 ? 22 : 32;
  }

  function elev(u, j, t) {
    const ridge = Math.exp(-u * u * 7) * (0.55 + 0.45 * Math.sin(j * 0.28 + t * 0.5));
    return Math.sin(u * 6.2 + t * 0.7) * 0.32 + Math.sin(u * 3.1 - j * 0.42 + t * 0.45) * 0.4 + ridge;
  }

  function render() {
    // sky wash
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0b1016'); g.addColorStop(0.42, '#0c1622'); g.addColorStop(1, '#0a1119');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    const amp = H * 0.17, spread = 1.15;
    // build mesh
    const pts = [];
    for (let j = 0; j <= ROWS; j++) {
      const tt = j / ROWS;
      const rowY = horizonY + (H - horizonY) * Math.pow(1 - tt, 1.9);
      const rowScale = Math.pow(1 - tt, 0.9);
      const row = [];
      for (let i = 0; i <= cols; i++) {
        const u = i / cols - 0.5;
        const x = cx + u * W * spread * (0.32 + rowScale);
        const e = elev(u * 2, j, time) * amp * rowScale;
        row.push([x, rowY - e]);
      }
      pts.push([row, tt]);
    }
    // depth lines (columns)
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      for (let j = 0; j <= ROWS; j++) {
        const [p] = pts[j]; const [x, y] = p[i];
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(56,189,248,0.09)'; ctx.lineWidth = 1; ctx.stroke();
    }
    // horizontal rows (fog by depth)
    for (let j = 0; j <= ROWS; j++) {
      const [row, tt] = pts[j];
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) { const [x, y] = row[i]; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      const a = (1 - tt) * 0.5 + 0.04;
      ctx.strokeStyle = `rgba(56,189,248,${a})`;
      ctx.lineWidth = j === 0 ? 1.6 : 1;
      ctx.stroke();
    }

    // horizon glow
    const hg = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 30);
    hg.addColorStop(0, 'rgba(56,189,248,0)'); hg.addColorStop(0.5, 'rgba(103,232,249,0.12)'); hg.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.fillStyle = hg; ctx.fillRect(0, horizonY - 40, W, 70);

    // drone marker + flight path near horizon
    const dx = cx + Math.sin(time * 0.28) * W * 0.28;
    const dy = horizonY - H * 0.06 + Math.sin(time * 0.5) * H * 0.02;
    ctx.save();
    ctx.strokeStyle = 'rgba(103,232,249,0.35)'; ctx.setLineDash([4, 6]); ctx.beginPath();
    ctx.moveTo(cx - W * 0.28, horizonY - H * 0.06); ctx.lineTo(cx + W * 0.28, horizonY - H * 0.06); ctx.stroke();
    ctx.setLineDash([]);
    ctx.translate(dx, dy);
    ctx.fillStyle = '#67e8f9'; ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(103,232,249,0.8)'; ctx.lineWidth = 1;
    const pr = 8 + Math.sin(time * 3) * 2;
    ctx.beginPath(); ctx.arc(0, 0, pr, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(-6, 0); ctx.moveTo(6, 0); ctx.lineTo(13, 0);
    ctx.moveTo(0, -12); ctx.lineTo(0, -6); ctx.stroke();
    ctx.restore();
  }

  let running = false, last = 0;
  function loop(ts) {
    if (!running) return;
    const dt = Math.min(0.05, (ts - last) / 1000 || 0); last = ts;
    time += dt; render(); requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }
  function stop() { running = false; }

  resize();
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  if (reduce) { render(); } else { start(); }
})();

/* ---------- Shared interactions ---------- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
onScroll(); addEventListener('scroll', onScroll, { passive: true });

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  links.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
}

// count-up (creds number)
const counters = document.querySelectorAll('[data-count]');
const countUp = (el) => {
  const target = +el.dataset.count, dur = 1400, start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if (reduce || !('IntersectionObserver' in window)) {
  counters.forEach((el) => (el.textContent = el.dataset.count));
} else {
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
  }), { threshold: 0.6 });
  counters.forEach((el) => cio.observe(el));
}

// live hero telemetry
if (!reduce) {
  const alt = document.getElementById('tAlt'), spd = document.getElementById('tSpd');
  setInterval(() => {
    if (alt) alt.textContent = 400 + Math.floor(Math.random() * 30);
    if (spd) spd.textContent = 14 + Math.floor(Math.random() * 10);
  }, 1500);
}

// quote form demo handler
const form = document.getElementById('quoteForm');
const ok = document.getElementById('quoteOk');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  ok.hidden = false;
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Request sent ✓'; btn.disabled = true;
});

document.getElementById('yr').textContent = new Date().getFullYear();
