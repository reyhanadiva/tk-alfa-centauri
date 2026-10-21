import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Baby } from 'lucide-react';
import { CAMPUSES, wa } from '@/data/site';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Cloud, Floaty, Sparkle, Squiggle } from './ui/Ornaments';

/*
  Section Lokasi & Kontak (id="kontak").
  Karena ada DUA lokasi dengan jenjang berbeda, pengunjung dibantu memilih:
  1. "Usia ananda berapa?" → langsung ditunjukkan jenjang & lokasi yang tepat.
  2. Kartu lokasi: jenjang + usia, alamat, petunjuk arah, salin alamat, jadwalkan kunjungan.
  3. Peta Google Maps yang berganti mengikuti lokasi terpilih (dimuat saat mendekati layar).
  Jam belajar & kontak sengaja tidak diulang di sini (sudah ada di Program Layanan, FAQ, dan footer).
*/

const CAMPUS_THEME = {
  terate: { chip: 'bg-sky-100 text-sky-800', ring: 'ring-sky-400', dot: 'bg-sky-500', soft: 'bg-sky-50' },
  diponegoro: { chip: 'bg-amber-100 text-amber-800', ring: 'ring-amber-400', dot: 'bg-amber-500', soft: 'bg-amber-50' },
};

// Pilihan usia → jenjang & lokasi (diambil dari data lokasi, jadi selalu sinkron)
const AGE_OPTIONS = CAMPUSES.flatMap((c) => c.programs.map((p) => ({ ...p, campusId: c.id, campusName: c.name }))).sort(
  (a, b) => parseInt(a.age, 10) - parseInt(b.age, 10)
);

const mapSrc = (query) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

export default function Lokasi() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(CAMPUSES[0].id);
  const [age, setAge] = useState(null); // pilihan usia (unit), null = belum memilih
  const [copied, setCopied] = useState(null);
  const active = CAMPUSES.find((c) => c.id === activeId) ?? CAMPUSES[0];
  const ageResult = AGE_OPTIONS.find((o) => o.unit === age);

  const pickAge = (opt) => {
    setAge(opt.unit);
    setActiveId(opt.campusId);
  };

  const copyAddress = async (c) => {
    try {
      await navigator.clipboard.writeText(c.address);
      setCopied(c.id);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard tidak tersedia: abaikan */
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
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
            Kami punya dua lokasi di Kota Bandung dengan jenjang yang berbeda. Pilih usia ananda untuk melihat lokasi
            yang tepat.
          </p>
        </motion.div>

        {/* ---------- Pemilih usia ---------- */}
        <motion.div {...fadeUp(0.05)} className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-white p-5 shadow-[0_6px_0_0_#E7ECF5] md:p-6">
          <p className="flex items-center justify-center gap-2 text-center font-display text-lg font-semibold text-night">
            <Baby size={20} className="text-sky-600" aria-hidden="true" />
            Usia ananda berapa?
          </p>
          <div role="radiogroup" aria-label="Pilih usia ananda" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {AGE_OPTIONS.map((o) => {
              const on = age === o.unit;
              return (
                <button
                  key={o.unit}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => pickAge(o)}
                  className={`rounded-2xl px-2 py-3 text-center transition-[background-color,box-shadow,transform] active:translate-y-[2px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 ${
                    on ? 'bg-sunny shadow-[0_4px_0_0_#E8B408]' : 'bg-cream shadow-[0_4px_0_0_#EDE3CC] hover:bg-butter'
                  }`}
                >
                  <span className="block font-display text-lg font-semibold text-night sm:text-xl">{o.age}</span>
                  <span className="block text-xs font-bold text-night/60 sm:text-sm">{o.unit}</span>
                </button>
              );
            })}
          </div>
          <div aria-live="polite" className="min-h-[1.75rem]">
            <AnimatePresence mode="wait">
              {ageResult && (
                <motion.p
                  key={ageResult.unit}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-[15px] font-semibold text-night/80"
                >
                  Ananda masuk jenjang <strong className="text-night">{ageResult.unit}</strong> di{' '}
                  <strong className="text-night">{ageResult.campusName}</strong>. Lokasinya sudah ditandai di peta.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* ---------- Kiri: kartu lokasi ---------- */}
          <motion.div className="flex flex-col gap-4" {...fadeUp(0.05)}>
            <div role="radiogroup" aria-label="Pilih lokasi" className="flex flex-col gap-4">
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
                        <h3 className="text-xl font-semibold text-night">{c.name}</h3>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {c.programs.map((p) => (
                            <li key={p.unit} className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${theme.chip}`}>
                              {p.unit} · {p.age}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2.5 text-[15px] font-medium leading-snug text-night/70">{c.address}</p>
                      </div>
                    </div>

                    {/* aksi (di atas tombol pemilih kartu) */}
                    <div className="relative mt-4 flex flex-wrap gap-2 sm:pl-[3.75rem]">
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
                      <button
                        type="button"
                        onClick={() => copyAddress(c)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 text-sm font-bold text-night ring-1 ring-night/10 transition-colors hover:bg-butter focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                      >
                        {copied === c.id ? <Check size={14} className="text-emerald-600" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                        <span aria-live="polite">{copied === c.id ? 'Tersalin!' : 'Salin alamat'}</span>
                      </button>
                      <a
                        href={wa(`Halo Admin, saya ingin menjadwalkan kunjungan ke ${c.name} (${c.units}) TK Alfa Centauri.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        Jadwalkan kunjungan
                        <span className="sr-only">(buka WhatsApp di tab baru)</span>
                      </a>
                    </div>
                  </div>
                );
              })}
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
                {active.name} · {active.units}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
