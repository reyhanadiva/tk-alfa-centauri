import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ImageOff, Star, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Foto SEMENTARA (dummy) dari picsum.photos. Foto-nya acak tapi tetap sama untuk `seed` yang sama.
// Saat foto asli sudah siap, ganti nilai `image` di bawah dengan alamat fotonya,
// misalnya '/images/berita/field-trip.jpg' (taruh filenya di folder `public`).
const dummyPhoto = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// `href` masih placeholder "#". Ganti dengan alamat halaman artikel yang sebenarnya.
// `dateTime` = format mesin (YYYY-MM-DD) untuk elemen <time>; `date` = teks yang tampil.
const MAIN_ARTICLE = {
  id: 1,
  category: 'Kegiatan',
  date: '12 Oktober 2026',
  dateTime: '2026-10-12',
  title: 'Field Trip ke Kebun Binatang: Mengenal Satwa Sejak Dini',
  href: '#',
  image: dummyPhoto('berita-field-trip', 1200, 750),
};

const SIDE_ARTICLES = [
  {
    id: 2,
    category: 'Prestasi',
    date: '5 Oktober 2026',
    dateTime: '2026-10-05',
    title: 'TK Alfa Centauri Raih Juara 1 Lomba Mewarnai Tingkat Kota',
    href: '#',
    image: dummyPhoto('berita-lomba-mewarnai', 400, 250),
  },
  {
    id: 3,
    category: 'Parenting',
    date: '28 September 2026',
    dateTime: '2026-09-28',
    title: 'Seminar Parenting: Menghadapi Tantrum pada Anak Usia Dini',
    href: '#',
    image: dummyPhoto('berita-seminar-parenting', 400, 250),
  },
  {
    id: 4,
    category: 'Kegiatan',
    date: '20 September 2026',
    dateTime: '2026-09-20',
    title: 'Kegiatan Literasi Jumat Pagi Bersama Guru dan Wali Murid',
    href: '#',
    image: dummyPhoto('berita-literasi-jumat', 400, 250),
  },
  {
    id: 5,
    category: 'Lingkungan',
    date: '15 September 2026',
    dateTime: '2026-09-15',
    title: 'Merawat Lingkungan Sejak Dini dari Kebun Sekolah',
    href: '#',
    image: dummyPhoto('berita-kebun-sekolah', 400, 250),
  },
];

const ALL_NEWS_HREF = '#';

// Teks memakai shade 700 agar kontrasnya cukup di atas latar pastel.
const CATEGORY_STYLES = {
  Kegiatan: 'bg-blue-50 text-blue-700 border-blue-200',
  Prestasi: 'bg-amber-50 text-amber-700 border-amber-200',
  Parenting: 'bg-purple-50 text-purple-700 border-purple-200',
  Lingkungan: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};
const DEFAULT_CATEGORY_STYLE = 'bg-slate-50 text-slate-700 border-slate-200';

const WAVE_BOTTOM =
  'M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

