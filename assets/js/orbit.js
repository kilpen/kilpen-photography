/* ============================================================
   KilPen Photography — Hero orbit motion
   The 360 scene from the retired gateway engine (gateway.js,
   git history), re-centered on the hero's phone mockup: reticle
   rings + rotating ticks + orbiting particles — the booth arm
   sweep. Zero dependencies. Respects prefers-reduced-motion.
   ============================================================ */

(() => {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('orbitFx');
  const anchor = document.querySelector('.hero__reel .phone');
  if (!hero || !canvas || !anchor) return;

  const ctx = canvas.getContext('2d');   // alpha canvas — hero glow shows through
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const COL = { red: '#e25444', redDeep: '#a32424' };

  let W = 0, H = 0, dpr = 1;
  let cx = 0, cy = 0, maxR = 0;
  let orbit = [], time = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const hr = hero.getBoundingClientRect();
    W = hr.width; H = hr.height;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // center the orbit on the phone mockup — the "subject" the arm sweeps around
    const ar = anchor.getBoundingClientRect();
    cx = ar.left - hr.left + ar.width / 2;
    cy = ar.top - hr.top + ar.height / 2;
    maxR = Math.min(ar.height * 0.92, W * 0.42);

    seedParticles();
    if (reduce) staticFrame();
  }

  function seedParticles() {
    const scale = Math.min(1.4, (W * H) / (1440 * 900));
    const n = Math.round(95 * Math.max(0.5, scale));
    orbit = [];
    for (let i = 0; i < n; i++) {
      orbit.push({
        r: 0.10 + Math.random() * 0.9,      // normalized radius (0..1)
        a: Math.random() * Math.PI * 2,      // angle
        spd: 0.15 + Math.random() * 0.5,     // angular speed
        sz: 0.6 + Math.random() * 1.8,
        hot: Math.random() > 0.55,           // flame vs deep-red
      });
    }
  }

  function drawScene() {
    // reticle rings
    ctx.strokeStyle = 'rgba(226,84,68,0.16)';
    ctx.lineWidth = 1;
    for (let k = 1; k <= 3; k++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, maxR * (k / 3), maxR * (k / 3) * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    // rotating ticks
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 0.25);
    ctx.strokeStyle = 'rgba(226,84,68,0.5)';
    for (let k = 0; k < 12; k++) {
      const ang = (k / 12) * Math.PI * 2;
      const r1 = maxR * 1.02, r2 = maxR * (k % 3 === 0 ? 1.12 : 1.07);
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1 * 0.6);
      ctx.lineTo(Math.cos(ang) * r2, Math.sin(ang) * r2 * 0.6);
      ctx.stroke();
    }
    ctx.restore();

    // orbiting particles (elliptical for pseudo-perspective)
    for (const o of orbit) {
      const r = o.r * maxR;
      const x = cx + Math.cos(o.a) * r;
      const y = cy + Math.sin(o.a) * r * 0.6;
      const front = Math.sin(o.a) > 0;               // depth cue
      const c = o.hot ? COL.red : COL.redDeep;
      ctx.globalAlpha = front ? 0.95 : 0.4;
      ctx.fillStyle = c;
      ctx.shadowColor = c;
      ctx.shadowBlur = o.hot ? 12 : 5;
      ctx.beginPath();
      ctx.arc(x, y, o.sz * (front ? 1.15 : 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  function frame(dt) {
    time += dt;
    for (const o of orbit) o.a += o.spd * dt;

    // fade previous frame for particle trails (transparent-canvas
    // equivalent of the gateway's dark trail wash)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.30)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';

    drawScene();
  }

  function staticFrame() {
    ctx.clearRect(0, 0, W, H);
    drawScene();
  }

  /* ---------- loop ---------- */
  let last = 0, running = false;
  function loop(ts) {
    if (!running) return;
    const dt = Math.min(0.05, (ts - last) / 1000 || 0);
    last = ts;
    frame(dt);
    requestAnimationFrame(loop);
  }
  function start() { if (running || reduce) return; running = true; last = performance.now(); requestAnimationFrame(loop); }
  function stop() { running = false; }

  /* ---------- live telemetry flicker (from the gateway) ---------- */
  function bindTelemetry() {
    if (reduce) return;
    const tele = document.getElementById('teleBooth');
    if (!tele) return;
    setInterval(() => {
      const rpm = 32 + Math.floor(Math.random() * 4);
      tele.textContent = `360° · SLO-MO · ${rpm} RPM`;
    }, 1400);
  }

  /* ---------- init ---------- */
  function init() {
    resize();
    bindTelemetry();
    window.addEventListener('resize', resize);
    // recompute once assets/fonts settle layout
    window.addEventListener('load', resize, { once: true });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
    if (reduce) { staticFrame(); return; }
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
