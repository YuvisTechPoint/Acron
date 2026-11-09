"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Landmark,
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("admin@acornlegal.in");
  const [password, setPassword] = useState("AcornLegal@2026");
  const [mfaCode, setMfaCode] = useState("492810");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if session is already active
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCookie =
        document.cookie.includes("acorn_admin_session") ||
        document.cookie.includes("acorn_session");
      const hasStorage = !!localStorage.getItem("acorn_admin_session");
      if (hasCookie || hasStorage) {
        // Verify with session endpoint
        fetch("/api/admin/session")
          .then((res) => {
            if (res.ok) {
              router.push(callbackUrl);
            } else {
              localStorage.removeItem("acorn_admin_session");
            }
          })
          .catch(() => {});
      }
    }
  }, [router, callbackUrl]);

  const handleAutofillDemo = () => {
    setEmail("admin@acornlegal.in");
    setPassword("AcornLegal@2026");
    setMfaCode("492810");
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, mfaCode }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      // Success
      setSuccessMessage("Session verified. Launching Admin Control System...");
      if (typeof window !== "undefined") {
        localStorage.setItem("acorn_admin_session", data.token || "active");
        document.cookie = `acorn_admin_session=${data.token || "active"}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `acorn_session=${data.token || "active"}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `acorn_posh_session=${data.token || "active"}; path=/; max-age=86400; SameSite=Lax`;
      }

      setTimeout(() => {
        router.push(callbackUrl);
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Network communication error during authentication.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-16 flex items-center justify-center px-4 selection:bg-navy-800 selection:text-brass-300">
      <div className="bg-white max-w-md w-full rounded-card p-8 border border-border shadow-modal space-y-6">
        
        {/* Header Monogram & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-navy-950 text-brass-300 rounded-lg flex items-center justify-center mx-auto shadow-card border border-brass-500/30">
            <Landmark className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink-950">
            Acorn Admin Control System
          </h1>
          <p className="text-xs text-ink-muted">
            Role-Based Authentication &bull; Super Admin &amp; Counsel Portal
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Banner */}
        <div className="p-3 bg-navy-50/70 border border-navy-200/60 rounded-btn text-xs text-navy-900 flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="font-semibold text-navy-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brass-600" />
              <span>Demo Admin Credentials</span>
            </div>
            <div className="text-[11px] text-slate-600 font-mono">
              admin@acornlegal.in &bull; AcornLegal@2026 &bull; 492810
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="text-[11px] font-semibold text-navy-700 bg-white border border-navy-300 px-2.5 py-1 rounded hover:bg-navy-100 transition whitespace-nowrap shadow-xs"
          >
            Autofill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-btn text-xs text-red-900 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-btn text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 font-medium">{successMessage}</div>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-950 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-navy-700" />
              <span>Admin Email *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@acornlegal.in"
              className="w-full text-xs px-3 py-2.5 bg-white border border-border rounded focus:outline-none focus:border-navy-700 text-ink-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-950 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-navy-700" />
              <span>Password *</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs px-3 py-2.5 bg-white border border-border rounded focus:outline-none focus:border-navy-700 text-ink-950 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-950 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-brass-600" />
              <span>Two-Factor Authentication (TOTP Code) *</span>
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
              placeholder="492810"
              className="w-full text-center font-mono tracking-widest text-base font-bold px-3 py-2 bg-ivory-50 border border-border rounded focus:outline-none focus:border-navy-700 text-ink-950"
            />
            <p className="text-[10px] text-ink-muted mt-1 text-center">
              MFA enforced for privileged access per PRD Section 26.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2 border border-brass-500/40 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-brass-400" />
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-ink-muted border-t border-border/60">
          <Link href="/" className="hover:text-navy-800 transition">
            &larr; Back to Chambers Public Site
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-ivory-50 min-h-screen flex items-center justify-center text-xs text-ink-muted">
          Loading Admin Control System...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
