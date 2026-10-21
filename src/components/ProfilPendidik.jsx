import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Star, Sparkles, Pause, Play } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const TIM_PENDIDIK = [
  {
    name: 'Putri Maharani, S.Pd.',
    role: 'Guru Kelas Utama',
    roleColor: 'bg-blue-100 text-blue-700 border-blue-200',
    almamater: 'S1 PGPAUD, Universitas Pendidikan Indonesia (2023)',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Dinda Aulia, S.Psi.',
    role: 'Co-Teacher',
    roleColor: 'bg-amber-100 text-amber-700 border-amber-200',
    almamater: 'S1 Psikologi, Universitas Padjadjaran (2024)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Siti Nurbaya, A.Md.',
    role: 'Guru Pendamping',
    roleColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    almamater: 'D3 Kesejahteraan Sosial, Poltekesos (2024)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Risa Amelia, S.Pd.',
    role: 'Guru Kelas Utama',
    roleColor: 'bg-blue-100 text-blue-700 border-blue-200',
    almamater: 'S1 Pendidikan Guru, Universitas Negeri Jakarta (2022)',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Sarah Widyawati, S.Psi.',
    role: 'Co-Teacher',
    roleColor: 'bg-amber-100 text-amber-700 border-amber-200',
    almamater: 'S1 Psikologi, Universitas Indonesia (2023)',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef4374bce?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Nabila Zahra, S.Sos.',
    role: 'Guru Pendamping',
    roleColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    almamater: 'S1 Sosiologi, UIN Sunan Gunung Djati (2024)',
    image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=600&q=70',
  },
];

const TIM_MANAJEMEN = [
  {
    name: 'Nisa Fadilah, M.Pd.',
    role: 'Kepala Sekolah',
    roleColor: 'bg-purple-100 text-purple-700 border-purple-200',
    almamater: 'S2 Manajemen Pendidikan, Universitas Negeri Jakarta (2018)',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Rizky Pratama, S.E.',
    role: 'Keuangan',
    roleColor: 'bg-slate-200 text-night/80 border-slate-300',
    almamater: 'S1 Akuntansi, Universitas Katolik Parahyangan (2022)',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Maya Sari, S.I.Kom.',
    role: 'Administrasi',
    roleColor: 'bg-pink-100 text-pink-700 border-pink-200',
    almamater: 'S1 Ilmu Komunikasi, Telkom University (2023)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=70',
  },
  {
    name: 'Andi Saputra, S.T.',
    role: 'Operasional',
    roleColor: 'bg-orange-100 text-orange-700 border-orange-200',
    almamater: 'S1 Teknik Industri, Institut Teknologi Bandung (2020)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70',
  },
];

const TABS = [
  { id: 'pendidik', label: 'Tim Pendidik', data: TIM_PENDIDIK },
  { id: 'manajemen', label: 'Tim Manajemen', data: TIM_MANAJEMEN },
];

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Hiasan melayang (dekoratif). Diam bila pengguna memilih reduce motion.
const Floaty = ({ className = '', duration = 5, y = -15, delay = 0, rotate = [0, 10, 0], children }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none ${className}`}
      animate={reduceMotion ? undefined : { y: [0, y, 0], rotate }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

/** Kartu satu pendidik. Kartu sedikit miring bergantian, lurus & terangkat saat disorot. */
const PersonCard = ({ person, index, hidden = false }) => (
  <li className="shrink-0 pr-4 md:pr-5" aria-hidden={hidden || undefined}>
    <article
      className={`group flex h-full flex-col w-[70vw] sm:w-[250px] md:w-[270px] p-3 bg-white rounded-[1.75rem] shadow-[0_6px_0_0_#EADFC2] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 motion-reduce:transition-none ${
        index % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]'
      }`}
    >
      {/* Foto profil */}
      <div className="relative aspect-square rounded-[1.25rem] overflow-hidden mb-4 bg-slate-100">
        <img
          src={person.image}
          alt={hidden ? '' : person.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide shadow-sm border ${person.roleColor}`}>
            {person.role}
          </span>
        </div>
      </div>

      {/* Detail */}
      <div className="px-1 pb-1 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-night mb-3 text-balance">{person.name}</h3>
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 bg-slate-50 p-1.5 rounded-lg flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-night/60" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-night/80 leading-snug">{person.almamater}</p>
          </div>
        </div>
      </div>
    </article>
  </li>
);

