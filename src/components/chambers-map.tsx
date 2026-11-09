"use client";

import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Layers,
  Copy,
  Check,
} from "lucide-react";

interface ChambersMapProps {
  className?: string;
  defaultMode?: "blueprint" | "live";
}

export function ChambersMap({
  className = "",
  defaultMode = "live",
}: ChambersMapProps) {
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const [copied, setCopied] = useState(false);

  // Precise coordinates for 25 Camac Street, Park Street District, Kolkata
  const latitude = 22.5497;
  const longitude = 88.3533;
  const fullAddress =
    "Suite 4B, Camac Court, 25 Camac Street, Park Street District, Kolkata, West Bengal 700016";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Camac Court, 25 Camac Street, Park Street area, Kolkata, West Bengal 700016",
  )}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Real-time synced Google Maps embed with satellite/standard parameter toggle
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    "Camac Court, 25 Camac Street, Kolkata, West Bengal 700016"
  )}&t=${mapType === "satellite" ? "k" : "m"}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-card border border-border p-5 sm:p-7 md:p-8 shadow-card space-y-4 sm:space-y-5 ${className}`}
    >
      {/* Header matching exact user design specification */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
          <span className="font-sans text-[11px] sm:text-xs uppercase font-bold text-brass-700 tracking-[0.16em]">
            CHAMBERS GEOGRAPHY
          </span>
        </div>
        <span className="font-sans text-xs text-ink-muted">
          Camac Street &bull; Kolkata
        </span>
      </div>

      {/* Interactive Map Canvas Container (Fully Mobile Responsive) */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-card bg-stone-100 border border-border overflow-hidden shadow-inner group">
        {/* Live Interactive Synchronized Google Map iframe */}
        <iframe
          title="Acorn Legal Consultants Chambers Geography Realtime Sync"
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full relative z-10"
        />

        {/* Floating Controls Overlay (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          {/* Map Layer Switcher (Standard / Satellite) */}
          <button
            type="button"
            onClick={() =>
              setMapType((prev) => (prev === "standard" ? "satellite" : "standard"))
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn text-[11px] font-semibold tracking-wide bg-navy-900/90 hover:bg-navy-800 text-ivory-50 border border-brass-500/40 backdrop-blur-md shadow-md transition"
            title="Toggle between Street Map and Satellite View"
            aria-label="Toggle map view mode"
          >
            <Layers className="w-3.5 h-3.5 text-brass-400" />
            <span className="capitalize">{mapType}</span>
          </button>
        </div>

        {/* Location Badge Overlay (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-btn text-[11px] font-medium bg-navy-950/90 text-slate-200 border border-navy-800 backdrop-blur-md shadow-sm pointer-events-auto flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brass-400" />
            <span className="text-white font-semibold">Camac Court</span>
            <span className="text-slate-400">&bull; 25 Camac St</span>
          </div>
        </div>
      </div>

      {/* Footer Meta Row matching exact user design */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-ink-secondary">
            Landmark: Near Park Street Crossing
          </span>
          <span className="text-border hidden sm:inline select-none">&bull;</span>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1 font-semibold text-brass-700 hover:text-navy-900 transition underline underline-offset-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-brass-600" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brass-700 hover:text-navy-900 transition underline underline-offset-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>

          <span className="text-border select-none">&bull;</span>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-blue-600 transition underline underline-offset-2"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
