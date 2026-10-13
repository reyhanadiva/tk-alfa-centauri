import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimoni = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const testimonials = [
    {
      id: 0,
      name: "Bunda Dian",
      role: "Wali Murid Daycare",
      text: "Fasilitas daycare-nya sangat aman dan pengasuhnya luar biasa sabar. Saya bisa bekerja dengan tenang karena setiap hari selalu ada update perkembangan ananda.",
      image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 1,
      name: "Ayah Budi",
      role: "Wali Murid Playgroup",
      text: "Sangat terkesan dengan metode pembelajarannya yang kekinian. Anak saya yang tadinya pemalu sekarang jadi sangat aktif dan berani tampil ke depan.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Bunda Sarah",
      role: "Wali Murid TK B",
      text: "Lingkungan yang sangat mendukung konsep 'Taqwa, Cerdas, Kreatif'. Guru-gurunya muda, energik, dan paham ilmu parenting modern. Lulus dari sini ananda siap masuk SD.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Ayah Reza",
      role: "Wali Murid TK A",
      text: "Sistem keamanan dengan CCTV dan penjagaan satpam membuat kami tidak pernah khawatir. Ditambah fasilitas mini theater-nya yang bikin anak-anak selalu semangat.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Bunda Anita",
      role: "Wali Murid TK B",
      text: "Saya suka sekali komunikasi pihak sekolah dengan orang tua yang sangat transparan. Guru utamanya responsif dalam memantau bakat spesifik anak saya.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const getDesktopTextStyles = () => {
    const INACTIVE_W = 90;
    const ACTIVE_W = 400;
    const GAP = 24;
    const TOTAL_W = 856;
    const TEXT_W = 380;

    const activeLeftEdge = activeIndex * (INACTIVE_W + GAP);
    const activeRightEdge = activeLeftEdge + ACTIVE_W;

    if (activeIndex <= 2) {
      return {
        left: `${activeRightEdge + GAP}px`,
        width: `${TEXT_W}px`,
        alignItems: 'flex-start',
        textAlign: 'left'
      };
    } else {
      return {
        right: `${TOTAL_W - activeLeftEdge + GAP}px`,
        width: `${TEXT_W}px`,
        alignItems: 'flex-end',
        textAlign: 'right'
      };
    }
  };

  return (
    <section className="relative w-full bg-white pt-16 pb-24 px-4 overflow-hidden">
      
      {/* 1. POLA TITIK-TITIK PASTEL (Polka Dot Pattern) DI BACKGROUND */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }}></div>

      {/* Ornamen Blobs Halus */}
      <div className="absolute top-12 left-[15%] w-[350px] h-[350px] bg-amber-100/30 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[15%] w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[90px] pointer-events-none"></div>

      {/* 2. TANDA KUTIP RAKSASA DI AREA TEKS (Dinamis mengikuti posisi aktif) */}
      <div className="hidden md:block absolute top-12 pointer-events-none transition-all duration-700 ease-out z-0" style={getDesktopTextStyles()}>
        <div className="text-[200px] font-serif text-slate-100/80 select-none leading-none -mt-16 -ml-8">
          “
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Apa Kata Orang Tua
          </h2>
        </div>

        {/* Tampilan Mobile */}
        <div className="md:hidden flex flex-col items-center text-center h-[260px] px-4 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[15px] text-slate-500 italic font-medium leading-relaxed mb-5 line-clamp-4">
                "{testimonials[activeIndex].text}"
              </p>
              <div className="w-8 h-[2px] bg-amber-300 mb-4 rounded-full"></div>
              <h4 className="text-base font-bold text-slate-900 mb-0.5">{testimonials[activeIndex].name}</h4>
              <p className="text-[13px] text-slate-400 font-medium">{testimonials[activeIndex].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AREA DESKTOP */}
        <div className="relative mx-auto flex items-end justify-center md:justify-start gap-3 md:gap-6 w-fit md:w-[856px] h-[340px] md:h-[500px]">
          
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={item.id} className="relative">
                {/* Efek Cahaya Pendar (Glow) di belakang foto aktif */}
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-blue-200 rounded-[2.5rem] blur-xl opacity-60 -z-10"
                  />
                )}

                <motion.div
                  layout
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 ${
                    isActive 
                      ? 'w-[220px] sm:w-[260px] md:w-[400px] h-[340px] md:h-[500px] z-10 border-4 border-white' 
                      : 'w-[64px] sm:w-[72px] md:w-[90px] h-[90px] md:h-[130px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 z-0'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            );
          })}

          {/* Teks Melayang Desktop */}
          <div 
            className="hidden md:flex absolute top-4 flex-col pointer-events-none transition-all duration-700 ease-out z-20"
            style={getDesktopTextStyles()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full"
              >
                <div className="flex gap-1.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-[17px] text-slate-600 italic font-medium leading-[1.8] tracking-wide mb-6">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="w-12 h-[3px] bg-amber-400 rounded-full mb-5"></div>

                <div>
                  <h4 className="text-[17px] font-bold text-slate-900 mb-1">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-[13px] text-amber-600 font-semibold">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimoni;