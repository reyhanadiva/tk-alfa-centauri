import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { GraduationCap, Star, Sparkles, GalleryHorizontal, LayoutGrid } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

// Warna label jabatan (class ditulis lengkap agar aman dari purge Tailwind)
const COLORS = {
  kelas: 'bg-blue-100 text-blue-700 border-blue-200',
  co: 'bg-amber-100 text-amber-700 border-amber-200',
  individual: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  daycare: 'bg-rose-100 text-rose-700 border-rose-200',
  stimulasi: 'bg-violet-100 text-violet-700 border-violet-200',
  pimpinan: 'bg-purple-100 text-purple-700 border-purple-200',
  staf: 'bg-slate-200 text-night/80 border-slate-300',
};

const UNISBA = 'S1 PG-PAUD, Universitas Islam Bandung';
// Foto sudah dihapus latar hijaunya (PNG transparan versi WebP); warna latar kartu mengikuti jabatan
const photo = (file) => `/images/guru/${file}.webp`;
const PHOTO_BG = {
  kelas: 'bg-gradient-to-b from-sky-100 to-sky-200',
  co: 'bg-gradient-to-b from-amber-50 to-amber-200',
  individual: 'bg-gradient-to-b from-emerald-50 to-emerald-200',
  daycare: 'bg-gradient-to-b from-rose-50 to-rose-200',
  stimulasi: 'bg-gradient-to-b from-violet-50 to-violet-200',
  pimpinan: 'bg-gradient-to-b from-purple-50 to-purple-200',
  staf: 'bg-gradient-to-b from-slate-100 to-sky-200',
};

// Sumber: daftar nama dari pihak TK. `image` kosong = foto belum ada (tampil inisial).
const TIM_PENDIDIK = [
  { name: 'Yulis Triastuti, S.Pd.', role: 'Guru Kelas PG A', color: 'kelas', almamater: UNISBA, image: photo('yulis') },
  { name: 'Najma Ayunda Fauziah, S.Pd.', role: 'Co-Teacher PG A', color: 'co', almamater: UNISBA },
  { name: 'Icha Agustina, S.Pd', role: 'Guru Kelas PG B', color: 'kelas', almamater: UNISBA, image: photo('icha') },
  { name: 'Syifa Pauziah, S.Pd', role: 'Co-Teacher PG B', color: 'co', almamater: UNISBA },
  { name: 'Hasna Afifah Nuraini, S.Pd.', role: 'Guru Kelas TK A1', color: 'kelas', almamater: UNISBA, image: photo('afi') },
  { name: 'Via Eka Lestari, S.Pd.', role: 'Co-Teacher TK A1', color: 'co', almamater: UNISBA, image: photo('via') },
  { name: 'Heni Rusniawati Hidayat, S.Mb', role: 'Guru Kelas TK A2', color: 'kelas', almamater: 'S1 Manajemen & Bisnis, Universitas Telkom', image: photo('heni') },
  { name: 'Hanna Rahmawati, S.Pd.', role: 'Co-Teacher TK A2', color: 'co', almamater: UNISBA, image: photo('hanna') },
  { name: 'Farah Dhiya Zahra, S.Pd.', role: 'Guru Kelas TK B1', color: 'kelas', almamater: UNISBA, image: photo('farah') },
  { name: 'Mila Nurazqia, S.Pd.', role: 'Co-Teacher TK B1', color: 'co', almamater: UNISBA, image: photo('mila') },
  { name: 'Siti Anisa, S.Pd.', role: 'Guru Kelas TK B2', color: 'kelas', almamater: UNISBA, image: photo('siti-anisa') },
  { name: 'Cynthia Pramitha Suhendar, S.Pd', role: 'Co-Teacher TK B2', color: 'co', almamater: UNISBA, image: photo('cynthia') },
  { name: 'Resti Sinta Belinda, S.Pd.', role: 'Guru Individual', color: 'individual', almamater: UNISBA, image: photo('resti') },
  { name: 'Nurul Latifa, S.Psi.', role: 'Guru Individual', color: 'individual', almamater: 'S1 Psikologi, Universitas Jenderal Ahmad Yani', image: photo('anisa-nurul') },
  { name: 'Aghnia Dhafin Dwiningtyas, S.Pd', role: 'Guru Kelas PG A', color: 'kelas', almamater: UNISBA, image: photo('aghnia') },
  { name: 'Syamira Silvana Putri, S.Pd', role: 'Co-Teacher PG A', color: 'co', almamater: UNISBA, image: photo('mira') },
  { name: 'Nurfadilah Rohimah, S.Sos', role: 'Guru Individual', color: 'individual', almamater: 'S1 Bimbingan Konseling Islam, UIN Sunan Gunung Djati Bandung', image: photo('dhila') },
  { name: 'Siti Aisyah', role: 'Guru Daycare', color: 'daycare', almamater: 'SMA Labschool Bandung', image: photo('ais') },
  { name: 'Purnami Sari Dewi', role: 'Guru Daycare', color: 'daycare', almamater: 'Homeschooling PKBM Minda Utama', image: photo('dewi') },
  { name: 'Wardah Mawaddah, S.Pd.', role: 'Guru Daycare', color: 'daycare', almamater: UNISBA, image: photo('wardah') },
  { name: 'Siti Mariam, S.Pd.', role: 'Guru Daycare', color: 'daycare', almamater: UNISBA, image: photo('mariam') },
  { name: 'Ratu Iqlima, S.Pd.', role: 'Guru Daycare', color: 'daycare', almamater: UNISBA, image: photo('ratu') },
  { name: 'Dhea Fitri Awalia', role: 'Guru Stimulasi', color: 'stimulasi', almamater: 'S1 Pendidikan Khusus, UPI', image: photo('dhea') },
];

