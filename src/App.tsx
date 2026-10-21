import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TentangKami from './components/TentangKami';
import MengapaMemilihKami from './components/MengapaMemilihKami';
import ProgramLayanan from './components/ProgramLayanan';
import Fasilitas from './components/Fasilitas';
import ProfilPendidik from './components/ProfilPendidik';
import Testimoni from './components/Testimoni';
import Galeri from './components/Galeri';
import BeritaArtikel from './components/BeritaArtikel';
import FAQ from './components/FAQ';
import Lokasi from './components/Lokasi';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

/*
  Urutan halaman: kenalan (hero, tentang, keunggulan) → isi (program, fasilitas, pendidik)
  → bukti (testimoni, galeri, berita) → menjawab ragu (FAQ, lokasi) → ajakan (CTA).
*/
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TentangKami />
        <MengapaMemilihKami />
        <ProgramLayanan />
        <Fasilitas />
        <ProfilPendidik />
        <Testimoni />
        <Galeri />
        <BeritaArtikel />
        <FAQ />
        <Lokasi />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
