"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, ShieldAlert, MapPin, Clock, ExternalLink, HelpCircle, ArrowLeft } from "lucide-react";
import { POSH_HELPLINES } from "@/lib/constants";

export default function HelplineDirectoryPage() {
  const [filterScope, setFilterScope] = useState<string>("ALL");

  const filtered = filterScope === "ALL"
    ? POSH_HELPLINES
    : POSH_HELPLINES.filter((h) => h.scope.toLowerCase().includes(filterScope.toLowerCase()));

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-status-danger font-bold">
            <ShieldAlert className="w-4 h-4 text-status-danger" />
            <span>Emergency Redressal &bull; Free Legal Aid</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            Statutory Helplines &amp; Support Directory
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-2xl leading-relaxed">
            Verified contact directory for immediate survivor support, police emergency intervention, free legal aid, and Local Committee (LC) offices across Kolkata and West Bengal.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          {["ALL", "Kolkata", "West Bengal", "National"].map((scope) => (
            <button
              key={scope}
              onClick={() => setFilterScope(scope)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                filterScope === scope
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-ink hover:bg-surface-muted"
              }`}
            >
              {scope === "ALL" ? "All Helplines" : `${scope} Region`}
            </button>
          ))}
        </div>

        {/* Helplines List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-card p-6 border border-border shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent-light px-2.5 py-0.5 rounded">
                    {item.scope}
                  </span>
                  <span className="text-[11px] text-ink-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{item.hours}</span>
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-ink">
                  {item.name}
                </h3>

                <p className="text-xs text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <div className="text-[10px] text-ink-secondary uppercase font-semibold">Emergency Number</div>
                  <a
                    href={`tel:${item.number}`}
                    className="font-mono text-base font-bold text-primary hover:text-accent flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{item.number}</span>
                  </a>
                </div>

                {item.tollFree !== "N/A" && (
                  <div className="text-right">
                    <div className="text-[10px] text-ink-secondary uppercase font-semibold">Toll-Free</div>
                    <span className="font-mono text-xs font-bold text-ink">{item.tollFree}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

