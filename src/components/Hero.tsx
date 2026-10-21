import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Baby, MapPin, Clock } from 'lucide-react';
import { SCHOOL, SPMB_LABEL, SPMB_URL, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Cloud, Sparkle, TwinStars } from './ui/Ornaments';

/*
  Hero: dunia pagi yang cerah (langit, matahari, awan, bukit, sekolah kecil di atas bukit).
  Teks gelap di atas latar terang, foto anak dalam bingkai ala polaroid, maskot dua bintang.
  Bukit paling depan berwarna sama dengan latar halaman (cream), jadi menyambung mulus ke section berikutnya.
*/

// TODO: ganti dengan foto asli kegiatan TK (taruh di folder public, mis. '/images/hero-1.jpg')
const PHOTO_MAIN = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=75&w=1100&auto=format&fit=crop';
const PHOTO_SMALL = 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=75&w=700&auto=format&fit=crop';

const FACTS = [
  { Icon: Baby, label: 'Usia 0–6 tahun' },
  { Icon: MapPin, label: '2 kampus di Bandung' },
  { Icon: Clock, label: 'Reguler & Fullday' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const still: Variants = { hidden: { opacity: 1 }, show: { opacity: 1 } };

/** Foto dengan cadangan warna bila gagal dimuat */
function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={`bg-gradient-to-br from-sky-200 via-amber-100 to-rose-200 ${className}`} role="img" aria-label={alt} />;
  }
  return <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const item = reduce ? still : rise;

  return (
    <section
      id="beranda"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#9FD6FF_0%,#CFEBFF_42%,#EEF8FF_72%,#FFF9EE_100%)]"
    >
      <Sky />

      <div
        id="konten"
        tabIndex={-1}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-28 pb-36 sm:pt-32 md:pb-48 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pt-36 lg:pb-56 focus:outline-none"
      >
        {/* ---------- Teks ---------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-white bg-white/70 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-night shadow-[0_3px_0_0_rgba(27,37,89,0.08)] backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {SPMB_LABEL}
          </motion.p>

          <motion.p variants={item} className="mt-6 font-display text-lg font-semibold text-sky-700 md:text-xl">
            {SCHOOL.fullName}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-2 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-night sm:text-6xl lg:text-7xl"
          >
            <span className="text-sky-600">Bermain,</span> <span className="text-emerald-600">Belajar,</span>{' '}
            <span className="relative inline-block">
              Berkarakter
              <svg className="absolute -bottom-2 left-0 h-4 w-full overflow-visible text-sunny" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 8 Q 14.5 2 26 8 T 49 8 T 72 8 T 95 8 T 118 8 T 141 8 T 164 8 T 197 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-night/75 text-pretty">
            Pendidikan berkualitas untuk setiap tahap perkembangan anak. Memadukan pengasuhan penuh kasih sayang dengan
            penanaman nilai Islami sejak usia dini.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={SPMB_URL}>
              Daftar Sekarang
              <ArrowRight size={20} aria-hidden="true" />
            </Button>
            <Button href={wa()} variant="white">
              <WhatsAppIcon className="h-5 w-5 text-emerald-600" />
              Hubungi Admin
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-9 flex flex-wrap gap-2.5">
            {FACTS.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-sm font-bold text-night/80 ring-1 ring-night/5 backdrop-blur"
              >
                <Icon size={16} className="text-sky-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- Kolase foto ---------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[30rem] lg:mr-0"
        >
          {/* foto utama */}
          <div className="relative ml-auto w-[86%] rotate-2 rounded-[2.5rem] bg-white p-3 pb-5 shadow-[0_30px_60px_-28px_rgba(27,37,89,0.55)]">
            <Photo
              src={PHOTO_MAIN}
              alt="Anak-anak sedang belajar dan bermain bersama di kelas"
              className="aspect-[4/5] w-full rounded-[2rem]"
            />
          </div>

          {/* foto kecil */}
          <div className="absolute -bottom-8 left-0 w-[46%] -rotate-6 rounded-[1.75rem] bg-white p-2.5 pb-4 shadow-[0_24px_40px_-20px_rgba(27,37,89,0.55)]">
            <Photo src={PHOTO_SMALL} alt="" className="aspect-square w-full rounded-[1.4rem]" />
          </div>

          {/* maskot dua bintang */}
          <div className="absolute -top-10 left-[2%] sm:-top-12">
            <TwinStars className="w-28 sm:w-36" />
          </div>

          {/* stiker nilai */}
          <div className="absolute -right-2 bottom-16 rotate-3 rounded-2xl border-2 border-white bg-sunny px-4 py-2.5 shadow-[0_5px_0_0_#E8B408] sm:-right-4">
            <p className="flex items-center gap-1.5 font-display text-sm font-semibold text-night sm:text-base">
              <Sparkle className="w-4" color="#1B2559" />
              Taqwa · Cerdas · Kreatif
            </p>
          </div>
        </motion.div>
      </div>

      <Hills />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Latar langit: matahari, awan, kilau                                 */
/* ------------------------------------------------------------------ */

function Sky() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* matahari */}
      <div className="absolute -right-24 -top-24 h-72 w-72 sm:-right-16 sm:-top-16 lg:right-[4%] lg:top-[-6rem] lg:h-96 lg:w-96">
        <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x="96" y="6" width="8" height="34" rx="4" fill="#FFE27A" opacity="0.8" transform={`rotate(${i * 30} 100 100)`} />
          ))}
        </svg>
        <div className="absolute inset-[24%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFF3B0,#FFD23F_70%)] shadow-[0_0_80px_20px_rgba(255,210,63,0.45)]" />
      </div>

      {/* awan */}
      <Cloud className="absolute left-[38%] top-[8%] hidden w-24 md:block" opacity={0.85} />
      <Cloud className="absolute right-[4%] top-[44%] hidden w-24 sm:block lg:hidden" opacity={0.9} />
      <Cloud className="absolute right-[-2%] top-[68%] hidden w-36 lg:block" opacity={0.9} />
      <Cloud className="absolute left-[-3%] top-[52%] w-24 sm:w-32" opacity={0.75} />

      {/* kilau */}
      <Sparkle className="twinkle absolute left-[46%] top-[22%] hidden w-5 md:block" color="#FFFFFF" />
      <Sparkle className="twinkle absolute left-[8%] top-[36%] w-4 [animation-delay:1.2s]" color="#FFFFFF" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bukit + sekolah kecil (lapisan paling depan = warna halaman)        */
