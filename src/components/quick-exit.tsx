"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ExternalLink, Shield } from "lucide-react";

export function QuickExit() {
  const pathname = usePathname();
  const isPoshRoute = pathname.startsWith("/posh");

  const triggerQuickExit = () => {
    // Replace current browser history entry with a neutral weather search
    window.location.replace("https://www.google.com/search?q=kolkata+weather+forecast");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerQuickExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Show persistently on POSH complainant and inquiry routes
  if (!isPoshRoute) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={triggerQuickExit}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-medium rounded-full shadow-card border border-navy-700 transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none"
        title="Leave this site immediately and replace browser history (Shortcut: ESC)"
        aria-label="Quick exit to neutral search"
      >
        <Shield className="w-3.5 h-3.5 text-brass-300" />
        <span>Quick Exit (Esc)</span>
        <ExternalLink className="w-3 h-3 text-brass-300 opacity-80" />
      </button>
    </div>
  );
}