const CategoryBadge = ({ category, className = '' }) => (
  <span
    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
      CATEGORY_STYLES[category] || DEFAULT_CATEGORY_STYLE
    } ${className}`}
  >
    {category}
  </span>
);

// Foto dekoratif (judul artikel di sebelahnya sudah menjelaskan). Bila gagal dimuat,
// tampil blok warna + ikon, bukan teks alt yang berantakan atau kotak hitam.
const NewsImage = ({ src, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-amber-100 text-slate-400"
      >
        <ImageOff className="w-7 h-7" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
};

// Hiasan melayang (dekoratif). Diam bila pengguna memilih reduce motion.
const Floaty = ({ className = '', duration = 6, y = -15, delay = 0, rotate = [0, 10, 0], children }) => {
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

const BeritaArtikel = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      className="relative w-full bg-[#F8F9FA] pt-24 pb-32 px-4 md:px-8 overflow-hidden"
      aria-labelledby="berita-title"
    >
      {/*
        Ombak atas sengaja dihapus. Peralihan dari Galeri ke section ini sekarang hanya satu gelombang,
        yaitu ombak bawah milik Galeri (warnanya disamakan dengan latar section ini, #F8F9FA).
        Sebelumnya ada dua gelombang putih bertumpuk sehingga muncul pita putih di tengahnya.
      */}

      {/* Blob warna lembut */}
      <div className="absolute top-20 right-[-5%] w-[350px] h-[350px] bg-blue-100/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-[-6%] w-[300px] h-[300px] bg-amber-100/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-24 right-[18%] w-[300px] h-[300px] bg-pink-100/50 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Hiasan melayang */}
      <Floaty duration={6} y={-15} className="hidden md:block top-24 right-[12%] opacity-80">
        <Star className="w-10 h-10 text-amber-400 fill-amber-300 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={7} y={14} delay={1} rotate={[-10, 10, -10]} className="hidden lg:block top-40 right-[22%] opacity-70">
        <Sparkles className="w-7 h-7 text-sky-400 drop-shadow-sm" />
      </Floaty>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8 md:mb-10" {...fadeUp()}>
          <h2
            id="berita-title"
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
          >
            Berita dan Acara Sekolah
          </h2>
        </motion.div>

        {/* Layout Asimetris */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Kolom Kiri: Artikel Highlight */}
          <motion.article
            {...fadeUp(0.05)}
            className="group relative w-full lg:w-[55%] flex flex-col bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-300 motion-reduce:transition-none overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-100 overflow-hidden">
              <NewsImage
                src={MAIN_ARTICLE.image}
                className="group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
              />
            </div>

            <div className="p-5 md:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <time dateTime={MAIN_ARTICLE.dateTime} className="text-sm font-medium text-slate-500">
                  {MAIN_ARTICLE.date}
                </time>
                <CategoryBadge category={MAIN_ARTICLE.category} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug text-balance">
                {/* Tautan "diregangkan" ke seluruh kartu: seluruh area bisa diklik, tapi hanya satu tab stop */}
                <a
                  href={MAIN_ARTICLE.href}
                  className="focus:outline-none after:absolute after:inset-0 after:rounded-[1.5rem] md:after:rounded-[2rem] focus-visible:after:ring-4 focus-visible:after:ring-inset focus-visible:after:ring-blue-500"
                >
                  {MAIN_ARTICLE.title}
                </a>
              </h3>
            </div>
          </motion.article>

          {/* Kolom Kanan: daftar artikel */}
          <ul className="w-full lg:w-[45%] flex flex-col justify-between list-none p-0 m-0">
            {SIDE_ARTICLES.map((item, index) => (
              <motion.li
                key={item.id}
                {...fadeUp(0.1 + index * 0.07)}
                className={`group relative flex items-center justify-between py-4 md:py-[18px] ${
                  index !== SIDE_ARTICLES.length - 1 ? 'border-b border-slate-200/70' : ''
                }`}
              >
                <article className="pr-4 md:pr-5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <time dateTime={item.dateTime} className="text-xs md:text-sm font-medium text-slate-500">
                      {item.date}
                    </time>
                    <CategoryBadge category={item.category} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-3 leading-snug">
                    <a
                      href={item.href}
                      className="focus:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-4 focus-visible:after:ring-inset focus-visible:after:ring-blue-500"
                    >
                      {item.title}
                    </a>
                  </h4>
                </article>

                <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm border border-slate-100">
                  <NewsImage
                    src={item.image}
                    className="group-hover:scale-110 transition-transform duration-700 motion-reduce:transition-none"
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tombol Call to Action */}
        <motion.div className="mt-10 md:mt-12 text-left" {...fadeUp(0.1)}>
          <a
            href={ALL_NEWS_HREF}
            className="group/cta inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-[15px] text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            Lihat semua berita
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover/cta:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      {/* Wavy Divider Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px] pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]" aria-hidden="true">
          <path fill="#ffffff" d={WAVE_BOTTOM} />
        </svg>
      </div>
    </section>
  );
};

export default BeritaArtikel;