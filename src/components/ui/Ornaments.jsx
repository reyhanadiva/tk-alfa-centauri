import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
  Ornamen khas TK Alfa Centauri yang dipakai berulang di seluruh halaman.
  Alpha Centauri adalah sistem DUA BINTANG, cocok dengan filosofi "dua bintang: sukses dunia & akhirat".
  Karena itu maskotnya sepasang bintang (besar kuning & kecil oranye).
  Semua ornamen dekoratif (aria-hidden) dan diam bila pengguna memilih "kurangi animasi".
*/

const STAR_PATH =
  'M50 11 L62.3 36 L89.9 40 L70 59.5 L74.7 87 L50 74 L25.3 87 L30 59.5 L10.1 40 L37.7 36 Z';

/** Satu bintang gembul. `face` menampilkan wajah lucu (mata, senyum, pipi merona). */
export function Star({ color = '#FFD23F', edge = '#E8B408', face = false, wink = false, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* stroke tebal sewarna isian = ujung bintang membulat */}
      <path d={STAR_PATH} fill={edge} stroke={edge} strokeWidth="12" strokeLinejoin="round" transform="translate(0 3)" />
      <path d={STAR_PATH} fill={color} stroke={color} strokeWidth="12" strokeLinejoin="round" />
      {/* kilau */}
      <path d="M36 30 Q 41 24 47 23" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      {face && (
        <g>
          <motion.g
            style={{ originY: '58px' }}
            animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.88, 0.92, 0.96, 1] }}
          >
            <ellipse cx="40" cy="55" rx="3.6" ry="4.6" fill="#1B2559" />
            {wink ? (
              <path d="M56 55 q 4 -4 8 0" fill="none" stroke="#1B2559" strokeWidth="3" strokeLinecap="round" />
            ) : (
              <ellipse cx="60" cy="55" rx="3.6" ry="4.6" fill="#1B2559" />
            )}
            <circle cx="41.3" cy="53.4" r="1.3" fill="#fff" />
            {!wink && <circle cx="61.3" cy="53.4" r="1.3" fill="#fff" />}
          </motion.g>
          <path d="M44 63 Q 50 69 56 63" fill="none" stroke="#1B2559" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="33" cy="63" rx="4.5" ry="2.6" fill="#FF8FA3" opacity="0.6" />
          <ellipse cx="67" cy="63" rx="4.5" ry="2.6" fill="#FF8FA3" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}

/**
 * Maskot sepasang bintang yang melayang bergantian.
 * size: lebar total (class Tailwind), mis. "w-32".
 */
export function TwinStars({ className = 'w-32', face = true, glow = false }) {
  const reduce = useReducedMotion();
  const glowCls = glow ? 'drop-shadow-[0_0_18px_rgba(255,210,63,0.6)]' : 'drop-shadow-[0_8px_10px_rgba(27,37,89,0.18)]';
  return (
    <div className={`relative aspect-[1.55/1] ${className}`} aria-hidden="true">
      <motion.div
        className={`absolute left-0 bottom-0 w-[64%] ${glowCls}`}
        animate={reduce ? undefined : { y: [0, -6, 0], rotate: [-5, 4, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Star face={face} />
      </motion.div>
      <motion.div
        className={`absolute right-0 top-0 w-[44%] ${glowCls}`}
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [8, -4, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      >
        <Star face={face} wink color="#FFA94D" edge="#E8862A" />
      </motion.div>
    </div>
  );
}

/** Awan putih empuk */
export function Cloud({ className = 'w-32', drift = true, opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 120 56"
      className={`${drift ? 'cloud-drift' : ''} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M18 50 a15 15 0 0 1 4 -29 a20 20 0 0 1 37 -8 a17 17 0 0 1 31 6 a14 14 0 0 1 12 31 z"
        fill="#fff"
      />
      <path d="M22 50 h82" stroke="#DCEBFA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Kilau empat sudut */
export function Sparkle({ className = 'w-6', color = '#FFD23F' }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 0 C 10.8 6.5 13.5 9.2 20 10 C 13.5 10.8 10.8 13.5 10 20 C 9.2 13.5 6.5 10.8 0 10 C 6.5 9.2 9.2 6.5 10 0 Z" fill={color} />
    </svg>
  );
}

/** Garis bawah bergelombang ala tulisan tangan (untuk kata yang ditekankan di judul) */
export function Squiggle({ className = '', color = 'currentColor' }) {
  return (
    <svg
      className={`absolute left-0 -bottom-3 w-full h-4 overflow-visible ${className}`}
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 8 Q 14.5 2 26 8 T 49 8 T 72 8 T 95 8 T 118 8 T 141 8 T 164 8 T 197 8"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Ornamen melayang pelan (pembungkus untuk ikon/bentuk apa pun) */
export function Floaty({ className = '', duration = 6, y = -14, delay = 0, rotate = [0, 8, 0], children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none ${className}`}
      animate={reduce ? undefined : { y: [0, y, 0], rotate }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}
