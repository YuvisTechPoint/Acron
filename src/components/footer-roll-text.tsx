"use client";

import React, { useEffect, useState } from "react";

export function FooterClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(now);
      setTime(`CCU/KOL ${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      suppressHydrationWarning
      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-brass-300 tracking-wider"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brass-400 animate-pulse" />
      <span>{time ?? "CCU/KOL --:--:-- IST"}</span>
    </span>
  );
}

interface FooterRollTextProps {
  children: string;
  className?: string;
}

export function FooterRollText({ children, className = "" }: FooterRollTextProps) {
  return (
    <span className={`transition-colors duration-200 ${className}`}>
      {children}
    </span>
  );
}
