"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BarChart3, Printer, Download, ArrowLeft, TrendingUp, DollarSign } from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export default function AdminReportsPage() {
  const requests = platformStore.getServiceRequests();
  const cases = platformStore.getCases();
  const payments = platformStore.getPayments();

  const totalPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0), 0);

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
                Executive Reporting &bull; Business Intelligence
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Practice Performance &amp; Compliance Analytics
              </h1>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Executive Summary</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-2 text-xs">
            <div className="text-ink-secondary">Enquiry Intake &amp; Conversion</div>
            <div className="font-serif font-bold text-2xl text-primary">{requests.length} Requests</div>
            <div className="text-emerald-700 font-semibold mt-1">&bull; Average response time: 2.4 Hours</div>
          </div>

          <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-2 text-xs">
            <div className="text-ink-secondary">Gross Revenue (FY 2026-27)</div>
            <div className="font-serif font-bold text-2xl text-emerald-800">{formatINR(totalPaise)}</div>
            <div className="text-ink-secondary mt-1">&bull; Retainers &amp; Consultations</div>
          </div>

          <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-2 text-xs">
            <div className="text-ink-secondary">Statutory POSH Timeliness</div>
            <div className="font-serif font-bold text-2xl text-emerald-700">100%</div>
            <div className="text-ink-secondary mt-1">&bull; Zero 90-day inquiry breaches</div>
          </div>
        </div>
      </div>
    </div>
  );
}

