import React from "react";

export function WaxSeal() {
  return (
    <div className="relative flex h-[102px] w-[102px] items-center justify-center">
      <img
        src="/seal.png"
        alt="Wax seal"
        className="relative h-[92px] w-[92px] rounded-full object-cover drop-shadow-[0_6px_10px_rgba(86,62,24,0.24)]"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-[6px] rounded-full border border-white/20" />
    </div>
  );
}