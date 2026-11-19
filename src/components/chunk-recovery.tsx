"use client";

import { useEffect } from "react";

/**
 * Resilient deployment chunk recovery handler.
 * Automatically recovers from ChunkLoadError when a new Vercel deployment replaces
 * chunk hashes while a visitor has an existing browser tab open.
 */
export function ChunkRecovery() {
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      const msg = event?.message || "";
      if (
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Refused to execute script")
      ) {
        const lastReload = sessionStorage.getItem("acorn_chunk_reload_ts");
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem("acorn_chunk_reload_ts", now.toString());
          window.location.reload();
        }
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event?.reason;
      const msg = (typeof reason === "string" ? reason : reason?.message) || "";
      const name = reason?.name || "";
      if (
        name === "ChunkLoadError" ||
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module")
      ) {
        const lastReload = sessionStorage.getItem("acorn_chunk_reload_ts");
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem("acorn_chunk_reload_ts", now.toString());
          window.location.reload();
        }
      }
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);

  return null;
}
