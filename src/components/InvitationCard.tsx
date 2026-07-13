"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";

const targetDate = new Date("July 22, 2026 11:00:00").getTime();

/* ───────── Shared Premium Motion Variants ───────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

/* ───────── Global Premium Noise Overlay ───────── */
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[100] opacity-[0.06] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ───────── Animated Background Blobs ───────── */
function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      <motion.div
        className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-55 bg-[#F1BFAF]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[-20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-35 bg-[#E9B69F]"
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

/* ───────── Signature Motif ───────── */
function GeometricBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 20" className={className} preserveAspectRatio="xMidYMid meet" fill="none">
      {Array.from({ length: 10 }).map((_, i) => {
        const cx = 16 + i * 32;
        return (
          <g key={i} stroke="#C4943A" strokeWidth="1.5">
            <path d={`M${cx} 2 L${cx + 8} 10 L${cx} 18 L${cx - 8} 10 Z`} />
            <circle cx={cx} cy="10" r="1.4" fill="#C4943A" stroke="none" />
          </g>
        );
      })}
    </svg>
  );
}

/* ───────── Simple Location Pin Icon ───────── */
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#C4943A" strokeWidth="1.5">
      <path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" fill="#C4943A" stroke="none" />
    </svg>
  );
}

export default function InvitationCard() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 600], [0, 100]);
  const chandelierY = useTransform(scrollY, [0, 600], [0, 60]);
  const palaceY = useTransform(scrollY, [0, 600], [0, -30]);

  useEffect(() => {
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Indiana+Convention+Center+Jeppinamogaru+Mangaluru";

  return (
    <div className="absolute inset-0 z-10 w-full h-[100dvh] overflow-x-hidden overflow-y-auto scroll-smooth">
      <NoiseOverlay />
      <AnimatedBlobs />
{/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO                                      */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">

        {/* Background photo — palms + building, small and distant at the bottom */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ y: palaceY }}
        >
          <Image
            src="/background.webp"
            alt="Hero Background"
            fill
            className="object-cover object-[center_25%]"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,220,190,0.25) 0%, rgba(230,170,120,0.1) 45%, rgba(190,120,70,0.2) 100%)",
            }}
          />
        </motion.div>

        {/* Top Chandelier */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-[13] pointer-events-none w-52 h-52"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
          style={{ y: chandelierY }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{ y: [0, 10, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/chandelier.webp"
              alt=""
              fill
              className="object-contain"
              style={{ filter: "drop-shadow(0 15px 25px rgba(139,105,20,0.35))" }}
            />
          </motion.div>
        </motion.div>

        {/* Hero Text (Names Only - Increased Size) */}
        <motion.div
          className="relative z-20 flex flex-col items-center mt-[4vh]"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroTextY }}
        >
          <h1 className="font-script font-black text-[clamp(3.2rem,12vw,6rem)] leading-tight tracking-[0.08em] px-2" style={{ color: "#7A4D2A", textShadow: "0 4px 12px rgba(87,54,28,0.4), 0 0 24px rgba(255,248,238,0.4)" }}>
            Moideen
          </h1>
          <h1 className="font-script font-black text-[clamp(3.2rem,12vw,6rem)] leading-tight tracking-[0.08em] px-2 -mt-2" style={{ color: "#7A4D2A", textShadow: "0 4px 12px rgba(87,54,28,0.4), 0 0 24px rgba(255,248,238,0.4)" }}>
            Shahil
          </h1>

          <p className="font-script font-black text-[3.2rem] md:text-[3.8rem] my-0 opacity-95" style={{ color: "#7A4D2A", textShadow: "0 4px 12px rgba(87,54,28,0.4), 0 0 24px rgba(255,248,238,0.4)" }}>&</p>

          <h1 className="font-script font-black text-[clamp(3.2rem,12vw,6rem)] leading-tight tracking-[0.08em] px-2 -mt-1" style={{ color: "#7A4D2A", textShadow: "0 4px 12px rgba(87,54,28,0.4), 0 0 24px rgba(255,248,238,0.4)" }}>
            Mariyam
          </h1>
          <h1 className="font-script font-black text-[clamp(3.2rem,12vw,6rem)] leading-tight tracking-[0.08em] px-2 -mt-2" style={{ color: "#7A4D2A", textShadow: "0 4px 12px rgba(87,54,28,0.4), 0 0 24px rgba(255,248,238,0.4)" }}>
            Zaheema
          </h1>
        </motion.div>

        {/* Date & Venue */}
        <motion.div
          className="absolute bottom-24 z-20 flex flex-col items-center w-full px-6"
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroTextY }}
        >
          <p className="text-[18px] font-serif font-bold italic tracking-wide text-[#5A3A22] mt-0 mb-0" style={{ textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 0 12px rgba(255,248,238,0.7)" }}>
            Wednesday, 22nd July 2026
          </p>
          <p className="text-[16px] font-serif font-medium italic tracking-wide text-[#5A3A22] opacity-95 mt-1 mb-0" style={{ textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 0 12px rgba(255,248,238,0.7)" }}>
            Nikah at 11:00 AM &middot; Mangaluru
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-6 z-20 flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[14px] md:text-[16px] uppercase tracking-[0.5em] text-[#3a2718] font-black mb-3" style={{ textShadow: "0 1px 5px rgba(255,255,255,0.9)" }}>
           <b> Scroll down </b>
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="#8B5E3C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>

      </div>
     

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — INVITATION ARCH CARD                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full z-20 flex justify-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/background2.png"
            alt="Section 2 Background"
            fill
            className="object-fill"
          />
        </div>
        <div className="w-full h-full min-h-[800px] px-12 py-24 flex flex-col items-center justify-center text-center relative z-10 overflow-hidden">

          <motion.div variants={fadeUp}>
            <GeometricBorder className="w-48 h-5 mb-5 opacity-90" />
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-[30px] mb-1 text-[#8B6914] drop-shadow-sm">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </motion.p>
          <motion.p variants={fadeUp} className="text-[16px] font-serif italic mb-0 text-[#8B6914]">
            In the Name of Allah
          </motion.p>
          <motion.p variants={fadeUp} className="text-[16px] font-serif italic mb-5 text-[#8B6914]">
            The Most Gracious, The Most Merciful
          </motion.p>

          <motion.p variants={fadeUp} className="text-[22px] font-serif font-medium mb-4 text-[#5A4535] leading-snug">
           <b>Mr. Aboobakker Sadik</b> &amp;<br /> <b>Mrs. Thasneem Sadik</b>
          </motion.p>

          <motion.p variants={fadeUp} className="text-[17px] font-serif font-light leading-snug mb-5 max-w-[280px] text-[#6B5240]">
            By the Grace of Almighty Allah, with immense joy and gratitude, we cordially invite you and your family to grace the wedding of our beloved son
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[30px] md:text-[32px] font-bold tracking-wide md:tracking-widest mb-0 text-[#C4943A] whitespace-nowrap">
            MOIDEEN SHAHIL
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] font-serif italic mb-5 text-[#806654]">
            (Grandson of K. H. Mohideen &amp; Late Hussain Bajpe)
          </motion.p>

          <motion.p variants={fadeUp} className="font-script font-normal text-[42px] mb-4 text-[#C4943A]">
            with
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[28px] md:text-[30px] font-bold tracking-wide md:tracking-widest mb-0 text-[#C4943A] whitespace-nowrap">
            MARIYAM ZAHEEMA
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] font-serif italic mb-5 text-[#806654]">
            (D/O K. Shaffi Sullia)
          </motion.p>

          <motion.div variants={fadeUp} className="w-24 h-px mb-5 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center mb-4 gap-2 px-6 py-4"
          >
            <div className="flex items-center gap-2 text-[#5A4535]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
                <path d="M3.5 9.5h17" />
                <path d="M8 3.5v4" />
                <path d="M16 3.5v4" />
              </svg>
              <p className="text-[19px] md:text-[20px] font-serif font-bold mb-0 text-[#5A4535] whitespace-nowrap">
                Wednesday, 22nd July 2026
              </p>
            </div>
            <p className="text-[15px] font-serif italic mb-0 text-[#8B6914]">
              (8th Safar, 1448 H)
            </p>

            <div className="flex items-center gap-2 text-[#8B6914] mt-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 7v5l3 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <p className="text-[17px] md:text-[18px] font-serif font-bold mb-0 text-[#8B6914] whitespace-nowrap">
                Nikah: 11:00 AM
              </p>
            </div>
            <p className="text-[14px] font-serif italic mb-4 text-[#806654]">
              Followed by Lunch
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="w-24 h-px mb-5 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.p variants={fadeUp} className="text-[16px] font-serif font-medium mb-1 text-[#8B6914]">
            Venue: Indiana Convention Center
          </motion.p>
          <motion.p variants={fadeUp} className="text-[14px] font-serif italic mb-4 text-[#806654]">
            Jeppinamogaru, Mangaluru
          </motion.p>

          <motion.div variants={fadeUp} className="w-24 h-px mb-5 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.p variants={fadeUp} className="text-[17px] font-serif font-light leading-snug italic mb-5 max-w-[280px] text-[#6B5240]">
            <span className="font-medium not-italic block mb-2 text-[19px] text-[#8B6914]">
              In Sha Allah
            </span>
            Your esteemed presence and duas will be the greatest blessing to the bride and groom.
          </motion.p>

          <motion.p variants={fadeUp} className="text-[32px] font-script font-normal text-[#C4943A] mb-12">
            Dua is the Best Present
          </motion.p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTIONS 3 & 4 BACKGROUND WRAPPER                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative w-full z-20 flex justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/background3.png"
            alt="Sections 3 and 4 Background"
            fill
            className="object-fill"
          />
        </div>
        <div className="w-full h-full min-h-[800px] px-6 py-24 flex flex-col items-center justify-center relative z-10 overflow-hidden">

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — MINIMAL COUNTDOWN (matches reference)   */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col items-center mt-8 mb-12 z-20 px-6 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.h3 variants={fadeUp} className="font-script font-normal text-[44px] mb-6 text-[#C4943A] drop-shadow-sm text-center">
          The Celebration Begins
        </motion.h3>

        {/* Plain numbers directly on the page background — no pill, no border, no glow */}
        <motion.div variants={fadeUp} className="flex items-start justify-center gap-4 md:gap-6">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-serif text-[40px] md:text-[48px] leading-none tabular-nums text-[#8B6914] font-medium">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] mt-2 text-[#806654] font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — LOCATION (text-first, matches reference) */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col items-center mt-2 pb-14 px-6 z-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.h3 variants={fadeUp} className="font-script font-normal text-[40px] mb-1 text-[#C4943A] drop-shadow-sm text-center">
          Venue
        </motion.h3>

        {/* Location line — pin icon + name + city, plain text like the reference's "Lieu" section */}
        <motion.div variants={fadeUp} className="flex flex-col items-center mb-0">
          <PinIcon className="w-6 h-6 mb-0.5" />
          <p className="text-[17px] font-serif font-medium text-[#5A4535]">
            Indiana Convention Center
          </p>
          <p className="text-[13px] font-serif italic text-[#8B6914]">
            Jeppinamogaru, Mangaluru
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative w-full max-w-[400px] h-[265px] -mt-6 mb-1 pointer-events-none"
        >
          <Image
            src="/palace.webp"
            alt="Palace illustration"
            fill
            className="object-contain"
            priority={false}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="w-full max-w-[340px] aspect-square rounded-[32px] overflow-hidden relative z-20 bg-white"
          style={{
            border: "8px solid rgba(255,253,249,0.9)",
            boxShadow: "0 25px 50px -15px rgba(74,55,40,0.25)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3546747201633!2d74.8519!3d12.8361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b1b4b2a8d3b%3A0xc83a45c6cf5e3818!2sIndiana%20Convention%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "sepia(30%) hue-rotate(-15deg) saturate(90%) contrast(1.1)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] font-serif px-8 py-3.5 rounded-full transition-all hover:bg-[#F8EFE6] hover:text-[#3d2b1a]"
          style={{ border: "1px solid rgba(196,148,58,0.5)", color: "#8B6914", boxShadow: "0 0 15px rgba(196,148,58,0.15)" }}
        >
          Open in Maps
        </motion.a>

        {/* Bottom Floating Chandelier with Golden Shining Effect */}
        <motion.div
          variants={fadeUp}
          className="relative w-48 h-48 mt-2 pointer-events-none"
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C4943A] rounded-full blur-[40px] opacity-40 z-[-1]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="w-full h-full relative"
            animate={{ y: [0, -8, 0], rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/chandelier.png"
              alt=""
              fill
              className="object-contain opacity-90"
              style={{ filter: "drop-shadow(0 15px 25px rgba(196,148,58,0.5))" }}
            />
          </motion.div>
        </motion.div>

        {/* Closing line — matches reference's "Au plaisir de vous accueillir" */}
        <motion.p
          variants={fadeUp}
          className="font-script font-normal text-[40px] mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#D4A84B] to-[#8B6914] drop-shadow-sm text-center"
          style={{ backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
        >
          Looking forward to hosting you
        </motion.p>

        <motion.div variants={fadeUp}>
          <GeometricBorder className="w-32 h-4 mt-6 opacity-70" />
        </motion.div>
      </motion.div>

        </div>
      </div>
    </div>
  );
}