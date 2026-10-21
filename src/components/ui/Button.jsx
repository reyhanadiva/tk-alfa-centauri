import React from 'react';

/*
  Tombol "chunky" ala aplikasi anak: sudut membulat dan bayangan tebal di bawah yang ikut turun saat ditekan.
  Pakai komponen ini untuk SEMUA tombol ajakan supaya bentuknya seragam di seluruh halaman.

  variant:
  - sun   : tombol utama (kuning)        -> Daftar / Info SPMB
  - night : tombol gelap (biru malam)    -> aksi kuat di latar terang
  - white : tombol putih                  -> aksi kedua di latar terang / gelap
  - glass : tombol kaca transparan        -> aksi kedua di atas foto / latar gelap
*/

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-display font-semibold tracking-wide select-none ' +
  'transition-[transform,box-shadow,background-color,filter] duration-150 active:translate-y-[3px] motion-reduce:transition-none motion-reduce:active:translate-y-0 ' +
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

const VARIANTS = {
  sun: 'bg-sunny text-night shadow-[0_5px_0_0_#E8B408] hover:brightness-105 active:shadow-[0_2px_0_0_#E8B408]',
  night: 'bg-night text-white shadow-[0_5px_0_0_#111842] hover:bg-night-700 active:shadow-[0_2px_0_0_#111842]',
  white: 'bg-white text-night shadow-[0_5px_0_0_#D6DEEE] hover:bg-slate-50 active:shadow-[0_2px_0_0_#D6DEEE]',
  glass:
    'bg-white/15 text-white border-2 border-white/70 backdrop-blur-md shadow-[0_5px_0_0_rgba(255,255,255,0.25)] hover:bg-white/25 active:shadow-[0_2px_0_0_rgba(255,255,255,0.25)]',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base md:text-lg',
};

export default function Button({ href, onClick, variant = 'sun', size = 'md', className = '', newTab, children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={cls} {...rest}>
        {children}
      </button>
    );
  }

  // Tautan ke luar situs dibuka di tab baru
  const external = newTab ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      onClick={onClick}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only">(buka di tab baru)</span>}
    </a>
  );
}
