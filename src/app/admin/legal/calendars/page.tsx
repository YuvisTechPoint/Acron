"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, CheckCircle2, Plus } from "lucide-react";

export default function LegalCalendarsPage() {
  const [selectedCalendar, setSelectedCalendar] = useState<"wb" | "central">("wb");

  const westBengalHolidays2026 = [
    { date: "2026-01-23", name: "Netaji Subhas Chandra Bose Jayanti", type: "State Gazetted" },
    { date: "2026-01-26", name: "Republic Day", type: "National Gazetted" },
    { date: "2026-03-04", name: "Holi / Dol Jatra", type: "State Gazetted" },
    { date: "2026-04-14", name: "Bengali New Year (Poila Boishakh)", type: "State Gazetted" },
    { date: "2026-05-01", name: "May Day", type: "State Gazetted" },
    { date: "2026-05-09", name: "Rabindranath Tagore Jayanti", type: "State Gazetted" },
    { date: "2026-08-15", name: "Independence Day", type: "National Gazetted" },
    { date: "2026-10-02", name: "Mahatma Gandhi Jayanti", type: "National Gazetted" },
    { date: "2026-10-18", name: "Durga Puja (Maha Saptami to Dashami)", type: "State Gazetted (Festive)" },
    { date: "2026-11-08", name: "Kali Puja / Diwali", type: "National Gazetted" },
    { date: "2026-12-25", name: "Christmas Day", type: "National Gazetted" },
  ];

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Working-Day Computation &bull; Section 8.16
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory Holiday &amp; Judicial Calendars
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCalendar("wb")}
                className={`px-3 py-1.5 rounded font-semibold ${
                  selectedCalendar === "wb" ? "bg-primary text-white" : "bg-surface text-ink"
                }`}
              >
                West Bengal &bull; Kolkata Jurisdiction
              </button>
              <button
                onClick={() => setSelectedCalendar("central")}
                className={`px-3 py-1.5 rounded font-semibold ${
                  selectedCalendar === "central" ? "bg-primary text-white" : "bg-surface text-ink"
                }`}
              >
                Central Government &bull; All India
              </button>
            </div>
            <span className="text-[11px] text-ink-secondary">
              Calendar Year 2026 &bull; Asia/Kolkata
            </span>
          </div>

          <div className="divide-y divide-border-subtle">
            {westBengalHolidays2026.map((h, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-ink">{h.name}</div>
                  <div className="text-[11px] text-ink-secondary">{h.type}</div>
                </div>
                <span className="font-mono font-bold text-primary">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

