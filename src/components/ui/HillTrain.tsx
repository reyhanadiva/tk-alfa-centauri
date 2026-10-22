import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Star } from './Ornaments';

/*
  Kereta mainan "ALFA CENTAURI" yang naik-turun mengikuti punggung bukit di hero.
  - Lintasan = tepi atas bukit tengah (sama persis dengan grafik di <Hills />), diperpanjang keluar layar.
  - Tiap gerbong berjalan sendiri di lintasan (CSS offset-path), jadi kereta ikut menekuk saat melewati lembah.
  - Lintasan dihitung ulang dalam piksel setiap ukuran bukit berubah (grafik bukit di-stretch, kereta tidak).
  - Berhenti saat hero di luar layar atau tab tidak aktif; "kurangi animasi" menampilkan kereta diam.
*/

/** Segmen kubik punggung bukit tengah (koordinat viewBox 1440x230), dengan ekor lurus keluar layar */
const VIEW_W = 1440;
const VIEW_H = 230;
export const CREST_D =
  'M -120 186 L 0 160 C 220 112 420 120 640 152 C 860 184 1060 118 1260 126 C 1350 130 1400 140 1440 146 L 1560 164';

/** Ubah path (hanya perintah M/L/C berpasangan angka) dari koordinat viewBox ke piksel */
function scalePath(d: string, sx: number, sy: number): string {
  const tokens = d.trim().split(/\s+/);
  const out: string[] = [];
  let k = 0;
  while (k < tokens.length) {
    const t = tokens[k];
    if (/^[MLC]$/.test(t)) {
      out.push(t);
      k += 1;
    } else {
      const x = parseFloat(tokens[k]) * sx;
      const y = parseFloat(tokens[k + 1]) * sy;
      out.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
      k += 2;
    }
  }
  return out.join(' ');
}

/*
  Gerbong dibuat sama persis dengan kereta di footer (ukuran dasar footer versi HP),
  lalu diperkecil seragam dengan skala --s supaya pas di bukit hero.
*/
type Car =
  | { kind: 'loco'; w: number }
  | { kind: 'mascot'; w: number }
  | { kind: 'wagon'; w: number; letter: string; body: string; roof: string; gap?: boolean };

// class lengkap agar aman dari purge Tailwind (sama dengan footer)
const PALETTE = [
  { body: 'bg-sky-400', roof: 'bg-sky-600' },
  { body: 'bg-emerald-400', roof: 'bg-emerald-600' },
  { body: 'bg-violet-400', roof: 'bg-violet-600' },
  { body: 'bg-amber-400', roof: 'bg-amber-600' },
];
const LETTERS = [...'ALFA'].map((l) => ({ l, gap: false })).concat([...'CENTAURI'].map((l, i) => ({ l, gap: i === 0 })));
// urutan dari belakang (kiri) ke depan (kanan), seperti di footer
const LEFT_TO_RIGHT: Car[] = [
  { kind: 'mascot', w: 64 },
  ...LETTERS.map(({ l, gap }, i) => ({ kind: 'wagon' as const, w: 56, letter: l, gap, ...PALETTE[i % PALETTE.length] })),
  { kind: 'loco', w: 96 },
];
const GAP = 6; // gap-1.5
const WORD_GAP = 20; // ml-5

// titik tengah tiap gerbong diukur dari ujung depan lokomotif (piksel, skala 1)
const CENTERS = (() => {
  const out: number[] = new Array(LEFT_TO_RIGHT.length);
  let x = 0;
  for (let i = LEFT_TO_RIGHT.length - 1; i >= 0; i -= 1) {
    const c = LEFT_TO_RIGHT[i];
    out[i] = x + c.w / 2;
    x += c.w + GAP + (c.kind === 'wagon' && c.gap ? WORD_GAP : 0);
  }
  return out;
})();

const START = 0.66; // posisi awal lokomotif sepanjang lintasan: kereta sudah terlihat saat halaman dibuka
const SPEED = 52; // piksel per detik

