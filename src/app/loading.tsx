import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading statutory content"
      className="bg-ivory-50 min-h-[60vh] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <div className="w-12 h-12 rounded-lg bg-navy-950 border border-brass-500/30 flex items-center justify-center shadow-sm mb-4">
        <span className="font-serif font-bold text-xl text-brass-300">A</span>
      </div>
      <div className="h-1 w-32 bg-stone-200 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-brass-500 rounded-full w-1/2 animate-pulse" />
      </div>
      <p className="font-serif text-sm text-stone-600 tracking-wide">
        Loading Acorn Chambers...
      </p>
    </div>
  );
}
