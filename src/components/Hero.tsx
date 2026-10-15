import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Star, ArrowRight, MessageCircle, Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA & KONFIGURASI                                                  */
/* ------------------------------------------------------------------ */

const HERO_BASE = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74';
const HERO_WIDTHS = [800, 1280, 2000];
const heroUrl = (w: number) => `${HERO_BASE}?q=75&w=${w}&auto=format&fit=crop`;

type NavItem = { label: string; href: string };

// Pastikan tiap section punya id yang sama: beranda (hero ini), tentang, galeri, program, fasilitas, berita, kontak
const MENU_LINKS: NavItem[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Program', href: '#program' },
  { label: 'Fasilitas', href: '#fasilitas' },
  { label: 'Berita', href: '#berita' },
  { label: 'Kontak', href: '#kontak' },
];

// Peran tiap ajakan dibedakan:
// - Tombol navbar  : "Info SPMB"       -> membaca jalur/syarat/jadwal (muncul setelah hero discroll)
// - CTA utama hero : "Daftar Sekarang" -> mengisi formulir pendaftaran
// - CTA kedua hero : "Hubungi Admin"   -> bertanya dulu lewat WhatsApp
// TODO: ganti tiga tujuan ini dengan tautan/ID asli.
const SPMB_INFO_HREF = '#spmb';
const REGISTER_HREF = '#daftar';
const WHATSAPP_HREF = 'https://wa.me/62XXXXXXXXXXX';

const NAV_OFFSET = 80; // tinggi navbar fixed, supaya judul section tidak tertutup saat scroll ke anchor

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', bounce: 0.4 },
  },
};

// Versi tanpa gerak untuk pengguna dengan prefers-reduced-motion
const staticVariants: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

