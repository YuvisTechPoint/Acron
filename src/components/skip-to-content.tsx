"use client";

import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-white focus:rounded-btn focus:shadow-modal focus:font-medium focus:text-xs"
    >
      Skip to main content
    </a>
  );
}

