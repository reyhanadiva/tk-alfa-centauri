import React from 'react';
import { MapPin, Mail, Instagram, Youtube, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { CAMPUSES, EMAIL, LOGO_SRC, NETWORK, SCHOOL, SOCIALS, SPMB_URL, WA_DISPLAY, wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Sparkle, TwinStars } from './ui/Ornaments';

/*
  Footer: langit malam Alfa Centauri. Hari di hero dimulai pagi; halaman ditutup malam berbintang,
  dengan maskot dua bintang bersinar. Bukit di tepi atas menyambung dari latar halaman (cream).
*/

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook };

// posisi bintang kecil (persen), dibuat tetap supaya tidak berubah tiap render
const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37 + 7) % 100,
  top: (i * 53 + 11) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.45,
}));

export default function Footer() {
  const socials = Object.entries(SOCIALS).filter(([, url]) => url);

  return (
    <footer className="relative mt-8 bg-[linear-gradient(180deg,#1B2559_0%,#111842_100%)] text-white/80">
      {/* bukit malam di tepi atas */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-[59px] h-[60px] w-full md:-top-[89px] md:h-[90px]"
        aria-hidden="true"
      >
        <path d="M0 60 C 240 10 470 20 720 50 C 960 80 1200 20 1440 40 V90 H0 Z" fill="#24307A" />
        <path d="M0 76 C 300 40 560 52 820 70 C 1060 86 1260 56 1440 62 V90 H0 Z" fill="#1B2559" />
      </svg>

      {/* bintang berkelip */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
        <Sparkle className="twinkle absolute left-[18%] top-[16%] w-4" color="#FFD23F" />
        <Sparkle className="twinkle absolute right-[30%] top-[10%] w-3 [animation-delay:1s]" color="#BFE3FF" />
      </div>

      {/* bulan sabit */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[4%] top-6 hidden h-20 w-20 sm:block lg:right-[3%] lg:top-8">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.35),transparent_70%)]" />
        <svg viewBox="0 0 100 100" className="absolute inset-0">
          <defs>
            <mask id="bulan-sabit">
              <rect width="100" height="100" fill="#fff" />
              <circle cx="62" cy="40" r="22" fill="#000" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="24" fill="#FFE08A" mask="url(#bulan-sabit)" />
        </svg>
      </div>

      {/* bintang jatuh sesekali */}
      <span aria-hidden="true" className="shooting-star pointer-events-none absolute left-[12%] top-16 h-0.5 w-24 rounded-full bg-gradient-to-r from-white to-transparent" />

      <NightLandscape />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Profil */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_4px_0_0_rgba(255,255,255,0.25)]">
                <img src={LOGO_SRC} alt="" width="56" height="56" className="h-14 w-14" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold leading-tight text-white">{SCHOOL.name}</p>
                <p className="text-sm font-bold text-sky-300">{SCHOOL.city}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
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
                      className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
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
            <h2 className="font-display text-lg font-semibold text-white">Kunjungi Kami</h2>
            <ul className="mt-5 space-y-5">
              {CAMPUSES.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sunny" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-extrabold text-white">
                      {c.name} · <span className="font-semibold text-white/70">{c.units}</span>
                    </p>
                    <a
                      href={c.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm leading-snug text-white/65 transition-colors hover:text-white"
                    >
                      {c.address}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-bold text-white hover:text-sunny">
                  <WhatsAppIcon className="h-4 w-4 text-emerald-300" />
                  {WA_DISPLAY} (Admin)
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 text-sm font-bold text-white hover:text-sunny">
                  <Mail className="h-4 w-4 text-sky-300" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Jaringan pendidikan */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-lg font-semibold text-white">Jaringan Pendidikan</h2>
            <ul className="mt-5 space-y-3">
              {NETWORK.map((n) => (
                <li key={n.name}>
                  {n.href ? (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {n.name}
                      <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-sm text-white/70">{n.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ruang untuk lanskap malam; hak cipta duduk di atas bukit depan */}
        <div className="relative mt-24 flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/60 md:mt-32 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-bold text-white/80">TK Alfa Centauri Bandung</span>. Semua hak dilindungi.
          </p>
          <p className="font-display text-sm text-white/60">{SCHOOL.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Lanskap malam di dasar footer: bukit berlapis, sekolah dengan jendela menyala, pohon, dan lampu taman.
 * Versi malam dari bukit & sekolah di hero, jadi halaman dibuka pagi dan ditutup malam.
 */
function NightLandscape() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] md:h-[190px]">
      <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 92 C 200 40 380 52 560 82 C 760 116 920 46 1120 44 C 1270 42 1370 70 1440 80 V190 H0 Z" fill="#2A3687" />
        <path d="M0 128 C 240 92 470 98 700 122 C 930 146 1150 100 1440 112 V190 H0 Z" fill="#1F2A70" />
        <path d="M0 160 C 300 140 600 146 860 158 C 1110 170 1290 150 1440 154 V190 H0 Z" fill="#151D52" />
      </svg>

      {/* sekolah dengan jendela menyala di bukit belakang */}
      <svg viewBox="0 0 120 90" className="absolute bottom-[54%] right-[18%] hidden w-20 sm:block md:w-28">
        <path d="M60 4 V20" stroke="#8FA0E8" strokeWidth="2" />
        <path d="M60 4 L74 9 L60 14 Z" fill="#FF8FA3" />
        <path d="M10 44 L60 18 L110 44 Z" fill="#3A49A8" />
        <rect x="18" y="43" width="84" height="44" rx="3" fill="#2E3C94" />
        <rect x="52" y="60" width="16" height="27" rx="2" fill="#FFD23F" opacity="0.85" />
        <rect x="26" y="52" width="14" height="12" rx="2" fill="#FFD23F" className="twinkle" />
        <rect x="80" y="52" width="14" height="12" rx="2" fill="#FFD23F" className="twinkle [animation-delay:1.4s]" />
        <circle cx="60" cy="33" r="5" fill="#FFD23F" />
      </svg>

      {/* pohon & lampu taman */}
      <svg viewBox="0 0 40 70" className="absolute bottom-[38%] left-[9%] w-9 md:w-12">
        <rect x="18" y="40" width="5" height="28" rx="2" fill="#1A2460" />
        <circle cx="20" cy="26" r="18" fill="#22307A" />
        <circle cx="13" cy="20" r="6" fill="#2D3D96" />
      </svg>
      <svg viewBox="0 0 40 70" className="absolute bottom-[44%] left-[16%] hidden w-7 md:block">
        <rect x="18" y="40" width="5" height="28" rx="2" fill="#1A2460" />
        <circle cx="20" cy="26" r="16" fill="#26348A" />
      </svg>
      <svg viewBox="0 0 30 80" className="absolute bottom-[30%] right-[34%] hidden w-5 md:block">
        <rect x="13" y="22" width="4" height="56" rx="2" fill="#3A49A8" />
        <circle cx="15" cy="16" r="9" fill="#FFE08A" />
        <circle cx="15" cy="16" r="16" fill="#FFE08A" opacity="0.2" />
      </svg>
    </div>
  );
}
