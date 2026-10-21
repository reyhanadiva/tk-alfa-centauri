import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Cloud, Squiggle, TwinStars } from './ui/Ornaments';
import { pexels } from '@/data/site';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Warna aksen per testimoni. Class ditulis lengkap agar aman dari purge Tailwind.
// Teks peran memakai shade 700 supaya kontrasnya cukup di atas latar putih.
const THEMES = {
  sky: { glow: 'from-sky-200 to-indigo-200', ring: 'ring-sky-300', bar: 'bg-sky-400', quote: 'text-sky-100', role: 'text-sky-700' , soft: 'bg-sky-100' },
  emerald: { glow: 'from-emerald-200 to-teal-200', ring: 'ring-emerald-300', bar: 'bg-emerald-400', quote: 'text-emerald-100', role: 'text-emerald-700' , soft: 'bg-emerald-100' },
  violet: { glow: 'from-violet-200 to-fuchsia-200', ring: 'ring-violet-300', bar: 'bg-violet-400', quote: 'text-violet-100', role: 'text-violet-700' , soft: 'bg-violet-100' },
  amber: { glow: 'from-amber-200 to-orange-200', ring: 'ring-amber-300', bar: 'bg-amber-400', quote: 'text-amber-100', role: 'text-amber-700' , soft: 'bg-amber-100' },
  rose: { glow: 'from-rose-200 to-pink-200', ring: 'ring-rose-300', bar: 'bg-rose-400', quote: 'text-rose-100', role: 'text-rose-700' , soft: 'bg-rose-100' },
};

const TESTIMONIALS = [
  {
    id: 0,
    name: 'Bunda Dian',
    role: 'Wali Murid Daycare',
    text: 'Fasilitas daycare-nya sangat aman dan pengasuhnya luar biasa sabar. Saya bisa bekerja dengan tenang karena setiap hari selalu ada update perkembangan ananda.',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=70',
    theme: THEMES.sky,
  },
  {
    id: 1,
    name: 'Ayah Budi',
    role: 'Wali Murid Playgroup',
    text: 'Sangat terkesan dengan metode pembelajarannya yang kekinian. Anak saya yang tadinya pemalu sekarang jadi sangat aktif dan berani tampil ke depan.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=70',
    theme: THEMES.emerald,
  },
  {
    id: 2,
    name: 'Bunda Sarah',
    role: 'Wali Murid TK B',
    text: "Lingkungan yang sangat mendukung konsep 'Taqwa, Cerdas, Kreatif'. Guru-gurunya muda, energik, dan paham ilmu parenting modern. Lulus dari sini ananda siap masuk SD.",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=70',
    theme: THEMES.violet,
  },
  {
    id: 3,
    name: 'Ayah Reza',
    role: 'Wali Murid TK A',
    text: 'Sistem keamanan dengan CCTV dan penjagaan satpam membuat kami tidak pernah khawatir. Ditambah fasilitas mini theater-nya yang bikin anak-anak selalu semangat.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=70',
    theme: THEMES.amber,
  },
  {
    id: 4,
    name: 'Bunda Anita',
    role: 'Wali Murid TK B',
    text: 'Saya suka sekali komunikasi pihak sekolah dengan orang tua yang sangat transparan. Guru utamanya responsif dalam memantau bakat spesifik anak saya.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=70',
    theme: THEMES.rose,
  },
  // --- testimoni contoh tambahan (dummy). Ganti dengan testimoni asli + izin orang tua ---
  {
    id: 5,
    name: 'Bunda Rina',
    role: 'Wali Murid Daycare',
    text: 'Pengasuhnya telaten sekali. Si kecil yang awalnya sering menangis saat ditinggal, sekarang malah semangat berangkat setiap pagi.',
    image: pexels(19999995, 800),
    theme: THEMES.sky,
  },
  {
    id: 6,
    name: 'Ayah Fajar',
    role: 'Wali Murid TK A',
    text: 'Anak saya jadi rajin shalat dan hafal doa harian. Pembiasaannya terasa sampai ke rumah, tanpa paksaan.',
    image: pexels(19424220, 800),
    theme: THEMES.emerald,
  },
  {
    id: 7,
    name: 'Bunda Laila',
    role: 'Wali Murid Playgroup',
    text: 'Kegiatannya beragam dan seru, dari berkebun sampai eksperimen sederhana. Ananda selalu punya cerita baru sepulang sekolah.',
    image: pexels(8070478, 800),
    theme: THEMES.violet,
  },
];

