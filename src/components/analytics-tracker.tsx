"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttributionParameters, hasAnalyticsConsent, trackEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  // 1. Capture UTM / Ad Click attribution on mount & route change via client-side window.location
  useEffect(() => {
    captureAttributionParameters();
  }, [pathname]);

  // 2. Track Page View on route change if consent is given
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check route safety
    if (
      pathname.startsWith("/posh/portal") ||
      pathname.startsWith("/posh/ic") ||
      pathname.startsWith("/admin")
    ) {
      return;
    }

    if (hasAnalyticsConsent()) {
      trackEvent("page_view", {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // 3. Dynamic initialization of Google Analytics 4 / Google Tag Manager if configured
  useEffect(() => {
    if (typeof window === "undefined") return;

    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaId || !hasAnalyticsConsent()) return;

    // Inject GA script only if not already present
    if (!document.getElementById("ga-script-tag")) {
      const script = document.createElement("script");
      script.id = "ga-script-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const win = window as unknown as {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
      };
      win.dataLayer = win.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        win.dataLayer.push(args);
      };
      win.gtag = gtag;
      gtag("js", new Date());
      gtag("config", gaId, {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  }, []);

  return null;
}
