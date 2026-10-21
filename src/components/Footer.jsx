import React from 'react';
import { MapPin, Mail, Instagram, Youtube, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { CAMPUSES, EMAIL, NETWORK, SCHOOL, SOCIALS, SPMB_URL, WA_DISPLAY, wa } from '@/data/site';
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

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Profil */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <TwinStars className="w-16" glow />
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-bold text-white/80">TK Alfa Centauri Bandung</span>. Semua hak dilindungi.
          </p>
          <p className="font-display text-sm text-white/60">{SCHOOL.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