/*
  Geometri layout desktop (px). Komposisi "foto mengembang + teks di samping" lebarnya ±856px,
  ditambah teks yang bisa keluar dari kluster saat kartu aktif di tengah, jadi layout ini
  baru aman dipakai mulai breakpoint xl (>= 1280px). Di bawah itu dipakai layout bertumpuk.
*/
const INACTIVE_W = 72;
const ACTIVE_W = 400;
const GAP = 18;
const TEXT_W = 380;
// aktif di paruh kiri: teks di kanan foto; di paruh kanan: teks di kiri foto
const SPLIT_INDEX = 3;
// lebar total deretan foto, dihitung dari jumlah testimoni
const ROW_W = (n) => (n - 1) * (INACTIVE_W + GAP) + ACTIVE_W;

/*
  Lengkungan deretan foto berbentuk kubah: foto aktif paling tinggi, makin jauh makin turun
  dan makin miring ke luar (seperti kipas kartu). Atur angka-angka ini sesuai selera:
  - CURVE_PX: positif = ujung naik (senyum), negatif = ujung turun (kubah), 0 = rata.
  - TILT_DEG: positif = miring ke luar (cocok dengan kubah), negatif = miring ke dalam (cocok dengan senyum).
  Untuk kembali ke bentuk senyum: CURVE_PX = 4, TILT_DEG = -2, MOBILE_CURVE_PX = 3.
  Pada bentuk senyum jangan terlalu besar: foto di ujung bisa menyentuh teks di atasnya.
*/
const CURVE_PX = -2.5;
const TILT_DEG = 1.5;
// batas lengkungan agar foto paling ujung tidak turun/miring terlalu jauh
const MAX_OFFSET = 4;
const MOBILE_CURVE_PX = -3;

const AUTOPLAY_MS = 6500;

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

