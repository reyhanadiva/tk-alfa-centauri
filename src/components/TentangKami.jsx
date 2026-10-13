import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Smile } from 'lucide-react';

const TentangKami = () => {
  // Animasi melayang untuk ornamen
  const floatAnim = (duration, yOffset, delay = 0, rotate = [-10, 10, -10]) => ({
    y: [0, yOffset, 0],
    rotate: rotate,
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    // Padding kiri-kanan dikurangi sedikit agar area dalam lebih lebar mendekati Mollie
    <section className="w-full bg-white px-4 md:px-6 lg:px-8 py-16">
      
      {/* Container utama (Menghapus pembatas max-w-5xl, membiarkannya w-full mengisi padding section agar hampir full-width) */}
      <div className="relative w-full mx-auto min-h-[75vh] md:min-h-[85vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center">
        
        {/* =========================================
            BACKGROUND (Foto Anak + Overlay Terang)
        ========================================= */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
            alt="Anak-anak belajar dan bermain" 
            className="w-full h-full object-cover"
          />
          {/* Overlay agar teks kontras */}
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80"></div>
        </div>

        {/* =========================================
            ELEMEN MELAYANG (Bintang + Ornamen)
        ========================================= */}
        <motion.div animate={floatAnim(6, -25)} className="absolute top-[15%] left-[8%] md:left-[15%] z-10 opacity-90">
          <Star className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 fill-yellow-400 drop-shadow-xl" />
        </motion.div>
        
        <motion.div animate={floatAnim(7, 25, 1)} className="absolute bottom-[20%] right-[8%] md:right-[15%] z-10 opacity-90">
          <Star className="w-20 h-20 md:w-24 md:h-24 text-yellow-400 fill-yellow-400 drop-shadow-2xl" />
        </motion.div>

        <motion.div animate={floatAnim(5, -15, 2, [0, 45, 0])} className="absolute top-[20%] right-[15%] md:right-[25%] z-10 opacity-70">
          <Heart className="w-10 h-10 text-rose-400 fill-rose-400 drop-shadow-lg" />
        </motion.div>

        <motion.div animate={floatAnim(8, 20, 0.5, [-15, 15, -15])} className="absolute bottom-[25%] left-[12%] md:left-[22%] z-10 opacity-80">
          <Smile className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
        </motion.div>

        <motion.div animate={floatAnim(6.5, -20, 1.5, [0, 90, 0])} className="absolute top-[45%] left-[5%] z-10 opacity-50">
          <div className="w-8 h-8 bg-blue-400 rounded-full drop-shadow-lg" />
        </motion.div>

        {/* =========================================
            KONTEN UTAMA
        ========================================= */}
        <div className="relative z-20 flex flex-col items-center px-6 text-center max-w-4xl mx-auto w-full">
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 tracking-tight leading-tight w-full">
            To Be The Finest School <br className="hidden md:block" /> In The World
          </h2>
          
          {/* Paragraf - Diperbaiki agar Taqwa tidak menggantung */}
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto">
            Berpijak pada filosofi dua bintang yang melambangkan kesuksesan di <strong className="text-white font-bold">dunia dan akhirat</strong>, kami hadir untuk membentuk generasi yang{' '}
            <br className="hidden lg:block" />
            <a 
              href="https://alfacentauri.sch.id/yayasan/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block text-white hover:text-yellow-400 underline underline-offset-4 decoration-white/40 hover:decoration-yellow-400 transition-colors font-bold whitespace-nowrap mt-1"
            >
              Taqwa, Cerdas, dan Kreatif.
            </a>
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default TentangKami;