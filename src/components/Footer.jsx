import React from 'react';
import { MapPin, Phone, Mail, Instagram, Youtube, Facebook, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1120] pt-16 md:pt-20 pb-8 px-4 md:px-8 text-slate-300">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Kolom 1: Profil */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0D6EFD] rounded-xl flex items-center justify-center text-white font-black text-xl">
                AC
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">TK Alfa Centauri</h3>
                <p className="text-blue-400 text-xs font-semibold">Kota Bandung - Jawa Barat</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Unit pendidikan anak usia dini (Daycare, Playgroup, dan TK) di bawah naungan Yayasan Taqwa Cerdas Kreatif. Berkomitmen membentuk karakter tangguh dengan keseimbangan ilmu dunia dan akhirat.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0D6EFD] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0D6EFD] transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0D6EFD] transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Kolom 2: Alamat & Kontak (Urutan TK di atas, Daycare di bawah, aksen ikon kuning) */}
          <div className="lg:col-span-4 border-l-0 lg:border-l border-slate-800 lg:pl-8">
            <h4 className="text-white font-bold text-sm tracking-widest mb-6">ALAMAT & KONTAK KAMI</h4>
            
            {/* Alamat PG & TK */}
            <div className="flex items-start gap-3 mb-5">
              <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-semibold mb-1">Alamat PG & TK:</p>
                <a 
                  href="https://maps.app.goo.gl/mFEqDuvEn5QdmYkZ8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white leading-snug transition-colors block"
                >
                  Jalan Terate No.12, Samoja, Batununggal, Kota Bandung 40273
                </a>
              </div>
            </div>

            {/* Alamat Daycare */}
            <div className="flex items-start gap-3 mb-5">
              <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-semibold mb-1">Alamat Daycare:</p>
                <a 
                  href="https://maps.app.goo.gl/46XXGfNDQqyCjvxu8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white leading-snug transition-colors block"
                >
                  Jl. Diponegoro No. 48, Citarum, Kec. Bandung Wetan, Kota Bandung 40115
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3 mt-6">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href="mailto:tk@alfacentauri.sch.id" className="text-sm text-slate-300 hover:text-amber-300 transition-colors">
                tk@alfacentauri.sch.id
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a 
                href="https://wa.me/6282223246649?text=Halo%20Admin,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20TK%20Alfa%20Centauri." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium"
              >
                0822-2324-6649 (Admin)
              </a>
            </div>
          </div>

          {/* Kolom 3: Jaringan Pendidikan */}
          <div className="lg:col-span-3 border-l-0 lg:border-l border-slate-800 lg:pl-8">
            <h4 className="text-white font-bold text-sm tracking-widest mb-6">JARINGAN PENDIDIKAN</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://alfacentauri.sch.id/yayasan/" target="_blank" rel="noreferrer" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>Yayasan Taqwa Cerdas Kreatif</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>SD Alfa Centauri</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>SMP Alfa Centauri</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>SMA Alfa Centauri</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>English Now</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors">
                  <span>Language Course for Da'wah & Ummah (LCDU)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT BAR */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; 2026 <span className="text-slate-300 font-semibold">TK Alfa Centauri Bandung</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;