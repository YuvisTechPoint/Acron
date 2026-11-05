"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import { SERVICE_PACKAGES } from "@/lib/constants";
import { formatINR } from "@/lib/utils";

export default function AdminServicesCataloguePage() {
  const [services, setServices] = useState(SERVICE_PACKAGES);

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
                Commercial Architecture &bull; Section 8.12
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Service Catalogue &amp; Retainer Plans
              </h1>
            </div>
          </div>

          <Link
            href="/admin/subscriptions"
            className="px-3.5 py-2 border border-border rounded text-xs font-semibold hover:bg-surface text-ink"
          >
            Client Subscriptions &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-card p-6 border border-border shadow-card flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  {s.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-primary">
                  {s.name}
                </h3>
                <div className="text-xl font-bold text-ink">
                  {formatINR(s.pricePaise)}
                  <span className="text-[11px] font-normal text-ink-secondary ml-1">(+ 18% GST)</span>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-border-subtle">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border-subtle mt-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                  Active in Catalogue
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

