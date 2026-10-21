import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wa } from '@/data/site';
import WhatsAppIcon from './ui/WhatsAppIcon';

/*
  Tombol WhatsApp yang menempel di pojok kanan bawah.
  Muncul setelah pengunjung melewati hero (di hero sudah ada tombol Hubungi Admin).
  Di layar lebar ada label "Tanya Admin"; di HP cukup ikon bulat.
*/
export default function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={wa()}
          target="_blank"
          rel="noopener noreferrer"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 p-3.5 text-white shadow-[0_5px_0_0_#047857,0_16px_30px_-10px_rgba(4,120,87,0.6)] transition-[transform,box-shadow] active:translate-y-[3px] active:shadow-[0_2px_0_0_#047857] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 md:bottom-8 md:right-8 md:px-5"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="hidden font-display text-base font-semibold md:inline">Tanya Admin</span>
          <span className="sr-only">lewat WhatsApp (buka di tab baru)</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
