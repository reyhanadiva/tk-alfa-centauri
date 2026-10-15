import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Star, Heart, ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA & KONFIGURASI                                                  */
/* ------------------------------------------------------------------ */

const BG_BASE = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b';
const BG_WIDTHS = [800, 1200, 2022];
const bgUrl = (w) => `${BG_BASE}?q=75&w=${w}&auto=format&fit=crop`;

const YAYASAN_URL = 'https://alfacentauri.sch.id/yayasan/';

// Bentuk organik lembut di sudut kartu (sentuhan ceria), bergerak sangat pelan.
const BLOBS = [
  {
    position: '-top-16 -right-16 md:-top-24 md:-right-24',
    size: 'w-56 h-56 md:w-80 md:h-80',
    shape: 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]',
    color: 'bg-white/15',
    duration: 18,
    rotate: 25,
  },
  {
    position: '-bottom-20 -left-20 md:-bottom-28 md:-left-24',
    size: 'w-64 h-64 md:w-96 md:h-96',
    shape: 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]',
    color: 'bg-yellow-300/20',
    duration: 22,
    rotate: -25,
  },
];

// Ornamen kecil tersisa: hanya hati (bintang kini jadi motif dua bintang di dekat headline)
const ORNAMENTS = [
  {
    Icon: Heart,
    position: 'top-[24%] right-[10%] md:right-[16%]',
    size: 'w-9 h-9 md:w-11 md:h-11',
    color: 'text-rose-300 fill-rose-300',
    opacity: 'opacity-80',
    duration: 5, y: -15, delay: 1, rotate: [0, 20, 0],
    hideOnMobile: true,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
// Garis bawah "Finest" digambar perlahan setelah teks muncul
const underlineVariants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.9, delay: 0.7, ease: 'easeInOut' } },
};
// Versi tanpa gerak untuk pengguna dengan prefers-reduced-motion
const staticVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};
const staticUnderlineVariants = {
  hidden: { pathLength: 1 },
  show: { pathLength: 1 },
};

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Motif dua bintang: lambang kesuksesan di dunia dan akhirat
const TwoStars = ({ variants, reduceMotion }) => (
  <motion.div
    variants={variants}
    className="flex items-end justify-center gap-2 md:gap-3 mb-6"
    aria-hidden="true"
  >
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-6, 6, -6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Star className="w-10 h-10 md:w-14 md:h-14 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_18px_rgba(253,224,71,0.55)]" />
    </motion.div>
    <motion.div
      className="-mb-2 md:-mb-3"
      animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [6, -6, 6] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
    >
      <Star className="w-14 h-14 md:w-20 md:h-20 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_22px_rgba(253,224,71,0.6)]" />
    </motion.div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

/**
 * Props:
 * - overlapHero (default true): kartu "naik" menimpa bagian bawah hero agar transisi terasa mengalir.
 *   Pastikan hero punya padding bawah ekstra (~80-100px) supaya kontennya tidak tertutup.
 *   Set ke false untuk kembali ke tampilan section terpisah (latar putih penuh).
 */
const TentangKami = ({ overlapHero = true }) => {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  // Parallax halus untuk foto latar mengikuti scroll
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const item = reduceMotion ? staticVariants : itemVariants;
  const underline = reduceMotion ? staticUnderlineVariants : underlineVariants;

  const sectionClass = overlapHero
    ? 'relative z-10 mt-6 md:mt-10 pb-16'
    : 'bg-white py-16';

  return (
    <section
      className={`w-full px-4 md:px-6 lg:px-8 ${sectionClass}`}
      aria-labelledby="tentang-kami-title"
    >
      <div
        ref={cardRef}
        className="relative w-full mx-auto min-h-[60vh] md:min-h-[70vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_-12px_40px_rgba(79,70,229,0.18),0_25px_50px_rgba(49,46,129,0.28)] flex flex-col items-center justify-center bg-sky-600"
      >
        {/* =========================================
            BACKGROUND (foto + overlay hangat/ceria)
        ========================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {imgFailed ? (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500" />
          ) : (
            <motion.div
              className="absolute inset-0"
              style={reduceMotion ? undefined : { y: bgY }}
            >
              <img
                src={bgUrl(2022)}
                srcSet={BG_WIDTHS.map((w) => `${bgUrl(w)} ${w}w`).join(', ')}
                sizes="100vw"
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover scale-[1.2]"
              />
            </motion.div>
          )}
          {/* Overlay gradient biru → indigo → magenta (menggantikan slate gelap). Atur angka /xx untuk intensitas. */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600/60 via-indigo-600/50 to-fuchsia-600/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-950/35" />
        </div>

        {/* =========================================
            BLOB + ORNAMEN (dekoratif)
        ========================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          {BLOBS.map((b, i) => (
            <motion.div
              key={`blob-${i}`}
              className={`absolute ${b.position} ${b.size} ${b.shape} ${b.color} backdrop-blur-sm`}
              animate={reduceMotion ? undefined : { rotate: [0, b.rotate, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {ORNAMENTS.map(({ Icon, position, size, color, opacity, duration, y, delay, rotate, hideOnMobile }, i) => (
            <motion.div
              key={`orn-${i}`}
              className={`absolute ${position} ${opacity} ${hideOnMobile ? 'hidden md:block' : ''}`}
              animate={reduceMotion ? undefined : { y: [0, y, 0], rotate }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
            >
              <Icon className={`${size} ${color} drop-shadow-xl`} />
            </motion.div>
          ))}
        </div>

        {/* =========================================
            KONTEN UTAMA (muncul bertahap saat masuk layar)
        ========================================= */}
        <motion.div
          className="relative z-20 flex flex-col items-center px-6 py-20 text-center max-w-4xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TwoStars variants={item} reduceMotion={reduceMotion} />

          {/* Headline: "Finest" dengan garis bawah bergelombang bergaya tangan */}
          <motion.h2
            id="tentang-kami-title"
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight w-full text-balance drop-shadow-[0_2px_12px_rgba(30,27,75,0.45)]"
          >
            To Be The{' '}
            <span className="relative inline-block text-yellow-300">
              Finest
              <svg
                viewBox="0 0 120 12"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-2.5 md:h-3.5 overflow-visible"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 7 C 14 1, 26 12, 40 6 S 66 1, 80 6 S 106 11, 118 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  variants={underline}
                />
              </svg>
            </span>{' '}
            School In The World
          </motion.h2>

          {/* Paragraf: link ke yayasan menempel di tulisan nilai-nilainya */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-white/95 leading-relaxed font-medium max-w-3xl mx-auto text-pretty drop-shadow-[0_1px_6px_rgba(30,27,75,0.5)]"
          >
            Berpijak pada filosofi dua bintang yang melambangkan kesuksesan di{' '}
            <strong className="text-white font-bold">dunia dan akhirat</strong>, kami hadir untuk
            membentuk generasi yang{' '}
            <a
              href={YAYASAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-yellow-300 hover:text-white underline underline-offset-4 decoration-yellow-300/50 hover:decoration-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200"
            >
              Taqwa, Cerdas, dan Kreatif
              <ArrowUpRight className="inline-block w-4 h-4 md:w-5 md:h-5 ml-0.5 -mt-1" aria-hidden="true" />
              <span className="sr-only"> (membuka halaman yayasan di tab baru)</span>
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TentangKami;