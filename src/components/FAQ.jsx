import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    // --- 4 PERTANYAAN UTAMA TERATAS ---
    {
      question: "Bagaimana kurikulum dan metode pembelajaran yang diterapkan?",
      answer: (
        <>
          Kami menerapkan kurikulum nasional yang dipadukan dengan kekhasan pendidikan Alfa Centauri melalui pendekatan <strong><em>deep learning dan ragam main</em></strong>. Pembelajaran dirancang bermakna agar ananda dapat bereksplorasi, berpikir kritis, serta berkembang secara optimal.
        </>
      )
    },
    {
      question: "Apakah tersedia program trial class?",
      answer: "Ada, program trial class tersedia secara khusus pada kegiatan Open House Daycare & Preschool Alfa Centauri yang biasanya diselenggarakan pada bulan November."
    },
    {
      question: "Apakah disediakan layanan catering makanan?",
      answer: "Ya, sekolah menyediakan layanan catering, namun biayanya tidak termasuk dalam SPP karena sifatnya pilihan bagi Orang tua/wali murid yang ingin ananda mendapatkan snack/makan siang dari sekolah."
    },
    {
      question: "Apakah terdapat kegiatan ekstrakurikuler?",
      answer: (
        <>
          Ya, tersedia kegiatan ekstrakurikuler yang disesuaikan dengan jenjang pendidikan ananda, yaitu:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Playgroup (PG):</strong> Gerak dan Lagu</li>
            <li><strong>Taman Kanak-Kanak (TK):</strong> Angklung</li>
          </ul>
        </>
      )
    },

    // --- 4 PERTANYAAN TAMBAHAN (Muncul saat tombol "Lihat Semua" diklik) ---
    {
      question: "Apakah kegiatan pembelajaran menggunakan Bahasa Inggris?",
      answer: "Bahasa pengantar utama adalah Bahasa Indonesia untuk memperkuat fondasi bahasa ibu ananda sebagai dasar komunikasi dan perkembangan."
    },
    {
      question: "Apa saja fasilitas yang tersedia di sekolah?",
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
      )
    },
    {
      question: "Apakah tersedia layanan antar-jemput?",
      answer: "Saat ini, Daycare & Preschool Alfa Centauri belum menyediakan layanan antar-jemput untuk ananda. Orang tua/wali murid dapat mengantar dan menjemput ananda secara mandiri."
    },
    {
      question: "Ada program belajar apa saja?",
      answer: (
        <>
          <ul className="space-y-1.5">
            <li><strong>Program Reguler:</strong> 08.00–12.30 WIB (khusus hari Jumat pulang pukul 11.00 WIB).</li>
            <li><strong>Program Fullday:</strong> 06.30–16.00 WIB.</li>
          </ul>
        </>
      )
    }
  ];

  // Tampilkan 4 item pertama jika belum diklik "Muat Semua", atau tampilkan semua jika showAll true
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-white py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Ornamen Blobs Pastel Background */}
      <div className="absolute top-20 left-[-5%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-5%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Kolom Kiri: Header & CTA */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Ada pertanyaan?<br />
            Kami bantu jawab.
          </h2>
          
          <p className="text-[17px] text-slate-500 font-medium leading-relaxed mb-10 max-w-md">
            Jawaban ringkas untuk pertanyaan seputar pendaftaran, program, dan fasilitas TK Alfa Centauri.
          </p>
          
          <a 
            href="https://wa.me/6282223246649?text=Halo%20Admin,%20saya%20ingin%20bertanya%20mengenai%20informasi%20TK%20Alfa%20Centauri." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0D6EFD] font-bold text-[17px] group w-fit hover:text-blue-800 transition-colors"
          >
            Hubungi kami
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>

        {/* Kolom Kanan: Accordion List */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          {displayedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="relative">
                {/* Efek pendaran warna (glow) pastel saat aktif */}
                {isOpen && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/60 to-amber-200/60 rounded-[2.2rem] blur-xl opacity-90 -z-10"></div>
                )}

                <div 
                  className={`bg-white border rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-blue-400 shadow-md' : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
                  >
                    <span className={`text-[17px] font-bold pr-4 transition-colors ${
                      isOpen ? 'text-blue-600' : 'text-slate-900'
                    }`}>
                      {faq.question}
                    </span>
                    
                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 md:px-7 pb-7 pt-0">
                          <div className="w-full h-[1px] bg-slate-100 mb-5"></div>
                          <div className="text-[16px] text-slate-500 font-medium leading-[1.7]">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

          {/* Tombol Expand / Show All */}
          {faqs.length > 4 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-sm transition-colors inline-flex items-center gap-2"
              >
                <span>{showAll ? "Tampilkan Lebih Sedikit" : `Lihat Semua Pertanyaan (${faqs.length})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;