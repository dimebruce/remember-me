import { useEffect, useRef } from "react";

/** Fondo de estrellas con parallax + fugaces, optimizado para móvil */
export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0, rafId;
    const STAR_COUNT = 220;         // sube/baja para densidad
    const METEOR_EVERY_MS = 2500;   // frecuencia de fugaces
    const stars = [];

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 1 + 0.2,        // profundidad (0.2–1.2)
          r: Math.random() * 1.3 + 0.2,      // radio base
          tw: Math.random() * Math.PI * 2,   // fase twinkle
        });
      }
    }

    function drawNebula() {
      const g = ctx.createRadialGradient(w*0.7, h*0.25, 10, w*0.7, h*0.25, Math.max(w,h)*0.9);
      g.addColorStop(0, "rgba(40,60,150,0.55)");
      g.addColorStop(0.45, "rgba(10,18,48,0.6)");
      g.addColorStop(1, "rgba(2,5,15,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    let lastMeteor = 0;
    const meteors = []; // {x,y,vx,vy,len,life}

    function maybeMeteor(t) {
      if (t - lastMeteor > METEOR_EVERY_MS) {
        lastMeteor = t;
        const side = Math.random() < 0.6 ? "top" : "right";
        const speed = 6 + Math.random() * 6;
        const angle = side === "top" ? (Math.PI * 0.65) : (Math.PI * 0.9);
        meteors.push({
          x: side === "top" ? Math.random() * w : w + 50,
          y: side === "top" ? -20 : Math.random() * h * 0.3,
          vx: -Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          len: 80 + Math.random() * 80,
          life: 0
        });
      }
    }

    function drawMeteor(m) {
      const nx = m.x - m.vx;
      const ny = m.y - m.vy;
      const grad = ctx.createLinearGradient(m.x, m.y, nx, ny);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(nx - (m.vx * (m.len/10)), ny - (m.vy * (m.len/10)));
      ctx.stroke();
    }

    function tick(t = 0) {
      drawNebula();

      // estrellas
      for (const s of stars) {
        s.y += 0.12 + s.z * 0.4;      // velocidad según profundidad
        if (s.y > h + 2) {            // reaparece arriba
          s.y = -2;
          s.x = Math.random() * w;
        }
        s.tw += 0.05;                 // twinkle
        const alpha = 0.6 + Math.sin(s.tw) * 0.35;
        ctx.fillStyle = `rgba(220,235,255,${alpha})`;
        const r = s.r * (0.6 + s.z * 0.7);
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // meteors
      maybeMeteor(t);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        drawMeteor(m);
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;
        if (m.life > 40) meteors.splice(i, 1);
      }

      rafId = requestAnimationFrame(tick);
    }

    const onResize = () => { resize(); makeStars(); };
    resize(); makeStars(); tick();

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" />;
}
