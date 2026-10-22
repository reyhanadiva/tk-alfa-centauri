import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Clock, Star, Smile, Heart } from 'lucide-react';
import { SCHEDULE } from '@/data/site';
import { FOTO } from '@/data/photos';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Tiap unit punya warna tema sendiri (selaras dengan section "Mengapa Memilih Kami?").
// Class ditulis lengkap agar tidak terbuang oleh purge Tailwind.
const PROGRAMS = [
  {
    unit: 'Daycare',
    age: '0 - 2 Tahun',
    location: 'Jl. Diponegoro No. 48, Bandung',
    mapLink: 'https://maps.app.goo.gl/HbHLZsX8tQ9kh7UG6',
    image: FOTO.agustusBermainBersamaGuru,
    theme: {
      pill: 'bg-amber-100 text-amber-800',
      chip: 'bg-amber-100 text-amber-600 group-hover/link:bg-amber-200',
      glow: 'hover:shadow-amber-200/70',
    },
  },
  {
    unit: 'Playgroup',
    age: '2 - 4 Tahun',
    location: 'Jl. Terate No. 12, Bandung',
    mapLink: 'https://maps.app.goo.gl/5Mfy6hzs89BeqywV7',
    image: FOTO.agustusBermainAir,
    theme: {
      pill: 'bg-sky-100 text-sky-800',
      chip: 'bg-sky-100 text-sky-600 group-hover/link:bg-sky-200',
      glow: 'hover:shadow-sky-200/70',
    },
  },
  {
    unit: 'TK',
    age: '4 - 6 Tahun',
    location: 'Jl. Terate No. 12, Bandung',
    mapLink: 'https://maps.app.goo.gl/5Mfy6hzs89BeqywV7',
    image: FOTO.fairAngklung1,
    theme: {
      pill: 'bg-emerald-100 text-emerald-800',
      chip: 'bg-emerald-100 text-emerald-600 group-hover/link:bg-emerald-200',
      glow: 'hover:shadow-emerald-200/70',
    },
  },
];

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Hiasan melayang (dekoratif). Diam bila pengguna memilih reduce motion.
const Floaty = ({ className = '', duration = 6, y = -20, delay = 0, rotate = [-10, 10, -10], children }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none ${className}`}
      animate={reduceMotion ? undefined : { y: [0, y, 0], rotate }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const ProgramLayanan = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="program"
      className="relative mx-2 md:mx-4 rounded-[2.5rem] md:rounded-[3.5rem] bg-cloud px-4 md:px-8 pt-20 pb-24 overflow-hidden"
      aria-labelledby="program-layanan-title"
    >
      {/* Blob warna lembut */}
      <div className="absolute top-20 right-[-8%] w-[340px] h-[340px] bg-amber-200/40 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-[-8%] w-[340px] h-[340px] bg-sky-200/40 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-24 right-[15%] w-[300px] h-[300px] bg-emerald-100/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Elemen Melayang: yang besar hanya di layar lebar agar tidak menabrak judul */}
      <Floaty duration={6} y={-20} className="hidden md:block top-16 left-[12%] opacity-80">
        <Star className="w-14 h-14 text-amber-400 fill-amber-300 drop-shadow-md" />
      </Floaty>
      <Floaty duration={7} y={20} delay={1} className="hidden md:block top-32 right-[12%] opacity-80">
        <Star className="w-16 h-16 text-yellow-400 fill-yellow-300 drop-shadow-md" />
      </Floaty>
      <Floaty duration={5} y={-15} delay={1.5} rotate={[0, 30, 0]} className="bottom-40 left-[5%] opacity-60">
        <Smile className="w-9 h-9 md:w-10 md:h-10 text-amber-500 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={8} y={15} delay={0.5} rotate={[-15, 15, -15]} className="bottom-36 right-[6%] opacity-70">
        <Heart className="w-7 h-7 md:w-8 md:h-8 text-rose-400 fill-rose-300 drop-shadow-sm" />
      </Floaty>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="program-layanan-title"
            className="text-4xl md:text-5xl font-bold text-night tracking-tight mb-4 text-balance"
          >
            Program{' '}
            <span className="relative inline-block whitespace-nowrap">
              Layanan Kami
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
            Mendampingi setiap fase emas perkembangan ananda, dari usia bayi hingga kesiapan memasuki sekolah dasar.
          </p>
        </motion.div>

        {/* 3 Cards. HP: slider geser (kartu berikutnya mengintip di kanan). Tablet ke atas: grid 3 kolom. */}
        <motion.ul
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          aria-label="Program layanan"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-3 pb-6 mb-6 list-none scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0 md:mb-12"
        >
          {PROGRAMS.map((item, index) => (
            <motion.li
              key={item.unit}
              // animasi masuk dipicu oleh daftar (bukan tiap kartu), karena di HP kartu ke-2/3 berada
              // di luar layar (geser ke samping) sehingga tidak akan pernah "terlihat" oleh pemicu per kartu
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.15 } } }}
              className={`group flex w-[82%] shrink-0 snap-start flex-col h-full bg-white rounded-[2rem] p-3 md:w-auto md:p-4 border border-slate-100 shadow-sm hover:shadow-xl ${item.theme.glow} hover:-translate-y-1 transition-[box-shadow,transform] duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
            >
              {/* Foto dekoratif: judul kartu sudah menjelaskan konteksnya */}
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 flex-shrink-0 bg-slate-100">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
                />
              </div>

              <div className="px-3 pb-3 flex flex-col flex-grow justify-between gap-6">
                <div className="flex flex-col items-start gap-2.5">
                  <h3 className="text-2xl font-bold text-night">{item.unit}</h3>
                  <p className={`px-3.5 py-1 rounded-full text-sm font-bold ${item.theme.pill}`}>
                    Usia {item.age}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={item.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-3 -m-2 p-2 rounded-2xl text-night/70 hover:text-night hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-night"
                  >
                    <span className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors ${item.theme.chip}`}>
                      <MapPin className="w-[18px] h-[18px]" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-night/60">Lokasi</span>
                      <span className="font-semibold text-sm text-slate-800 text-pretty">
                        {item.location}
                      </span>
                    </span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 text-slate-400 group-hover/link:text-night group-hover/link:translate-x-1 transition-transform motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(buka di Google Maps, tab baru)</span>
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Banner Jadwal */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl sm:rounded-full p-2 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-2xl sm:rounded-full flex items-center gap-2 w-full sm:w-auto flex-shrink-0 justify-center">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span className="font-bold text-sm">Waktu Belajar</span>
          </div>

          <dl className="grid grid-cols-[1fr_auto_1fr] sm:flex items-center sm:justify-around w-full py-2 sm:py-0 px-2 sm:px-3 gap-3">
            {SCHEDULE.map((s, i) => (
              <React.Fragment key={s.name}>
                {i > 0 && <div className="w-px h-10 sm:h-5 bg-slate-200" aria-hidden="true" />}
                <div className="flex flex-col items-center text-center gap-0.5 sm:flex-row sm:items-baseline sm:gap-1.5">
                  <dt className="text-xs font-bold text-night/60 uppercase tracking-wider">{s.name}</dt>
                  <dd className="text-base sm:text-sm font-bold text-night whitespace-nowrap">{s.time}</dd>
                </div>
              </React.Fragment>
            ))}
          </dl>
        </motion.div>
        <p className="mt-3 text-center text-sm font-medium text-night/60">{SCHEDULE[0].name}: {SCHEDULE[0].note}.</p>
      </div>
    </section>
  );
};

export default ProgramLayanan;