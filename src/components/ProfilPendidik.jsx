import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const ProfilPendidik = () => {
  const [activeTab, setActiveTab] = useState('pendidik');
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [activeTab]);

  const timPendidik = [
    {
      name: "Putri Maharani, S.Pd.",
      role: "Guru Kelas Utama",
      roleColor: "bg-blue-100 text-blue-700 border-blue-200",
      almamater: "S1 PGPAUD, Universitas Pendidikan Indonesia (2023)",
      image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Dinda Aulia, S.Psi.",
      role: "Co-Teacher",
      roleColor: "bg-amber-100 text-amber-700 border-amber-200",
      almamater: "S1 Psikologi, Universitas Padjadjaran (2024)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Siti Nurbaya, A.Md.",
      role: "Guru Pendamping",
      roleColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      almamater: "D3 Kesejahteraan Sosial, Poltekesos (2024)",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Risa Amelia, S.Pd.",
      role: "Guru Kelas Utama",
      roleColor: "bg-blue-100 text-blue-700 border-blue-200",
      almamater: "S1 Pendidikan Guru, Universitas Negeri Jakarta (2022)",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sarah Widyawati, S.Psi.",
      role: "Co-Teacher",
      roleColor: "bg-amber-100 text-amber-700 border-amber-200",
      almamater: "S1 Psikologi, Universitas Indonesia (2023)",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef4374bce?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Nabila Zahra, S.Sos.",
      role: "Guru Pendamping",
      roleColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      almamater: "S1 Sosiologi, UIN Sunan Gunung Djati (2024)",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const timManajemen = [
    {
      name: "Nisa Fadilah, M.Pd.",
      role: "Kepala Sekolah",
      roleColor: "bg-purple-100 text-purple-700 border-purple-200",
      almamater: "S2 Manajemen Pendidikan, UNJ (2018)",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Rizky Pratama, S.E.",
      role: "Finance",
      roleColor: "bg-slate-200 text-slate-700 border-slate-300",
      almamater: "S1 Akuntansi, Universitas Katolik Parahyangan (2022)",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Maya Sari, S.I.Kom.",
      role: "Administrasi",
      roleColor: "bg-pink-100 text-pink-700 border-pink-200",
      almamater: "S1 Ilmu Komunikasi, Telkom University (2023)",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Andi Saputra, S.T.",
      role: "Operasional",
      roleColor: "bg-orange-100 text-orange-700 border-orange-200",
      almamater: "S1 Teknik Industri, Institut Teknologi Bandung (2020)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const currentData = activeTab === 'pendidik' ? timPendidik : timManajemen;

  return (
    // Background diubah ke warna Baby Blue pastel (#F4F9FF)
    <section className="relative w-full bg-[#F4F9FF] pt-24 pb-28 overflow-hidden">
      
      {/* 1. WAVY DIVIDER ATAS (Membelah dari bg putih Fasilitas di atasnya) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]">
          <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,176C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* 2. ORNAMEN PLAYFUL (BLOBS LEBIH JELAS & BINTANG MELAYANG) */}
      <div className="absolute top-32 left-[-5%] w-[300px] h-[300px] bg-amber-200/50 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* 1 Bintang kecil melayang perlahan di kanan atas */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-[10%] lg:right-[15%] hidden md:block opacity-60 pointer-events-none"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.61 8.26L12 2Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header - Margin dikurangi */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Profil Pendidik & Manajemen
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Barisan talenta muda yang adaptif terhadap ilmu <span className="italic">parenting</span> modern, memastikan ananda mendapat pendampingan yang relevan.
          </p>
        </div>

        {/* Tab Toggle - Margin dikurangi */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm grid grid-cols-2 w-[320px] md:w-[400px] relative">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-slate-900 rounded-full transition-all duration-300 ease-out z-0 ${
                activeTab === 'pendidik' ? 'left-1.5' : 'left-[calc(50%+0.375rem)]'
              }`}
            />
            <button
              onClick={() => setActiveTab('pendidik')}
              className={`relative z-10 py-2.5 text-sm md:text-base font-bold transition-colors duration-300 ${
                activeTab === 'pendidik' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Tim Pendidik
            </button>
            <button
              onClick={() => setActiveTab('manajemen')}
              className={`relative z-10 py-2.5 text-sm md:text-base font-bold transition-colors duration-300 ${
                activeTab === 'manajemen' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Tim Manajemen
            </button>
          </div>
        </div>
      </div>

      {/* 4. SLIDER AREA LEBIH COMPACT - Lebar kartu dikurangi jadi 280px */}
      <div className="relative z-10 w-full pb-4">
        <div 
          ref={sliderRef}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-proximity pb-8 pt-2 px-4 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <AnimatePresence mode="popLayout">
            {currentData.map((person, index) => (
              <motion.div
                key={person.name + activeTab}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                // Lebar disesuaikan dari w-[300px] menjadi w-[280px] agar lebih hemat ruang
                className="bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col flex-shrink-0 w-[75vw] sm:w-[260px] md:w-[280px] snap-start group"
              >
                {/* Foto Profil - Diubah jadi aspect-square (Kotak presisi) */}
                <div className="relative aspect-square rounded-[1rem] overflow-hidden mb-4 bg-slate-100">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide shadow-sm backdrop-blur-md border ${person.roleColor}`}>
                      {person.role}
                    </span>
                  </div>
                </div>

                {/* Detail Informasi */}
                <div className="px-1 pb-1 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-1">
                    {person.name}
                  </h3>
                  
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-slate-50 p-1.5 rounded-lg flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className="text-[13px] font-semibold text-slate-700 leading-snug">
                        {person.almamater}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. WAVY DIVIDER BAWAH (Melebur ke bg putih Testimoni di bawahnya) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px] pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]">
          <path fill="#ffffff" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default ProfilPendidik;