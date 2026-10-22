import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
import { pexels } from '@/data/site';
import { FOTO } from '@/data/photos';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Warna tema per kartu (selaras dengan section lain). Class ditulis lengkap agar aman dari purge Tailwind.
const FACILITIES = [
  {
    title: 'Ruang Kelas Interaktif',
    desc: 'Tata ruang dinamis dengan teknologi interaktif untuk belajar yang lebih seru.',
    image: FOTO.artMelukis2,
    theme: { bar: 'bg-sky-400', glow: 'hover:shadow-sky-200/80', grad: 'from-sky-950/90 via-sky-900/40' },
  },
  {
    title: 'Playground & Outdoor',
    desc: 'Area bermain luas dan aman di udara terbuka.',
    image: FOTO.agustusMembawaKarya,
    theme: { bar: 'bg-emerald-400', glow: 'hover:shadow-emerald-200/80', grad: 'from-emerald-950/90 via-emerald-900/40' },
  },
  {
    title: 'Mini Theater',
    desc: 'Ruang audio visual untuk menonton tayangan edukasi dan berbagi presentasi.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=70',
    theme: { bar: 'bg-violet-400', glow: 'hover:shadow-violet-200/80', grad: 'from-violet-950/90 via-violet-900/40' },
  },
  {
    title: 'Perpustakaan',
    desc: 'Koleksi buku cerita dan buku pelajaran yang beragam.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=70',
    theme: { bar: 'bg-amber-400', glow: 'hover:shadow-amber-200/80', grad: 'from-amber-950/90 via-amber-900/40' },
  },
  {
    title: 'Sistem Keamanan',
    desc: 'Pengawasan CCTV 24 jam dan pos satpam di akses utama.',
    image: pexels(5589597, 1000),
    theme: { bar: 'bg-rose-400', glow: 'hover:shadow-rose-200/80', grad: 'from-rose-950/90 via-rose-900/40' },
  },
];

/*
  Deskripsi tampil saat hover / fokus keyboard HANYA di perangkat yang punya hover (mouse/trackpad).
  Di layar sentuh (HP/tablet) tidak ada hover, jadi deskripsi dibiarkan terbuka agar tetap bisa dibaca.
  Tinggi dianimasikan lewat grid-template-rows (0fr -> 1fr) supaya panel mengembang mulus.
*/
const DESC_WRAPPER = [
  'grid grid-rows-[1fr] opacity-100',
  'transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none',
  '[@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0',
  '[@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100',
  '[@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100',
].join(' ');

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Hiasan melayang (dekoratif). Diam bila pengguna memilih reduce motion.
const Floaty = ({ className = '', duration = 6, y = -15, delay = 0, rotate = [-10, 10, -10], children }) => {
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

const Fasilitas = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="fasilitas"
      className="relative w-full pt-24 pb-20 overflow-hidden"
      aria-labelledby="fasilitas-title"
    >
      {/* Blob warna lembut */}
      <div className="absolute top-28 left-[-10%] w-[350px] h-[350px] bg-emerald-100/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-[-6%] w-[380px] h-[380px] bg-sky-100/60 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-[25%] w-[320px] h-[320px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Hiasan melayang: hanya md ke atas agar tidak menabrak judul di HP */}
      <Floaty duration={6} y={-15} className="hidden md:block top-24 right-[10%] opacity-75">
        <Star className="w-10 h-10 text-amber-400 fill-amber-300 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={7} y={15} delay={1} className="hidden md:block top-44 left-[5%] opacity-70">
        <Sparkles className="w-8 h-8 text-sky-400 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={8} y={12} delay={0.5} rotate={[-15, 15, -15]} className="hidden md:block top-32 left-[18%] opacity-70">
        <Heart className="w-6 h-6 text-rose-400 fill-rose-300 drop-shadow-sm" />
      </Floaty>

      {/* Header (rata tengah, selaras dengan section lain) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          className="text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="fasilitas-title"
            className="text-4xl md:text-5xl font-bold text-night tracking-tight mb-4 text-balance"
          >
            Fasilitas &{' '}
            {/* Aksen bintang kecil sebagai pengganti underline; dibungkus nowrap agar tidak turun baris sendirian */}
            <span className="whitespace-nowrap">
              Keamanan
              <Sparkles
                className="inline-block w-7 h-7 md:w-9 md:h-9 ml-1.5 -mt-4 md:-mt-6 text-amber-400 fill-amber-300 rotate-12"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="text-lg text-night/70 font-medium max-w-2xl mx-auto text-pretty">
            Lingkungan belajar yang dirancang khusus untuk kenyamanan, keamanan, dan kebebasan bereksplorasi.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Slider: tanpa panah, murni swipe. Kartu berikutnya sengaja "mengintip" di tepi kanan sebagai petunjuk. */}
      <motion.div
        className="relative z-10 w-full"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <ul
          aria-label="Daftar fasilitas"
          className="relative flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))]
            scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-[max(2rem,calc((100vw-80rem)/2))]
            list-none m-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {FACILITIES.map((item, index) => (
            <li
              key={item.title}
              tabIndex={0}
              className={`group relative shrink-0 snap-start w-[80vw] sm:w-[420px] md:w-[500px] lg:w-[600px]
                aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10]
                rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100
                shadow-md hover:shadow-2xl ${item.theme.glow} transition-shadow duration-500 motion-reduce:transition-none
                focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-night/70`}
            >
              {/* Foto dekoratif: judul kartu sudah menjelaskan konteksnya */}
              <img
                src={item.image}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out motion-reduce:transition-none"
              />

              {/* Gradasi hanya di bagian bawah (tint warna tema), foto di atasnya tetap cerah */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t ${item.theme.grad} to-transparent`}
                aria-hidden="true"
              />

              {/* Judul selalu tampil, deskripsi mengembang saat hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className={`block h-1.5 w-10 rounded-full mb-3 ${item.theme.bar}`} aria-hidden="true" />
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                  {item.title}
                </h3>
                <div className={DESC_WRAPPER}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-2 text-sm md:text-base text-slate-100 font-medium text-pretty max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Fasilitas;