/* ------------------------------------------------------------------ */

function Hills() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[120px] sm:h-[170px] lg:h-[230px]">
      <svg viewBox="0 0 1440 230" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {/* bukit jauh */}
        <path d="M0 120 C 180 60 360 70 520 110 C 700 150 860 70 1060 62 C 1230 56 1340 90 1440 104 V230 H0 Z" fill="#C9EBAE" />
        {/* bukit tengah */}
        <path d="M0 160 C 220 112 420 120 640 152 C 860 184 1060 118 1260 126 C 1350 130 1400 140 1440 146 V230 H0 Z" fill="#9FD685" />
        {/* tanah depan = warna halaman */}
        <path d="M0 196 C 260 170 520 178 760 194 C 1000 210 1220 186 1440 190 V230 H0 Z" fill="#FFF9EE" />
      </svg>

      {/* sekolah kecil di atas bukit jauh */}
      <svg viewBox="0 0 80 70" className="absolute bottom-[52%] right-[22%] hidden w-14 sm:block lg:w-20">
        <path d="M40 4 V18" stroke="#1B2559" strokeWidth="2" />
        <path d="M40 4 L52 8 L40 12 Z" fill="#FF7A8A" />
        <path d="M8 34 L40 16 L72 34 Z" fill="#FF7A8A" />
        <rect x="14" y="33" width="52" height="34" rx="3" fill="#FFF9EE" />
        <rect x="34" y="46" width="12" height="21" rx="2" fill="#7CC4F5" />
        <rect x="20" y="40" width="9" height="9" rx="2" fill="#FFD23F" />
        <rect x="51" y="40" width="9" height="9" rx="2" fill="#FFD23F" />
        <circle cx="40" cy="26" r="3.5" fill="#FFD23F" />
      </svg>

      {/* pohon & bunga kecil */}
      <svg viewBox="0 0 40 60" className="absolute bottom-[34%] left-[12%] hidden w-8 sm:block lg:w-11">
        <rect x="18" y="34" width="5" height="24" rx="2" fill="#B07A4A" />
        <circle cx="20" cy="24" r="16" fill="#6CC069" />
        <circle cx="13" cy="18" r="5" fill="#8FD687" />
      </svg>
      <svg viewBox="0 0 40 60" className="absolute bottom-[40%] right-[8%] hidden w-7 lg:block">
        <rect x="18" y="34" width="5" height="24" rx="2" fill="#B07A4A" />
        <circle cx="20" cy="24" r="16" fill="#5DB35B" />
      </svg>
    </div>
  );
}
