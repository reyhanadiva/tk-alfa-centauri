import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation, Clock, Mail } from 'lucide-react';
import { CAMPUSES, EMAIL, SCHEDULE, WA_DISPLAY, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Cloud, Floaty, Sparkle, Squiggle } from './ui/Ornaments';

/*
  Section Lokasi & Kontak (id="kontak").
  Kiri: pilihan kampus (kartu yang bisa dipilih), jam belajar, kontak.
  Kanan: peta Google Maps interaktif yang berganti mengikuti kampus terpilih.
  Peta baru dimuat saat mendekati layar (loading="lazy").
*/

const CAMPUS_THEME = {
  terate: { chip: 'bg-sky-100 text-sky-800', ring: 'ring-sky-400', dot: 'bg-sky-500' },
  diponegoro: { chip: 'bg-amber-100 text-amber-800', ring: 'ring-amber-400', dot: 'bg-amber-500' },
};

const mapSrc = (query) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

export default function Lokasi() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(CAMPUSES[0].id);
  const active = CAMPUSES.find((c) => c.id === activeId) ?? CAMPUSES[0];

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section id="kontak" className="relative overflow-hidden px-4 py-24 md:px-8" aria-labelledby="kontak-title">
      <Cloud className="absolute left-[3%] top-16 hidden w-32 md:block" opacity={0.9} />
      <Cloud className="absolute right-[4%] bottom-24 hidden w-28 lg:block" opacity={0.8} />
      <Floaty className="hidden lg:block top-24 right-[12%]">
        <Sparkle className="w-8" color="#FFD23F" />
      </Floaty>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div className="mx-auto max-w-2xl text-center" {...fadeUp()}>
          <h2 id="kontak-title" className="text-4xl font-semibold tracking-tight text-night md:text-5xl text-balance">
            Yuk, Main ke{' '}
            <span className="relative inline-block whitespace-nowrap">
              Sekolah!
              <Squiggle className="text-sunny" />
            </span>
          </h2>
          <p className="mt-5 text-lg font-medium text-night/70 text-pretty">
            Dua kampus di tengah Kota Bandung. Datang langsung, atau tanya jadwal kunjungan lewat WhatsApp.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* ---------- Kiri: kampus, jam, kontak ---------- */}
          <motion.div className="flex flex-col gap-4" {...fadeUp(0.05)}>
            <div role="radiogroup" aria-label="Pilih kampus" className="flex flex-col gap-4">
              {CAMPUSES.map((c) => {
                const selected = c.id === activeId;
                const theme = CAMPUS_THEME[c.id];
                return (
                  <div
                    key={c.id}
                    className={`relative rounded-[1.75rem] border-2 bg-white p-5 transition-[box-shadow,border-color] duration-300 md:p-6 ${
                      selected
                        ? `border-transparent ring-4 ${theme.ring} shadow-[0_6px_0_0_#D6DEEE]`
                        : 'border-white shadow-[0_6px_0_0_#E7ECF5] hover:border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setActiveId(c.id)}
                      className="absolute inset-0 rounded-[1.75rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                    >
                      <span className="sr-only">Tampilkan {c.name} di peta</span>
                    </button>

                    <div className="pointer-events-none relative flex items-start gap-4">
                      <span className={`mt-1 grid size-11 shrink-0 place-items-center rounded-2xl ${theme.chip}`}>
                        <MapPin size={20} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold text-night">{c.name}</h3>
                          <span className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${theme.chip}`}>{c.units}</span>
                        </div>
                        <p className="mt-1.5 text-[15px] font-medium leading-snug text-night/70">{c.address}</p>
                      </div>
                    </div>

                    {/* tombol arah di atas tombol pemilih */}
                    <div className="relative mt-4 pl-[3.75rem]">
                      <a
                        href={c.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 text-sm font-bold text-night ring-1 ring-night/10 transition-colors hover:bg-butter focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                      >
                        <Navigation size={14} aria-hidden="true" />
                        Petunjuk arah
                        <span className="sr-only">(buka Google Maps di tab baru)</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* jam belajar */}
            <div className="rounded-[1.75rem] bg-night p-5 text-white shadow-[0_6px_0_0_#111842] md:p-6">
              <p className="flex items-center gap-2 font-display text-lg font-semibold">
                <Clock size={18} className="text-sunny" aria-hidden="true" />
                Jam Belajar
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {SCHEDULE.map((s) => (
                  <div key={s.name} className="rounded-2xl bg-white/10 px-4 py-3">
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-sky-200">{s.name}</dt>
                    <dd className="mt-0.5 font-display text-2xl font-semibold">{s.time}</dd>
                    {s.note && <dd className="text-xs font-medium text-white/70">{s.note}</dd>}
                  </div>
                ))}
              </dl>
            </div>

            {/* kontak */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={wa('Halo Admin, saya ingin menanyakan jadwal kunjungan ke TK Alfa Centauri.')} variant="night" className="flex-1">
                <WhatsAppIcon className="h-5 w-5 text-emerald-300" />
                {WA_DISPLAY}
              </Button>
              <Button href={`mailto:${EMAIL}`} variant="white" className="flex-1" newTab={false}>
                <Mail size={18} aria-hidden="true" />
                Email
              </Button>
            </div>
          </motion.div>

          {/* ---------- Kanan: peta ---------- */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border-4 border-white bg-cloud shadow-[0_30px_60px_-30px_rgba(27,37,89,0.45)]">
              <iframe
                key={active.id}
                title={`Peta ${active.name}`}
                src={mapSrc(active.mapsQuery)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-extrabold text-night shadow-md">
                <span className={`size-2.5 rounded-full ${CAMPUS_THEME[active.id].dot}`} aria-hidden="true" />
                {active.name}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
