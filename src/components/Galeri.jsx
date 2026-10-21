import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion, AnimatePresence, useReducedMotion, useInView,
  useMotionValue, useSpring, useScroll, useTransform
} from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Play, Pause, Maximize2, X,
  Star, Music, Palette, Smile, Heart, Sparkles, ImageOff
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA & KONSTANTA                                                    */
/* ------------------------------------------------------------------ */

// Data default (mockup). Nanti bisa dikirim lewat prop `items` dari CMS/API.
const DEFAULT_ITEMS = [
  {
    title: "Kreativitas Seni",
    desc: "Ananda bebas berekspresi mewarnai dunia mereka",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Eksplorasi Alam",
    desc: "Belajar langsung dari lingkungan hijau sekitar",
    img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Bermain Bersama",
    desc: "Membangun empati, kepedulian, dan interaksi sosial",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Kunjungan Edukatif",
    desc: "Pengalaman seru belajar di luar ruang kelas",
    img: "https://images.unsplash.com/photo-1514050566906-8fb50b9b3cc1?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Pentas Seni",
    desc: "Melatih keberanian dan rasa percaya diri ananda",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70"
  }
];

// `hueShift` = selisih hue dari warna dominan foto aktif, supaya ikon tidak monoton satu warna.
// `color` = warna cadangan kalau warna foto gagal dibaca (mis. CORS).
const FLOATING_ICONS = [
  { Icon: Star, size: 32, top: '18%', left: '10%', delay: 0, color: 'text-yellow-400', hueShift: 0 },
  { Icon: Music, size: 28, top: '65%', left: '12%', delay: 1, color: 'text-blue-400', hueShift: 40 },
  { Icon: Palette, size: 36, top: '22%', right: '12%', delay: 0.5, color: 'text-pink-400', hueShift: -40 },
  { Icon: Smile, size: 30, top: '70%', right: '14%', delay: 1.5, color: 'text-orange-400', hueShift: 80 },
  { Icon: Heart, size: 24, top: '42%', left: '6%', delay: 2, color: 'text-red-400', hueShift: -80 },
  { Icon: Sparkles, size: 26, top: '48%', right: '8%', delay: 0.8, color: 'text-yellow-300', hueShift: 20 },
];

const AUTOPLAY_MS = 2800;
const WAVE_PATH =
  "M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,176C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

/* ------------------------------------------------------------------ */
/* HELPER & HOOKS                                                      */
/* ------------------------------------------------------------------ */

// Hue dominan (0-360) dari sebuah gambar; abaikan piksel abu-abu/terlalu gelap/terang.
const getDominantHue = (img) => {
  const size = 24;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let x = 0;
  let y = 0;
  let weightSum = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const l = (max + min) / 2;
    if (d < 0.08) continue;

    const s = d / (1 - Math.abs(2 * l - 1) || 1);
    let h;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;

    const weight = s * (1 - Math.abs(2 * l - 1)); // utamakan warna jenuh & tidak terlalu gelap/terang
    const rad = (h * Math.PI) / 180;
    x += Math.cos(rad) * weight;
    y += Math.sin(rad) * weight;
    weightSum += weight;
  }
  if (weightSum <= 0) return null;
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
};

