import { useRef } from 'react';
import './App.css';
import Starfield from './Starfield';

export default function App() {
  const videoRef = useRef(null);

  async function enableAudio() {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      // iOS requiere play() tras interacción del usuario
      await v.play();
    } catch (e) {
      // si falla, intenta mostrar controles solo esa vez
      v.controls = true;
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
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster="/video/poster.jpg"
          >
            <source src="/video/cheque-720.webm" type="video/webm" />
            <source src="/video/cheque-720.mp4"  type="video/mp4" />
          </video>

          {/* Botón para activar sonido */}
          <button className="audioBtn" onClick={enableAudio} aria-label="Activar sonido">
            🔊 Activar sonido
          </button>
        </div>
      </section>

      <footer className="footer">
        {/* <p className="footnote">Toca “Activar sonido” para escuchar el video</p> */}
        <p className="dedication">
          Hecho con amor por <span className="sig">AGC</span><br />
          <em>“Qué sería de nosotros sin estos días”</em>
        </p>
      </footer>
    </main>
  );
}
