"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, ArrowLeft, CheckCircle2, Clock, Building } from "lucide-react";
import { platformStore } from "@/lib/store";

export default function AdminSubscriptionsPage() {
  const orgs = platformStore.getOrganizations();

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
                Retainer Orders &bull; Finance
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Corporate POSH Subscriptions &amp; Retainer Orders
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Organisation</th>
                <th className="p-3.5">Active Plan Tier</th>
                <th className="p-3.5">Employees Covered</th>
                <th className="p-3.5">Acorn External Member</th>
                <th className="p-3.5">Billing Cycle</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-surface/50">
                  <td className="p-3.5">
                    <div className="font-semibold text-ink">{org.name}</div>
                    <div className="text-[10px] text-ink-secondary font-mono">{org.code} &bull; {org.city}</div>
                  </td>
                  <td className="p-3.5 capitalize font-medium text-primary">
                    {org.planTier.replace(/_/g, " ")}
                  </td>
                  <td className="p-3.5 text-ink font-semibold">{org.employeeCount} Staff</td>
                  <td className="p-3.5 text-ink-secondary">{org.icExternalMember}</td>
                  <td className="p-3.5 text-ink-secondary">Quarterly Retainer</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                      ACTIVE RETAINER
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