// Menghitung hue dominan tiap foto sekaligus preload gambarnya.
const useDominantHues = (items) => {
  const [hues, setHues] = useState({});
  const key = items.map((i) => i.img).join('|');

  useEffect(() => {
    let cancelled = false;
    items.forEach((item, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const h = getDominantHue(img);
          if (!cancelled && h !== null) setHues((p) => ({ ...p, [idx]: h }));
        } catch (e) {
          /* canvas tercemar (CORS) -> pakai warna cadangan */
        }
      };
      img.onerror = () => {
        // Tetap preload tanpa CORS; warna ikon pakai cadangan
        const plain = new Image();
        plain.src = item.img;
      };
      img.src = item.img;
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return hues;
};

const readIsMobile = (breakpoint) =>
  typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;

// Deteksi mobile. Nilai awal dibaca langsung (bukan false dulu), supaya di HP kartu tidak
// sempat tampil dengan posisi desktop lalu "meluncur" ke posisi mobile saat halaman dibuka.
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => readIsMobile(breakpoint));
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
};

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Tampilan cadangan kalau foto gagal dimuat
const ImageFallback = ({ className = '' }) => (
  <div
    className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 text-night/60 ${className}`}
    role="img"
    aria-label="Foto tidak dapat dimuat"
  >
    <ImageOff className="w-10 h-10" />
    <span className="text-sm font-medium">Foto tidak dapat dimuat</span>
  </div>
);

const Wave = ({ fill, className = '' }) => (
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={`block w-full ${className}`} aria-hidden="true">
    <path fill={fill} d={WAVE_PATH} />
  </svg>
);

const GalleryCard = ({
  item, index, total, isActive, transform, hasFailed,
  onFail, onClick, onExpand, reduceMotion,
}) => {
  const interactive = !transform.hidden;

  return (
    <motion.div
      initial={false}
      animate={{
        x: transform.x,
        z: transform.z,
        rotateY: transform.rotateY,
        scale: transform.scale,
        opacity: transform.opacity,
      }}
      whileHover={!isActive && interactive ? { scale: transform.scale * 1.04 } : undefined}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 28 }}
      style={{ zIndex: transform.zIndex }}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} dari ${total}: ${item.title}`}
      aria-hidden={transform.hidden || undefined}
      // Kartu samping hanya untuk klik mouse/sentuh. Pengguna keyboard memakai tombol panah,
      // tombol sebelumnya/berikutnya, dan titik indikator, sehingga kartu ini tidak perlu jadi tab stop.
      onClick={() => interactive && onClick()}
      className={`absolute w-[75vw] max-w-[340px] md:max-w-[420px] h-[380px] md:h-[480px] rounded-[2rem] overflow-hidden will-change-transform bg-slate-200
        ${!interactive ? 'pointer-events-none' : ''}
        ${isActive
          ? 'shadow-[0_25px_50px_rgba(0,0,0,0.2)] border border-white/60 cursor-zoom-in'
          : 'shadow-lg border border-white/30 cursor-pointer hover:border-white/80'}`}
    >
      {hasFailed ? (
        <ImageFallback className="absolute inset-0 w-full h-full pointer-events-none" />
      ) : (
        <img
          src={item.img}
          alt={item.title}
          loading={index === 0 ? 'eager' : 'lazy'}
          draggable={false}
          onError={onFail}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* Tombol Expand: petunjuk + jalur keyboard; klik di mana saja pada kartu aktif juga membuka modal */}
      <AnimatePresence>
        {isActive && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            aria-label={`Perbesar foto ${item.title}`}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-md border border-white/50 rounded-full text-slate-800 text-xs font-semibold hover:bg-white transition-colors shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Expand
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel kaca kecil agar foto tetap terlihat */}
      <div
        aria-hidden={!isActive}
        className={`absolute bottom-3 inset-x-3 md:bottom-4 md:inset-x-4 rounded-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150 border border-white/30 ring-1 ring-inset ring-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-3 md:px-5 md:py-3.5 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        {/* Tint gelap sangat tipis di belakang teks agar tetap terbaca di foto terang */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-black/30 via-black/15 to-black/5" />
        <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">{item.title}</h3>
        <p className="text-white/90 text-sm leading-relaxed font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const GalleryControls = ({
  items, currentIndex, isPlaying, autoRunning,
  onPrev, onNext, onTogglePlay, onGoTo,
}) => (
  <div className="flex flex-col items-center gap-4 relative z-30">
    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-lg border border-white/50 rounded-full shadow-md">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Foto sebelumnya"
        className="p-2 rounded-full text-night/80 hover:bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Jeda slideshow' : 'Putar slideshow'}
        className="p-2.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 mx-2 cursor-pointer"
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Foto berikutnya"
        className="p-2 rounded-full text-night/80 hover:bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>

    {/* Titik indikator: area sentuh diperbesar lewat padding (visualnya tetap sekecil semula) */}
    <div className="flex items-center">
      {items.map((item, idx) => {
        const isCurrent = currentIndex === idx;
        return (
          <button
            type="button"
            key={item.title + idx}
            onClick={() => onGoTo(idx)}
            aria-label={`Ke foto ${idx + 1}: ${item.title}`}
            aria-current={isCurrent ? 'true' : undefined}
            className="group p-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <span
              className={`relative block h-2 rounded-full overflow-hidden transition-all duration-300 ${isCurrent ? 'w-8 bg-blue-200' : 'w-2 bg-slate-300 group-hover:bg-slate-400'}`}
            >
              {isCurrent && (
                // Progress autoplay: terisi selama AUTOPLAY_MS, penuh statis saat dijeda
                <motion.span
                  key={`${currentIndex}-${autoRunning}`}
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                  initial={{ width: autoRunning ? '0%' : '100%' }}
                  animate={{ width: '100%' }}
                  transition={autoRunning ? { duration: AUTOPLAY_MS / 1000, ease: 'linear' } : { duration: 0 }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

/**
 * Props:
 * - items: [{ title, desc, img }] (default: data mockup)
 * - bottomWaveColor: warna ombak bawah; samakan dengan warna latar halaman (cream #FFF9EE).
 */
const Galeri = ({ items = DEFAULT_ITEMS, bottomWaveColor = '#FFF9EE' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // fokus keyboard di dalam galeri
  const [isExpanded, setIsExpanded] = useState(false);
  const [failed, setFailed] = useState({});

  const sectionRef = useRef(null);
  const justPanned = useRef(false); // cegah "klik" tidak sengaja setelah swipe/drag
  const closeBtnRef = useRef(null);
  const lastFocused = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const hues = useDominantHues(items);
  const total = items.length;

  const markFailed = useCallback(
    (i) => setFailed((p) => (p[i] ? p : { ...p, [i]: true })),
    []
  );
  const goTo = useCallback(
    (index) => setCurrentIndex(((index % total) + total) % total),
    [total]
  );
  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % total), [total]);
  const handlePrev = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % total), [total]);

  const autoRunning =
    isPlaying && !isHovering && !isFocused && !isExpanded && !reduceMotion && inView && total > 1;

  // Pengguna reduce motion: autoplay tidak jalan, jadi tombolnya juga harus menampilkan "Putar", bukan "Jeda".
  useEffect(() => {
    if (reduceMotion) setIsPlaying(false);
  }, [reduceMotion]);

  /* ---------- PARALLAX background (mouse + scroll) ---------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const bgY = useTransform([scrollShift, smoothY], ([s, m]) => s + m);

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * -24);
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ---------- EFFECTS ---------- */
  // Autoplay: setTimeout per-slide -> navigasi manual otomatis mereset timer
  useEffect(() => {
    if (!autoRunning) return;
    const t = setTimeout(handleNext, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [currentIndex, autoRunning, handleNext]);

  // Kunci scroll halaman saat modal terbuka
  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isExpanded]);

  // Fokus: masuk ke tombol Tutup saat modal terbuka, kembali ke pemicu saat modal ditutup
  useEffect(() => {
    if (isExpanded) {
      closeBtnRef.current?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus?.();
      lastFocused.current = null;
    }
  }, [isExpanded]);

  const openModal = () => {
    lastFocused.current = document.activeElement;
    setIsExpanded(true);
  };
  const closeModal = () => setIsExpanded(false);

  // Panah kiri/kanan hanya bekerja saat carousel sedang difokus (sebelumnya global di seluruh halaman,
  // sehingga bisa bentrok dengan slider lain atau kolom isian yang sedang diketik).
  const handleCarouselKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Keyboard di dalam modal: Esc, panah, dan Tab dikurung di dalam dialog
  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'ArrowRight') {
      handleNext();
      return;
    }
    if (e.key === 'ArrowLeft') {
      handlePrev();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusables = e.currentTarget.querySelectorAll('button');
    if (!focusables.length) return;
    const first = focusables[0];
    const lastEl = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      first.focus();
    }
  };

  /* ---------- POSISI KARTU ---------- */
  const getTransform = (index) => {
    let offset = index - currentIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const absOffset = Math.abs(offset);
    const direction = Math.sign(offset);

    if (absOffset === 0) {
      return { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 50, hidden: false };
    }

    if (isMobile) {
      // Mobile: satu kartu utama + sedikit "intip" kartu tetangga; sisanya disembunyikan
      return {
        x: direction * 100,
        z: -60,
        rotateY: direction * -12,
        scale: 0.92,
        opacity: absOffset === 1 ? 0.75 : 0,
        zIndex: 40 - absOffset,
        hidden: absOffset > 1,
      };
    }

    const baseSpacing = 230;
    return {
      x: direction * (baseSpacing + (absOffset - 1) * baseSpacing * 0.7),
      z: absOffset * -80,
      rotateY: direction * -20,
      scale: 1,
      opacity: Math.max(1 - absOffset * 0.2, 0.6),
      zIndex: 40 - absOffset,
      hidden: false,
    };
  };

  const handleCardClick = (index) => {
    if (justPanned.current) return;
    if (index === currentIndex) openModal();
    else goTo(index);
  };

  const active = items[currentIndex];
  if (!active) return null;

  const activeHue = hues[currentIndex];

  return (
    <section
      id="galeri"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-between pt-32 pb-32 overflow-hidden bg-cream"
      aria-roledescription="carousel"
      aria-label="Galeri Kegiatan Sekolah"
    >
      {/* Pengumuman untuk pembaca layar. Dimatikan saat autoplay berjalan agar tidak "berisik" tiap pergantian slide. */}
      <p className="sr-only" aria-live={autoRunning ? 'off' : 'polite'} aria-atomic="true">
        {`${active.title}. ${active.desc}. Foto ${currentIndex + 1} dari ${total}.`}
      </p>

      {/* 1. BACKGROUND LIGHT GLASS + PARALLAX */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { x: smoothX, y: bgY }}
        >
          <AnimatePresence mode="popLayout">
            {!failed[currentIndex] && (
              <motion.img
                key={currentIndex}
                src={active.img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onError={() => markFailed(currentIndex)}
                className="absolute inset-0 w-full h-full object-cover blur-[8px] scale-110"
                alt=""
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </motion.div>
        {failed[currentIndex] && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100" />
        )}
        {/* Tanpa backdrop-blur di sini: foto sudah di-blur, dan backdrop-blur seukuran section
            memaksa browser menghitung ulang blur setiap frame saat parallax bergerak (berat di HP). */}
        <div className="absolute inset-0 bg-white/10 z-10"></div>
      </div>

      {/* FLOATING ELEMENTS: warna mengikuti foto aktif (fallback ke warna bawaan) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
        {FLOATING_ICONS.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute drop-shadow-md opacity-70 ${activeHue == null ? item.color : ''}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              color: activeHue == null ? undefined : `hsl(${(activeHue + item.hueShift + 360) % 360} 80% 58%)`,
              transition: 'color 1s ease',
            }}
            animate={reduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          >
            <item.Icon size={item.size} fill="currentColor" className="opacity-80" />
          </motion.div>
        ))}
      </div>

      {/* TRANSISI OMBAK ATAS (putih, menyatu dengan section di atasnya) */}
      <div className="absolute -top-px left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none z-20">
        <Wave fill="#FFF9EE" className="h-[60px] md:h-[100px]" />
      </div>

      <div
        className="relative z-30 w-full max-w-7xl mx-auto px-4 flex flex-col items-center my-auto"
        // Autoplay ikut berhenti saat pengguna menavigasi dengan keyboard (hanya fokus keyboard,
        // bukan fokus akibat klik mouse, supaya slideshow tidak "macet" setelah menekan tombol Putar).
        onFocus={(e) => {
          if (e.target.matches?.(':focus-visible')) setIsFocused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
        }}
      >

        {/* JUDUL */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/50 backdrop-blur-xl border border-white/70 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <Sparkles className="w-6 h-6 text-blue-500 hidden md:block" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Galeri Kegiatan Sekolah
            </h2>
            <Sparkles className="w-6 h-6 text-pink-500 hidden md:block" aria-hidden="true" />
          </div>
        </div>

        {/* 3D CAROUSEL (tanpa preserve-3d agar z-index & klik kartu samping berfungsi) */}
        <motion.div
          tabIndex={0}
          aria-label="Foto kegiatan. Gunakan tombol panah kiri dan kanan untuk berpindah foto."
          onKeyDown={handleCarouselKeyDown}
          className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center mb-10 touch-pan-y select-none rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onPan={(_, info) => {
            if (Math.abs(info.offset.x) > 6) justPanned.current = true;
          }}
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) handleNext();
            else if (info.offset.x > 50) handlePrev();
            setTimeout(() => { justPanned.current = false; }, 120);
          }}
        >
          {items.map((item, index) => (
            <GalleryCard
              key={item.title + index}
              item={item}
              index={index}
              total={total}
              isActive={currentIndex === index}
              transform={getTransform(index)}
              hasFailed={!!failed[index]}
              onFail={() => markFailed(index)}
              onClick={() => handleCardClick(index)}
              onExpand={openModal}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* KONTROL NAVIGASI */}
        <GalleryControls
          items={items}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          autoRunning={autoRunning}
          onPrev={handlePrev}
          onNext={handleNext}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onGoTo={goTo}
        />
      </div>

      {/* TRANSISI OMBAK BAWAH (warna via prop bottomWaveColor) */}
      <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <Wave fill={bottomWaveColor} className="h-[60px] md:h-[90px]" />
      </div>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            onKeyDown={handleModalKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-night/80 backdrop-blur-xl p-4 cursor-zoom-out outline-none"
          >
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Tutup"
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              aria-label="Foto sebelumnya"
              className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {failed[currentIndex] ? (
                <motion.div
                  key={`fail-${currentIndex}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ImageFallback className="w-[min(90vw,640px)] h-[50vh] rounded-2xl cursor-default" />
                </motion.div>
              ) : (
                <motion.img
                  key={currentIndex}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  src={active.img}
                  alt={active.title}
                  onError={() => markFailed(currentIndex)}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[78vh] rounded-2xl shadow-2xl object-contain cursor-default"
                />
              )}
            </AnimatePresence>

            <div className="text-center text-white" onClick={(e) => e.stopPropagation()}>
              <p className="text-xl font-bold">{active.title}</p>
              <p className="text-white/80 text-sm md:text-base">{active.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Galeri;