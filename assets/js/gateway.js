/* ============================================================
   KilPen Photography — Gateway motion engine
   One hand-written Canvas 2D engine, two scenes:
     • 360  : particles orbiting a reticle (booth arm sweep)
     • drone: flight path + drift particles over a perspective grid
   Zero dependencies. Respects prefers-reduced-motion.
   ============================================================ */

(() => {
  const canvas = document.getElementById('fx');
  const ctx = canvas.getContext('2d', { alpha: false });
  const paths = document.getElementById('paths');
  const p360 = document.getElementById('panel360');
  const pDrone = document.getElementById('panelDrone');
  const seam = document.getElementById('seam');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqMobile = window.matchMedia('(max-width: 820px)');

  const COL = {
    bg: '#121212',
    red: '#e25444', redDeep: '#a32424',
    sky: '#38bdf8', cyan: '#67e8f9',
  };

  let W = 0, H = 0, dpr = 1, vertical = false;
  let split = 0.5, targetSplit = 0.5;   // fraction of width for the 360 region (desktop)
  let orbit = [], drift = [];
  let gridOffset = 0, droneT = 0, time = 0;

  function isVertical() { return mqMobile.matches; }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    vertical = isVertical();
    seedParticles();
  }

  // region rects for each scene, based on current split + orientation
  function regions() {
    if (vertical) {
      const s = 0.5;
      return {
        r360:   { x: 0, y: 0,       w: W, h: H * s },
        rDrone: { x: 0, y: H * s,   w: W, h: H * (1 - s) },
      };
    }
    return {
      r360:   { x: 0,        y: 0, w: W * split,       h: H },
      rDrone: { x: W * split, y: 0, w: W * (1 - split), h: H },
    };
  }

  function seedParticles() {
    const area = W * H;
    const scale = Math.min(1.4, area / (1440 * 900));
    const nOrbit = Math.round((vertical ? 55 : 95) * scale);
    const nDrift = Math.round((vertical ? 45 : 80) * scale);

    orbit = [];
    for (let i = 0; i < nOrbit; i++) {
      orbit.push({
        r: 0.10 + Math.random() * 0.9,      // normalized radius (0..1)
        a: Math.random() * Math.PI * 2,      // angle
        spd: 0.15 + Math.random() * 0.5,     // angular speed
        sz: 0.6 + Math.random() * 1.8,
        hot: Math.random() > 0.55,           // flame vs deep-red
      });
    }
    drift = [];
    for (let i = 0; i < nDrift; i++) {
      drift.push({
        x: Math.random(), y: Math.random(),
        spd: 0.02 + Math.random() * 0.06,
        amp: 0.01 + Math.random() * 0.05,
        ph: Math.random() * Math.PI * 2,
        sz: 0.5 + Math.random() * 1.6,
      });
    }
  }

  /* ---------- 360 scene: orbit + reticle ---------- */
  function draw360(reg) {
    // push the reticle toward the seam so the left-aligned text stays clean
    const cx = reg.x + reg.w * (vertical ? 0.62 : 0.68);
    const cy = reg.y + reg.h * (vertical ? 0.5 : 0.52);
    const maxR = Math.min(reg.w * (vertical ? 0.62 : 0.7), reg.h) * 0.44;

    ctx.save();
    ctx.beginPath();
    ctx.rect(reg.x, reg.y, reg.w, reg.h);
    ctx.clip();

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
    // crosshair
    ctx.strokeStyle = 'rgba(226,84,68,0.35)';
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy);
    ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
    ctx.stroke();

    // orbiting particles (elliptical for pseudo-perspective)
    for (const o of orbit) {
      const r = o.r * maxR;
      const x = cx + Math.cos(o.a) * r;
      const y = cy + Math.sin(o.a) * r * 0.6;
      const front = Math.sin(o.a) > 0;               // depth cue
      const alpha = front ? 0.95 : 0.4;
      const c = o.hot ? COL.red : COL.redDeep;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = c;
      ctx.shadowColor = c;
      ctx.shadowBlur = o.hot ? 12 : 5;
      ctx.beginPath();
      ctx.arc(x, y, o.sz * (front ? 1.15 : 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /* ---------- drone scene: grid + flight path + drift ---------- */
  function drawDrone(reg) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(reg.x, reg.y, reg.w, reg.h);
    ctx.clip();

    // vanishing point pulled toward the seam so right-aligned text stays clean
    const vpX = reg.x + reg.w * (vertical ? 0.42 : 0.34);
    const vpY = reg.y + reg.h * 0.28;
    const baseY = reg.y + reg.h;

    // perspective grid (converging verticals + scrolling horizontals)
    ctx.strokeStyle = 'rgba(56,189,248,0.10)';
    ctx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
      const fx = vpX + (i / 6) * reg.w * 0.9;
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(fx, baseY);
      ctx.stroke();
    }
    for (let k = 0; k < 9; k++) {
      let t = (k + (gridOffset % 1)) / 9;
      t = t * t;                              // bunch toward horizon
      const y = vpY + (baseY - vpY) * t;
      const spread = (y - vpY) / (baseY - vpY);
      ctx.globalAlpha = 0.06 + spread * 0.12;
      ctx.beginPath();
      ctx.moveTo(vpX - reg.w * 0.9 * spread, y);
      ctx.lineTo(vpX + reg.w * 0.9 * spread, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // flight path (sine across region) + moving drone dot
    const pad = reg.w * 0.12;
    const x0 = reg.x + pad, x1 = reg.x + reg.w - pad;
    const midY = reg.y + reg.h * 0.5;
    const amp = reg.h * 0.16;
    const pathY = (t) => midY + Math.sin(t * Math.PI * 2 + time * 0.2) * amp;

    ctx.strokeStyle = 'rgba(56,189,248,0.28)';
    ctx.lineWidth = 1.25;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    for (let t = 0; t <= 1.001; t += 0.02) {
      const x = x0 + (x1 - x0) * t;
      const y = pathY(t);
      t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // drone marker
    const dt = (droneT % 1 + 1) % 1;
    const dx = x0 + (x1 - x0) * dt;
    const dy = pathY(dt);
    ctx.save();
    ctx.translate(dx, dy);
    ctx.shadowColor = COL.sky;
    ctx.shadowBlur = 16;
    ctx.fillStyle = COL.cyan;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(103,232,249,0.9)';
    ctx.lineWidth = 1;
    const pr = 8 + Math.sin(time * 3) * 2;   // pulsing ring
    ctx.beginPath(); ctx.arc(0, 0, pr, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(103,232,249,0.5)';
    ctx.beginPath();
    ctx.moveTo(-14, 0); ctx.lineTo(-6, 0);
    ctx.moveTo(6, 0); ctx.lineTo(14, 0);
    ctx.moveTo(0, -13); ctx.lineTo(0, -6);
    ctx.stroke();
    ctx.restore();

    // drift particles along contour
    for (const d of drift) {
      const x = reg.x + ((d.x + time * d.spd) % 1) * reg.w;
      const y = reg.y + (d.y + Math.sin(time * 0.6 + d.ph) * d.amp) * reg.h;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = COL.sky;
      ctx.shadowColor = COL.sky;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(x, y, d.sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function frame(dt) {
    time += dt;
    gridOffset += dt * 0.35;
    droneT += dt * 0.06;

    // ease split toward target (desktop only)
    if (!vertical) split += (targetSplit - split) * Math.min(1, dt * 6);

    // trail wash instead of hard clear
    ctx.fillStyle = 'rgba(18,18,18,0.30)';
    ctx.fillRect(0, 0, W, H);

    const { r360, rDrone } = regions();
    draw360(r360);
    drawDrone(rDrone);

    if (!vertical) {
      const sx = W * split;
      const g = ctx.createLinearGradient(sx - 40, 0, sx + 40, 0);
      g.addColorStop(0, 'rgba(226,84,68,0)');
      g.addColorStop(0.5, 'rgba(226,84,68,0.10)');
      g.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = g;
      ctx.fillRect(sx - 40, 0, 80, H);
      seam.style.left = (split * 100) + '%';
      // keep DOM panels locked to the same split
      p360.style.flexBasis = (split * 100) + '%';
      pDrone.style.flexBasis = ((1 - split) * 100) + '%';
    }
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
  function start() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(loop); }
  function stop() { running = false; }

  /* ---------- hover choreography (desktop) ---------- */
  function bindHover() {
    p360.addEventListener('mouseenter', () => { if (!vertical) { targetSplit = 0.62; paths.classList.add('hover-360'); paths.classList.remove('hover-drone'); } });
    pDrone.addEventListener('mouseenter', () => { if (!vertical) { targetSplit = 0.38; paths.classList.add('hover-drone'); paths.classList.remove('hover-360'); } });
    paths.addEventListener('mouseleave', () => { targetSplit = 0.5; paths.classList.remove('hover-360', 'hover-drone'); });
  }

  /* ---------- magnetic buttons ---------- */
  function bindMagnetic() {
    if (reduce) return;
    document.querySelectorAll('[data-mag]').forEach((btn) => {
      const panel = btn.closest('.panel');
      panel.addEventListener('mousemove', (e) => {
        if (vertical) return;
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(mx, my);
        if (dist < 220) {
          btn.style.transform = `translate(${mx * 0.28}px, ${my * 0.28}px)`;
        } else {
          btn.style.transform = '';
        }
      });
      panel.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- live telemetry flicker ---------- */
  function bindTelemetry() {
    if (reduce) return;
    const t360 = document.getElementById('tele360');
    const tDrone = document.getElementById('teleDrone');
    setInterval(() => {
      const rpm = 32 + Math.floor(Math.random() * 4);
      t360.textContent = `240 FPS · SLO-MO · SPIN ${rpm} RPM`;
      const alt = 405 + Math.floor(Math.random() * 20);
      tDrone.textContent = `ALT ${alt} FT · 21.31°N 157.86°W · 4K60`;
    }, 1400);
  }

  /* ---------- init ---------- */
  function init() {
    resize();
    bindHover();
    bindMagnetic();
    bindTelemetry();

    window.addEventListener('resize', () => { resize(); });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });

    if (reduce) {
      // single static frame
      ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, W, H);
      const { r360, rDrone } = regions();
      draw360(r360); drawDrone(rDrone);
      return;
    }
    ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, W, H);
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
