"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import InvitationCard from "./InvitationCard";

/* ───────── Transition Configs ───────── */
const sealIdleTransition = {
  scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" as const },
};

const sealLiftTransition = {
  duration: 1.2, // ⬅️ Slowed down from 0.8s so it matches the slower vibe
  ease: [0.22, 1, 0.36, 1] as const,
};

const flapTransition = {
  duration: 3.5, // ⬅️ Massively increased to 3.5s for a very slow, heavy peel
  ease: [0.25, 1, 0.5, 1] as const, 
};

const cardRevealTransition = {
  duration: 2.0, // ⬅️ Slower reveal (was 1.5)
  delay: 1.5, // ⬅️ Waits 1.5s for the flaps to get halfway open before revealing
  ease: [0.22, 1, 0.36, 1] as const,
};

const ENVELOPE_LIFETIME_MS = 5500; // ⬅️ Extended to 5.5s so the envelope stays alive during the long animation

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    window.setTimeout(() => setShowEnvelope(false), ENVELOPE_LIFETIME_MS);
    
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isOpen]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div
      className="relative w-full h-dvh select-none flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #FFFDFB 0%, #F5EBE4 50%, #E8DCCB 100%)",
      }}
    >
      {/* ── Subtle warm vignette overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(139,105,20,0.06) 100%)",
        }}
      />

      {/* ── Golden ambient glow at top ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,148,58,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════════ */}
      {/*  PALACE BACKDROP (Bottom)                */}
      {/* ════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={isOpen ? { opacity: 0.22, y: 0 } : { opacity: 0.08, y: 15 }}
        transition={{
          duration: 2.0, // ⬅️ Slowed backdrop reveal
          delay: isOpen ? 1.0 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative w-full h-[38vh]">
          <Image
            src="/palace.webp"
            alt="Palace backdrop"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-x-0 top-0 h-[55%]"
            style={{
              background: "linear-gradient(to bottom, #F5EBE4, transparent)",
            }}
          />
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[6]"
        style={{
          background:
            "linear-gradient(to top, rgba(196,148,58,0.05) 0%, transparent 100%)",
        }}
      />

      {/* ════════════════════════════════════════ */}
      {/*  INVITATION CONTENT                      */}
      {/* ════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="invitation-card"
            className="absolute inset-0 z-[20]"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={cardRevealTransition}
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════ */}
      {/*  ENVELOPE                                */}
      {/* ════════════════════════════════════════ */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            key="envelope"
            className="absolute inset-0 z-[25]"
            style={{
              pointerEvents: isOpen ? "none" : "auto",
              perspective: "1800px",
            }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.55 } }}
          >
            {/* Solid base rectangular card */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "#efe5d8" }}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              // ⬅️ Delayed so it waits for the 3.5s flaps to get out of the way
              transition={{ duration: 1.0, delay: isOpen ? 2.0 : 0 }} 
            />

            {/* Bottom Flap */}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-[54%] pointer-events-none origin-bottom"
              style={{ zIndex: 1, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.2 : 0 }}
            >
              <img
                src="/bottom-paper.webp"
                alt="Envelope bottom flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{ backfaceVisibility: "hidden" }}
              />
            </motion.div>

            {/* Left Flap */}
            <motion.div
              className="absolute left-0 top-0 w-[55%] h-full pointer-events-none origin-left"
              style={{ zIndex: 2, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateY: -180 } : { rotateY: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.2 : 0 }}
            >
              <img
                src="/right-paper.webp"
                alt="Envelope left flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(6px 4px 12px rgba(68,54,41,0.25))",
                }}
              />
            </motion.div>

            {/* Right Flap */}
            <motion.div
              className="absolute right-0 top-0 w-[55%] h-full pointer-events-none origin-right"
              style={{ zIndex: 3, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.25 : 0 }}
            >
              <img
                src="/left-paper.webp"
                alt="Envelope right flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(-6px 4px 12px rgba(68,54,41,0.25))",
                }}
              />
            </motion.div>

            {/* Top Flap */}
            <motion.div
              className="absolute left-0 top-0 w-full h-[44%] pointer-events-none origin-top"
              style={{ zIndex: 5, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.35 : 0 }}
            >
              <img
                src="/top-paper.webp"
                alt="Envelope top flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(0px 8px 16px rgba(68,54,41,0.3))",
                }}
              />
            </motion.div>

            {/* Seal */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ width: "280px", height: "300px" }}
              animate={
                isOpen
                  ? { y: -140, opacity: 0, scale: 1.05 }
                  : { y: 0, opacity: 1, scale: [1, 1.05, 1] }
              }
              transition={isOpen ? sealLiftTransition : sealIdleTransition}
            >
              <Image
                src="/seal.webp"
                alt="Golden wax seal"
                fill
                className="object-contain"
                priority
                sizes="280px"
                style={{ filter: "drop-shadow(0 12px 24px rgba(80,58,25,0.35))" }}
                draggable={false}
              />

              <motion.p
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[16px] uppercase tracking-[0.2em] font-serif text-[#C4943A]"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to open
              </motion.p>
            </motion.div>

            {/* Tap target */}
            {!isOpen && (
              <button
                type="button"
                onClick={handleOpen}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 outline-none border-none bg-transparent"
                style={{
                  width: "320px",
                  height: "350px",
                  touchAction: "manipulation",
                  WebkitTouchCallout: "none" as any,
                  WebkitUserSelect: "none" as any,
                  WebkitTapHighlightColor: "transparent" as any,
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                aria-label="Tap to open invitation"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-2 border border-[#C4943A]/[0.08] pointer-events-none z-[3]" />

      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <AnimatePresence>
        {isOpen && (
          <motion.button
            key="music-btn"
            type="button"
            onClick={toggleMusic}
            className="absolute bottom-5 right-5 z-[60] flex items-center justify-center rounded-full outline-none border-none"
            style={{
              width: "42px",
              height: "42px",
              background: "rgba(252,248,242,0.75)",
              border: "1px solid rgba(196,148,58,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: isPlaying
                ? ["0 0 0px rgba(196,148,58,0)", "0 0 14px rgba(196,148,58,0.45)", "0 0 0px rgba(196,148,58,0)"]
                : "0 2px 10px rgba(139,105,20,0.15)",
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              opacity: { delay: 1.5, duration: 0.5 },
              scale: { delay: 1.5, duration: 0.5 },
              boxShadow: isPlaying ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.3 },
            }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#C4943A">
                <rect x="5" y="3" width="4" height="18" rx="1.5" />
                <rect x="15" y="3" width="4" height="18" rx="1.5" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C4943A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="music-playing-indicator"
            className="absolute bottom-[82px] right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[#C4943A]/45 bg-[rgba(252,248,242,0.92)] text-[#C4943A] shadow-[0_6px_20px_rgba(139,105,20,0.14)]"
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <motion.span
                className="relative flex items-center justify-center"
                animate={{ y: [0, -2, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M14 3v10.15c-.57-.22-1.2-.35-1.86-.35-2.9 0-5.14 2-5.14 4.58S9.24 22 12.14 22c2.72 0 4.86-1.76 5.1-4.05l.01-.14V7.75l5.75-1.43V3.2L14 3zm-1.86 15.1c-1.62 0-2.94-1.03-2.94-2.32s1.32-2.32 2.94-2.32 2.94 1.03 2.94 2.32-1.32 2.32-2.94 2.32z" />
                </svg>
              </motion.span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}