"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 text-white border-t border-navy-800/80 overflow-hidden">
      {/* 4-Column Main Footer */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Firm Introduction */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-btn bg-navy-800 border border-brass-500/40 flex items-center justify-center text-brass-300">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <path
                    d="M16 6 L7 26 H11 L13.5 20 H18.5 L21 26 H25 L16 6 Z M14.5 17 L16 11.5 L17.5 17 H14.5 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  ACORN
                </span>
                <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-brass-300 mt-1">
                  Legal Consultants
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Acorn Legal Consultants is a professional legal consultancy in Kolkata delivering thoughtful, precise, and result-oriented legal solutions with uncompromised discretion, diligence, and integrity.
            </p>

            <div className="pt-2 text-xs text-brass-300">
              <span className="font-serif italic text-sm">
                &ldquo;Excellence in Law. Integrity in Practice.&rdquo;
              </span>
            </div>
          </div>

          {/* Column 2: Practice Areas */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300 mb-5">
              Practice Areas
            </h4>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              {PRACTICE_AREAS.slice(0, 6).map((pa) => (
                <li key={pa.slug}>
                  <Link
                    href={`/services/${pa.slug}`}
                    className="hover:text-brass-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-700 group-hover:bg-brass-500 transition-colors" />
                    <span>{pa.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300 mb-5">
              Chambers &amp; Portals
            </h4>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              <li>
                <Link href="/about" className="hover:text-brass-300 transition-colors">
                  About Our Firm
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brass-300 transition-colors">
                  Services Directory
                </Link>
              </li>
              <li>
                <Link href="/posh" className="hover:text-brass-300 transition-colors">
                  POSH Act Compliance Hub
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brass-300 transition-colors">
                  Insights &amp; Publications
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brass-300 transition-colors">
                  FAQ &amp; Statutory Guidance
                </Link>
              </li>
              <li>
                <Link href="/request-service" className="hover:text-brass-300 transition-colors">
                  Request a Consultation
                </Link>
              </li>
              <li>
                <Link href="/pay" className="hover:text-brass-300 transition-colors">
                  Online Fee Settlement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Chambers Info */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300 mb-5">
              Chambers Location
            </h4>
            <div className="space-y-3 font-sans text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brass-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Suite 4B, Camac Court, 25 Camac Street, Park Street District, Kolkata, West Bengal 700016
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brass-500 shrink-0" />
                <a href={`tel:${BRAND_CONFIG.phone}`} className="hover:text-brass-300 transition-colors">
                  {BRAND_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brass-500 shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-brass-300 transition-colors">
                  {BRAND_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brass-500 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:30 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section Divider with Brass Tick */}
        <div className="hairline-rule mb-8 opacity-30" />

        {/* Legal Links & Mandatory Disclaimer */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="hover:text-brass-300 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-brass-300 transition">
                Terms of Engagement
              </Link>
              <Link href="/cookies" className="hover:text-brass-300 transition">
                Cookie Policy
              </Link>
              <Link href="/refund-policy" className="hover:text-brass-300 transition">
                Refund Policy
              </Link>
              <Link href="/disclaimer" className="hover:text-brass-300 transition">
                Bar Council Disclaimer
              </Link>
              <Link href="/design-system" className="hover:text-brass-300 transition">
                Design System
              </Link>
            </div>
            <div>
              &copy; {new Date().getFullYear()} Acorn Legal Consultants. All rights reserved.
            </div>
          </div>

          {/* Bar Council Professional Disclaimer Notice */}
          <div className="bg-navy-900/60 p-4 rounded-card border border-navy-800 text-[11px] text-slate-400 leading-relaxed text-center">
            The information on this website is for general information only and does not constitute legal advice or create a lawyer-client relationship. Under the rules of the Bar Council of India, law firms are not permitted to solicit work or advertise.
          </div>
        </div>

      </div>

      {/* Oversized Faint ACORN Wordmark Watermark */}
      <div
        className="w-full text-center pointer-events-none select-none overflow-hidden -mb-4 sm:-mb-8"
        aria-hidden="true"
      >
        <span className="font-serif text-[clamp(4.5rem,15vw,12rem)] font-bold tracking-tight text-white/[0.03] leading-none block">
          ACORN
        </span>
      </div>
    </footer>
  );
}
