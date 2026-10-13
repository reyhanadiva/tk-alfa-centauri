import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Bagaimana cara mendaftar di TK Alfa Centauri?",
      answer: (
        <>
          Pendaftaran siswa baru dapat dilakukan secara online maupun datang langsung ke sekolah. Informasi lengkap mengenai alur, jadwal, dan rincian biaya dapat Anda lihat di halaman <a href="#" className="text-blue-600 font-bold hover:underline">Informasi PPDB</a>.
        </>
      )
    },
    {
      question: "Berapa batas usia minimal untuk pendaftaran?",
      answer: "Untuk unit Daycare, kami menerima ananda mulai dari usia 3 bulan hingga 2 tahun. Playgroup untuk usia 2-4 tahun, sedangkan TK (A dan B) diperuntukkan bagi usia 4-6 tahun."
    },
    {
      question: "Apakah sekolah menyediakan fasilitas katering?",
      answer: "Ya, kami menyediakan layanan katering higienis dengan menu sehat dan bergizi seimbang yang dirancang khusus untuk mendukung tumbuh kembang ananda selama berada di sekolah."
    },
    {
      question: "Bagaimana sistem keamanan di lingkungan sekolah?",
      answer: "Keamanan adalah prioritas utama kami. Sekolah dilengkapi dengan pengawasan CCTV 24 jam di seluruh area kelas dan bermain, serta penjagaan oleh petugas keamanan (satpam) di gerbang utama."
    },
    {
      question: "Apakah biaya pendidikan bisa diangsur?",
      answer: "Ya, kami sangat memahami kebutuhan orang tua. Biaya DSP (Dana Sumbangan Pendidikan) dapat diangsur sesuai dengan skema kesepakatan yang dibicarakan saat proses wawancara pendaftaran."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Menggunakan background putih agar menyatu bersih dengan bagian bawah BeritaArtikel
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
            href="#" 
            className="inline-flex items-center gap-2 text-[#0D6EFD] font-bold text-[17px] group w-fit hover:text-blue-800 transition-colors"
          >
            Hubungi kami
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>

        {/* Kolom Kanan: Accordion List */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="relative">
                {/* Efek pendaran warna (glow) pastel yang jelas saat aktif */}
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
                          <p className="text-[16px] text-slate-500 font-medium leading-[1.7]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;