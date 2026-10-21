import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { SPMB_LABEL, SPMB_URL, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Cloud, Sparkle, TwinStars } from './ui/Ornaments';

/*
  Ajakan penutup. Memakai warna utama brand (kuning bintang) supaya terasa "matahari terakhir" sebelum
  footer malam, dengan status SPMB, dua tombol, jalan pintas ke lokasi, dan kolase foto + maskot.
*/

// TODO: ganti dengan foto asli (mis. foto bersama murid & guru) di folder public
const PHOTOS = [
  'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=700&q=70',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=70',
];

const WA_HREF = wa('Halo Admin, saya ingin bertanya mengenai pendaftaran di TK Alfa Centauri.');
const EASE_OUT = [0.22, 1, 0.36, 1];

function Photo({ src, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`bg-gradient-to-br from-sky-200 via-amber-100 to-rose-200 ${className}`} />;
  return <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export default function CTA() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });

  return (
    <section id="daftar" className="w-full px-4 pb-24 pt-8 md:px-6 lg:px-8" aria-labelledby="cta-title">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-sunny shadow-[0_10px_0_0_#E8B408] md:rounded-[3.5rem]">
        {/* sinar matahari lembut + tekstur titik */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.65),transparent_65%)]" />
          <svg viewBox="0 0 200 200" className="spin-slow absolute -right-32 -top-32 h-[30rem] w-[30rem] opacity-40">
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x="97" y="0" width="6" height="40" rx="3" fill="#FFF6C9" transform={`rotate(${i * 22.5} 100 100)`} />
            ))}
          </svg>
          <div className="dots absolute inset-0 opacity-40" />
          <Cloud className="absolute bottom-6 left-[42%] hidden w-28 md:block" opacity={0.9} />
          <Sparkle className="twinkle absolute left-[6%] top-10 w-6" color="#FFFFFF" />
          <Sparkle className="twinkle absolute bottom-12 left-[30%] w-4 [animation-delay:1.3s]" color="#1B2559" />
        </div>

        <div className="relative grid items-center gap-12 px-6 py-14 md:px-12 md:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-16 lg:py-20">
          {/* ---------- Teks ---------- */}
          <div>
            <motion.p
              {...rise()}
              className="inline-flex items-center gap-2.5 rounded-full bg-night px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {SPMB_LABEL}
            </motion.p>

            <motion.h2
              {...rise(0.05)}
              id="cta-title"
              className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-night text-balance md:text-5xl lg:text-6xl"
            >
              Siap Menjadi{' '}
              <span className="relative inline-block">
                Alcentaurian?
                <svg className="absolute -bottom-2 left-0 h-4 w-full overflow-visible text-white" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 8 Q 14.5 2 26 8 T 49 8 T 72 8 T 95 8 T 118 8 T 141 8 T 164 8 T 197 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </motion.h2>

            <motion.p {...rise(0.1)} className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-night/80 text-pretty">
              Langkah pertama ananda untuk tumbuh menjadi generasi unggul dimulai dari sini. Bergabunglah bersama
              keluarga besar Alfa Centauri.
            </motion.p>

            <motion.div {...rise(0.15)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={SPMB_URL} variant="night">
                Info SPMB
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button href={WA_HREF} variant="white">
                <WhatsAppIcon className="h-5 w-5 text-emerald-600" />
                Hubungi Admin
              </Button>
            </motion.div>

            <motion.a
              {...rise(0.2)}
              href="#kontak"
              className="mt-6 inline-flex items-center gap-2 rounded-full text-[15px] font-bold text-night/75 underline-offset-4 hover:text-night hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-night/30"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Atau lihat dulu lokasi sekolah
            </motion.a>
          </div>

          {/* ---------- Kolase foto + maskot ---------- */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[26rem] pb-10 lg:mr-0"
            aria-hidden="true"
          >
            <div className="ml-auto w-[80%] rotate-3 rounded-[2rem] bg-white p-3 pb-4 shadow-[0_24px_40px_-20px_rgba(27,37,89,0.5)]">
              <Photo src={PHOTOS[0]} className="aspect-[4/5] w-full rounded-[1.5rem]" />
            </div>
            <div className="absolute bottom-0 left-0 w-[48%] -rotate-6 rounded-[1.6rem] bg-white p-2.5 pb-3.5 shadow-[0_24px_40px_-20px_rgba(27,37,89,0.5)]">
              <Photo src={PHOTOS[1]} className="aspect-square w-full rounded-[1.2rem]" />
            </div>
            <div className="absolute -top-10 left-[4%]">
              <TwinStars className="w-28 md:w-36" />
            </div>
            <span className="absolute -right-2 bottom-14 rotate-3 rounded-2xl bg-night px-4 py-2 font-display text-sm font-semibold text-white shadow-[0_4px_0_0_#111842] md:text-base">
              Daycare · Playgroup · TK
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