export default function HillTrain() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ path: string; len: number; scale: number } | null>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const path = scalePath(CREST_D, w / VIEW_W, h / VIEW_H);
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', path);
      const scale = parseFloat(getComputedStyle(el).getPropertyValue('--s')) || 0.5;
      setGeo({ path, len: p.getTotalLength(), scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dur = geo ? geo.len / SPEED : 30;

  return (
    <div
      ref={box}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [--s:0.4] sm:[--s:0.5] lg:[--s:0.64] ${running ? '' : 'hill-paused'}`}
    >
      {geo &&
        LEFT_TO_RIGHT.map((car, i) => {
          const pos = START - (CENTERS[i] * geo.scale) / geo.len;
          const style: CSSProperties = {
            offsetPath: `path('${geo.path}')`,
            offsetRotate: 'auto',
            offsetAnchor: '50% 100%',
            offsetDistance: `${Math.max(pos, 0) * 100}%`,
            animationName: reduce ? 'none' : 'hill-train',
            animationDuration: `${dur}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${-pos * dur}s`,
            width: car.w,
          };
          return (
            <div key={i} className="absolute left-0 top-0 will-change-[offset-distance]" style={style}>
              <div className="origin-bottom" style={{ transform: `scale(${geo.scale})` }}>
                <CarView car={car} index={i} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

/** Roda berjari-jari yang berputar (sama dengan footer) */
function Wheel() {
  return (
    <svg viewBox="0 0 20 20" className="train-wheel h-5 w-5">
      <circle cx="10" cy="10" r="9" fill="#1B2559" />
      <circle cx="10" cy="10" r="5.5" fill="#FFD23F" />
      <path d="M10 4.5 V15.5 M4.5 10 H15.5" stroke="#1B2559" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="1.8" fill="#1B2559" />
    </svg>
  );
}

function CarView({ car, index }: { car: Car; index: number }) {
  if (car.kind === 'mascot') {
    return (
      <div className="relative flex flex-col items-center">
        <div className="train-bob relative grid h-12 w-16 place-items-center rounded-xl bg-rose-400">
          <Star face className="absolute -top-7 w-11" />
        </div>
        <div className="-mt-2 flex gap-4"><Wheel /><Wheel /></div>
      </div>
    );
  }
  if (car.kind === 'wagon') {
    return (
      <div className="relative flex flex-col items-center">
        <span className={`absolute bottom-5 h-1 rounded bg-night/70 ${car.gap ? '-left-7 w-8' : '-left-2 w-3'}`} />
        <div className={`train-bob relative grid h-12 w-14 place-items-center rounded-xl ${car.body}`} style={{ animationDelay: `${(index - 1) * 0.12}s` }}>
          <span className={`absolute inset-x-0 top-0 h-2 rounded-t-xl ${car.roof}`} />
          <span className="font-display text-2xl font-bold text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.15)]">{car.letter}</span>
        </div>
        <div className="-mt-2 flex gap-3"><Wheel /><Wheel /></div>
      </div>
    );
  }
  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute -left-2 bottom-5 h-1 w-3 rounded bg-night/70" />
      <div className="train-bob relative h-16 w-24">
        <span className="train-puff absolute -top-8 right-3 h-5 w-5 rounded-full bg-white" />
        <span className="train-puff absolute -top-8 right-3 h-4 w-4 rounded-full bg-white [animation-delay:0.6s]" />
        <span className="train-puff absolute -top-8 right-3 h-3 w-3 rounded-full bg-white [animation-delay:1.2s]" />
        <span className="absolute -top-4 right-4 h-6 w-4 rounded-t-md bg-night" />
        <span className="absolute -top-5 right-3 h-2 w-6 rounded bg-night-700" />
        <div className="absolute bottom-0 left-0 h-full w-11 rounded-xl rounded-tr-none bg-night">
          <span className="absolute left-2 top-2.5 h-5 w-6 rounded-md bg-sky-200" />
        </div>
        <div className="absolute bottom-0 right-0 h-10 w-[4.25rem] rounded-xl rounded-r-[1.25rem] bg-night-700">
          <Star className="absolute right-2 top-1/2 w-6 -translate-y-1/2" />
        </div>
      </div>
      <div className="-mt-2 flex gap-5"><Wheel /><Wheel /></div>
    </div>
  );
}
