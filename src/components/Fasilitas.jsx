import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

const Fasilitas = () => {
  const scrollRef = useRef(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-100px" });

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

  const facilities = [
    {
      title: "Ruang Kelas Interaktif",
      desc: "Fasilitas belajar dengan tata ruang dinamis dan teknologi interaktif.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Playground & Outdoor",
      desc: "Area bermain luas dan aman di udara terbuka.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Mini Theater",
      desc: "Ruang audio visual untuk pemutaran edukasi dan presentasi.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Perpustakaan",
      desc: "Koleksi beragam macam buku cerita dan buku pelajaran.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Sistem Keamanan",
      desc: "Pengawasan CCTV 24 jam dan pos satpam di akses utama.",
      image: "https://images.unsplash.com/photo-1558000143-a609d5ddc67b?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    // Background dikembalikan ke putih bersih
    <section className="relative w-full bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Ornamen Playful (Blobs Pastel & Floating Icons) */}
      <div className="absolute top-28 left-[-10%] w-[350px] h-[350px] bg-emerald-100/40 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div animate={floatAnim(6, -15)} className="absolute top-24 right-[10%] z-0 opacity-75 pointer-events-none">
        <Star className="w-10 h-10 text-amber-400 fill-amber-300 drop-shadow-sm" />
      </motion.div>

      <motion.div animate={floatAnim(7, 15, 1)} className="absolute top-44 left-[5%] z-0 opacity-70 pointer-events-none">
        <Sparkles className="w-8 h-8 text-blue-400 drop-shadow-sm" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-12">
        {/* Header */}
        <div ref={inViewRef} className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Fasilitas & Keamanan
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-md text-center md:text-right">
            Lingkungan belajar yang dirancang khusus untuk kenyamanan, keamanan, dan kebebasan bereksplorasi.
          </p>
        </div>
      </div>

      {/* Horizontal Slider Area */}
      <div className="relative z-10 w-full pb-8">
        <motion.div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          {facilities.map((item, index) => (
            <div 
              key={index}
              className="relative w-[85vw] md:w-[500px] lg:w-[600px] aspect-[4/3] md:aspect-video flex-shrink-0 snap-start rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 p-6 md:p-8 flex items-end">
                <div className="relative w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md transform group-hover:-translate-y-8 md:group-hover:-translate-y-10 transition-transform duration-500 ease-out">
                    {item.title}
                  </h3>
                  <p className="absolute left-0 bottom-0 md:-bottom-2 w-full text-slate-200 text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out line-clamp-2 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Fasilitas;