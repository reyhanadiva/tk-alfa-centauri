/*
  Satu sumber data kontak, tautan, lokasi, dan jadwal.
  Ubah di sini, maka navbar, hero, lokasi, CTA, FAQ, tombol WhatsApp, dan footer ikut berubah.
*/

export const SCHOOL = {
  name: 'TK Alfa Centauri',
  fullName: 'Daycare, Playgroup & TK Alfa Centauri',
  city: 'Kota Bandung, Jawa Barat',
  tagline: 'Bermain, Belajar, Berkarakter',
  foundation: 'Yayasan Taqwa Cerdas Kreatif',
};

/* ---------- WhatsApp ---------- */
export const WA_NUMBER = '6282223246649';
export const WA_DISPLAY = '0822-2324-6649';
export const wa = (message = 'Halo Admin, saya ingin bertanya mengenai informasi TK Alfa Centauri.') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const EMAIL = 'tk@alfacentauri.sch.id';

// Logo resmi (PNG). Ganti dengan versi beresolusi tinggi / SVG bila tersedia.
export const LOGO_SRC = '/logo-tk-alfa-centauri.png';

/* ---------- Pendaftaran ---------- */
// Halaman pendaftaran di website lama. Ganti bila alamat halaman SPMB berubah.
export const SPMB_URL = 'https://alfacentauri.sch.id/tk/ppdb.php';
export const SPMB_LABEL = 'SPMB TA 2027/2028 dibuka';

/* ---------- Menu ---------- */
export const NAV_LINKS = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Program', href: '#program' },
  { label: 'Fasilitas', href: '#fasilitas' },
  { label: 'Pendidik', href: '#pendidik' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Berita', href: '#berita' },
  { label: 'Kontak', href: '#kontak' },
];

/* ---------- Lokasi ---------- */
export const CAMPUSES = [
  {
    id: 'terate',
    name: 'Lokasi Terate',
    units: 'Playgroup & TK',
    programs: [
      { unit: 'Playgroup', age: '2–4 tahun' },
      { unit: 'TK', age: '4–6 tahun' },
    ],
    address: 'Jl. Terate No. 12, Samoja, Batununggal, Kota Bandung 40273',
    mapsLink: 'https://maps.app.goo.gl/5Mfy6hzs89BeqywV7',
    // Pencarian peta untuk iframe (tanpa API key)
    mapsQuery: 'TK Alfa Centauri, Jl. Terate No. 12, Samoja, Batununggal, Bandung',
  },
  {
    id: 'diponegoro',
    name: 'Lokasi Diponegoro',
    units: 'Daycare',
    programs: [{ unit: 'Daycare', age: '0–2 tahun' }],
    address: 'Jl. Diponegoro No. 48, Citarum, Bandung Wetan, Kota Bandung 40115',
    mapsLink: 'https://maps.app.goo.gl/HbHLZsX8tQ9kh7UG6',
    mapsQuery: 'Alfa Centauri, Jl. Diponegoro No. 48, Citarum, Bandung Wetan, Bandung',
  },
];

/* ---------- Jam belajar ---------- */
// Sumber: FAQ. Website lama menulis Fullday 08.00–16.00, pastikan mana yang benar.
export const SCHEDULE = [
  { name: 'Reguler', time: '08.00 – 12.30', note: 'Jumat pulang pukul 11.00' },
  { name: 'Fullday', time: '06.30 – 16.00' },
];

/* ---------- Jaringan pendidikan ---------- */
export const NETWORK = [
  { name: 'Yayasan Taqwa Cerdas Kreatif', href: 'https://alfacentauri.sch.id/yayasan/' },
  { name: 'SD Alfa Centauri', href: 'https://sdalfacentauri.sch.id' },
  { name: 'SMP Alfa Centauri', href: 'https://smpalfacentauri.sch.id' },
  { name: 'SMA Alfa Centauri', href: 'https://smaalfacentauri.sch.id' },
  { name: 'English Now', href: 'http://englishnow.co.id/' },
  { name: "Language Course for Da'wah & Ummah (LCDU)", href: 'https://lcdu.org' },
];

/* ---------- Media sosial ---------- */
// Isi URL-nya; ikon hanya tampil untuk akun yang sudah diisi.
export const SOCIALS = {
  instagram: '',
  youtube: '',
  facebook: '',
};
