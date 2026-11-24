"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application runtime exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#FAF8F5] text-[#0A1424] font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#E2D9C8] p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#0A1424] border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880] text-xl font-serif font-bold shadow-sm">
            A
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#0A1424]">
              Application Technical Notice
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              A root application exception occurred. Our technical registry has logged this event under privileged confidential isolation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="px-5 py-2.5 rounded-lg bg-[#C5A880] text-[#0A1424] text-xs font-bold uppercase tracking-wider hover:bg-[#B39364] transition-colors"
            >
              Reload Platform
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors inline-flex items-center justify-center"
            >
              Return Home
            </a>
          </div>

          <p className="text-[11px] text-stone-600 pt-4 border-t border-stone-100">
            Acorn Legal Consultants &bull; Strict Bar Council of India Compliance
          </p>
        </div>
      </body>
    </html>
  );
}