const TIM_MANAJEMEN = [
  { name: 'Nita Kusumayati, S.Psi', role: 'Kepala Sekolah', color: 'pimpinan', almamater: 'S1 Psikologi, Universitas Padjadjaran', image: photo('nita') },
  { name: 'Nurul Afrianti, M.Pd., M.Psi', role: 'Pengelola', color: 'pimpinan', almamater: 'S2 Psikologi, Universitas Padjadjaran' },
  { name: 'Weindiani, M.Pd.', role: 'Kurikulum', color: 'pimpinan', almamater: 'S2 Manajemen Pendidikan, Universitas Pendidikan Indonesia', image: photo('weindi') },
  { name: 'Devi Febriani, M.Psi., Psi', role: 'Psikolog', color: 'pimpinan', almamater: 'S2 Psikologi, Universitas Padjadjaran' },
  { name: 'Ade Riyanto', role: 'Satpam', color: 'staf', image: photo('ade') },
  { name: 'Muhammad Zaki Fadillah', role: 'Koki', color: 'staf', image: photo('zaki') },
  { name: 'Dicky Noer Alif', role: 'Caraka', color: 'staf' },
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
// Foto guru; bila gagal dimuat tampil inisial nama di atas warna lembut (bukan ikon gambar rusak)
const TeacherPhoto = ({ person, hidden }) => {
  const [failed, setFailed] = useState(false);
  if (failed || !person.image) {
    const initials = person.name.split(/[ ,]/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
    return (
      <div className="grid h-full w-full place-items-center" role={hidden ? undefined : 'img'} aria-label={hidden ? undefined : person.name}>
        <span className="font-display text-5xl font-semibold text-night/40">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={person.image}
      alt={hidden ? '' : person.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className="pointer-events-none w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
    />
  );
};

const PersonCard = ({ person, index, hidden = false, grid = false }) => (
  <li className={grid ? 'h-full' : 'shrink-0 pr-4 md:pr-5'} aria-hidden={hidden || undefined}>
    <article
      className={`group flex h-full flex-col p-3 bg-white rounded-[1.75rem] shadow-[0_6px_0_0_#EADFC2] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 motion-reduce:transition-none ${
        grid ? 'w-full' : 'w-[70vw] sm:w-[250px] md:w-[270px]'
      } ${grid ? '' : index % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]'}`}
    >
      {/* Foto profil */}
      <div className={`relative aspect-square rounded-[1.25rem] overflow-hidden mb-4 ${PHOTO_BG[person.color] || 'bg-slate-100'}`}>
        <TeacherPhoto person={person} hidden={hidden} />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide shadow-sm border ${COLORS[person.color]}`}>
            {person.role}
          </span>
        </div>
      </div>

      {/* Detail */}
      <div className="px-1 pb-1 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-semibold text-night mb-3 text-balance">{person.name}</h3>
        {person.almamater && (
          <div className="mt-auto pt-3 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 bg-slate-50 p-1.5 rounded-lg flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-night/60" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-night/80 leading-snug">{person.almamater}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  </li>
);

/**
 * Deretan kartu yang berjalan terus dan BISA DITARIK kanan-kiri (mouse maupun jari).
 * Daftar ditulis dua kali; posisi dibungkus (wrap) supaya putarannya tanpa putus ke dua arah.
 * Berhenti saat disorot mouse atau saat sedang ditarik, lalu jalan lagi setelah dilepas.
 */
const SPEED = 0.035; // piksel per milidetik (±35 px/detik)

const Marquee = ({ people, reduce }) => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const half = useRef(0);
  const hover = useRef(false);
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);

  // lebar satu salinan daftar (setengah dari track)
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) half.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [people]);

  const wrap = (v) => {
    const h = half.current;
    if (!h) return v;
    return ((v % h) - h) % h; // selalu di antara -h dan 0
  };

  useAnimationFrame((_, delta) => {
    if (reduce || hover.current || drag.current) return;
    x.set(wrap(x.get() - SPEED * Math.min(delta, 50)));
  });

  const onPointerDown = (e) => {
    drag.current = { startX: e.clientX, startY: e.clientY, from: x.get(), active: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.active) {
      // di layar sentuh, gerakan dominan vertikal = pengguna sedang scroll halaman, bukan menarik kartu
      if (Math.abs(dx) < 6 || Math.abs(dy) > Math.abs(dx)) return;
      d.active = true;
      setDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    x.set(wrap(d.from + dx));
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <div
      className={`overflow-hidden pt-4 pb-8 touch-pan-y select-none [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] ${
        reduce ? '' : dragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseEnter={() => { hover.current = true; }}
      onMouseLeave={() => { hover.current = false; endDrag(); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <motion.ul ref={trackRef} style={{ x }} className="flex w-max list-none p-0 m-0">
        {people.map((p, i) => <PersonCard key={p.name} person={p} index={i} />)}
        {people.map((p, i) => <PersonCard key={`${p.name}-copy`} person={p} index={i + people.length} hidden />)}
      </motion.ul>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const ProfilPendidik = () => {
  const [view, setView] = useState('slider');
  const [activeTab, setActiveTab] = useState('pendidik');
  const reduceMotion = useReducedMotion();
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

        {/* Tab + pilihan tampilan */}
        <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:flex-row sm:gap-4">
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

          {/* Pilihan tampilan: geser (berjalan) atau grid (semua sekaligus) */}
          <div
            role="group"
            aria-label="Pilih tampilan"
            className="relative grid grid-cols-2 p-1.5 bg-white rounded-full border border-slate-200 shadow-sm"
          >
            <div
              aria-hidden="true"
              className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] bg-night rounded-full z-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                view === 'grid' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            {[
              { id: 'slider', label: 'Tampilan geser', Icon: GalleryHorizontal },
              { id: 'grid', label: 'Tampilkan semua', Icon: LayoutGrid },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                title={label}
                className={`relative z-10 grid size-11 place-items-center rounded-full transition-colors duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                  view === id ? 'text-white' : 'text-night/50 hover:text-night'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kartu berjalan pelan tanpa henti (seperti English Now). Berhenti saat disorot / disentuh.
          Pengguna "kurangi animasi" mendapat daftar biasa yang bisa digeser. */}
      <div
        role="tabpanel"
        id="panel-profil"
        aria-labelledby={`tab-${activeTab}`}
        className="relative z-10 w-full"
      >
        {view === 'slider' ? (
          <Marquee key={activeTab} people={currentData} reduce={reduceMotion} />
        ) : (
          <motion.ul
            key={`grid-${activeTab}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mx-auto grid max-w-7xl list-none grid-cols-2 gap-3 px-4 pt-4 pb-8 md:grid-cols-3 md:gap-6 md:px-8 lg:grid-cols-4"
          >
            {currentData.map((p, i) => <PersonCard key={p.name} person={p} index={i} grid />)}
          </motion.ul>
        )}

      </div>
    </section>
  );
};

export default ProfilPendidik;