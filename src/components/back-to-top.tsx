"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-[136px] right-4 sm:bottom-[154px] sm:right-6 z-30 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/95 text-navy-800 border border-stone-200 shadow-md hover:bg-stone-50 transition active:scale-95 flex items-center justify-center cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 text-brass-600" />
    </button>
  );
}

