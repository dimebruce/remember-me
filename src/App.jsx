import './App.css';
import Starfield from './Starfield';

export default function App() {
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
            className="video"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster="/video/poster.jpg"
          >
            <source src="/video/cheque-720.webm" type="video/webm" />
            <source src="/video/cheque-720.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <footer className="footer">
        {/* <p className="footnote">Toca para activar sonido en tu dispositivo</p> */}
        <p className="dedication">
          Hecho con amor por <span className="sig">AGC</span><br />
          <em>“Qué sería de nosotros sin estos días”</em>
        </p>
      </footer>
    </main>
  );
}
