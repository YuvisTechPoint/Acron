"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Settings, X, Check } from "lucide-react";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // locked
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem("acorn_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      const fullConsent = { essential: true, analytics: true, marketing: true };
      localStorage.setItem("acorn_cookie_consent", JSON.stringify(fullConsent));
    } catch {}
    setIsOpen(false);
  };

  const handleRejectNonEssential = () => {
    try {
      const minConsent = { essential: true, analytics: false, marketing: false };
      localStorage.setItem("acorn_cookie_consent", JSON.stringify(minConsent));
    } catch {}
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem("acorn_cookie_consent", JSON.stringify(preferences));
    } catch {}
    setShowPreferences(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Calm Small Card Bottom-Left (Max 360px, Non-blocking) */}
      <div
        className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-[360px] animate-fade-up pointer-events-auto"
        role="region"
        aria-label="Cookie and Privacy Notice"
      >
        <div className="bg-white p-4 sm:p-5 rounded-card border border-border shadow-modal text-ink space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-ivory-50 border border-border flex items-center justify-center shrink-0 text-navy-700 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-brass-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-ink-950">
                Privacy &amp; Cookie Consent
              </h3>
              <p className="text-[12px] text-ink-secondary mt-1 leading-relaxed">
                We use strictly essential cookies for secure consultation intake. You can choose whether to permit anonymous performance metrics.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-[11px] font-semibold text-brass-700 hover:text-navy-700 underline text-left"
              >
                Preferences
              </button>
              <Link
                href="/cookies"
                className="text-[11px] text-ink-muted hover:text-ink transition"
              >
                Cookie Policy
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="h-9 px-2 rounded-btn border border-border hover:border-navy-700 text-ink text-[11px] font-semibold transition"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="h-9 px-2 rounded-btn bg-navy-700 hover:bg-blue-600 text-ivory-50 text-[11px] font-semibold transition shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white max-w-md w-full rounded-card border border-border shadow-modal p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-brass-500" />
                <h3 className="font-serif font-bold text-base text-ink-950">
                  Cookie Categories
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-ink-muted hover:text-ink p-1"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Essential */}
              <div className="p-3 bg-ivory-50 rounded-card border border-border flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-ink">Essential Cookies (Required)</div>
                  <p className="text-ink-secondary text-[11px] mt-0.5 leading-relaxed">
                    Necessary for secure CSRF protection, session routing, and Section 16 POSH confidentiality.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-status-success bg-status-success-bg px-2 py-0.5 rounded border border-status-success/30 shrink-0">
                  Always Active
                </span>
              </div>

              {/* Analytics */}
              <div className="p-3 rounded-card border border-border flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-ink">Performance &amp; Analytics</div>
                  <p className="text-ink-secondary text-[11px] mt-0.5 leading-relaxed">
                    Aggregated metrics. Strictly disabled across all confidential POSH complaint portals.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-navy-700"
                  />
                </label>
              </div>

              {/* Marketing */}
              <div className="p-3 rounded-card border border-border flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-ink">Marketing &amp; Targeting</div>
                  <p className="text-ink-secondary text-[11px] mt-0.5 leading-relaxed">
                    Disabled by default per Bar Council of India non-solicitation guidelines.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-navy-700"
                  />
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 rounded-btn border border-border text-xs text-ink hover:bg-surface font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-btn bg-navy-700 hover:bg-blue-600 text-ivory-50 text-xs font-semibold shadow-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
