import React, { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Star, Heart, Sparkles, Smile } from 'lucide-react';
import { wa } from '@/data/site';
import Button from './ui/Button';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { Squiggle, TwinStars } from './ui/Ornaments';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const WA_HREF = wa();

// Jumlah pertanyaan yang tampil sebelum tombol "Lihat Semua" diklik.
const INITIAL_COUNT = 4;

const FAQS = [
  // --- 4 PERTANYAAN UTAMA TERATAS ---
  {
    id: 1,
    question: 'Bagaimana kurikulum dan metode pembelajaran yang diterapkan?',
    answer: (
      <>
        Kami menerapkan kurikulum nasional yang dipadukan dengan kekhasan pendidikan Alfa Centauri melalui pendekatan <strong><em>deep learning dan ragam main</em></strong>. Pembelajaran dirancang bermakna agar ananda dapat bereksplorasi, berpikir kritis, serta berkembang secara optimal.
      </>
    ),
  },
  {
    id: 2,
    question: 'Apakah tersedia program trial class?',
    answer:
      'Ada. Program trial class tersedia khusus pada kegiatan Open House Daycare & Preschool Alfa Centauri yang biasanya diselenggarakan pada bulan November.',
  },
  {
    id: 3,
    question: 'Apakah tersedia layanan katering?',
    answer:
      'Ya, sekolah menyediakan layanan katering. Biayanya tidak termasuk dalam SPP karena sifatnya pilihan, bagi orang tua/wali murid yang ingin ananda mendapatkan camilan atau makan siang dari sekolah.',
  },
  {
    id: 4,
    question: 'Apakah terdapat kegiatan ekstrakurikuler?',
    answer: (
      <>
        Ya, tersedia kegiatan ekstrakurikuler yang disesuaikan dengan jenjang pendidikan ananda, yaitu:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Playgroup (PG):</strong> Gerak dan Lagu</li>
          <li><strong>Taman Kanak-Kanak (TK):</strong> Angklung</li>
        </ul>
      </>
    ),
  },

  // --- PERTANYAAN TAMBAHAN (muncul saat tombol "Lihat Semua" diklik) ---
  {
    id: 5,
    question: 'Apakah kegiatan pembelajaran menggunakan Bahasa Inggris?',
    answer:
      'Bahasa pengantar utama adalah Bahasa Indonesia untuk memperkuat fondasi bahasa ibu ananda sebagai dasar komunikasi dan perkembangan.',
  },
  {
    id: 6,
    question: 'Apa saja fasilitas yang tersedia di sekolah?',
    answer: (
      <>
        Kami menyediakan berbagai fasilitas untuk mendukung kenyamanan, keamanan, serta proses belajar dan bermain ananda, di antaranya:
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Area Belajar:</strong> Ruang kelas ber-AC dengan media dan perlengkapan pembelajaran yang memadai, seperti alat tulis, cat air, dan bahan kegiatan lainnya.</li>
          <li><strong>Area Bermain:</strong> Area bermain indoor dan outdoor untuk mendukung aktivitas fisik, eksplorasi, dan interaksi sosial ananda.</li>
          <li><strong>Literasi:</strong> Sony Sugema Library sebagai sarana untuk menumbuhkan minat baca dan kecintaan ananda terhadap buku.</li>
          <li><strong>Keamanan:</strong> Pemantauan CCTV dan dukungan petugas keamanan selama 24 jam.</li>
          <li><strong>Fasilitas Ibadah:</strong> Mushola untuk mendukung kegiatan ibadah.</li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    question: 'Apakah tersedia layanan antar-jemput?',
    answer:
      'Saat ini Daycare & Preschool Alfa Centauri belum menyediakan layanan antar-jemput. Orang tua/wali murid dapat mengantar dan menjemput ananda secara mandiri.',
  },
  {
    id: 8,
    question: 'Apa saja pilihan program dan jam belajarnya?',
    answer: (
      <ul className="space-y-1.5">
        <li><strong>Program Reguler:</strong> 08.00–12.30 WIB (khusus hari Jumat pulang pukul 11.00 WIB).</li>
        <li><strong>Program Fullday:</strong> 06.30–16.00 WIB.</li>
      </ul>
    ),
  },
];

const INITIAL_FAQS = FAQS.slice(0, INITIAL_COUNT);
const EXTRA_FAQS = FAQS.slice(INITIAL_COUNT);

const EASE_OUT = [0.22, 1, 0.36, 1];

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300';

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

// Hiasan melayang (dekoratif). Diam bila pengguna memilih reduce motion.
const Floaty = ({ className = '', duration = 6, y = -15, delay = 0, rotate = [0, 10, 0], children }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none hidden lg:block ${className}`}
      animate={reduceMotion ? undefined : { y: [0, y, 0], rotate }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

/*
  Pembungkus buka/tutup untuk pertanyaan tambahan. Tingginya dianimasikan sebagai satu blok,
  jadi tombol "Lihat Semua" dan section di bawahnya ikut bergeser mulus (sebelumnya daftar
  langsung "loncat" setinggi 4 item, baru isinya muncul).
  Konten hanya dipotong (overflow hidden) selama animasi berlangsung, supaya pendaran warna
  item yang terbuka tidak ikut terpotong setelahnya.
*/
const Collapse = ({ children, reduceMotion }) => {
  const [clip, setClip] = useState(true);
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT }}
      onAnimationStart={() => setClip(true)}
      onAnimationComplete={() => setClip(false)}
      style={{ overflow: clip ? 'hidden' : 'visible' }}
    >
      {children}
    </motion.div>
  );
};

const FaqItem = ({ faq, isOpen, onToggle, baseId, reduceMotion }) => {
  const triggerId = `${baseId}-q-${faq.id}`;
  const panelId = `${baseId}-a-${faq.id}`;

  return (
    <div className="relative isolate">
      {/* Pendaran warna saat terbuka: selalu ada, hanya opacity yang berubah */}
      <div
        aria-hidden="true"
        className={`absolute -inset-2 -z-10 rounded-[2.2rem] bg-gradient-to-r from-blue-300/60 to-amber-200/60 blur-xl transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? 'opacity-90' : 'opacity-0'
        }`}
      />

      <div
        className={`bg-white border rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none ${
          isOpen ? 'border-blue-400 shadow-md' : 'border-slate-200/80 shadow-sm hover:border-slate-300'
        }`}
      >
        <h3>
          <button
            type="button"
            id={triggerId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => onToggle(faq.id)}
            className="w-full flex items-center justify-between gap-4 p-6 md:p-7 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-300"
          >
            <span
              className={`text-[17px] font-bold transition-colors ${
                isOpen ? 'text-blue-700' : 'text-night'
              }`}
            >
              {faq.question}
            </span>

            <span
              aria-hidden="true"
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-night/60'
              }`}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
            >
              <div className="px-6 md:px-7 pb-7 pt-0">
                <div className="w-full h-px bg-slate-100 mb-5" aria-hidden="true" />
                <div className="text-base text-night/70 font-medium leading-[1.7]">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

