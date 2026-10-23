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
  // Karnaval 17 Agustus
  karnavalHut: f('karnaval-hut'),
  karnavalKostum: f('karnaval-kostum'),
  karnavalBersama: f('karnaval-bersama'),
  // Outing
  outingGokartBan: f('outing-gokart-ban'),
  outingGokartMelambai: f('outing-gokart-melambai'),
  tsbFotoBersama: f('tsb-foto-bersama'),
  tsbAkuarium: f('tsb-akuarium'),
  tsbWahana: f('tsb-wahana'),
  tsbWahana2: f('tsb-wahana-2'),
  taniKotaBersamaGuru: f('tanikota-bersama-guru'),
  taniKotaFotoBersama: f('tanikota-foto-bersama'),
  taniKotaSayur: f('tanikota-sayur'),
  taniKotaAyam: f('tanikota-ayam'),
  taniKotaHewan: f('tanikota-hewan'),
  taniKotaSawah: f('tanikota-sawah'),
  taniKotaLumpur: f('tanikota-lumpur'),
  // Parents Day: Harmony in a Green World
  parentsKostumBurung: f('parents-kostum-burung'),
  parentsKostumBunga: f('parents-kostum-bunga'),
  parentsPanggung: f('parents-panggung'),
  // Ramadhan: Red Cherry
  ramadhanPanggung: f('ramadhan-panggung'),
  ramadhanFashion: f('ramadhan-fashion'),
  ramadhanBendera: f('ramadhan-bendera'),
  ramadhanHijab: f('ramadhan-hijab'),
  // Foto sekolah (fasilitas)
  sekolahPanjat: f('sekolah-panjat'),
  sekolahPlayground: f('sekolah-playground'),
  sekolahAyunan: f('sekolah-ayunan'),
  sekolahAreaBermain: f('sekolah-area-bermain'),
  sekolahGedung: f('sekolah-gedung'),
  sekolahPerpus1: f('sekolah-perpus-1'),
  sekolahPerpus2: f('sekolah-perpus-2'),
  // Versi retouch (warna hangat, kontras & cahaya seragam) untuk section Mengapa Memilih Kami & Program
  artMelukis1Edit: f('art-melukis-1-edit'),
  agustusFotoBersamaEdit: f('agustus-foto-bersama-edit'),
  ramadhanPanggungEdit: f('ramadhan-panggung-edit'),
  artMelukis2Edit: f('art-melukis-2-edit'),
  artMelukis3Edit: f('art-melukis-3-edit'),
  agustusBermainBersamaGuruEdit: f('agustus-bermain-bersama-guru-edit'),
  taniKotaBersamaGuruEdit: f('tanikota-bersama-guru-edit'),
  fairAngklung1Edit: f('fair-angklung-1-edit'),
  fairKostumApelEdit: f('fair-kostum-apel-edit'),
  agustusPermainanGelasEdit: f('agustus-permainan-gelas-edit'),
};
