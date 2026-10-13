import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, BookOpen } from 'lucide-react';

const MengapaMemilihKami = () => {
  const [active, setActive] = useState(0);

  const features = [
    {
      id: 0,
      title: "School Readiness",
      // Elemen ikon diubah menjadi warna gelap (slate-900) agar kontras dengan kotak kuningnya
      icon: <Star className="w-6 h-6 text-slate-900 fill-slate-900" />,
      desc: "Menyiapkan kematangan fundamental ananda menuju sekolah dasar secara menyeluruh, bukan sekadar drill akademik.",
      pills: ["Sosial-Emosional", "Fisik-Motorik", "Bahasa & Kognitif", "Moral & Agama"],
      img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop"
    },
    {
      id: 1,
      title: "Character Building",
      icon: <Sparkles className="w-6 h-6 text-slate-900" />,
      desc: "Membentuk fondasi karakter unggul melalui 7 Nilai Khas Alfa Centauri yang ditanamkan secara natural dalam interaksi harian.",
      pillsGroup: [
        ["Jujur", "Bersih & Rapi", "Mandiri", "Disiplin"],
        ["Tangguh", "Sopan & Santun", "Bermanfaat"]
      ],
      img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Pembiasaan Agama",
      icon: <BookOpen className="w-6 h-6 text-slate-900" />,
      desc: "Membangun kecintaan beribadah sejak dini melalui rutinitas nyata sehari-hari, seperti shalat Dhuha dan penerapan adab islami.",
      pills: [],
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Program Inklusi",
      icon: <Heart className="w-6 h-6 text-slate-900 fill-slate-900" />,
      desc: "Setiap anak berhak mendapat kesempatan yang sama. Kami memfasilitasi kebutuhan dan keunikan tiap ananda agar dapat belajar secara setara.",
      pills: [],
      img: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="relative w-full bg-[#F8F9FA] pt-24 pb-28 px-4 md:px-8 overflow-hidden">
      
      {/* Wavy Divider Atas */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]">
          <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,176C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Pernak-pernik Playful */}
      <div className="absolute top-32 left-[-5%] w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-5%] w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Nilai unggul yang kami hadirkan untuk tumbuh kembang optimal ananda.
          </p>
        </div>

        {/* Expanding Cards / Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          {features.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActive(index)}
                className={`relative cursor-pointer overflow-hidden rounded-[2.5rem] flex-shrink-0 transition-all duration-700 ease-in-out shadow-md hover:shadow-xl ${
                  isActive 
                    ? 'h-[500px] lg:h-full lg:flex-[4] lg:w-auto w-full' 
                    : 'h-[100px] lg:h-full lg:flex-[1] lg:w-auto w-full'
                }`}
              >
                {/* Background Image */}
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-slate-900/50' : 'bg-slate-900/65 hover:bg-slate-900/55'}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent"></div>

                {/* Konten Kartu */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  
                  {/* Tampilan saat aktif */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3.5 bg-amber-300 rounded-2xl shadow-md">
                            {item.icon}
                          </div>
                          <h3 className="text-3xl font-bold text-white tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        
                        <p className="text-slate-200 text-lg md:text-xl font-medium max-w-xl">
                          {item.desc}
                        </p>

                        {item.pills && item.pills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.pills.map((pill, i) => (
                              <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/30">
                                {pill}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.pillsGroup && (
                          <div className="flex flex-col gap-2 mt-2">
                            {item.pillsGroup.map((group, rowIdx) => (
                              <div key={rowIdx} className="flex flex-wrap gap-2">
                                {group.map((pill, colIdx) => (
                                  <span key={colIdx} className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/30">
                                    {pill}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tampilan saat tidak aktif */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-0 lg:right-0 lg:flex lg:justify-center lg:items-end flex items-center gap-4"
                      >
                        <div className="p-3 bg-amber-300/90 backdrop-blur-md rounded-2xl shadow-md lg:mb-6">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white lg:hidden">
                          {item.title}
                        </h3>
                        <h3 className="hidden lg:block text-2xl font-bold text-white whitespace-nowrap -rotate-90 origin-bottom-left absolute left-12 bottom-20">
                          {item.title}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MengapaMemilihKami;