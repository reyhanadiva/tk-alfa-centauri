import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SPMB_LABEL, SPMB_URL, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Sparkle, TwinStars } from './ui/Ornaments';

/*
  Ajakan penutup bergaya "tiket masuk". Sengaja berbeda dari hero (langit cerah + bukit):
  kartu tiket biru malam dengan tepi berlubang, sobekan berisi maskot, dan stempel SPMB,
  di atas dua pita kapsul miring yang berjalan berlawanan arah.
*/

const WA_HREF = wa('Halo Admin, saya ingin bertanya mengenai pendaftaran di TK Alfa Centauri.');
const EASE_OUT = [0.22, 1, 0.36, 1];

// Class ditulis lengkap agar aman dari purge Tailwind
const CHIPS = [
  { label: 'Daycare 0–2 th', cls: 'bg-sky-100 text-sky-800' },
  { label: 'Playgroup 2–4 th', cls: 'bg-emerald-100 text-emerald-800' },
  { label: 'TK 4–6 th', cls: 'bg-violet-100 text-violet-800' },
  { label: 'Reguler & Fullday', cls: 'bg-amber-100 text-amber-800' },
  { label: 'Nilai Islami', cls: 'bg-rose-100 text-rose-800' },
  { label: 'Bermain sambil belajar', cls: 'bg-sky-100 text-sky-800' },
  { label: 'Kelas Stimulasi', cls: 'bg-emerald-100 text-emerald-800' },
  { label: 'Mengaji metode Ummi', cls: 'bg-violet-100 text-violet-800' },
];

function Ribbon({ reverse = false, className = '' }) {
  const items = [...CHIPS, ...CHIPS];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 w-[140vw] -translate-x-1/2 overflow-hidden ${className}`}>
      <ul
        className="marquee-chips flex w-max gap-3 py-3"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {items.map((c, i) => (
          <li key={i} className={`shrink-0 rounded-full px-5 py-2 font-display text-base font-semibold md:text-lg ${c.cls}`}>
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section id="daftar" className="relative w-full overflow-x-clip px-4 pb-24 pt-16 md:px-6" aria-labelledby="cta-title">
      {/* Dua pita kapsul miring di belakang tiket */}
      <Ribbon className="top-[18%] -rotate-3 bg-white/70 py-1" />
      <Ribbon reverse className="bottom-[16%] rotate-2 bg-sunny/60 py-1" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="relative mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-night text-white shadow-[0_30px_60px_-25px_rgba(17,24,66,0.7)] md:flex-row md:rounded-[2.5rem]"
      >
        {/* ---------- Badan tiket ---------- */}
        <div className="relative flex-1 px-6 py-10 md:px-12 md:py-14">
          <div className="dots-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <Sparkle className="twinkle absolute right-8 top-8 w-5" color="#FFD23F" />

          <p className="relative inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-sunny">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {SPMB_LABEL}
          </p>

          <h2 id="cta-title" className="relative mt-6 text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
            Siap Menjadi <span className="text-sunny">Alcentaurian?</span>
          </h2>

          <p className="relative mt-5 max-w-lg text-lg font-medium leading-relaxed text-white/75 text-pretty">
            Langkah pertama ananda untuk tumbuh menjadi generasi unggul dimulai dari sini. Bergabunglah bersama
            keluarga besar Alfa Centauri.
          </p>

          <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={SPMB_URL} variant="sun">
              Info SPMB
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={WA_HREF} variant="glass">
              <WhatsAppIcon className="h-5 w-5 text-emerald-400" />
              Hubungi Admin
            </Button>
          </div>
        </div>

        {/* ---------- Garis sobek (lubang + putus-putus) ---------- */}
        <div aria-hidden="true" className="relative h-0 md:h-auto md:w-0">
          <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-cream md:-left-4 md:-top-4" />
          <span className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-cream md:-bottom-4 md:-left-4 md:right-auto md:top-auto" />
          <span className="absolute inset-x-6 top-0 border-t-[3px] border-dashed border-white/25 md:inset-x-auto md:inset-y-6 md:left-0 md:border-l-[3px] md:border-t-0" />
        </div>

        {/* ---------- Sobekan tiket: maskot + stempel ---------- */}
        <div className="relative flex items-center justify-center gap-6 bg-night-700 px-6 py-8 md:w-64 md:flex-col md:py-12">
          <div className="relative w-28 md:w-36">
            <TwinStars className="w-full" />
          </div>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/60">Tahun Ajaran</p>
            <p className="font-display text-3xl font-semibold text-sunny">2027/2028</p>
          </div>
          <span
            aria-hidden="true"
            className="absolute -right-3 bottom-3 rotate-[-14deg] rounded-xl border-[3px] border-sunny/80 px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-sunny/90 md:bottom-6 md:right-4"
          >
            SPMB Dibuka
          </span>
        </div>
      </motion.div>
    </section>
  );
}
