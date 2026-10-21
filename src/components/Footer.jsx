import React from 'react';
import { MapPin, Mail, Instagram, Youtube, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { CAMPUSES, EMAIL, LOGO_SRC, NETWORK, SCHOOL, SOCIALS, SPMB_URL, WA_DISPLAY, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Cloud, Sparkle, Star } from './ui/Ornaments';

/*
  Footer: langit siang dengan parade kereta mainan. Gerbong warna-warni membawa huruf A-L-F-A
  dan bintang maskot, melintas di atas rel di bukit hijau. Diam bila pengguna memilih reduce motion.
*/

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook };

// Class ditulis lengkap agar aman dari purge Tailwind
const WAGONS = [
  { letter: 'A', body: 'bg-sky-400', roof: 'bg-sky-600' },
  { letter: 'L', body: 'bg-emerald-400', roof: 'bg-emerald-600' },
  { letter: 'F', body: 'bg-violet-400', roof: 'bg-violet-600' },
  { letter: 'A', body: 'bg-amber-400', roof: 'bg-amber-600' },
];

export default function Footer() {
  const socials = Object.entries(SOCIALS).filter(([, url]) => url);

  return (
    <footer className="relative mt-8 overflow-hidden bg-[linear-gradient(180deg,#EAF6FF_0%,#D2ECFF_100%)] text-night/80">
      {/* tepi atas bergelombang awan, menyambung dari latar halaman (cream) */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full md:h-14" aria-hidden="true">
        <path d="M0 0 H1440 V22 C 1380 46 1320 46 1260 26 C 1200 50 1120 50 1060 28 C 1000 52 920 52 860 30 C 800 50 720 50 660 26 C 600 48 520 48 460 28 C 400 50 320 50 260 26 C 200 46 120 46 60 24 C 40 30 20 32 0 30 Z" fill="#FFF9EE" />
      </svg>

      {/* awan & kilau */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Cloud className="absolute left-[4%] top-24 hidden w-28 md:block" opacity={0.95} />
        <Cloud className="absolute right-[6%] top-16 w-24 md:w-32" opacity={0.9} />
        <Cloud className="absolute left-[46%] top-[42%] hidden w-20 lg:block" opacity={0.8} />
        <Sparkle className="twinkle absolute left-[30%] top-16 w-4" />
        <Sparkle className="twinkle absolute right-[24%] top-[38%] w-3 [animation-delay:1.2s]" color="#7CC4FF" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-4 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Profil */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_4px_0_0_rgba(27,37,89,0.12)] ring-1 ring-night/5">
                <img src={LOGO_SRC} alt="" width="56" height="56" className="h-14 w-14" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold leading-tight text-night">{SCHOOL.name}</p>
                <p className="text-sm font-bold text-sky-700">{SCHOOL.city}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-night/70">
              Daycare, Playgroup, dan TK di bawah naungan {SCHOOL.foundation}. Membentuk karakter tangguh dengan
              keseimbangan ilmu dunia dan akhirat.
            </p>
            <Button href={SPMB_URL} className="mt-6" size="sm">
              Info SPMB
              <ArrowRight size={18} aria-hidden="true" />
            </Button>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(([key, url]) => {
                  const Icon = SOCIAL_ICONS[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="grid size-10 place-items-center rounded-full bg-white text-night transition-colors hover:bg-butter focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Kunjungi kami */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-lg font-semibold text-night">Kunjungi Kami</h2>
            <ul className="mt-5 space-y-5">
              {CAMPUSES.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-extrabold text-night">
                      {c.name} · <span className="font-semibold text-night/60">{c.units}</span>
                    </p>
                    <a
                      href={c.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm leading-snug text-night/65 transition-colors hover:text-night"
                    >
                      {c.address}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-bold text-night hover:text-sky-700">
                  <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
                  {WA_DISPLAY} (Admin)
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 text-sm font-bold text-night hover:text-sky-700">
                  <Mail className="h-4 w-4 text-sky-600" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Jaringan pendidikan */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-lg font-semibold text-night">Jaringan Pendidikan</h2>
            <ul className="mt-5 space-y-3">
              {NETWORK.map((n) => (
                <li key={n.name}>
                  {n.href ? (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-night/70 transition-colors hover:text-night"
                    >
                      {n.name}
                      <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-sm text-night/70">{n.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <TrainParade />

      {/* hak cipta di atas rumput */}
      <div className="relative bg-[#4CAF6E] pb-24 md:pb-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 pt-1 text-xs text-white/85 md:flex-row md:px-8">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-bold text-white">TK Alfa Centauri Bandung</span>. Semua hak dilindungi.
          </p>
          <p className="font-display text-sm text-white">{SCHOOL.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

/** Roda kereta dengan jari-jari supaya putarannya terlihat */
function Wheel() {
  return (
    <svg viewBox="0 0 20 20" className="train-wheel h-5 w-5 md:h-6 md:w-6">
      <circle cx="10" cy="10" r="9" fill="#1B2559" />
      <circle cx="10" cy="10" r="5.5" fill="#FFD23F" />
      <path d="M10 4.5 V15.5 M4.5 10 H15.5" stroke="#1B2559" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="1.8" fill="#1B2559" />
    </svg>
  );
}

/**
 * Bukit hijau dengan rel, dan kereta mainan yang melintas dari kiri ke kanan tanpa henti.
 */
function TrainParade() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-6 h-[150px] md:h-[170px]">
      {/* bukit */}
      <svg viewBox="0 0 1440 170" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 70 C 220 20 420 30 640 62 C 860 94 1080 24 1300 34 C 1370 37 1410 46 1440 52 V170 H0 Z" fill="#A7DDB2" />
        <path d="M0 104 C 260 74 520 82 760 100 C 1000 118 1220 84 1440 92 V170 H0 Z" fill="#7CCB8F" />
        <path d="M0 130 C 360 120 720 122 1080 128 C 1260 131 1380 128 1440 128 V170 H0 Z" fill="#4CAF6E" />
      </svg>

      {/* pohon & bunga kecil di bukit belakang */}
      <svg viewBox="0 0 40 60" className="absolute bottom-[56%] left-[12%] w-8 md:w-10">
        <rect x="18" y="34" width="5" height="24" rx="2" fill="#8B5E3C" />
        <circle cx="20" cy="22" r="16" fill="#3E9B5A" />
        <circle cx="14" cy="17" r="5" fill="#5CBF77" />
      </svg>
      <svg viewBox="0 0 40 60" className="absolute bottom-[50%] right-[14%] w-7 md:w-9">
        <rect x="18" y="34" width="5" height="24" rx="2" fill="#8B5E3C" />
        <circle cx="20" cy="22" r="15" fill="#46A563" />
      </svg>
      <span className="absolute bottom-[40%] left-[36%] h-2.5 w-2.5 rounded-full bg-rose-400 ring-2 ring-white" />
      <span className="absolute bottom-[44%] left-[62%] h-2.5 w-2.5 rounded-full bg-amber-300 ring-2 ring-white" />
      <span className="absolute bottom-[38%] right-[30%] h-2.5 w-2.5 rounded-full bg-violet-300 ring-2 ring-white" />

      {/* rel */}
      <div className="absolute inset-x-0 bottom-[22px]">
        <div className="h-1.5 bg-[repeating-linear-gradient(90deg,#8B5E3C_0_10px,transparent_10px_26px)]" />
        <div className="h-1 bg-[#6B7280]" />
      </div>

      {/* kereta */}
      <div className="train-run absolute bottom-[28px] left-0 flex items-end gap-1.5">
        {/* gerbong belakang membawa bintang maskot */}
        <div className="relative flex flex-col items-center">
          <div className="train-bob relative grid h-12 w-16 place-items-center rounded-xl bg-rose-400 md:h-14 md:w-20">
            <Star face className="absolute -top-7 w-11 md:-top-8 md:w-12" />
          </div>
          <div className="-mt-2 flex gap-4"><Wheel /><Wheel /></div>
        </div>

        {WAGONS.map((w, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <span className="absolute -left-2 bottom-5 h-1 w-3 rounded bg-night/70" />
            <div className={`train-bob relative grid h-12 w-14 place-items-center rounded-xl md:h-14 md:w-16 ${w.body}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className={`absolute inset-x-0 top-0 h-2 rounded-t-xl ${w.roof}`} />
              <span className="font-display text-2xl font-bold text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.15)] md:text-3xl">{w.letter}</span>
            </div>
            <div className="-mt-2 flex gap-3"><Wheel /><Wheel /></div>
          </div>
        ))}

        {/* lokomotif */}
        <div className="relative flex flex-col items-center">
          <span className="absolute -left-2 bottom-5 h-1 w-3 rounded bg-night/70" />
          <div className="train-bob relative h-16 w-24 md:h-[4.5rem] md:w-28">
            {/* asap */}
            <span className="train-puff absolute -top-8 right-3 h-5 w-5 rounded-full bg-white" />
            <span className="train-puff absolute -top-8 right-3 h-4 w-4 rounded-full bg-white [animation-delay:0.6s]" />
            <span className="train-puff absolute -top-8 right-3 h-3 w-3 rounded-full bg-white [animation-delay:1.2s]" />
            {/* cerobong */}
            <span className="absolute -top-4 right-4 h-6 w-4 rounded-t-md bg-night" />
            <span className="absolute -top-5 right-3 h-2 w-6 rounded bg-night-700" />
            {/* kabin */}
            <div className="absolute bottom-0 left-0 h-full w-11 rounded-xl rounded-tr-none bg-night md:w-12">
              <span className="absolute left-2 top-2.5 h-5 w-6 rounded-md bg-sky-200" />
            </div>
            {/* badan depan */}
            <div className="absolute bottom-0 right-0 h-10 w-[4.25rem] rounded-xl rounded-r-[1.25rem] bg-night-700 md:h-11 md:w-20">
              <Star className="absolute right-2 top-1/2 w-6 -translate-y-1/2 md:w-7" />
            </div>
          </div>
          <div className="-mt-2 flex gap-5"><Wheel /><Wheel /></div>
        </div>
      </div>
    </div>
  );
}
