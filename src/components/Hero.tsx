import { motion, type Variants } from 'framer-motion';
import { Star, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop';

const MENU_LINKS = ['Beranda', 'Tentang', 'Program', 'Fasilitas', 'Berita', 'Kontak'];

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

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background image */}
      <img
        src={HERO_IMAGE}
        alt="Anak-anak belajar dan bermain di sekolah taman kanak-kanak"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent/20 z-0" />

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 px-6 lg:px-12 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="font-fredoka text-white font-semibold text-xl tracking-wide flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400" size={24} />
          TK ALFA CENTAURI
        </div>

        {/* Menu links (center, hidden on mobile) */}
        <div className="hidden md:flex gap-8 text-sm font-semibold absolute left-1/2 -translate-x-1/2">
          {MENU_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-slate-200 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Daftar button (right) */}
        <button className="font-nunito bg-blue-400 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all">
          Informasi PPDB
        </button>
      </nav>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-24 max-w-4xl"
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-200 text-xs font-bold uppercase tracking-wider mb-6 w-fit"
        >
          <Sparkles size={14} />
          SPMB TA 2027/2028 DIBUKA
        </motion.span>

        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-fredoka text-yellow-400 font-semibold text-lg md:text-xl mb-3 tracking-wide"
        >
          Daycare, Playgroup &amp; TK Alfa Centauri
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-fredoka text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] mb-6 tracking-tight"
        >
          Bermain, Belajar, Berkarakter
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="font-nunito text-lg text-slate-300 leading-relaxed max-w-xl mb-10"
        >
          Pendidikan berkualitas untuk setiap tahap perkembangan anak. Memadukan
          pengasuhan penuh kasih sayang dengan penanaman nilai Islami sejak usia
          dini.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4"
        >
          <button className="font-nunito bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-yellow-400/20 transition-all flex items-center gap-2 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/30">
            Daftar Sekarang
            <ArrowRight size={20} />
          </button>
          <button className="font-nunito bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-full font-bold text-base transition-all flex items-center gap-2 transform hover:-translate-y-1">
            <MessageCircle size={20} />
            Hubungi Admin
          </button>
        </motion.div>
      </motion.div>

      {/* Wavy shape divider at the bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="w-full h-[80px] md:h-[120px] block"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
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
