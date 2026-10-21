import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { LOGO_SRC, NAV_LINKS, SPMB_URL } from '@/data/site';
import Button from './ui/Button';

/*
  Navbar melayang.
  - Di atas hero: bilah transparan, teks biru malam di atas langit cerah.
  - Setelah discroll: menyusut jadi pil putih melayang, dan tombol "Info SPMB" muncul
    (tidak dobel dengan tombol di hero saat hero masih terlihat).
  - HP: menu berupa kartu putih yang turun dari atas.
*/
export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu HP: Esc menutup, otomatis tertutup saat layar melebar
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const floating = scrolled || open;
  const t = { duration: reduce ? 0 : 0.2 };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ padding: floating ? '12px 12px 0' : '0' }}
    >
      {/* Skip link untuk pengguna keyboard / pembaca layar */}
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-sunny focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-night focus:shadow-lg focus:outline-none"
      >
        Lewati ke konten utama
      </a>

      <nav
        aria-label="Navigasi utama"
        className={`mx-auto transition-[max-width,border-radius,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          floating
            ? 'max-w-6xl rounded-[1.75rem] border-2 border-white bg-white/85 backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(27,37,89,0.45)]'
            : 'max-w-7xl rounded-none border-2 border-transparent bg-transparent'
        }`}
      >
        <div className={`flex items-center justify-between gap-4 transition-[padding] duration-500 ${floating ? 'py-2 pl-3 pr-2' : 'px-5 py-4 lg:px-8'}`}>
          <a
            href="#beranda"
            className="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
            aria-label="TK Alfa Centauri, beranda"
          >
            <img src={LOGO_SRC} alt="" width="44" height="44" className="h-11 w-11 shrink-0" />
            <span className="font-display text-lg sm:text-xl font-semibold leading-none text-night">
              TK Alfa <span className="text-sky-600">Centauri</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[15px] font-bold text-night/75 transition-colors hover:bg-sky-100/70 hover:text-night focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <AnimatePresence initial={false}>
              {pastHero && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={t}
                  className="hidden sm:block"
                >
                  <Button href={SPMB_URL} size="sm">
                    Info SPMB
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-hp"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className="lg:hidden grid size-11 place-items-center rounded-full bg-white text-night shadow-[0_3px_0_0_#D6DEEE] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-hp"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={t}
            className="lg:hidden mx-auto mt-2 max-w-6xl rounded-[1.75rem] border-2 border-white bg-white p-3 shadow-[0_14px_40px_-18px_rgba(27,37,89,0.45)]"
          >
            <ul className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-lg font-medium text-night hover:bg-cream focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={SPMB_URL} className="mt-3 w-full">
              Info SPMB
              <ArrowRight size={20} aria-hidden="true" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