/* ------------------------------------------------------------------ */
/* KOMPONEN                                                            */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [showNavCta, setShowNavCta] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const item = reduceMotion ? staticVariants : itemVariants;

  // Navbar: transparan di atas, berubah jadi kaca saat discroll.
  // Tombol "Info SPMB" baru muncul setelah pengunjung melewati CTA hero (tidak dobel saat hero terlihat).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowNavCta(y > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: kunci scroll, Esc untuk menutup, tutup otomatis saat layar melebar
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  // Smooth scroll ke anchor (dengan offset navbar). Jika id tujuan belum ada, biarkan perilaku bawaan.
  const handleAnchor = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      setMenuOpen(false);
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      const top =
        href === '#beranda' ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [reduceMotion]
  );

  const navSurface =
    scrolled || menuOpen
      ? 'py-3 bg-slate-900/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.15)]'
      : 'py-6 bg-transparent border-b border-transparent';

  return (
    <section
      id="beranda"
      className="relative min-h-[100svh] w-full flex flex-col overflow-hidden"
    >
      {/* Skip link untuk pengguna keyboard / pembaca layar */}
      <a
        href="#beranda-konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-yellow-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-slate-900 focus:shadow-lg focus:outline-none"
      >
        Lewati ke konten utama
      </a>

      {/* Background image (dengan fallback bila gagal dimuat) */}
      {imgFailed ? (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-600 via-indigo-700 to-indigo-950" />
      ) : (
        <img
          src={heroUrl(2000)}
          srcSet={HERO_WIDTHS.map((w) => `${heroUrl(w)} ${w}w`).join(', ')}
          sizes="100vw"
          alt="Anak-anak belajar dan bermain di sekolah taman kanak-kanak"
          fetchPriority="high"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
      )}

      {/* Overlay kiri-ke-kanan agar teks terbaca (indigo, selaras dengan section Tentang Kami) */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/85 via-indigo-950/50 to-transparent z-0" />
      {/* Overlay bawah agar ombak putih menyatu halus walau bagian bawah foto terang */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-indigo-950/40 to-transparent z-0" />

      {/* Top Navigation Bar (fixed, jadi kaca saat discroll) */}
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 inset-x-0 z-50 px-6 lg:px-12 flex items-center justify-between gap-6 transition-all duration-300 ${navSurface}`}
      >
        {/* Logo */}
        <a
          href="#beranda"
          onClick={(e) => handleAnchor(e, '#beranda')}
          className={`font-fredoka text-white font-semibold text-lg sm:text-xl tracking-wide flex items-center gap-2 rounded-md ${FOCUS_RING}`}
        >
          <Star className="text-yellow-400 fill-yellow-400" size={24} aria-hidden="true" />
          TK ALFA CENTAURI
        </a>

        {/* Menu links (desktop) */}
        <ul className="hidden lg:flex flex-1 justify-center gap-6 xl:gap-8 text-sm font-semibold">
          {MENU_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className={`text-slate-100 hover:text-white transition-colors rounded-md px-1 py-1 ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol navbar: muncul setelah scroll (ruangnya tetap dipesan agar menu tidak bergeser) */}
        <a
          href={SPMB_INFO_HREF}
          onClick={(e) => handleAnchor(e, SPMB_INFO_HREF)}
          className={`hidden lg:inline-flex font-nunito bg-blue-400 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${FOCUS_RING} ${
            showNavCta ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 invisible'
          }`}
        >
          Info SPMB
        </a>

        {/* Hamburger (mobile & tablet) */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          className={`lg:hidden p-2.5 rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-colors ${FOCUS_RING}`}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* Menu mobile: panel kaca layar penuh */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-slate-900/80 backdrop-blur-2xl pt-28 px-6 pb-10 flex flex-col overflow-y-auto"
          >
            <ul className="flex flex-col">
              {MENU_LINKS.map((link) => (
                <li key={link.label} className="border-b border-white/10">
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchor(e, link.href)}
                    className={`block py-4 font-fredoka text-2xl font-semibold text-white hover:text-yellow-300 transition-colors rounded-md ${FOCUS_RING}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={SPMB_INFO_HREF}
              onClick={(e) => handleAnchor(e, SPMB_INFO_HREF)}
              className={`mt-8 inline-flex items-center justify-center gap-2 font-nunito bg-blue-400 hover:bg-blue-500 text-white px-6 py-3.5 rounded-full text-base font-bold transition-colors ${FOCUS_RING}`}
            >
              Info SPMB
              <ArrowRight size={20} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <motion.div
        id="beranda-konten"
        tabIndex={-1}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-24 max-w-4xl pt-28 pb-28 md:pb-36 focus:outline-none"
      >
        {/* Status SPMB: label informasi (bukan tombol) dengan indikator "live" */}
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6 w-fit"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          SPMB TA 2027/2028 Dibuka
        </motion.p>

        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-fredoka text-yellow-400 font-semibold text-lg md:text-xl mb-3 tracking-wide"
        >
          Daycare, Playgroup &amp; TK Alfa Centauri
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-fredoka text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] mb-6 tracking-tight text-balance"
        >
          Bermain, Belajar, Berkarakter
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="font-nunito text-lg text-slate-200 leading-relaxed max-w-xl mb-10 text-pretty"
        >
          Pendidikan berkualitas untuk setiap tahap perkembangan anak. Memadukan
          pengasuhan penuh kasih sayang dengan penanaman nilai Islami sejak usia
          dini.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <a
            href={REGISTER_HREF}
            onClick={(e) => handleAnchor(e, REGISTER_HREF)}
            className={`font-nunito bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-yellow-400/20 transition-all flex items-center gap-2 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/30 ${FOCUS_RING}`}
          >
            Daftar Sekarang
            <ArrowRight size={20} aria-hidden="true" />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-nunito bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-full font-bold text-base transition-all flex items-center gap-2 transform hover:-translate-y-1 ${FOCUS_RING}`}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Hubungi Admin
            <span className="sr-only">(membuka WhatsApp di tab baru)</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Wavy shape divider at the bottom */}
      <div className="absolute -bottom-px w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="w-full h-[80px] md:h-[120px] block"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            d="M0,60 C240,100 480,20 720,50 C960,80 1200,110 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}