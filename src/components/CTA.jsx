import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Star, Smile, Heart, Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA & KONFIGURASI                                                  */
/* ------------------------------------------------------------------ */

// Foto latar SEMENTARA (dummy). Ganti dengan foto asli, misalnya foto bersama murid dan guru:
// taruh di folder `public` lalu isi dengan '/images/cta.jpg'.
const BG_IMAGE = 'https://picsum.photos/seed/alfa-centauri-cta/1600/900';

// TODO: ganti dengan alamat halaman informasi pendaftaran yang sebenarnya.
const SPMB_HREF = '#';

// Nomor dan pesan WhatsApp disamakan dengan section FAQ.
const WA_NUMBER = '6282223246649';
const WA_MESSAGE = 'Halo Admin, saya ingin bertanya mengenai pendaftaran di TK Alfa Centauri.';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const EASE_OUT = [0.22, 1, 0.36, 1];

// Bentuk organik lembut di sudut kartu, sama seperti di Tentang Kami.
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

// Ornamen kecil melayang: hanya md ke atas agar tidak menumpuk dengan teks di HP.
const ORNAMENTS = [
  { Icon: Sparkles, position: 'top-[18%] left-[7%] lg:left-[11%]', size: 'w-9 h-9', color: 'text-white fill-white/30', duration: 6, y: -14, delay: 0, rotate: [-8, 8, -8] },
  { Icon: Heart, position: 'top-[22%] right-[7%] lg:right-[12%]', size: 'w-9 h-9 lg:w-11 lg:h-11', color: 'text-rose-300 fill-rose-300', duration: 5, y: -15, delay: 1, rotate: [0, 20, 0] },
  { Icon: Smile, position: 'bottom-[22%] left-[6%] lg:left-[10%]', size: 'w-9 h-9 lg:w-10 lg:h-10', color: 'text-yellow-200', duration: 8, y: 14, delay: 0.5, rotate: [-12, 12, -12] },
  { Icon: Star, position: 'bottom-[20%] right-[6%] lg:right-[10%]', size: 'w-8 h-8 lg:w-10 lg:h-10', color: 'text-yellow-300 fill-yellow-300', duration: 7, y: 16, delay: 1.6, rotate: [6, -6, 6] },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
const underlineVariants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.9, delay: 0.6, ease: 'easeInOut' } },
};
// Versi tanpa gerak untuk pengguna dengan prefers-reduced-motion
const staticVariants = { hidden: { opacity: 1 }, show: { opacity: 1 } };
const staticUnderlineVariants = { hidden: { pathLength: 1 }, show: { pathLength: 1 } };

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-200';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Lucide tidak menyediakan logo merek, jadi logo WhatsApp dibuat sebagai SVG sendiri.
// Ikon ini memberi tahu pengunjung bahwa tombolnya membuka WhatsApp (bukan telepon atau email).
const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Motif dua bintang (callback ke section Tentang Kami): lambang kesuksesan di dunia dan akhirat
const TwoStars = ({ variants, reduceMotion }) => (
  <motion.div
    variants={variants}
    className="flex items-end justify-center gap-2 mb-5"
    aria-hidden="true"
  >
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-6, 6, -6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Star className="w-8 h-8 md:w-11 md:h-11 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_16px_rgba(253,224,71,0.55)]" />
    </motion.div>
    <motion.div
      className="-mb-1.5 md:-mb-2"
      animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [6, -6, 6] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
    >
      <Star className="w-11 h-11 md:w-16 md:h-16 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" />
    </motion.div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const CTA = () => {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  // Parallax halus untuk foto latar (sama seperti Tentang Kami)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const item = reduceMotion ? staticVariants : itemVariants;
  const underline = reduceMotion ? staticUnderlineVariants : underlineVariants;

  return (
    <section
      className="w-full bg-white py-16 px-4 md:px-6 lg:px-8"
      aria-labelledby="cta-title"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="relative w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-indigo-600 shadow-[0_25px_50px_rgba(49,46,129,0.28)]"
        >
          {/* =========================================
              BACKGROUND (foto + overlay gradasi)
          ========================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            {imgFailed ? (
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-500" />
            ) : (
              <motion.div
                className="absolute inset-0"
                style={reduceMotion ? undefined : { y: bgY }}
              >
                <img
                  src={BG_IMAGE}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover scale-[1.2]"
                />
              </motion.div>
            )}
            {/* Arah gradasi dibalik dari Tentang Kami agar tidak terlihat kembar, tapi tetap satu keluarga.
                Atur angka /xx untuk intensitas; jaga cukup pekat supaya teks putih tetap terbaca di atas foto. */}
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/65 via-indigo-600/60 to-sky-600/55" />
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

            {ORNAMENTS.map(({ Icon, position, size, color, duration, y, delay, rotate }, i) => (
              <motion.div
                key={`orn-${i}`}
                className={`absolute hidden md:block opacity-85 ${position}`}
                animate={reduceMotion ? undefined : { y: [0, y, 0], rotate }}
                transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
              >
                <Icon className={`${size} ${color} drop-shadow-xl`} />
              </motion.div>
            ))}
          </div>

          {/* =========================================
              KONTEN UTAMA
          ========================================= */}
          <motion.div
            className="relative z-20 flex flex-col items-center px-6 py-16 md:py-24 text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TwoStars variants={item} reduceMotion={reduceMotion} />

            <motion.h2
              id="cta-title"
              variants={item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight text-balance drop-shadow-[0_2px_12px_rgba(30,27,75,0.45)]"
            >
              Siap Menjadi{' '}
              <span className="relative inline-block text-yellow-300">
                Alcentaurian?
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
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-white/95 font-medium mb-10 max-w-2xl leading-relaxed text-pretty drop-shadow-[0_1px_6px_rgba(30,27,75,0.5)]"
            >
              Langkah pertama ananda untuk tumbuh menjadi generasi unggul dimulai dari sini.
              Bergabunglah bersama keluarga besar Alfa Centauri.
            </motion.p>

            {/* Satu aksi utama (kuning, paling menonjol) + satu aksi pendukung (kaca) */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <a
                href={SPMB_HREF}
                className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-yellow-300 text-slate-900 font-bold shadow-lg shadow-indigo-950/20 hover:bg-yellow-200 hover:-translate-y-0.5 transition-[background-color,transform] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
              >
                Info SPMB
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/70 text-white font-bold hover:bg-white/25 transition-colors ${FOCUS_RING}`}
              >
                <WhatsAppIcon className="w-5 h-5" />
                Hubungi Admin
                <span className="sr-only">(buka WhatsApp di tab baru)</span>
              </a>
            </motion.div>          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;