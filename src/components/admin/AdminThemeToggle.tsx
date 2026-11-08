"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface AdminThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function AdminThemeToggle({ compact = false, className = "" }: AdminThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("acorn_admin_theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (t: "light" | "dark") => {
    const adminRoot = document.getElementById("admin-root") || document.documentElement;
    if (t === "dark") {
      adminRoot.classList.add("admin-dark", "dark");
    } else {
      adminRoot.classList.remove("admin-dark", "dark");
    }
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("acorn_admin_theme", next);
    applyTheme(next);

    // Dispatch event so any other listeners update in real time
    window.dispatchEvent(new CustomEvent("acorn_admin_theme_change", { detail: next }));
  };

  if (!mounted) {
    return (
      <div className={`inline-flex items-center justify-center p-2 rounded-btn border border-border text-slate-400 opacity-60 ${className}`}>
        <Moon className="w-4 h-4" />
      </div>
    );
  }

  const isDark = theme === "dark";

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`p-2 rounded-btn border transition-all flex items-center justify-center ${
          isDark
            ? "bg-navy-900 border-brass-500/40 text-brass-300 hover:text-white hover:bg-navy-800"
            : "bg-surface border-border text-slate-700 hover:text-primary hover:bg-slate-100"
        } ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4 text-brass-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-btn border text-xs font-semibold transition-all shadow-sm ${
        isDark
          ? "bg-navy-900/90 border-brass-500/40 text-brass-300 hover:bg-navy-800 hover:text-white"
          : "bg-white border-border text-slate-700 hover:bg-slate-50 hover:text-primary"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-brass-400 animate-fadeIn" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-navy-700 animate-fadeIn" />
        )}
      </div>
      <span className="font-sans font-medium text-[11px]">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
      <span
        className={`w-2 h-2 rounded-full ${
          isDark ? "bg-brass-400 shadow-[0_0_8px_rgba(176,141,87,0.8)]" : "bg-emerald-500"
        }`}
      />
    </button>
  );
}

