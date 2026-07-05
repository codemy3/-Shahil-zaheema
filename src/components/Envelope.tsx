"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import InvitationCard from "./InvitationCard";

/* ───────── Transition Configs (matched to reference video, frame-by-frame) ─────────
   Reference timeline:
   0.00s        idle, seal breathing
   tap (0.00s)  seal lifts + fades (~0.45s)
   +0.15s       flaps peel back fast (~0.35-0.4s), top flap slightly after sides
   +0.45s       card reveal circle-wipe starts, overlapping the tail of the peel
   ~0.95s       envelope fully gone
*/

const sealIdleTransition = {
  scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" as const },
};

const sealLiftTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const flapTransition = {
  duration: 1.2, // Significantly slowed down for a smoother, premium feel
  ease: [0.25, 1, 0.5, 1] as const, // Elegant decelerating curve
};

const cardRevealTransition = {
  duration: 1.2,
  delay: 0.4, // Starts as the flaps are actively opening
  ease: [0.22, 1, 0.36, 1] as const,
};

const ENVELOPE_LIFETIME_MS = 2000; // extended lifetime to match the slower animations

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    window.setTimeout(() => setShowEnvelope(false), ENVELOPE_LIFETIME_MS);
    // Start music on user interaction (required for mobile autoplay policy)
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
      {/*  PALACE BACKDROP (Bottom)               */}
      {/* ════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={isOpen ? { opacity: 0.22, y: 0 } : { opacity: 0.08, y: 15 }}
        transition={{
          duration: 1.4,
          delay: isOpen ? 0.6 : 0,
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
      {/*  INVITATION CONTENT                     */}
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
      {/*  ENVELOPE                               */}
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
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.55 } }}
          >
            {/* Solid base rectangular card */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "#efe5d8" }}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3, delay: isOpen ? 0.5 : 0 }}
            />

            {/* Bottom Flap — peels back on its bottom hinge */}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-[54%] pointer-events-none origin-bottom"
              style={{ zIndex: 1, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.15 : 0 }}
            >
              <img
                src="/bottom-paper.png"
                alt="Envelope bottom flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{ backfaceVisibility: "hidden" }}
              />
            </motion.div>

            {/* Left Flap — peels back on its left hinge */}
            <motion.div
              className="absolute left-0 top-0 w-[55%] h-full pointer-events-none origin-left"
              style={{ zIndex: 2, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateY: -180 } : { rotateY: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.15 : 0 }}
            >
              <img
                src="/right-paper.png"
                alt="Envelope left flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(6px 4px 12px rgba(68,54,41,0.25))",
                }}
              />
            </motion.div>

            {/* Right Flap — mirror of left */}
            <motion.div
              className="absolute right-0 top-0 w-[55%] h-full pointer-events-none origin-right"
              style={{ zIndex: 3, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.18 : 0 }}
            >
              <img
                src="/left-paper.png"
                alt="Envelope right flap"
                className="w-full h-full object-fill"
                draggable={false}
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(-6px 4px 12px rgba(68,54,41,0.25))",
                }}
              />
            </motion.div>

            {/* Top Flap — opens last, was on top, folds back the furthest */}
            <motion.div
              className="absolute left-0 top-0 w-full h-[44%] pointer-events-none origin-top"
              style={{ zIndex: 5, transformStyle: "preserve-3d" }}
              animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ ...flapTransition, delay: isOpen ? 0.22 : 0 }}
            >
              <img
                src="/top-paper.png"
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
              {/* Small subtle orbiting ring to hint at interactivity */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[rgba(196,148,58,0.3)] pointer-events-none"
                style={{ scale: 1.15 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              <Image
                src="/seal.png"
                alt="Golden wax seal"
                fill
                className="object-contain"
                priority
                sizes="280px"
                style={{ filter: "drop-shadow(0 12px 24px rgba(80,58,25,0.35))" }}
                draggable={false}
              />

              {/* Tap to open text positioned right below the seal */}
              <motion.p
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] uppercase tracking-[0.2em] font-serif text-[#9B8A70]"
                animate={{ opacity: [0.5, 1, 0.5] }}
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

      <audio ref={audioRef} src="/reference.mp4" loop preload="auto" />

      <AnimatePresence>
        {isOpen && (
          <motion.button
            key="music-btn"
            type="button"
            onClick={toggleMusic}
            className="absolute top-5 right-5 z-[60] flex items-center justify-center rounded-full outline-none border-none"
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
              opacity: { delay: 1.2, duration: 0.5 },
              scale: { delay: 1.2, duration: 0.5 },
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
    </div>
  );
}