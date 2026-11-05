"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Send,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface PaymentLinkItem {
  id: string;
  clientName: string;
  clientEmail: string;
  matterRef: string;
  amountPaise: number;
  status: "ACTIVE" | "PAID" | "EXPIRED";
  expiresAt: string;
  url: string;
}

const INITIAL_LINKS: PaymentLinkItem[] = [
  {
    id: "PLK-2026-041",
    clientName: "Siddharth Roy (Bengal Met Fab)",
    clientEmail: "siddharth@bengalmetfab.com",
    matterRef: "Drafting Consortium Agreement",
    amountPaise: 1500000,
    status: "ACTIVE",
    expiresAt: "2026-11-08T23:59:00Z",
    url: "/pay?ref=PLK-2026-041&amt=15000"
  },
  {
    id: "PLK-2026-040",
    clientName: "Smt. Ananya Bose",
    clientEmail: "ananya.bose@gmail.com",
    matterRef: "Special Consultation & Opinion",
    amountPaise: 450000,
    status: "PAID",
    expiresAt: "2026-10-31T23:59:00Z",
    url: "/pay?ref=PLK-2026-040&amt=4500"
  }
];

export default function AdminPaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLinkItem[]>(INITIAL_LINKS);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    matterRef: "",
    amount: 5000,
    expiryDays: 3
  });

  const handleCopy = (id: string, url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PLK-2026-0${links.length + 42}`;
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + Number(form.expiryDays));

    const newLink: PaymentLinkItem = {
      id,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      matterRef: form.matterRef,
      amountPaise: form.amount * 100,
      status: "ACTIVE",
      expiresAt: expDate.toISOString(),
      url: `/pay?ref=${id}&amt=${form.amount}`
    };

    setLinks([newLink, ...links]);
    setShowModal(false);
    setForm({ clientName: "", clientEmail: "", matterRef: "", amount: 5000, expiryDays: 3 });
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: A-14
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <LinkIcon className="w-4 h-4 text-primary" />
              <span>Razorpay Quick Pay &bull; Custom Invoices</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Direct Payment Link Generator
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Generate secure, single-use Razorpay fee collection links to share with clients via WhatsApp, SMS, or email.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Payment Link</span>
          </button>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Link ID &amp; Matter</th>
                  <th className="py-3 px-4">Client Details</th>
                  <th className="py-3 px-4">Amount (INR)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Valid Until</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-primary">{link.id}</div>
                      <div className="text-[11px] text-slate-600 font-medium">{link.matterRef}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink">{link.clientName}</div>
                      <div className="text-[11px] text-slate-500">{link.clientEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary">
                      {formatINR(link.amountPaise)}
                    </td>
                    <td className="py-3.5 px-4">
                      {link.status === "ACTIVE" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Active / Unpaid
                        </span>
                      )}
                      {link.status === "PAID" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Settled
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(link.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleCopy(link.id, link.url)}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-border rounded text-[11px] font-medium text-slate-700 inline-flex items-center gap-1 transition"
                      >
                        {copiedId === link.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-ink">Generate Client Payment Link</h3>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Legal / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    placeholder="e.g. Bengal Precision Engineering Ltd"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Notification Email *</label>
                  <input
                    type="email"
                    required
                    value={form.clientEmail}
                    onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                    placeholder="accounts@bengalprecision.com"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Matter Reference / Memo *</label>
                  <input
                    type="text"
                    required
                    value={form.matterRef}
                    onChange={(e) => setForm({ ...form, matterRef: e.target.value })}
                    placeholder="e.g. Professional Retainer Fee (Q4 2026)"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Amount (INR) *</label>
                    <input
                      type="number"
                      required
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Expiry Period</label>
                    <select
                      value={form.expiryDays}
                      onChange={(e) => setForm({ ...form, expiryDays: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value={3}>3 Days (72 Hrs)</option>
                      <option value={7}>7 Days</option>
                      <option value={14}>14 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-border text-slate-600 rounded hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light"
                  >
                    Generate &amp; Activate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

