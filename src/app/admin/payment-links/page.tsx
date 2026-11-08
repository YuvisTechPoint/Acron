"use client";

import React, { useState, useEffect } from "react";
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
  DollarSign,
  Trash2,
  Search,
  X,
  ExternalLink,
  Ban
} from "lucide-react";
import { formatINR, formatDate } from "@/lib/utils";
import { platformStore } from "@/lib/store";
import { PaymentLinkItem } from "@/lib/types";

export default function AdminPaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLinkItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    matterRef: "",
    amount: 5000,
    expiryDays: 3,
  });

  const loadData = () => {
    setLinks(platformStore.getPaymentLinks());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopy = (id: string, url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    triggerToast("Payment link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail) return;

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + Number(form.expiryDays));

    const created = platformStore.addPaymentLink({
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      matterRef: form.matterRef || "General Legal Retainer",
      amountPaise: Math.round(form.amount * 100),
      status: "ACTIVE",
      expiresAt: expDate.toISOString(),
      url: `/pay?amt=${form.amount}&desc=${encodeURIComponent(form.matterRef || "Legal Fee")}`,
    });

    triggerToast(`Payment link ${created.id} generated successfully!`);
    setShowModal(false);
    setForm({ clientName: "", clientEmail: "", matterRef: "", amount: 5000, expiryDays: 3 });
    loadData();
  };

  const handleStatusChange = (id: string, status: PaymentLinkItem["status"]) => {
    platformStore.updatePaymentLinkStatus(id, status);
    triggerToast(`Link ${id} updated to ${status}`);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete payment link ${id}?`)) {
      platformStore.deletePaymentLink(id);
      triggerToast(`Deleted payment link ${id}`);
      loadData();
    }
  };

  const filtered = links.filter(
    (l) =>
      l.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.matterRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

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

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by client, email, ref, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {links.length} generated links
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Link ID &amp; Client</th>
                  <th className="py-3 px-4">Matter Reference</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Expires</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink">{link.clientName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{link.clientEmail}</div>
                      <div className="font-mono text-[10px] text-primary mt-0.5">{link.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {link.matterRef}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {formatINR(link.amountPaise)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(link.expiresAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          link.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : link.status === "ACTIVE"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-500 border border-slate-300"
                        }`}
                      >
                        {link.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleCopy(link.id, link.url)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition"
                        title="Copy payment URL"
                      >
                        {copiedId === link.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      {link.status === "ACTIVE" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(link.id, "PAID")}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold"
                            title="Mark as Paid"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleStatusChange(link.id, "CANCELLED")}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded text-[10px] font-bold"
                            title="Cancel Link"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {link.status !== "ACTIVE" && (
                        <button
                          onClick={() => handleStatusChange(link.id, "ACTIVE")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-medium"
                          title="Reactivate"
                        >
                          Reactivate
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No payment links found matching &quot;{searchTerm}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">Generate Razorpay Payment Link</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Full Name / Entity *</label>
                  <input
                    type="text"
                    required
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    placeholder="e.g. Smt. Rita Sen (Apex Corp)"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.clientEmail}
                    onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                    placeholder="e.g. rita@apexcorp.in"
                    className="w-full p-2 border border-border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Matter Reference / Description *</label>
                  <input
                    type="text"
                    required
                    value={form.matterRef}
                    onChange={(e) => setForm({ ...form, matterRef: e.target.value })}
                    placeholder="e.g. Retainer Fee - Q4 Advisory"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Amount (INR) *</label>
                    <input
                      type="number"
                      required
                      min={100}
                      step={500}
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Link Validity</label>
                    <select
                      value={form.expiryDays}
                      onChange={(e) => setForm({ ...form, expiryDays: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value={1}>24 Hours</option>
                      <option value={3}>3 Days</option>
                      <option value={7}>7 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-border rounded text-[11px] text-slate-600">
                  Total payable: <strong className="text-primary font-mono">{formatINR(form.amount * 100)}</strong> via UPI, NetBanking, or Corporate Credit Card.
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
                    className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light transition"
                  >
                    Generate Link
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
