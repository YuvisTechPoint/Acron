"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Service worker successfully registered
          })
          .catch((err) => {
            // Service worker registration ignored in unsupported dev environments
          });
      });
    }
  }, []);

  return null;
}
