"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Phone, Mail } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { Button, Eyebrow } from "@/components/ui";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="bg-ivory-50 min-h-[85vh] flex items-center justify-center py-20 sm:py-28 text-ink">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Elegant Arch Illustration for 500 */}
        <div className="w-24 h-36 rounded-t-full border-2 border-brass-500/40 bg-gradient-to-b from-navy-900 to-ink-950 mx-auto flex flex-col items-center justify-center text-brass-300 shadow-raised relative overflow-hidden group">
          <div className="w-12 h-20 rounded-t-full border border-brass-500/20 pointer-events-none" />
          <span className="font-serif text-2xl font-bold mt-2">500</span>
        </div>

        <div className="space-y-3">
          <Eyebrow className="justify-center">TECHNICAL EXCEPTION</Eyebrow>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-950">
            System Notice
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed max-w-md mx-auto">
            An unexpected application state occurred while processing this request. Our technical registry has logged this event with confidential isolation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button variant="primary" onClick={() => reset()}>
            <RotateCcw className="w-4 h-4 mr-2 text-brass-300" />
            <span>Retry Operation</span>
          </Button>

          <Button variant="secondary" href="/">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>
        </div>

        {/* Registry Help */}
        <div className="pt-8 border-t border-border text-xs text-ink-secondary space-y-2">
          <p className="font-semibold text-ink">
            Urgent matters requiring immediate chambers attention:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-navy-700">
            <a href={`tel:${BRAND_CONFIG.phone}`} className="hover:underline">
              Telephone: {BRAND_CONFIG.phone}
            </a>
            <span>&bull;</span>
            <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:underline">
              Email: {BRAND_CONFIG.email}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
