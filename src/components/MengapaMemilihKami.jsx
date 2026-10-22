import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Sparkles, Heart, BookOpen, ImageOff, Plus } from 'lucide-react';
import { FOTO } from '@/data/photos';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Tiap kartu punya warna tema sendiri supaya section terasa ceria.
// Semua class ditulis lengkap (bukan dirangkai) agar tidak terbuang oleh purge Tailwind.
const FEATURES = [
  {
    id: 'school-readiness',
    title: 'School Readiness',
    Icon: Star,
    iconFilled: true,
    desc: 'Menyiapkan kematangan fundamental ananda menuju sekolah dasar secara menyeluruh, bukan sekadar drill akademik.',
    pillsGroup: [['Sosial-Emosional', 'Fisik-Motorik', 'Bahasa & Kognitif', 'Moral & Agama']],
    img: FOTO.artMelukis1,
    theme: {
      tint: 'bg-sky-600/75',
      chip: 'bg-sky-100 text-sky-600',
      pill: 'bg-sky-100 text-sky-800 border-sky-200',
      glow: 'hover:shadow-sky-300/60',
    },
  },
  {
    id: 'character-building',
    title: 'Character Building',
    Icon: Sparkles,
    iconFilled: false,
    desc: 'Membentuk fondasi karakter unggul melalui 7 Nilai Khas Alfa Centauri yang ditanamkan secara natural dalam interaksi harian.',
    pillsGroup: [
      ['Jujur', 'Bersih & Rapi', 'Mandiri', 'Disiplin'],
      ['Tangguh', 'Sopan & Santun', 'Bermanfaat'],
    ],
    img: FOTO.agustusFotoBersama,
    theme: {
      tint: 'bg-violet-600/75',
      chip: 'bg-violet-100 text-violet-600',
      pill: 'bg-violet-100 text-violet-800 border-violet-200',
      glow: 'hover:shadow-violet-300/60',
    },
  },
  {
    id: 'pembiasaan-agama',
    title: 'Pembiasaan Agama',
    Icon: BookOpen,
    iconFilled: false,
    desc: 'Menumbuhkan kecintaan beribadah sejak dini lewat pembiasaan sehari-hari, mulai dari shalat berjamaah, mengaji, hingga adab islami.',
    pillsGroup: [
      ['Shalat Dhuha', 'Shalat Dzuhur Berjamaah', 'Mengaji Metode Ummi'],
      ['Hafalan Surat Pendek', 'Asmaul Husna', 'Doa Harian', 'Adab Islami'],
    ],
    img: FOTO.agustusFotoKelas,
    theme: {
      tint: 'bg-emerald-600/75',
      chip: 'bg-emerald-100 text-emerald-600',
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      glow: 'hover:shadow-emerald-300/60',
    },
  },
  {
    id: 'program-inklusi',
    title: 'Program Inklusi',
    Icon: Heart,
    iconFilled: true,
    desc: 'Setiap anak berhak tumbuh dan belajar dengan kesempatan yang sama. Kami mendampingi kebutuhan dan keunikan tiap ananda agar dapat belajar setara.',
    pillsGroup: [['LSU (Learning Support Unit)', 'Kelas Stimulasi']],
    img: FOTO.artMelukis3,
    theme: {
      tint: 'bg-rose-600/75',
      chip: 'bg-rose-100 text-rose-600',
      pill: 'bg-rose-100 text-rose-800 border-rose-200',
      glow: 'hover:shadow-rose-300/60',
    },
  },
];

// ring-inset: kartu punya overflow-hidden, jadi ring di luar kartu akan terpotong.
const FOCUS_RING =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-night';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

const Pills = ({ groups, pillClass }) => (
  <div className="flex flex-col gap-2 mt-1">
    {groups.map((group, rowIdx) => (
      <ul key={rowIdx} className="flex flex-wrap gap-2">
        {group.map((pill) => (
          <li
            key={pill}
            className={`px-3.5 py-1.5 text-sm font-semibold rounded-full border ${pillClass}`}
          >
            {pill}
          </li>
        ))}
      </ul>
    ))}
  </div>
);

