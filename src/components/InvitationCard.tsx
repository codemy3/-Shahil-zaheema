"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const targetDate = new Date("July 22, 2026 11:00:00").getTime();

/* ───────── Shared motion variants ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ───────── Signature motif: hand-drawn geometric border ───────── */
function GeometricBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 20" className={className} preserveAspectRatio="xMidYMid meet" fill="none">
      {Array.from({ length: 10 }).map((_, i) => {
        const cx = 16 + i * 32;
        return (
          <g key={i} stroke="var(--gold-rich)" strokeWidth="1">
            <path d={`M${cx} 2 L${cx + 8} 10 L${cx} 18 L${cx - 8} 10 Z`} />
            <circle cx={cx} cy="10" r="1.4" fill="var(--gold-rich)" stroke="none" />
          </g>
        );
      })}
    </svg>
  );
}

/* ───────── Scroll cue ───────── */
function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
    >
      <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "var(--gold-rich)" }}>
        Scroll
      </span>
      <motion.svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
      >
        <path d="M1 1 L7 7 L13 1" stroke="var(--gold-rich)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 8 L7 14 L13 8" stroke="var(--gold-rich)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </motion.svg>
    </motion.div>
  );
}

export default function InvitationCard() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Indiana+Convention+Center+Jeppinamogaru+Mangaluru";

  return (
    <div
      className="absolute inset-0 z-[10] overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ background: "var(--cream)" }}
    >
      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO: clean illustrated backdrop (curtain +  */}
      {/*  chandelier), matching the reference exactly. The venue   */}
      {/*  photograph gets its own moment later, in the Location    */}
      {/*  section — mixing a real photo behind flat illustration   */}
      {/*  here was what caused the smudgy "blob" look.             */}
      {/* ══════════════════════════════════════════════════════ */}
      <div
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at 50% 0%, var(--cream-warm) 0%, var(--cream) 55%, var(--gold-pale) 100%)",
        }}
      >
        {/* Theatrical curtain framing */}
        <motion.div
          className="absolute top-0 inset-x-0 h-[58vh] pointer-events-none z-[2]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image src="/curtain.png" alt="" fill className="object-cover object-top" />
        </motion.div>

        {/* Chandelier — plain object-contain + soft drop-shadow, no mask trick */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-[3] pointer-events-none w-[200px] h-[200px] chandelier-float"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/chandelier.png"
            alt=""
            fill
            className="object-contain"
            style={{ filter: "drop-shadow(0 10px 18px rgba(139,105,20,0.25))" }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] font-serif mb-5" style={{ color: "var(--gold-rich)" }}>
            Together with their families
          </p>

          {/* Names: solid deep-gold fill first (guarantees legibility on
              any background), shimmer layered on top as a highlight —
              never the only source of color. */}
          <h1
            className="font-script text-[clamp(2.8rem,10vw,4.5rem)] leading-none shimmer-text mb-1"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
          >
            Moideen Shahil
          </h1>
          <p className="font-script text-[clamp(1.5rem,5vw,2rem)] my-1" style={{ color: "var(--gold-deep)" }}>
            &amp;
          </p>
          <h1
            className="font-script text-[clamp(2.8rem,10vw,4.5rem)] leading-none shimmer-text mt-1 mb-7"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
          >
            Mariyam Zaheema
          </h1>

          <div className="w-10 h-px mb-5" style={{ background: "rgba(139,105,20,0.35)" }} />

          <p className="text-[13px] uppercase tracking-[0.2em] font-serif font-medium" style={{ color: "var(--gold-deep)" }}>
            Wednesday, 22nd July 2026
          </p>
          <p className="text-[11px] tracking-[0.15em] font-serif italic mt-1.5" style={{ color: "var(--brown-soft)" }}>
            Nikah at 11:00 AM &middot; Mangaluru
          </p>
        </motion.div>

        <ScrollCue />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — Detailed Invitation inside Arch             */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative mx-6 mt-16 mb-20 p-[2px] rounded-t-[140px] rounded-b-[20px] z-10"
        style={{
          background: "linear-gradient(135deg, rgba(196,148,58,0.55), rgba(232,200,130,0.15), rgba(196,148,58,0.55))",
          boxShadow: "0 30px 60px -20px rgba(139,105,20,0.25)",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full h-full rounded-t-[140px] rounded-b-[20px] px-8 pt-14 pb-12 flex flex-col items-center text-center"
          style={{
            background: "linear-gradient(180deg, #fffdf9 0%, var(--cream-warm) 100%)",
            boxShadow: "inset 0 0 60px rgba(196,148,58,0.1)",
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <GeometricBorder className="w-40 h-4 mb-8 opacity-80" />
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-[22px] mb-2" style={{ color: "var(--gold-deep)" }}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-1" style={{ color: "var(--gold-deep)" }}>
            In the Name of Allah
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-10" style={{ color: "var(--gold-deep)" }}>
            The Most Gracious, The Most Merciful
          </motion.p>

          <motion.p variants={fadeUp} className="text-[16px] font-serif font-medium mb-8" style={{ color: "var(--brown-medium)" }}>
            Mr. Aboobakker Sadik &amp;<br />Mrs. Thasneem Sadik
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-[13px] font-serif font-light leading-relaxed mb-10 max-w-[280px]"
            style={{ color: "var(--brown-medium)" }}
          >
            By the Grace of Almighty Allah, with immense joy and gratitude, we cordially invite you and your family to grace the wedding of our beloved son
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[26px] tracking-widest mb-2" style={{ color: "var(--gold-rich)" }}>
            MOIDEEN SHAHIL
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[11px] font-serif italic mb-8 max-w-[220px]" style={{ color: "var(--brown-soft)" }}>
            (Grandson of K. H. Mohideen &amp; Late Hussain Bajpe)
          </motion.p>

          <motion.p variants={fadeUp} className="font-script text-[32px] mb-8" style={{ color: "var(--gold-rich)" }}>
            with
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-[26px] tracking-widest mb-2" style={{ color: "var(--gold-rich)" }}>
            MARIYAM ZAHEEMA
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[11px] font-serif italic mb-10" style={{ color: "var(--brown-soft)" }}>
            (D/O K. Shaffi Sullia)
          </motion.p>

          <motion.div variants={fadeUp} className="gold-divider w-24 mb-10" />

          <motion.p variants={fadeUp} className="text-[14px] font-serif font-medium mb-1" style={{ color: "var(--brown-medium)" }}>
            Wednesday, 22nd July 2026
          </motion.p>
          <motion.p variants={fadeUp} className="text-[11px] font-serif italic mb-6" style={{ color: "var(--brown-soft)" }}>
            (8th Safar, 1448 H)
          </motion.p>

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-medium mb-1" style={{ color: "var(--gold-deep)" }}>
            Nikah: 11:00 AM
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-8" style={{ color: "var(--brown-soft)" }}>
            Followed by Lunch
          </motion.p>

          <motion.div variants={fadeUp} className="gold-divider w-24 mb-8" />

          <motion.p variants={fadeUp} className="text-[13px] font-serif font-medium mb-1" style={{ color: "var(--gold-deep)" }}>
            Venue: Indiana Convention Center
          </motion.p>
          <motion.p variants={fadeUp} className="text-[12px] font-serif italic mb-10" style={{ color: "var(--brown-soft)" }}>
            Jeppinamogaru, Mangaluru
          </motion.p>

          <motion.div variants={fadeUp} className="gold-divider w-24 mb-10" />

          <motion.p
            variants={fadeUp}
            className="text-[13px] font-serif font-light leading-relaxed italic mb-8 max-w-[280px]"
            style={{ color: "var(--brown-medium)" }}
          >
            <span className="font-medium not-italic block mb-4" style={{ color: "var(--gold-deep)" }}>
              In Sha Allah
            </span>
            Your esteemed presence and duas will be the greatest blessing to the bride and groom.
          </motion.p>

          <motion.p variants={fadeUp} className="text-[16px] font-script" style={{ color: "var(--gold-rich)" }}>
            Dua is the Best Present
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — Countdown                                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col items-center my-24 z-10 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <h3 className="font-script text-[36px] shimmer-text mb-10">La Célébration Commence</h3>

        <div className="flex items-center gap-3">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center w-[66px] h-[76px] rounded-2xl"
              style={{
                background: "linear-gradient(160deg, var(--gold-pale), var(--cream-warm))",
                border: "1px solid rgba(196,148,58,0.35)",
                boxShadow: "0 10px 24px -8px rgba(139,105,20,0.25)",
              }}
            >
              <span className="font-serif text-[28px] leading-none tabular-nums" style={{ color: "var(--gold-deep)" }}>
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[8px] uppercase tracking-[0.15em] mt-1.5" style={{ color: "var(--brown-soft)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — Location: venue photo, address, live map    */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col items-center mt-20 mb-32 px-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <h3 className="font-script text-[36px] shimmer-text mb-6">Lieu</h3>

        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold-rich)" strokeWidth="1.5" className="mb-6">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>

        {/* Venue photograph card — same image, different frame,
            so the palace actually gets its "arrival" moment here too */}
        <div
          className="w-full max-w-[340px] aspect-[4/3] rounded-[28px] overflow-hidden relative mb-8"
          style={{ boxShadow: "0 30px 50px -20px rgba(61,43,26,0.4)", border: "1px solid rgba(232,200,130,0.4)" }}
        >
          <Image src="/palace.png" alt="Indiana Convention Center" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 45%, rgba(61,43,26,0.65) 100%)" }}
          />
          <p className="absolute bottom-4 left-0 right-0 text-center font-script text-[26px] text-white">
            Indiana Convention Center
          </p>
        </div>

        <p className="text-[13px] font-serif font-light mb-8 text-center" style={{ color: "var(--brown-soft)" }}>
          Jeppinamogaru, Mangaluru
        </p>

        <div
          className="w-full max-w-[340px] aspect-square rounded-[32px] overflow-hidden relative z-20 bg-white"
          style={{ border: "4px solid rgba(232,200,130,0.3)", boxShadow: "0 25px 45px -15px rgba(61,43,26,0.35)" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3546747201633!2d74.8519!3d12.8361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b1b4b2a8d3b%3A0xc83a45c6cf5e3818!2sIndiana%20Convention%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-serif px-6 py-3 rounded-full transition-colors"
          style={{ border: "1px solid rgba(196,148,58,0.4)", color: "var(--gold-deep)" }}
        >
          Get Directions
        </a>

        <p className="font-script text-[32px] shimmer-text mt-14">Au plaisir de vous accueillir</p>
        <div className="gold-divider w-24 mt-6" />
      </motion.div>
    </div>
  );
}