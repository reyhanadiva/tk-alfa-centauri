import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Clock, Star, Smile, Heart } from 'lucide-react';

const ProgramLayanan = () => {
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

  const programs = [
    {
      unit: "Daycare",
      age: "0 - 2 Tahun",
      location: "Jl. Diponegoro No. 48, Bandung",
      mapLink: "https://maps.app.goo.gl/HbHLZsX8tQ9kh7UG6",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    },
    {
      unit: "Playgroup",
      age: "2 - 4 Tahun",
      location: "Jl. Terate No. 12, Bandung",
      mapLink: "https://maps.app.goo.gl/5Mfy6hzs89BeqywV7",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    },
    {
      unit: "TK",
      age: "4 - 6 Tahun",
      location: "Jl. Terate No. 12, Bandung",
      mapLink: "https://maps.app.goo.gl/5Mfy6hzs89BeqywV7",
      image: "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <section className="relative w-full bg-[#F8F9FA] px-4 md:px-8 pt-24 pb-32 overflow-hidden">
      
      {/* Elemen Melayang */}
      <motion.div animate={floatAnim(6, -20)} className="absolute top-16 left-[8%] md:left-[12%] z-0 opacity-80 pointer-events-none">
        <Star className="w-10 h-10 md:w-14 md:h-14 text-amber-400 fill-amber-300 drop-shadow-md" />
      </motion.div>

      <motion.div animate={floatAnim(7, 20, 1)} className="absolute top-32 right-[8%] md:right-[12%] z-0 opacity-80 pointer-events-none">
        <Star className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-300 drop-shadow-md" />
      </motion.div>

      <motion.div animate={floatAnim(5, -15, 1.5, [0, 30, 0])} className="absolute bottom-40 left-[5%] z-0 opacity-60 pointer-events-none">
        <Smile className="w-10 h-10 text-amber-500 drop-shadow-sm" />
      </motion.div>

      <motion.div animate={floatAnim(8, 15, 0.5, [-15, 15, -15])} className="absolute bottom-36 right-[6%] z-0 opacity-70 pointer-events-none">
        <Heart className="w-8 h-8 text-rose-400 fill-rose-300 drop-shadow-sm" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Program Layanan Kami
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Mendampingi setiap fase emas perkembangan ananda, dari usia bayi hingga kesiapan memasuki sekolah dasar.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {programs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-[2rem] p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group border border-slate-100"
            >
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.unit}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="px-3 pb-3 flex flex-col flex-grow justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{item.unit}</h3>
                  <p className="text-slate-500 font-medium">Usia {item.age}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <a 
                    href={item.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-slate-600 hover:text-blue-600 transition-colors group/link w-full"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4.5 h-4.5 text-slate-400 group-hover/link:text-blue-600 transition-colors" />
                      <span className="font-semibold text-sm group-hover/link:underline underline-offset-4">
                        {item.location}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-blue-600 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner Jadwal (Lebar dikurangi sedikit menjadi max-w-xl agar lebih proporsional) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-2xl md:rounded-full p-2 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20"
        >
          <div className="bg-[#FFF4D2] text-[#B47509] px-4 py-2 rounded-xl md:rounded-full flex items-center gap-2 w-full sm:w-auto flex-shrink-0 justify-center">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm">Waktu Belajar</span>
          </div>
          
          <div className="flex items-center justify-around w-full py-1 sm:py-0 px-3 gap-3 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1.5">Reguler:</span>
              <span className="text-sm font-bold text-slate-800">08.00 - 12.30</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-slate-200"></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1.5">Full Day:</span>
              <span className="text-sm font-bold text-slate-800">06.30 - 16.00</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Wavy Divider Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px]"
        >
          <path
            fill="#ffffff"
            d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,176C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ProgramLayanan;