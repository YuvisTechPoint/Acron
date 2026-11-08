"use client";

import React, { useState } from "react";
import { MapPin, ExternalLink, Navigation, Compass, Layers } from "lucide-react";

interface ChambersMapProps {
  className?: string;
}

export function ChambersMap({ className = "" }: ChambersMapProps) {
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const [showLiveEmbed, setShowLiveEmbed] = useState(true);

  // Precise coordinates for 25 Camac Street, Park Street District, Kolkata
  const latitude = 22.5497;
  const longitude = 88.3533;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "25 Camac Street, Park Street area, Kolkata, West Bengal 700016",
  )}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Real-time synced Google Maps embed with satellite/standard parameter toggle
  const embedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}+(Acorn+Legal+Consultants+Chambers)&t=${
    mapType === "satellite" ? "k" : "m"
  }&z=16&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className={`bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-5 ${className}`}>
      
      {/* Header matching design reference */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border">
        <span className="font-sans text-[11px] sm:text-xs uppercase font-bold text-brass-700 tracking-[0.16em]">
          CHAMBERS GEOGRAPHY
        </span>
        <span className="font-sans text-xs text-ink-muted">
          Camac Street &bull; Kolkata
        </span>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[320px] sm:h-[360px] rounded-card bg-navy-950 border border-navy-800 overflow-hidden shadow-inner group">
        
        {/* Live Interactive Synchronized Google Map iframe */}
        {showLiveEmbed ? (
          <iframe
            title="Acorn Legal Consultants Chambers Geography Realtime Sync"
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "contrast(1.04) saturate(1.05)" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full relative z-10 transition-opacity duration-300"
          />
        ) : (
          /* Stylized blueprint fallback matching exact dark card image */
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none bg-navy-950">
            {/* Architectural Grid Lines */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#B08D57_1px,transparent_1px),linear-gradient(to_bottom,#B08D57_1px,transparent_1px)] bg-[size:28px_28px]" />
            
            {/* Outer Compass Pulsing Pin */}
            <div className="relative w-16 h-16 rounded-full bg-navy-800/90 border border-brass-500/40 flex items-center justify-center mb-4 text-brass-300 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-full border border-brass-500/30 animate-ping opacity-30 pointer-events-none" />
              <MapPin className="w-7 h-7 text-brass-300" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white relative z-10">
              Camac Court, 25 Camac Street
            </h3>
            <p className="font-sans text-xs sm:text-sm text-brass-300 mt-1.5 relative z-10">
              Park Street Commercial Hub &bull; Kolkata 700016
            </p>
          </div>
        )}

        {/* Floating Controls Overlay (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          {/* Map Layer Switcher */}
          <button
            type="button"
            onClick={() => setMapType((prev) => (prev === "standard" ? "satellite" : "standard"))}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn text-[11px] font-semibold tracking-wide bg-navy-900/90 hover:bg-navy-800 text-ivory-50 border border-brass-500/40 backdrop-blur-md shadow-md transition"
            title="Toggle between Street Map and Satellite View"
            aria-label="Toggle map view mode"
          >
            <Layers className="w-3.5 h-3.5 text-brass-400" />
            <span className="capitalize">{mapType}</span>
          </button>

          {/* Toggle Interactive View / Blueprint Pin Card */}
          <button
            type="button"
            onClick={() => setShowLiveEmbed((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn text-[11px] font-semibold tracking-wide bg-navy-900/90 hover:bg-navy-800 text-ivory-50 border border-brass-500/40 backdrop-blur-md shadow-md transition"
            title="Toggle Live Map preview"
            aria-label="Toggle live map preview"
          >
            <Compass className="w-3.5 h-3.5 text-brass-400" />
            <span>{showLiveEmbed ? "Blueprint" : "Live Map"}</span>
          </button>
        </div>

        {/* Floating Quick Navigation Chip (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-btn text-[11px] font-medium bg-navy-950/90 text-slate-200 border border-navy-800 backdrop-blur-md shadow-sm">
            <span className="text-brass-300 font-semibold">Coordinates:</span> 22.5497° N, 88.3533° E
          </div>
        </div>

      </div>

      {/* Footer Meta Row matching user's design */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <span className="font-sans text-ink-secondary">
          Landmark: Near Park Street Crossing
        </span>
        
        <div className="flex items-center gap-4">
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

