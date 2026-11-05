import React from "react";

interface ArchImageProps {
  label?: string;
  sublabel?: string;
  className?: string;
  aspect?: "portrait" | "standard" | "tall";
  glow?: boolean;
}

export function ArchImage({
  label = "Chambers of Acorn Legal",
  sublabel = "Kolkata, West Bengal",
  className = "",
  aspect = "tall",
  glow = false,
}: ArchImageProps) {
  const aspectHeights = {
    standard: "h-[380px] sm:h-[460px]",
    portrait: "h-[440px] sm:h-[540px]",
    tall: "h-[500px] sm:h-[620px]",
  };

  return (
    <div
      className={`relative w-full ${aspectHeights[aspect]} arch-mask bg-gradient-to-b from-navy-900 via-navy-800 to-ink-950 border border-brass-500/25 shadow-raised overflow-hidden group select-none ${className}`}
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#B08D57_1px,transparent_1px),linear-gradient(to_bottom,#B08D57_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Radial brass glow */}
      {glow && (
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brass-500/20 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Architectural Arch Linework Inner Ring */}
      <div className="absolute inset-4 rounded-t-full border border-brass-500/20 pointer-events-none flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-t-full border border-brass-500/15" />
      </div>

      {/* Center Oak Motif Emblem */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="w-16 h-16 rounded-full bg-navy-800/80 border border-brass-500/40 flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-brass-300"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Elegant Acorn & Oak Leaf geometry */}
            <path d="M24 8 C28 14 36 18 36 26 C36 34 30 38 24 38 C18 38 12 34 12 26 C12 18 20 14 24 8 Z" />
            <path d="M24 14 L24 34" />
            <path d="M24 22 L30 18" />
            <path d="M24 28 L18 24" />
            <circle cx="24" cy="42" r="2" />
          </svg>
        </div>

        <span className="font-serif text-lg sm:text-xl font-medium text-ivory-50 tracking-wide">
          {label}
        </span>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-300 mt-1">
          {sublabel}
        </span>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent pointer-events-none" />
    </div>
  );
}
