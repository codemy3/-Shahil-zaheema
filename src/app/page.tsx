import Envelope from "@/components/Envelope";

export default function Home() {
  return (
    <div
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, #f7ece2 0%, #decab8 100%)",
      }}
    >
      {/* ── Ambient background blur elements for desktop ── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-3xl hidden sm:block">
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-[#C4943A]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#E8C882]" />
      </div>

      {/* ── Mobile viewport frame on desktop / Full screen on mobile ── */}
      <main
        className="relative w-full h-dvh overflow-hidden bg-background
          sm:w-[412px] sm:h-[892px] sm:max-h-[92vh] 
          sm:rounded-[40px] sm:border-[10px] sm:border-neutral-900 
          sm:shadow-[0_32px_96px_rgba(68,54,41,0.28)]"
      >
        {/* Dynamic Mobile Notch / Dynamic Island indicator for mock layout */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900 rounded-full z-[999] pointer-events-none hidden sm:block" />
        
        {/* Speaker slot mock */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-800 rounded-full z-[999] pointer-events-none hidden sm:block" />

        <Envelope />
      </main>
    </div>
  );
}