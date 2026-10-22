import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Font dimuat lokal (tidak bergantung pada Google Fonts, lebih cepat & tidak berkedip)
import '@fontsource/fredoka/latin-400.css';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/fredoka/latin-700.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-500.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hemat CPU/baterai (terutama di HP): animasi CSS yang berjalan terus dijeda saat berada di luar layar
const pauseOffscreen = () => {
  if (typeof IntersectionObserver === 'undefined') return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        (e.target as HTMLElement).style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
      }),
    { rootMargin: '120px 0px' }
  );
  document
    .querySelectorAll('.gallery-up, .gallery-down, .marquee, .marquee-chips, .spin-slow, .cloud-drift')
    .forEach((el) => io.observe(el));
};
window.addEventListener('load', () => window.setTimeout(pauseOffscreen, 800), { once: true });