const FeatureIcon = ({ Icon, filled }) => (
  <Icon className={`w-6 h-6 ${filled ? 'fill-current' : ''}`} aria-hidden="true" />
);

// Hiasan melayang (dekoratif saja, disembunyikan dari screen reader)
const Floaty = ({ className = '', delay = 0, children }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute pointer-events-none z-0 ${className}`}
      animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const MengapaMemilihKami = () => {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState({});
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef([]);
  const scrollTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(scrollTimer.current), []);

  const markFailed = useCallback(
    (i) => setFailed((p) => (p[i] ? p : { ...p, [i]: true })),
    []
  );

  const select = (i) => {
    if (i === active) return;
    setActive(i);

    // Di mobile, kartu di atas ikut mengecil sehingga kartu yang diklik "melompat".
    // Setelah animasi selesai, pastikan kartu aktif tetap terlihat.
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        cardRefs.current[i]?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'nearest',
        });
      }, 700);
    }
  };

  return (
    <section
      id="keunggulan"
      className="relative w-full pt-16 pb-24 px-4 md:px-8 overflow-hidden"
      aria-labelledby="mengapa-memilih-kami-title"
    >
      {/* Blob warna-warni */}
      <div className="absolute top-32 left-[-6%] w-[380px] h-[380px] bg-sky-200/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-[-8%] w-[340px] h-[340px] bg-pink-200/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 left-[20%] w-[320px] h-[320px] bg-emerald-100/60 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-[-5%] w-[360px] h-[360px] bg-amber-200/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Hiasan melayang: besar hanya di layar lebar agar tidak menabrak teks */}
      <Floaty className="hidden lg:block top-32 left-[7%]">
        <Star className="w-10 h-10 text-amber-300 fill-amber-300" />
      </Floaty>
      <Floaty delay={1} className="hidden lg:block top-44 right-[8%]">
        <Sparkles className="w-9 h-9 text-pink-300 fill-pink-200" />
      </Floaty>
      <Floaty delay={2} className="hidden lg:block top-28 right-[24%]">
        <div className="w-5 h-5 rounded-full bg-sky-300" />
      </Floaty>
      <Floaty delay={0.5} className="hidden lg:block top-64 left-[13%]">
        <div className="w-7 h-7 rounded-full border-4 border-emerald-300" />
      </Floaty>
      <Floaty delay={1.5} className="bottom-8 left-4 md:left-[6%]">
        <Heart className="w-7 h-7 md:w-9 md:h-9 text-rose-300 fill-rose-300" />
      </Floaty>
      <Floaty delay={2.5} className="bottom-10 right-5 md:right-[7%]">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-violet-300 rotate-12" />
      </Floaty>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="mengapa-memilih-kami-title"
            className="text-4xl md:text-5xl font-bold text-night tracking-tight mb-4 text-balance"
          >
            Mengapa{' '}
            <span className="relative inline-block whitespace-nowrap">
              Memilih Kami?
              <svg
                className="absolute left-0 -bottom-3 w-full h-4 text-amber-400 overflow-visible"
                viewBox="0 0 200 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8 Q 14.5 2 26 8 T 49 8 T 72 8 T 95 8 T 118 8 T 141 8 T 164 8 T 197 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-night/70 max-w-2xl mx-auto font-medium text-pretty">
            Nilai unggul yang kami hadirkan untuk tumbuh kembang optimal ananda.
          </p>
        </motion.div>


        {/* Expanding Cards (pola accordion: satu tombol per kartu, konten sebagai region) */}
        <ul className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] list-none p-0 m-0">
          {FEATURES.map((item, index) => {
            const isActive = active === index;
            const { Icon, iconFilled, theme } = item;
            const triggerId = `trigger-${item.id}`;
            const panelId = `panel-${item.id}`;

            return (
              <li
                key={item.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-slate-200 ring-4 ring-white shadow-lg hover:shadow-2xl ${theme.glow} w-full
                  transition-[flex-grow,height,box-shadow] duration-500 ${EASE} motion-reduce:transition-none
                  ${
                    isActive
                      ? 'h-[600px] sm:h-[540px] lg:h-full lg:flex-[4_1_0%]'
                      : 'h-[110px] lg:h-full lg:flex-[1_1_0%]'
                  }`}
              >
                {/* Foto berukuran tetap (seukuran kartu terbuka), kartu hanya "membuka" potongannya.
                    Jadi browser tidak perlu mengubah ukuran foto di setiap frame animasi (penyebab terasa lag). */}
                {failed[index] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400 text-white/80">
                    <ImageOff className="w-8 h-8" aria-hidden="true" />
                  </div>
                ) : (
                  <img
                    src={item.img}
                    alt=""
                    aria-hidden="true"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => markFailed(index)}
                    className={`absolute left-1/2 top-1/2 h-[600px] w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-transform duration-700 motion-reduce:transition-none sm:h-[540px] lg:h-[600px] lg:w-[min(960px,80vw)] ${
                      isActive ? '' : 'group-hover:scale-105'
                    }`}
                  />
                )}

                {/* Tint warna: hanya di kartu tidak aktif. Kartu aktif menampilkan foto apa adanya (cerah). */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${theme.tint} ${
                    isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-80'
                  }`}
                />

                {/* ---------- Tampilan AKTIF: panel putih di atas foto ---------- */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isActive}
                  className={`pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-5
                    transition-[opacity,transform,visibility] ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:delay-0
                    ${
                      isActive
                        ? 'visible opacity-100 translate-y-0 duration-500 delay-300'
                        : 'invisible opacity-0 translate-y-4 duration-200'
                    }`}
                >
                  {/* min-w mencegah teks "reflow" saat kartu masih melebar */}
                  <div className="flex flex-col gap-3 p-5 md:p-6 rounded-[1.5rem] md:rounded-3xl bg-white shadow-xl lg:min-w-[440px]">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl shrink-0 ${theme.chip}`}>
                        <FeatureIcon Icon={Icon} filled={iconFilled} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-night tracking-tight text-balance">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-night/80 text-base md:text-lg font-medium max-w-xl text-pretty">
                      {item.desc}
                    </p>

                    {item.pillsGroup?.length > 0 && (
                      <Pills groups={item.pillsGroup} pillClass={theme.pill} />
                    )}
                  </div>
                </div>

                {/* ---------- Tampilan TIDAK AKTIF: ikon + judul ---------- */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 px-6 flex items-center gap-4
                    lg:flex-col lg:justify-end lg:px-0 lg:pb-8 lg:gap-6
                    transition-[opacity,visibility] motion-reduce:transition-none motion-reduce:delay-0
                    ${
                      isActive
                        ? 'invisible opacity-0 duration-200'
                        : 'visible opacity-100 duration-300 delay-300'
                    }`}
                >
                  <div className={`p-3 bg-white rounded-2xl shadow-md shrink-0 lg:order-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${theme.chip.split(' ')[1]}`}>
                    <FeatureIcon Icon={Icon} filled={iconFilled} />
                  </div>

                  {/* Satu elemen judul saja: horizontal di mobile, vertikal di desktop */}
                  <span className="text-xl lg:text-2xl font-bold text-white text-balance drop-shadow-sm lg:whitespace-nowrap lg:order-1 lg:[writing-mode:vertical-rl] lg:rotate-180">
                    {item.title}
                  </span>

                  {/* Isyarat "bisa dibuka" untuk mobile */}
                  <span className="ml-auto lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/25 border border-white/40">
                    <Plus className="w-5 h-5 text-white" />
                  </span>
                </div>

                {/* Tombol pemicu: menutupi seluruh kartu sehingga area klik besar,
                    tapi konten kartu tidak "bersarang" di dalam <button>. */}
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  aria-disabled={isActive || undefined}
                  onClick={() => select(index)}
                  className={`absolute inset-0 z-20 w-full h-full rounded-[inherit] ${FOCUS_RING} ${
                    isActive ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span className="sr-only">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MengapaMemilihKami;