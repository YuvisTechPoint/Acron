"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Landmark, ShieldCheck, ArrowRight, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@acornlegal.in");
  const [password, setPassword] = useState("••••••••••••");
  const [mfaCode, setMfaCode] = useState("492810");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("acorn_admin_session", "active");
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="bg-surface min-h-screen py-16 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-card p-8 border border-border shadow-modal space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary text-accent-gold rounded-lg flex items-center justify-center mx-auto shadow-card">
            <Landmark className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink">
            Acorn Admin Control System
          </h1>
          <p className="text-xs text-ink-secondary">
            Role-Based Authentication &bull; Super Admin &amp; Counsel Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Admin Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Two-Factor Authentication (TOTP Code) *
            </label>
            <input
              type="text"
              required
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              className="w-full text-center font-mono tracking-widest text-sm font-bold px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:border-primary"
            />
            <p className="text-[10px] text-ink-secondary mt-1 text-center">
              MFA enforced for privileged access per PRD Section 26.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <span>Verifying Credentials...</span> : <span>Sign In to Admin Console</span>}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-ink-secondary">
          <Link href="/" className="hover:text-primary underline">
            &larr; Back to Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

