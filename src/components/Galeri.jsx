import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ImageOff, Maximize2 } from 'lucide-react';
import { Cloud, Floaty, Sparkle, Squiggle } from './ui/Ornaments';

/*
  Galeri: "dinding foto" ala English Now, versi ceria.
  - Kolom-kolom foto berjalan naik & turun bergantian tanpa putus; kolom di pinggir sedikit miring
    menghadap ke tengah, seperti dinding melengkung.
  - Tiap foto berbingkai polaroid dengan STIKER nama kegiatan (jadi judul tetap terbaca).
  - Berhenti saat disorot; klik foto untuk membuka versi besar beserta keterangannya.
  - "Kurangi animasi": dinding diam.
*/

// Data default (mockup). Nanti bisa dikirim lewat prop `items` dari CMS/API.
// TODO: ganti dengan foto kegiatan asli (taruh di folder public, mis. '/images/galeri/seni.jpg').
const DEFAULT_ITEMS = [
  {
    title: 'Kreativitas Seni',
    desc: 'Ananda bebas berekspresi mewarnai dunia mereka',
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Eksplorasi Alam',
    desc: 'Belajar langsung dari lingkungan hijau sekitar',
    img: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Bermain Bersama',
    desc: 'Membangun empati, kepedulian, dan interaksi sosial',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Kunjungan Edukatif',
    desc: 'Pengalaman seru belajar di luar ruang kelas',
    img: 'https://images.unsplash.com/photo-1514050566906-8fb50b9b3cc1?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Pentas Seni',
    desc: 'Melatih keberanian dan rasa percaya diri ananda',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=70',
  },
];

// Warna stiker per foto (urutan aksen tetap: sky → emerald → violet → amber → rose)
const STICKERS = [
  'bg-sky-400 text-white shadow-[0_3px_0_0_#0284c7]',
  'bg-emerald-400 text-white shadow-[0_3px_0_0_#059669]',
  'bg-violet-400 text-white shadow-[0_3px_0_0_#7c3aed]',
  'bg-sunny text-night shadow-[0_3px_0_0_#E8B408]',
  'bg-rose-400 text-white shadow-[0_3px_0_0_#e11d48]',
];

// variasi bentuk foto supaya dinding terasa hidup (bukan grid kaku)
const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[5/4]', 'aspect-[4/5]', 'aspect-[1/1.1]'];

