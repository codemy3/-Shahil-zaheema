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
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
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
        className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 bg-[#E8C882]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[-20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 bg-[#D4A84B]"
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
    <div 
      className="absolute inset-0 z-10 w-full h-[100dvh] overflow-x-hidden overflow-y-auto scroll-smooth"
      style={{
        background: "radial-gradient(ellipse 120% 100% at 50% 0%, #FFF8EE 0%, #F5E8D8 55%, #EAD0B3 100%)"
      }}
    >
      <NoiseOverlay />
      <AnimatedBlobs />

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO                                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        
        {/* Seamless Palace Silhouette Backdrop */}
        <motion.div 
          className="absolute bottom-0 inset-x-0 h-[45vh] pointer-events-none z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          style={{ y: palaceY }}
        >
          <Image
            src="/palace.png"
            alt=""
            fill
            className="object-cover object-bottom opacity-[0.35] mix-blend-multiply"
            style={{ 
              filter: "sepia(90%) hue-rotate(-15deg) saturate(180%) contrast(1.1)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EAD0B3]/50 to-transparent pointer-events-none" />
        </motion.div>

        {/* Curtains */}
        <motion.div
          className="absolute top-0 inset-x-0 h-[65vh] pointer-events-none z-[12]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/curtain.png" alt="" fill className="object-cover object-top" priority />
        </motion.div>

        {/* Top Chandelier (Parallax + Infinite Sway) */}
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
              src="/chandelier.png"
              alt=""
              fill
              className="object-contain"
              style={{ filter: "drop-shadow(0 15px 25px rgba(139,105,20,0.35))" }}
            />
          </motion.div>
        </motion.div>

        {/* Hero Text Content */}
        <motion.div
          className="relative z-20 flex flex-col items-center mt-[8vh]"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroTextY }}
        >
          {/* ── NEW: Dedicated Breathing Blob & Grain Behind Names ── */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-full blur-[60px] opacity-40 bg-[#D4A84B] pointer-events-none z-[-1]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-[-20%] pointer-events-none z-[-1] opacity-[0.08] mix-blend-overlay"
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
          />

          <h1 className="font-script font-normal shimmer-text-slow text-[clamp(2.5rem,9vw,4.5rem)] leading-none text-[#6B4C2F] drop-shadow-md opacity-95">
            Moideen
          </h1>
          <h1 className="font-script font-normal shimmer-text-slow text-[clamp(2.5rem,9vw,4.5rem)] leading-none text-[#6B4C2F] drop-shadow-md opacity-95 -mt-2">
            Shahil
          </h1>
          
          <p className="font-script font-normal text-2xl md:text-3xl my-2 text-[#B08639] opacity-90">
            &amp;
          </p>
          
          <h1 className="font-script font-normal shimmer-text-slow text-[clamp(2.5rem,9vw,4.5rem)] leading-none text-[#6B4C2F] drop-shadow-md opacity-95">
            Mariyam
          </h1>
          <h1 className="font-script font-normal shimmer-text-slow text-[clamp(2.5rem,9vw,4.5rem)] leading-none mb-6 text-[#6B4C2F] drop-shadow-md opacity-95 -mt-2">
            Zaheema
          </h1>

        {/* Frosted Glass Pill for Date & Location ensuring 100% readability */}
          <motion.div 
            className="flex flex-col items-center px-6 py-3 rounded-full bg-[#FFFDF9]/60 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(139,105,20,0.15)] relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Animated shimmer passing through the pill */}
            <motion.div 
              className="absolute inset-0 z-[-1] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                width: "50%",
              }}
              animate={{ x: ["-200%", "300%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 1 }}
            />
            
            <p className="text-[10px] uppercase tracking-[0.25em] font-serif font-bold text-[#8B6914] mb-1">
              Wednesday, 22nd July 2026
            </p>
            <div className="w-10 h-px mb-1 animated-divider" />
            <p className="text-[10px] tracking-[0.1em] font-serif italic text-[#5A4535] font-semibold">
              Nikah at 11:00 AM &middot; Mangaluru
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <path d="M1 1 L7 7 L13 1" stroke="#C4943A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8 L7 14 L13 8" stroke="#C4943A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </motion.svg>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — INVITATION ARCH CARD                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative mx-5 mt-10 mb-14 p-[2px] rounded-t-[160px] rounded-b-[24px] z-20"
        style={{
          background: "linear-gradient(135deg, rgba(196,148,58,0.7), rgba(255,255,255,0.4), rgba(196,148,58,0.7))",
          boxShadow: "0 30px 60px -15px rgba(74,55,40,0.15)",
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="w-full h-full rounded-t-[160px] rounded-b-[24px] px-8 pt-16 pb-12 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] to-[#F8EFE6] shadow-[inset_0_0_60px_rgba(196,148,58,0.05)] relative overflow-hidden">
          
          <motion.div variants={fadeUp}>
            <GeometricBorder className="w-48 h-5 mb-8 opacity-90" />
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-[24px] mb-2 text-[#8B6914] drop-shadow-sm">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-1 text-[#8B6914]">
            In the Name of Allah
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-10 text-[#8B6914]">
            The Most Gracious, The Most Merciful
          </motion.p>

          <motion.p variants={fadeUp} className="text-[16px] font-serif font-medium mb-6 text-[#5A4535] leading-relaxed">
            Mr. Aboobakker Sadik &amp;<br />Mrs. Thasneem Sadik
          </motion.p>

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-light leading-loose mb-10 max-w-[280px] text-[#6B5240]">
            By the Grace of Almighty Allah, with immense joy and gratitude, we cordially invite you and your family to grace the wedding of our beloved son
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[24px] tracking-widest mb-1 text-[#C4943A]">
            MOIDEEN SHAHIL
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[11px] font-serif italic mb-8 text-[#806654]">
            (Grandson of K. H. Mohideen &amp; Late Hussain Bajpe)
          </motion.p>

          <motion.p variants={fadeUp} className="font-script font-normal text-[34px] mb-8 text-[#C4943A]">
            with
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[24px] tracking-widest mb-1 text-[#C4943A]">
            MARIYAM ZAHEEMA
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[11px] font-serif italic mb-10 text-[#806654]">
            (D/O K. Shaffi Sullia)
          </motion.p>

          <motion.div variants={fadeUp} className="w-24 h-px mb-8 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.p variants={fadeUp} className="text-[14px] font-serif font-medium mb-2 text-[#5A4535]">
            Wednesday, 22nd July 2026
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-6 text-[#8B6914]">
            (8th Safar, 1448 H)
          </motion.p>

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-medium mb-2 text-[#8B6914]">
            Nikah: 11:00 AM
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-8 text-[#806654]">
            Followed by Lunch
          </motion.p>

          <motion.div variants={fadeUp} className="w-24 h-px mb-8 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-medium mb-2 text-[#8B6914]">
            Venue: Indiana Convention Center
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-10 text-[#806654]">
            Jeppinamogaru, Mangaluru
          </motion.p>

          <motion.div variants={fadeUp} className="w-24 h-px mb-8 bg-gradient-to-r from-transparent via-[#C4943A] to-transparent opacity-60" />

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-light leading-loose italic mb-8 max-w-[280px] text-[#6B5240]">
            <span className="font-medium not-italic block mb-3 text-[15px] text-[#8B6914]">
              In Sha Allah
            </span>
            Your esteemed presence and duas will be the greatest blessing to the bride and groom.
          </motion.p>

          <motion.p variants={fadeUp} className="text-[26px] font-script font-normal text-[#C4943A]">
            Dua is the Best Present
          </motion.p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — REDESIGNED GLOWING COUNTDOWN            */}
      {/* ══════════════════════════════════════════════════════ */}
      {/* Reduced margins drastically */}
      <motion.div
        className="relative flex flex-col items-center mt-12 mb-16 z-20 px-6 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.h3 variants={fadeUp} className="font-script font-normal text-[38px] mb-8 text-[#C4943A] drop-shadow-sm text-center">
          The Countdown Begins
        </motion.h3>

        <motion.div 
          variants={fadeUp} 
          className="flex items-center justify-center w-full max-w-sm relative"
        >
          {/* Subtle animated glowing aura behind the countdown */}
          <motion.div 
            className="absolute inset-0 bg-[#C4943A] rounded-full blur-xl opacity-30"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Premium Glowing Pill Design */}
          <div className="flex w-full justify-evenly items-center bg-[#FFFDF9]/70 backdrop-blur-xl px-4 py-5 rounded-full border border-[rgba(196,148,58,0.5)] shadow-[0_0_30px_rgba(196,148,58,0.25)] relative z-10">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Mins" },
              { value: timeLeft.seconds, label: "Secs" },
            ].map((item, idx) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center justify-center w-14">
                  {/* Highlighted glowing numbers */}
                  <span 
                    className="font-serif text-[32px] leading-none tabular-nums text-[#C4943A] font-medium tracking-wide"
                    style={{ textShadow: "0 0 12px rgba(196,148,58,0.5)" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] mt-2 text-[#806654] font-bold">
                    {item.label}
                  </span>
                </div>
                
                {/* Delicate separating lines */}
                {idx !== 3 && (
                  <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[rgba(196,148,58,0.6)] to-transparent" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — LOCATION & MAP                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col items-center mt-12 pb-24 px-6 z-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.h3 variants={fadeUp} className="font-script font-normal text-[38px] mb-8 text-[#C4943A] drop-shadow-sm text-center">
          Get Directions
        </motion.h3>

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
          className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-serif px-8 py-3.5 rounded-full transition-all hover:bg-[#F8EFE6] hover:text-[#3d2b1a]"
          style={{ border: "1px solid rgba(196,148,58,0.5)", color: "#8B6914", boxShadow: "0 0 15px rgba(196,148,58,0.15)" }}
        >
          Open in Maps
        </motion.a>

        {/* ── NEW: Bottom Floating Chandelier with Golden Shining Effect ── */}
        <motion.div 
          variants={fadeUp}
          className="relative w-48 h-48 mt-10 pointer-events-none"
        >
          {/* Pulsing Golden Aura behind Chandelier */}
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

        {/* Shimmering Text for an eye-catching finish */}
        <motion.p 
          variants={fadeUp} 
          className="font-script font-normal text-[36px] mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#D4A84B] to-[#8B6914] drop-shadow-sm text-center"
          style={{ backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
        >
          Looking forward to hosting you
        </motion.p>
        
        <motion.div variants={fadeUp}>
          <GeometricBorder className="w-32 h-4 mt-6 opacity-70" />
        </motion.div>
      </motion.div>
    </div>
  );
}