const Stars = ({ className = 'w-5 h-5' }) => (
  <div role="img" aria-label="Penilaian 5 dari 5 bintang" className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} aria-hidden="true" className={`${className} fill-yellow-400 text-yellow-400`} />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const Testimoni = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  // Berganti otomatis tiap beberapa detik; berhenti saat disorot/difokus,
  // dan berhenti seterusnya begitu pengunjung memilih testimoni sendiri.
  const [auto, setAuto] = useState(true);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const desktopTabs = useRef([]);
  const mobileTabs = useRef([]);

  const active = TESTIMONIALS[activeIndex];
  const last = TESTIMONIALS.length - 1;
  const running = auto && !hovering && !reduceMotion;

  useEffect(() => {
    if (!running) return undefined;
    const t = window.setTimeout(() => setActiveIndex((i) => (i === last ? 0 : i + 1)), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [running, activeIndex, last]);

  // pilihan manual: hentikan putar otomatis
  const choose = (i) => {
    setAuto(false);
    setActiveIndex(i);
  };

  // Desktop: busur mengikuti foto aktif (aktif = titik terendah).
  const desktopArc = (index) => {
    const offset = index - activeIndex;
    const o = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offset));
    return `translateY(${-(o * o * CURVE_PX)}px) rotate(${o * TILT_DEG}deg)`;
  };

  // Layar kecil: busur tetap, berpusat di avatar tengah (hanya terangkat di ujung).
  const mobileArc = (index) => {
    const offset = index - Math.floor(last / 2);
    return `translateY(${-(offset * offset * MOBILE_CURVE_PX)}px)`;
  };

  // Navigasi keyboard antar tab (pola tablist: panah, Home, End)
  const handleKeyDown = (refs) => (e) => {
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = activeIndex === last ? 0 : activeIndex + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = activeIndex === 0 ? last : activeIndex - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    refs.current[next]?.focus();
  };

  // Posisi teks desktop: selalu pakai satu properti (translateX) supaya geser mulus.
  // Sebelumnya berganti antara `left` dan `right`, yang tidak bisa dianimasikan sehingga teks "melompat".
  const activeLeft = activeIndex * (INACTIVE_W + GAP);
  const textOnRight = activeIndex <= SPLIT_INDEX;
  const textX = textOnRight ? activeLeft + ACTIVE_W + GAP : activeLeft - GAP - TEXT_W;

  return (
    <section
      id="testimoni"
      className="relative w-full pt-20 pb-24 px-4 overflow-hidden"
      aria-labelledby="testimoni-title"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovering(false)}
    >
      {/* Pola titik-titik pastel */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Blob halus */}
      <div className="absolute top-12 left-[15%] w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-[15%] w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-[-6%] w-[300px] h-[300px] bg-pink-100/40 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="testimoni-title" className="text-4xl md:text-5xl font-semibold text-night tracking-tight text-balance">
            Apa Kata{' '}
            <span className="relative inline-block whitespace-nowrap">
              Orang Tua
              <Squiggle className="text-sunny" />
            </span>
          </h2>
          <p className="mt-5 text-lg font-medium text-night/70 text-pretty">
            Cerita langsung dari ayah & bunda Alcentaurian.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYOUT DESKTOP (xl): foto mengembang + teks di samping        */}
        {/* ============================================================ */}
        <div className="hidden xl:block relative mx-auto h-[500px]" style={{ width: ROW_W(TESTIMONIALS.length) }}>
          {/* Panggung warna lembut di belakang deretan foto (warnanya mengikuti orang tua aktif),
              plus maskot & awan di sisi kiri-kanan supaya ruang kosong terasa terisi tanpa ramai */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-16 -bottom-10 top-24 -z-10">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                className={`absolute inset-0 rounded-[4rem] transition-opacity duration-700 motion-reduce:transition-none ${t.theme.soft} ${
                  i === activeIndex ? 'opacity-70' : 'opacity-0'
                }`}
              />
            ))}
            <div className="dots absolute inset-0 rounded-[4rem] opacity-50" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-0">
            <TwinStars className="w-28" />
          </div>
          <Cloud className="pointer-events-none absolute -right-40 top-10 w-32" opacity={0.95} />
          <Cloud className="pointer-events-none absolute -left-36 bottom-6 w-24" opacity={0.9} />

          <div
            role="tablist"
            aria-label="Pilih testimoni"
            onKeyDown={handleKeyDown(desktopTabs)}
            className="flex items-end gap-[18px] h-full"
          >
            {TESTIMONIALS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => { desktopTabs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={`d-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="d-panel"
                  aria-label={`Testimoni ${item.name}, ${item.role}`}
                  title={item.name}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => choose(index)}
                  style={{ transform: desktopArc(index) }}
                  className={`group relative isolate block shrink-0 origin-bottom rounded-[2.5rem] transition-transform duration-500 ease-out motion-reduce:transition-none ${FOCUS_RING}`}
                >
                  {/* Cahaya pendar di belakang foto aktif (cukup fade, tanpa layout animation) */}
                  <span
                    aria-hidden="true"
                    className={`absolute -inset-2 -z-10 rounded-[2.5rem] bg-gradient-to-r ${item.theme.glow} blur-xl transition-opacity duration-500 motion-reduce:transition-none ${
                      isActive ? 'opacity-60' : 'opacity-0'
                    }`}
                  />
                  {/* Ukuran dianimasikan lewat CSS (width/height), jadi foto tidak melar saat transisi */}
                  <span
                    className={`block overflow-hidden rounded-[2.5rem] shadow-md transition-[width,height,opacity,filter,box-shadow] duration-500 ease-out motion-reduce:transition-none ${
                      isActive
                        ? 'w-[400px] h-[500px] border-4 border-white'
                        : 'w-[72px] h-[110px] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:shadow-xl'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading={index === 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Teks melayang */}
          <div
            id="d-panel"
            role="tabpanel"
            aria-labelledby={`d-tab-${active.id}`}
            className="absolute top-4 left-0 z-20 pointer-events-none transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ width: TEXT_W, transform: `translateX(${textX}px)` }}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeIndex}
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative m-0 rounded-[2rem] bg-white p-7 shadow-[0_6px_0_0_#E7ECF5,0_30px_50px_-30px_rgba(27,37,89,0.35)]"
              >
                {/* ekor balon ucapan, menunjuk ke foto */}
                <span
                  aria-hidden="true"
                  className={`absolute top-12 h-6 w-6 rotate-45 rounded-[4px] bg-white ${textOnRight ? '-left-2.5' : '-right-2.5'}`}
                />

                <div className="relative flex items-center justify-between">
                  <span aria-hidden="true" className={`font-display text-7xl leading-[0.6] ${active.theme.role}`}>“</span>
                  <Stars className="w-5 h-5" />
                </div>

                <blockquote className="relative mt-4 mb-6 m-0">
                  <p className="text-[17px] text-night/80 font-medium leading-[1.75]">{active.text}</p>
                </blockquote>

                <figcaption className="relative flex items-center gap-3 border-t-2 border-dashed border-slate-100 pt-5">
                  <span className={`h-10 w-1.5 rounded-full ${active.theme.bar}`} aria-hidden="true" />
                  <span>
                    <span className="block font-display text-lg font-semibold text-night">{active.name}</span>
                    <span className={`block text-sm font-bold ${active.theme.role}`}>{active.role}</span>
                  </span>
                </figcaption>

                {/* garis waktu putar otomatis */}
                {running && (
                  <span aria-hidden="true" className="absolute inset-x-7 bottom-3 h-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.span
                      key={activeIndex}
                      className={`block h-full rounded-full ${active.theme.bar}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  </span>
                )}
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================ */}
        {/* LAYOUT BERTUMPUK (di bawah xl): foto, teks, lalu pemilih avatar */}
        {/* ============================================================ */}
        <div className="xl:hidden flex flex-col items-center">
          <div
            id="m-panel"
            role="tabpanel"
            aria-labelledby={`m-tab-${active.id}`}
            className="flex flex-col items-center w-full max-w-xl"
          >
            {/* Foto aktif */}
            <div className="relative isolate w-[240px] sm:w-[280px] aspect-[4/5]">
              {TESTIMONIALS.map((item, i) => (
                <div
                  key={item.id}
                  aria-hidden="true"
                  className={`absolute -inset-2 -z-10 rounded-[2.5rem] bg-gradient-to-r ${item.theme.glow} blur-xl transition-opacity duration-500 motion-reduce:transition-none ${
                    i === activeIndex ? 'opacity-60' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="relative w-full h-full overflow-hidden rounded-[2rem] border-4 border-white shadow-lg bg-slate-100">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.name}
                    decoding="async"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Teks: semua testimoni ditumpuk di satu sel grid, jadi tinggi mengikuti yang terpanjang.
                Dengan begitu tidak ada teks terpotong (line-clamp) dan tidak ada loncatan layout. */}
            <div className="relative mt-8 grid w-full rounded-[2rem] bg-white p-6 text-center shadow-[0_6px_0_0_#E7ECF5] sm:p-8">
              <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-[4px] bg-white" />
              {TESTIMONIALS.map((item, i) => (
                <figure
                  key={item.id}
                  aria-hidden={i !== activeIndex}
                  className={`col-start-1 row-start-1 m-0 flex flex-col items-center transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                    i === activeIndex ? 'visible opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  <Stars className="w-4 h-4" />
                  <blockquote className="mt-3 mb-5 m-0">
                    <p className="text-base text-night/80 font-medium leading-relaxed text-pretty">
                      {`“${item.text}”`}
                    </p>
                  </blockquote>
                  <div className={`w-10 h-[3px] rounded-full mb-4 ${item.theme.bar}`} aria-hidden="true" />
                  <figcaption>
                    <span className="block font-display text-lg font-semibold text-night mb-0.5">{item.name}</span>
                    <span className={`block text-sm font-semibold ${item.theme.role}`}>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Pemilih avatar */}
          <div
            role="tablist"
            aria-label="Pilih testimoni"
            onKeyDown={handleKeyDown(mobileTabs)}
            className="mt-8 pt-4 flex items-center justify-center gap-1.5 sm:gap-3"
          >
            {TESTIMONIALS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => { mobileTabs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={`m-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="m-panel"
                  aria-label={`Testimoni ${item.name}, ${item.role}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => choose(index)}
                  style={{ transform: mobileArc(index) }}
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md transition-[opacity,filter,box-shadow] duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                    isActive
                      ? `ring-4 ${item.theme.ring}`
                      : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimoni;