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

type Car = { kind: 'loco' | 'wagon'; letter?: string; body?: string; roof?: string; gap?: boolean };

const PALETTE = [
  { body: '#38BDF8', roof: '#0284C7' },
  { body: '#34D399', roof: '#059669' },
  { body: '#A78BFA', roof: '#7C3AED' },
  { body: '#FBBF24', roof: '#D97706' },
];
const WORDS = ['ALFA', 'CENTAURI'];
// Urutan dari depan ke belakang: lokomotif, lalu CENTAURI dari belakang ke depan dibaca kiri-ke-kanan
const CARS: Car[] = [
  { kind: 'loco' },
  ...[...WORDS[1]].reverse().map((letter, i, arr) => ({
    kind: 'wagon' as const,
    letter,
    ...PALETTE[(arr.length - 1 - i + 2) % PALETTE.length],
    gap: i === arr.length - 1 ? false : false,
  })),
  ...[...WORDS[0]].reverse().map((letter, i, arr) => ({
    kind: 'wagon' as const,
    letter,
    ...PALETTE[(arr.length - 1 - i) % PALETTE.length],
    gap: i === 0,
  })),
];

const START = 0.62; // posisi awal lokomotif sepanjang lintasan (±62%): kereta sudah terlihat saat halaman dibuka
const SPEED = 52; // piksel per detik

export default function HillTrain() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ path: string; len: number; unit: number } | null>(null);
  const [running, setRunning] = useState(true);

  // Hitung lintasan dalam piksel (dan panjangnya) setiap ukuran wadah berubah
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
      const unit = parseFloat(getComputedStyle(el).getPropertyValue('--w')) || 28;
      setGeo({ path, len: p.getTotalLength(), unit });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Jeda saat hero tidak terlihat (hemat CPU/baterai, terutama di HP)
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
      className="pointer-events-none absolute inset-0 [--w:22px] [--h:19px] sm:[--w:28px] sm:[--h:25px] lg:[--w:38px] lg:[--h:33px]"
    >
      {geo &&
        CARS.map((car, i) => {
          // jarak antar-gerbong sepanjang lintasan (+ jarak kopling), gerbong "CENTAURI" diberi jeda lebih lebar dari "ALFA"
          const spacing = geo.unit * 1.12 * i + (CARS.slice(0, i + 1).filter((c) => c.gap).length ? geo.unit * 0.5 : 0) + (i > 0 ? geo.unit * 0.55 : 0);
          const pos = START - spacing / geo.len;
          const style: CSSProperties & Record<string, string | number> = {
            offsetPath: `path('${geo.path}')`,
            offsetRotate: 'auto',
            offsetAnchor: '50% 100%',
            offsetDistance: `${Math.max(pos, 0) * 100}%`,
            animationName: reduce ? 'none' : 'hill-train',
            animationDuration: `${dur}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${-pos * dur}s`,
            animationPlayState: running ? 'running' : 'paused',
          };
          return (
            <div key={i} className="absolute left-0 top-0 will-change-[offset-distance]" style={style}>
              {/* gronjal-gronjal: tiap gerbong memantul dengan jeda berbeda */}
              <div
                className={reduce ? '' : 'hill-bob'}
                style={{ animationDelay: `${-(i * 0.13).toFixed(2)}s`, animationPlayState: running ? 'running' : 'paused' }}
              >
                {car.kind === 'loco' ? <Loco /> : <Wagon car={car} />}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function Wheels({ n = 2 }: { n?: number }) {
  return (
    <div className="absolute inset-x-[10%] bottom-0 flex justify-between">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="block h-[28%] min-h-[4px] aspect-square rounded-full bg-night ring-[1.5px] ring-sunny" />
      ))}
    </div>
  );
}

function Wagon({ car }: { car: Car }) {
  return (
    <div className="relative" style={{ width: 'var(--w)', height: 'calc(var(--h) + 4px)' }}>
      <div
        className="absolute inset-x-0 top-0 grid place-items-center rounded-[22%] shadow-[0_2px_0_0_rgba(0,0,0,0.18)]"
        style={{ height: 'var(--h)', background: car.body }}
      >
        <span className="absolute inset-x-0 top-0 h-[16%] rounded-t-[22%]" style={{ background: car.roof }} />
        <span className="font-display font-bold leading-none text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]" style={{ fontSize: 'calc(var(--h) * 0.62)' }}>
          {car.letter}
        </span>
      </div>
      <Wheels />
    </div>
  );
}

function Loco() {
  return (
    <div className="relative" style={{ width: 'calc(var(--w) * 1.55)', height: 'calc(var(--h) * 1.1 + 4px)' }}>
      {/* cerobong + asap */}
      <span className="absolute right-[22%] top-0 h-[26%] w-[16%] rounded-t-[2px] bg-night" />
      {/* kabin */}
      <div className="absolute left-0 bottom-[4px] w-[42%] rounded-[16%] rounded-tr-none bg-night" style={{ height: 'calc(var(--h) * 1.05)' }}>
        <span className="absolute left-[18%] top-[22%] h-[34%] w-[56%] rounded-[2px] bg-sky-200" />
      </div>
      {/* badan depan */}
      <div className="absolute bottom-[4px] right-0 w-[62%] rounded-[18%] rounded-r-[40%] bg-night-700" style={{ height: 'calc(var(--h) * 0.8)' }}>
        <Star className="absolute right-[14%] top-1/2 w-[34%] -translate-y-1/2" />
      </div>
      <Wheels n={3} />
    </div>
  );
}
