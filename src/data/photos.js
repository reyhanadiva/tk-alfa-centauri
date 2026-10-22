/*
  Satu tempat untuk semua foto kegiatan sekolah (folder public/images/kegiatan).
  Ganti foto: timpa file di folder tersebut dengan nama yang sama, atau ubah alamatnya di sini.
  Jika foto dipindah ke server/CDN sekolah, cukup ubah BASE di bawah (mis. 'https://alfacentauri.sch.id/img/kegiatan').
*/
const BASE = '/images/kegiatan';
const f = (name) => `${BASE}/${name}.webp`;

export const FOTO = {
  // Perayaan 17 Agustus
  agustusBermainBersamaGuru: f('agustus-bermain-bersama-guru'),
  agustusPermainanGelas: f('agustus-permainan-gelas'),
  agustusMembawaKarya: f('agustus-membawa-karya'),
  agustusFotoBersama: f('agustus-foto-bersama'),
  agustusBermainAir: f('agustus-bermain-air'),
  agustusFotoKelas: f('agustus-foto-kelas'),
  // Art Exhibition
  artKeluarga1: f('art-keluarga-1'),
  artMelukis1: f('art-melukis-1'),
  artMelukis2: f('art-melukis-2'),
  artMelukis3: f('art-melukis-3'),
  artKeluarga2: f('art-keluarga-2'),
  artPentas: f('art-pentas'),
  // School Fair
  fairKostumApel: f('fair-kostum-apel'),
  fairPanggung: f('fair-panggung'),
  fairAngklung1: f('fair-angklung-1'),
  fairAngklung2: f('fair-angklung-2'),
};
