"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Phone,
  Home,
  Briefcase,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { Button, Eyebrow } from "@/components/ui";

export default function NotFoundPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-ivory-50 min-h-[85vh] flex items-center justify-center py-20 sm:py-28 text-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Elegant Arch Illustration */}
        <div className="w-24 h-36 rounded-t-full border-2 border-brass-500/40 bg-gradient-to-b from-navy-900 to-ink-950 mx-auto flex flex-col items-center justify-center text-brass-300 shadow-raised relative overflow-hidden group">
          <div className="w-12 h-20 rounded-t-full border border-brass-500/20 pointer-events-none" />
          <span className="font-serif text-2xl font-bold mt-2">404</span>
        </div>

        {/* Eyebrow & Status */}
        <div className="space-y-3">
          <Eyebrow className="justify-center">RECORD NOT FOUND</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-950">
            Page Not Found
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary max-w-lg mx-auto leading-relaxed">
            The page or statutory file you are seeking may have been reindexed or is restricted under chambers confidentiality protocols.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across practice areas, articles, or FAQs..."
              className="w-full h-11 pl-10 pr-24 rounded-btn bg-white border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy-700 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 rounded-btn bg-navy-700 hover:bg-blue-600 text-ivory-50 text-[11px] font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Helpful Direct Links */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card space-y-4 text-left">
          <div className="text-xs font-semibold text-brass-700 uppercase tracking-wider">
            Recommended Chambers Pathways
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/"
              className="p-3 rounded-btn border border-border hover:bg-ivory-50 hover:border-navy-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-navy-700" />
                <span className="font-semibold text-ink">Chambers Home</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="p-3 rounded-btn border border-border hover:bg-ivory-50 hover:border-navy-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-navy-700" />
                <span className="font-semibold text-ink">Practice Directory</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/posh"
              className="p-3 rounded-btn border border-border hover:bg-ivory-50 hover:border-navy-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-navy-700" />
                <span className="font-semibold text-ink">POSH Compliance</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="p-3 rounded-btn border border-border hover:bg-ivory-50 hover:border-navy-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-navy-700" />
                <span className="font-semibold text-ink">Contact Registry</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Contact Chambers Button */}
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button variant="primary" href="/contact" arrow>
            Contact Chambers Desk
          </Button>
          <Button variant="secondary" href="/">
            Return to Homepage
          </Button>
        </div>

      </div>
    </div>
  );
}