const FAQ = () => {
  const [openId, setOpenId] = useState(FAQS[0].id);
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const listId = `${baseId}-list`;

  const toggleAccordion = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Saat daftar dilipat, jangan biarkan pertanyaan tersembunyi tetap berstatus "terbuka".
  const toggleShowAll = () => {
    if (showAll) {
      const openIndex = FAQS.findIndex((f) => f.id === openId);
      if (openIndex >= INITIAL_COUNT) setOpenId(null);
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 px-4 md:px-8 overflow-x-clip"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Blob pastel */}
      <div className="absolute top-20 left-[-5%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-[-5%] w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-[30%] w-[300px] h-[300px] bg-pink-100/40 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Hiasan melayang: hanya layar lebar (lg ke atas) agar tidak mengganggu teks di layar kecil */}
      {/* Bintang */}
      <Floaty duration={6} y={-15} className="top-24 left-[36%] opacity-80">
        <Star className="w-9 h-9 text-amber-400 fill-amber-300 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={7} y={16} delay={0.8} className="top-40 right-[3%] opacity-80">
        <Star className="w-10 h-10 text-yellow-400 fill-yellow-300 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={5.5} y={-12} delay={1.6} className="bottom-44 left-[42%] opacity-70">
        <Star className="w-7 h-7 text-amber-400 fill-amber-200 drop-shadow-sm" />
      </Floaty>
      {/* Hati, sparkle, senyum */}
      <Floaty duration={8} y={12} delay={1} rotate={[-12, 12, -12]} className="bottom-24 left-[8%] opacity-70">
        <Heart className="w-7 h-7 text-rose-400 fill-rose-300 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={7} y={-14} delay={0.4} rotate={[-8, 8, -8]} className="top-[45%] left-[2%] opacity-70">
        <Sparkles className="w-8 h-8 text-sky-400 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={9} y={14} delay={1.2} rotate={[-10, 10, -10]} className="bottom-16 right-[8%] opacity-70">
        <Sparkles className="w-8 h-8 text-pink-400 fill-pink-200 drop-shadow-sm" />
      </Floaty>
      <Floaty duration={6.5} y={-16} delay={2} rotate={[0, 20, 0]} className="top-[62%] right-[2%] opacity-70">
        <Smile className="w-8 h-8 text-orange-400 drop-shadow-sm" />
      </Floaty>
      {/* Bentuk geometris kecil */}
      <Floaty duration={5} y={-10} delay={0.6} className="top-32 left-[26%] opacity-70">
        <div className="w-4 h-4 rounded-full bg-sky-300" />
      </Floaty>
      <Floaty duration={7.5} y={12} delay={1.8} className="bottom-1/3 left-[20%] opacity-70">
        <div className="w-6 h-6 rounded-full border-4 border-emerald-300" />
      </Floaty>
      <Floaty duration={8} y={-12} delay={0.2} rotate={[0, 25, 0]} className="top-24 right-[26%] opacity-70">
        <div className="w-6 h-6 rounded-lg bg-violet-300 rotate-12" />
      </Floaty>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Kolom Kiri: menempel saat scroll (desktop), berisi judul + kartu "masih ada pertanyaan?" */}
        <div className="w-full lg:w-[40%]">
          <motion.div
            className="lg:sticky lg:top-32"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h2
              id={`${baseId}-title`}
              className="text-4xl md:text-[52px] font-semibold text-night tracking-tight leading-[1.1] mb-6"
            >
              <span className="block">Ada pertanyaan?</span>
              <span className="block">
                Kami bantu{' '}
                <span className="relative inline-block whitespace-nowrap">
                  jawab.
                  <Squiggle className="text-sunny" />
                </span>
              </span>
            </h2>

            <p className="text-[17px] text-night/70 font-medium leading-relaxed max-w-md text-pretty">
              Jawaban ringkas seputar kurikulum, program belajar, fasilitas, dan layanan TK Alfa Centauri.
            </p>

            {/* Kartu: masih ada pertanyaan? */}
            <div className="relative mt-8 max-w-md overflow-hidden rounded-[2rem] bg-night p-6 pr-28 text-white shadow-[0_6px_0_0_#111842] md:p-7 md:pr-32">
              <div className="dots-light absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="absolute right-4 top-6" aria-hidden="true">
                <TwinStars className="w-20 md:w-24" glow />
              </div>
              <p className="relative font-display text-2xl font-semibold leading-tight">Masih ada pertanyaan?</p>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/75">
                Admin kami siap menjawab langsung melalui WhatsApp, termasuk menjadwalkan kunjungan ke sekolah.
              </p>
              <Button href={WA_HREF} size="sm" className="relative mt-5">
                <WhatsAppIcon className="h-4 w-4" />
                Tanya Admin
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Kolom Kanan: Accordion */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          <div id={listId}>
            <div className="flex flex-col gap-4">
              {INITIAL_FAQS.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={toggleAccordion}
                  baseId={baseId}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <AnimatePresence initial={false}>
              {showAll && (
                <Collapse key="extra-faqs" reduceMotion={reduceMotion}>
                  {/* pt-4 menggantikan gap antar-grup, supaya jarak ikut teranimasi bersama blok */}
                  <div className="flex flex-col gap-4 pt-4">
                    {EXTRA_FAQS.map((faq, i) => (
                      <motion.div
                        key={faq.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.1 + i * 0.07, ease: EASE_OUT }}
                      >
                        <FaqItem
                          faq={faq}
                          isOpen={openId === faq.id}
                          onToggle={toggleAccordion}
                          baseId={baseId}
                          reduceMotion={reduceMotion}
                        />
                      </motion.div>
                    ))}
                  </div>
                </Collapse>
              )}
            </AnimatePresence>
          </div>

          {/* Tombol Lihat Semua / Lebih Sedikit */}
          {FAQS.length > INITIAL_COUNT && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleShowAll}
                aria-expanded={showAll}
                aria-controls={listId}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-night/80 font-semibold rounded-full text-sm transition-colors ${FOCUS_RING}`}
              >
                <span>
                  {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Pertanyaan (${FAQS.length})`}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-4 h-4 transition-transform duration-300 motion-reduce:transition-none ${
                    showAll ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;