/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /*
        Design token TK Alfa Centauri (lihat juga .cursor/rules/tk-alfa-centauri.mdc).
        - night : biru malam, warna teks judul & permukaan gelap (langit malam Alfa Centauri)
        - sunny : kuning bintang, warna tombol utama
        - cream : latar dasar halaman yang hangat
        - cloud : latar "pita" biru muda
        - butter: latar "pita" kuning muda
        Aksen ceria per kartu tetap memakai palet Tailwind dengan urutan tetap:
        sky → emerald → violet → amber → rose.
      */
      colors: {
        night: {
          DEFAULT: '#1B2559',
          700: '#24307A',
          900: '#111842',
        },
        sunny: {
          DEFAULT: '#FFD23F',
          600: '#E8B408',
        },
        cream: '#FFF9EE',
        cloud: '#EEF6FF',
        butter: '#FFF4D6',
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        fredoka: ['Fredoka', 'system-ui', 'sans-serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