// pengaturan tiap kolom: arah, kecepatan, kemiringan (kolom pinggir menghadap ke tengah)
const COLUMNS = [
  { dir: 'up', dur: 46, tilt: 14, scale: 1.06, show: '' },
  { dir: 'down', dur: 54, tilt: 6, scale: 1, show: '' },
  { dir: 'up', dur: 50, tilt: 0, scale: 0.96, show: 'hidden md:block' },
  { dir: 'down', dur: 58, tilt: -6, scale: 1, show: 'hidden lg:block' },
  { dir: 'up', dur: 48, tilt: -14, scale: 1.06, show: 'hidden lg:block' },
];

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-sky-100 via-pink-100 to-amber-100 text-night/40 ${className}`}>
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

/** Satu foto berbingkai polaroid dengan stiker nama kegiatan */
function Tile({ item, index, copy, onOpen }) {
  const tilt = index % 2 ? 'rotate-[2deg]' : '-rotate-[2deg]';
  return (
    <li className="pb-5" aria-hidden={copy || undefined}>
      <button
        type="button"
        tabIndex={copy ? -1 : 0}
        onClick={() => onOpen(index)}
        aria-label={`Lihat foto ${item.title}`}
        className={`group relative block w-full rounded-[1.6rem] bg-white p-2 pb-2.5 text-left shadow-[0_6px_0_0_#E7ECF5] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] motion-reduce:transition-none focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 ${tilt}`}
      >
        <span className="relative block overflow-hidden rounded-[1.2rem] bg-slate-100">
          <Photo src={item.img} alt="" className={`w-full ${ASPECTS[index % ASPECTS.length]}`} />
          <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-night opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
        {/* stiker nama kegiatan, sedikit miring & menempel di tepi foto */}
        <span
          className={`absolute -bottom-3 left-3 max-w-[calc(100%-1.5rem)] -rotate-3 truncate rounded-xl px-3 py-1.5 font-display text-sm font-semibold sm:text-base ${STICKERS[index % STICKERS.length]}`}
        >
          {item.title}
        </span>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const Galeri = ({ items = DEFAULT_ITEMS }) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null); // index foto yang dibuka
  const closeBtnRef = useRef(null);
  const lastFocused = useRef(null);
  const total = items.length;

  const openAt = (i) => {
    lastFocused.current = document.activeElement;
    setOpen(i);
  };
  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setOpen((i) => (i - 1 + total) % total), [total]);

  // kunci scroll halaman + atur fokus saat lightbox terbuka/tertutup
  useEffect(() => {
    if (open === null) {
      lastFocused.current?.focus?.();
      lastFocused.current = null;
      return undefined;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const onModalKey = (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Tab') {
      const f = e.currentTarget.querySelectorAll('button');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const active = open !== null ? items[open] : null;

  return (
    <section id="galeri" className="relative w-full overflow-hidden py-24" aria-labelledby="galeri-title">
      <div className="dots absolute inset-0 opacity-50" aria-hidden="true" />
      <Cloud className="absolute left-[3%] top-14 hidden w-32 md:block" opacity={0.95} />
      <Cloud className="absolute right-[5%] top-24 hidden w-28 lg:block" opacity={0.9} />
      <Floaty className="hidden lg:block top-16 right-[24%]">
        <Sparkle className="w-7" color="#FFD23F" />
      </Floaty>
      <Floaty delay={1.2} className="hidden lg:block top-36 left-[20%]">
        <Sparkle className="w-5" color="#F472B6" />
      </Floaty>

      {/* Judul */}
      <motion.div
        className="relative z-10 mx-auto max-w-2xl px-4 text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="galeri-title" className="text-4xl font-semibold tracking-tight text-night text-balance md:text-5xl">
          Galeri Kegiatan{' '}
          <span className="relative inline-block whitespace-nowrap">
            Sekolah
            <Squiggle className="text-sunny" />
          </span>
        </h2>
        <p className="mt-5 text-lg font-medium text-night/70 text-pretty">
          Momen seru ananda belajar, bermain, dan bertumbuh bersama teman-teman. Ketuk foto untuk melihat lebih besar.
        </p>
      </motion.div>

      {/* Dinding foto */}
      <div
        className="group/wall relative mx-auto mt-10 h-[540px] max-w-7xl overflow-hidden px-4 [perspective:1400px] md:h-[600px] md:px-8 [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {COLUMNS.map((col, c) => {
            // tiap kolom memakai urutan foto yang digeser, supaya foto yang sama tidak berjajar
            const order = items.map((_, i) => (i + c * 2) % total);
            return (
              <div
                key={c}
                className={`${col.show} h-full pt-4`}
                style={reduce ? undefined : { transform: `rotateY(${col.tilt}deg) scale(${col.scale})` }}
              >
                <ul
                  className={`list-none p-0 m-0 ${reduce ? '' : col.dir === 'up' ? 'gallery-up' : 'gallery-down'} group-hover/wall:[animation-play-state:paused] focus-within:[animation-play-state:paused]`}
                  style={reduce ? undefined : { animationDuration: `${col.dur}s` }}
                >
                  {order.map((i) => (
                    <Tile key={`a-${i}`} item={items[i]} index={i} onOpen={openAt} />
                  ))}
                  {/* salinan untuk putaran tanpa putus */}
                  {!reduce && order.map((i) => <Tile key={`b-${i}`} item={items[i]} index={i} copy onOpen={openAt} />)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onKeyDown={onModalKey}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-night/80 p-4 backdrop-blur-md"
          >
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Tutup"
              onClick={close}
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white text-night shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 md:right-8 md:top-8"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 md:left-8"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 md:right-8"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="m-0 w-full max-w-3xl rounded-[2rem] bg-white p-3 pb-6 shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Photo src={active.img} alt={active.title} className="max-h-[68vh] w-full" />
                </div>
                <figcaption className="px-3 pt-5">
                  <span className={`inline-block -rotate-2 rounded-xl px-3 py-1.5 font-display text-lg font-semibold ${STICKERS[open % STICKERS.length]}`}>
                    {active.title}
                  </span>
                  <p className="mt-3 text-base font-medium text-night/75">{active.desc}</p>
                  <p className="mt-1 text-sm font-bold text-night/45">
                    Foto {open + 1} dari {total}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Galeri;
