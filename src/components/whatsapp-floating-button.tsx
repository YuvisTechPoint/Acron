"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/lib/constants";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const safePath = typeof pathname === "string" ? pathname : "";

  // Hide on admin or internal console routes
  const isAdminOrConsole =
    safePath.startsWith("/admin") ||
    safePath.startsWith("/posh/admin") ||
    safePath.startsWith("/posh/ic") ||
    safePath.startsWith("/posh/org");

  if (isAdminOrConsole) {
    return null;
  }

  const rawPhone = BRAND_CONFIG.whatsapp || BRAND_CONFIG.phone || "918286936899";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Acorn Legal Consultants, I would like to request a consultation regarding legal advisory / POSH compliance."
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct Chambers WhatsApp Consultation Hotline"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-13 h-13 w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl active:scale-95 transition-all duration-200 border border-emerald-400/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group"
    >
      <svg
        className="w-7 h-7 fill-current drop-shadow-xs group-hover:scale-105 transition-transform"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.771.82 2.791.82 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm3.393 8.163c-.144.405-.837.774-1.17.822-.312.043-.679.064-2.128-.535-1.748-.724-2.881-2.484-2.969-2.6-.088-.115-.708-.941-.708-1.796 0-.855.449-1.277.608-1.452.16-.176.349-.22.466-.22.116 0 .232.001.334.006.107.005.25.04.391.381.144.351.492 1.203.535 1.29.043.088.072.19.014.306-.058.115-.088.19-.174.29-.088.102-.185.228-.264.306-.088.088-.18.184-.078.36.102.176.452.746.969 1.207.666.594 1.228.777 1.404.865.176.088.278.073.38-.044.102-.116.437-.508.553-.683.117-.175.233-.146.392-.088.16.059 1.016.48 1.191.567.175.088.291.131.334.204.043.073.043.424-.101.829zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.638 0-3.167-.478-4.464-1.3l-.32-.202-3.313.869.884-3.23-.223-.355A8.156 8.156 0 013.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
      </svg>
      {/* Tooltip on larger screens */}
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-navy-950 text-white text-[11px] font-medium tracking-wide shadow-lg border border-brass-500/30 opacity-0 group-hover:opacity-100 transition whitespace-nowrap hidden sm:block">
        WhatsApp Chambers Desk
      </span>
    </a>
  );
}
