"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, User, Phone, Mail, CheckCircle2, MessageSquare } from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimeRequests } from "@/lib/realtime";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function AdminRequestDetailPage() {
  const params = useParams();
  const reqId = params?.id as string;
  const requests = useRealtimeRequests();
  const request = requests.find((r) => r.id === reqId || r.refNumber === reqId) || requests[0];

  const [status, setStatus] = useState<any>(request?.status || "IN_REVIEW");
  const [note, setNote] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;
    platformStore.updateServiceRequestStatus(request.id, status, note || undefined);

    try {
      await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: request.id,
          status,
          note: note || undefined,
        }),
      });
    } catch {}

    setNote("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!request) {
    return <div className="p-8 text-center text-xs">Request not found.</div>;
  }

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-3 bg-white p-6 rounded-card border border-border shadow-card">
          <Link
            href="/admin/requests"
            className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="font-mono text-xs font-bold text-primary">{request.refNumber}</span>
            <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">{request.subject}</h1>
          </div>
        </div>

        <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-6 text-xs">
          <div className="grid grid-cols-2 gap-4 bg-surface p-4 rounded border border-border">
            <div>
              <div className="text-ink-secondary">Client Name:</div>
              <div className="font-bold text-ink text-sm mt-0.5">{request.fullName}</div>
              <div className="text-ink-secondary mt-1">{request.email} &bull; {request.phone}</div>
            </div>
            <div>
              <div className="text-ink-secondary">Service Category:</div>
              <div className="font-semibold text-primary capitalize mt-0.5">{request.serviceCategory.replace(/_/g, " ")}</div>
              <div className="text-ink-secondary mt-1">Channel: {request.preferredChannel} &bull; Submitted {formatDate(request.createdAt)}</div>
            </div>
          </div>

          <div>
            <div className="font-bold text-ink mb-1">Matter Narrative &bull; Client Statement:</div>
            <p className="p-4 bg-surface rounded border border-border leading-relaxed whitespace-pre-line text-ink">
              {request.description}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="pt-4 border-t border-border space-y-3">
            <div>
              <label className="block font-semibold text-ink mb-1">Change Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 border border-border rounded"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                <option value="ENGAGED">ENGAGED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Add Case Note:</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Log call outcome, engagement terms, or advice provided..."
                className="w-full px-3 py-2 border border-border rounded"
              ></textarea>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Service request record updated and synchronized in real-time.</span>
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white font-bold uppercase tracking-wider rounded hover:bg-primary-hover shadow"
            >
              Update Request Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

