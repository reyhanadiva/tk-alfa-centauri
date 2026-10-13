import React from 'react';

const BeritaArtikel = () => {
  const mainArticle = {
    id: 1,
    category: "Kegiatan",
    date: "12 Oktober 2026",
    title: "Field Trip ke Kebun Binatang: Mengenal Satwa Sejak Dini",
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=80", 
  };

  const sideArticles = [
    {
      id: 2,
      category: "Prestasi",
      date: "05 Oktober 2026",
      title: "TK Alfa Centauri Raih Juara 1 Lomba Mewarnai Tingkat Kota",
      image: "https://images.unsplash.com/photo-1601314167099-232775b366ec?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      category: "Parenting",
      date: "28 September 2026",
      title: "Seminar Parenting: Menghadapi Tantrum pada Anak Usia Dini",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      category: "Kegiatan",
      date: "20 September 2026",
      title: "Kegiatan Literasi Jumat Pagi Bersama Guru dan Wali Murid",
      image: "https://images.unsplash.com/photo-1512820200501-ea7f11ac1a28?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      category: "Lingkungan",
      date: "15 September 2026",
      title: "Merawat Lingkungan Sejak Dini dari Kebun Sekolah",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80",
    }
  ];

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Kegiatan': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Prestasi': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Parenting': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Lingkungan': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <section className="relative w-full bg-[#F8F9FA] pt-24 pb-32 px-4 md:px-8 overflow-hidden">
      
      {/* Wavy Divider Atas */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]">
          <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,176C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="absolute top-20 right-[-5%] w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-[36px] md:text-[44px] font-bold text-slate-900 tracking-tight">
            Berita dan Acara Sekolah
          </h2>
        </div>

        {/* Layout Asimetris */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Kolom Kiri: Artikel Highlight */}
          <div className="w-full lg:w-[55%] flex flex-col group cursor-pointer bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-100 overflow-hidden">
              <img 
                src={mainArticle.image} 
                alt={mainArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-5 md:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-[13px] md:text-[14px] font-medium text-slate-500">
                  {mainArticle.date}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold border ${getCategoryStyles(mainArticle.category)}`}>
                  {mainArticle.category}
                </span>
              </div>
              <h3 className="text-[20px] md:text-[24px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {mainArticle.title}
              </h3>
            </div>
          </div>

          {/* Kolom Kanan: List Artikel dengan Garis Pemisah Jelas */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between">
            {sideArticles.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between py-4 md:py-[18px] group cursor-pointer ${
                  index !== sideArticles.length - 1 ? 'border-b border-slate-200/70' : ''
                }`}
              >
                <div className="pr-4 md:pr-5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
                      {item.date}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getCategoryStyles(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-[15px] md:text-[16px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
                
                <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm border border-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Tombol Call to Action */}
        <div className="mt-10 md:mt-12 text-left">
          <a 
            href="#" 
            className="inline-block px-7 py-3 bg-[#0D6EFD] text-[15px] text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Lihat semua berita
          </a>
        </div>

      </div>

      {/* Wavy Divider Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px] pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px]">
          <path fill="#ffffff" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default BeritaArtikel;