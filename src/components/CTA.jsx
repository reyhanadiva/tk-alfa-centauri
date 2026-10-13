import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Smile, Heart } from 'lucide-react';

const CTA = () => {
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
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full bg-[#FEF3C7] rounded-[2.5rem] md:rounded-[3.5rem] p-12 md:p-20 text-center text-slate-900 overflow-hidden shadow-xl border border-amber-200">
          
          {/* Ornamen melayang */}
          <motion.div animate={floatAnim(6, -20)} className="absolute top-[18%] left-[10%] md:left-[15%] z-10 opacity-90">
            <Star className="w-12 h-12 md:w-16 md:h-16 text-amber-500 fill-amber-400 drop-shadow-md" />
          </motion.div>
          
          <motion.div animate={floatAnim(7, 20, 1)} className="absolute bottom-[20%] right-[10%] md:right-[15%] z-10 opacity-90">
            <Star className="w-14 h-14 md:w-18 md:h-18 text-amber-500 fill-amber-400 drop-shadow-lg" />
          </motion.div>

          <motion.div animate={floatAnim(5, -15, 2, [0, 45, 0])} className="absolute top-[25%] right-[20%] z-10 opacity-70">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-400 drop-shadow-md" />
          </motion.div>

          <motion.div animate={floatAnim(8, 15, 0.5, [-15, 15, -15])} className="absolute bottom-[25%] left-[15%] z-10 opacity-80">
            <Smile className="w-10 h-10 text-amber-600 drop-shadow-md" />
          </motion.div>

          {/* Konten Utama - Max width diperlebar sedikit agar muat dalam 2 baris pas */}
          <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto">
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900">
              Siap Menjadi Centaurian?
            </h2>
            
            {/* Mengatur pemenggalan baris secara presisi */}
            <p className="text-base md:text-xl text-slate-700 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Langkah pertamamu untuk tumbuh menjadi generasi unggul dimulai dari sini.
              <br className="hidden md:block" />
              Bergabunglah bersama keluarga besar Alfa Centauri.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a 
                href="#" 
                className="w-full sm:w-auto px-8 py-4 bg-[#0B1120] text-white font-bold rounded-full hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Informasi PPDB
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-900/20 text-slate-900 font-bold rounded-full hover:bg-slate-900/5 transition-colors flex items-center justify-center gap-2"
              >
                Hubungi Admin
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;