/**
 * Deretan kartu yang berjalan terus. Daftar ditulis dua kali lalu digeser -50%, jadi putarannya tanpa putus.
 * Berhenti saat disorot mouse, saat disentuh, atau saat ada fokus keyboard di dalamnya.
 */
const Marquee = ({ people, paused, reduce }) => {
  const [touching, setTouching] = useState(false);

  if (reduce) {
    return (
      <ul className="flex overflow-x-auto px-4 md:px-8 pt-4 pb-8 list-none m-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {people.map((p, i) => <PersonCard key={p.name} person={p} index={i} />)}
      </ul>
    );
  }

  // makin banyak orang, makin lama satu putaran (kecepatan tetap terasa sama)
  const duration = `${people.length * 6}s`;
  const stopped = paused || touching;

  return (
    <div
      className="group/marquee overflow-hidden pt-4 pb-8 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
    >
      <ul
        className="marquee flex w-max list-none p-0 m-0 group-hover/marquee:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        style={{ animationDuration: duration, animationPlayState: stopped ? 'paused' : undefined }}
      >
        {people.map((p, i) => <PersonCard key={p.name} person={p} index={i} />)}
        {people.map((p, i) => <PersonCard key={`${p.name}-copy`} person={p} index={i + people.length} hidden />)}
      </ul>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const ProfilPendidik = () => {
  const [activeTab, setActiveTab] = useState('pendidik');
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);

  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const currentData = TABS[activeIndex].data;

  // Navigasi keyboard antar tab (pola tablist: panah, Home, End)
  const handleKeyDown = (e) => {
    const last = TABS.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = activeIndex === last ? 0 : activeIndex + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = activeIndex === 0 ? last : activeIndex - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="pendidik"
      className="relative mx-2 md:mx-4 rounded-[2.5rem] md:rounded-[3.5rem] bg-butter pt-20 pb-20 overflow-hidden"
      aria-labelledby="profil-title"
    >

      {/* Blob warna lembut */}
      <div className="absolute top-32 left-[-5%] w-[300px] h-[300px] bg-amber-200/50 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-[30%] w-[280px] h-[280px] bg-pink-200/30 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Hiasan melayang: hanya md ke atas agar tidak menabrak judul di HP */}
      <Floaty duration={5} y={-15} className="hidden md:block top-28 right-[10%] lg:right-[15%] opacity-80">
        <Star className="w-11 h-11 text-amber-400 fill-amber-200 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={7} y={14} delay={1} rotate={[-10, 10, -10]} className="hidden md:block top-44 left-[8%] opacity-70">
        <Sparkles className="w-8 h-8 text-sky-400 drop-shadow-sm" />
      </Floaty>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="profil-title"
            className="text-4xl md:text-5xl font-bold text-night tracking-tight mb-4 text-balance"
          >
            Profil Pendidik & Manajemen
          </h2>
          <p className="text-lg text-night/70 max-w-2xl mx-auto font-medium text-pretty">
            Barisan talenta muda yang adaptif terhadap ilmu <span className="italic">parenting</span> modern, memastikan ananda mendapat pendampingan yang relevan.
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            aria-label="Pilih tim"
            onKeyDown={handleKeyDown}
            className="relative grid grid-cols-2 w-full max-w-[400px] p-1.5 bg-white rounded-full border border-slate-200 shadow-sm"
          >
            {/* Indikator geser: pakai transform (bukan left) agar animasinya ringan */}
            <div
              aria-hidden="true"
              className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] bg-night rounded-full z-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                activeIndex === 1 ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            {TABS.map((tab, i) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="panel-profil"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 py-2.5 rounded-full text-sm md:text-base font-bold transition-colors duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                    selected ? 'text-white' : 'text-night/70 hover:text-night'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kartu berjalan pelan tanpa henti (seperti English Now). Berhenti saat disorot / disentuh,
          dan bisa dijeda lewat tombol. Pengguna "kurangi animasi" mendapat daftar biasa yang bisa digeser. */}
      <div
        role="tabpanel"
        id="panel-profil"
        aria-labelledby={`tab-${activeTab}`}
        className="relative z-10 w-full"
      >
        <Marquee key={activeTab} people={currentData} paused={paused} reduce={reduceMotion} />

        {!reduceMotion && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-night shadow-[0_3px_0_0_#EADFC2] ${FOCUS_RING}`}
            >
              {paused ? <Play className="w-4 h-4 fill-current" aria-hidden="true" /> : <Pause className="w-4 h-4 fill-current" aria-hidden="true" />}
              {paused ? 'Jalankan' : 'Jeda'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilPendidik;