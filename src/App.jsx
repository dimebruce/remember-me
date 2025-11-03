import { useEffect, useRef, useState } from 'react';
import './App.css';
import Starfield from './Starfield';

export default function App() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  async function handlePlay() {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;            // aseguramos audio
      v.controls = false;         // mantenemos UI limpia
      await v.play();             // play por interacción del usuario
    } catch (e) {
      // Si algún browser bloquea, mostramos controles nativos
      v.controls = true;
      try { await v.play(); } catch {}
    }
  }

  return (
    <main className="screen">
      <Starfield />

      <header className="header">
        <h1 className="title">In Loving Memory</h1>
        <p className="subtitle">“Remember me”</p>
        <span className="divider" />
      </header>

      <section className="center">
        <div className="video-card">
          <video
            ref={videoRef}
            className="video"
            playsInline
            loop
            preload="metadata"
            poster="/video/poster.jpg"
          >
            <source src="/video/cheque-720.webm" type="video/webm" />
            <source src="/video/cheque-720.mp4"  type="video/mp4" />
          </video>

          {/* Overlay: botón PLAY centrado */}
          {!playing && (
            <button
              className={`playOverlay ${ready ? 'is-ready' : ''}`}
              onClick={handlePlay}
              aria-label="Reproducir con sonido"
            >
              <span className="playIcon">▶</span>
              <span className="playLabel">Reproducir</span>
            </button>
          )}
        </div>
      </section>

      <footer className="footer">
        <p className="dedication">
          Hecho con amor por <span className="sig">AGC</span><br />
          <em>“Qué sería de nosotros sin estos días”</em>
        </p>
      </footer>
    </main>
  );
}
