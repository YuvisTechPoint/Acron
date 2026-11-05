"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  User,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ServiceRequest } from "@/lib/types";

export default function AdminServiceRequestsPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [newNote, setNewNote] = useState("");
  const [statusUpdate, setStatusUpdate] = useState<any>("IN_REVIEW");

  const requests = platformStore.getServiceRequests();

  const filtered = requests.filter((r) => {
    const matchesFilter = filter === "ALL" || r.status === filter;
    const matchesSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.refNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    platformStore.updateServiceRequestStatus(
      selectedRequest.id,
      statusUpdate,
      newNote ? newNote : undefined
    );

    // Refresh
    const updatedList = platformStore.getServiceRequests();
    const refreshed = updatedList.find((r) => r.id === selectedRequest.id);
    if (refreshed) setSelectedRequest({ ...refreshed });
    setNewNote("");
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
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
                Client Intake CRM
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Service Requests Pipeline
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ref, or subject..."
              className="text-xs px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:border-primary w-64"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {["ALL", "NEW", "IN_REVIEW", "PROPOSAL_SENT", "ENGAGED", "CLOSED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-ink hover:bg-surface"
              }`}
            >
              {s.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Requests Table & Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Requests Table */}
          <div className="lg:col-span-7 bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                  <tr>
                    <th className="p-3.5">Ref &bull; Date</th>
                    <th className="p-3.5">Client &bull; Contact</th>
                    <th className="p-3.5">Category &bull; Urgency</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => {
                        setSelectedRequest(r);
                        setStatusUpdate(r.status);
                      }}
                      className={`hover:bg-surface cursor-pointer transition-colors ${
                        selectedRequest?.id === r.id ? "bg-primary-light/40" : ""
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-primary">{r.refNumber}</div>
                        <div className="text-[10px] text-ink-secondary">{formatDate(r.createdAt)}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-ink">{r.fullName}</div>
                        <div className="text-[11px] text-ink-secondary">{r.email}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="capitalize">{r.serviceCategory.replace(/_/g, " ")}</div>
                        <span className={`text-[10px] font-bold ${r.urgency === "urgent" ? "text-red-600" : "text-slate-500"}`}>
                          {r.urgency.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedRequest(r);
                            setStatusUpdate(r.status);
                          }}
                          className="text-primary font-bold hover:underline"
                        >
                          View &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Request Detail Panel */}
          <div className="lg:col-span-5 bg-white rounded-card p-6 border border-border shadow-card space-y-4">
            {selectedRequest ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-start border-b border-border pb-3">
                  <div>
                    <span className="font-mono font-bold text-primary text-sm">{selectedRequest.refNumber}</span>
                    <h3 className="font-serif font-bold text-base text-ink mt-0.5">
                      {selectedRequest.subject}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-white">
                    {selectedRequest.status}
                  </span>
                </div>

                <div className="bg-surface p-3.5 rounded border border-border space-y-1.5">
                  <div><strong>Client:</strong> {selectedRequest.fullName}</div>
                  <div><strong>Email:</strong> {selectedRequest.email}</div>
                  <div><strong>Phone:</strong> {selectedRequest.phone} (Preferred: {selectedRequest.preferredChannel})</div>
                  <div><strong>Category:</strong> {selectedRequest.serviceCategory.replace(/_/g, " ")}</div>
                  {selectedRequest.assignedTo && <div><strong>Assigned Counsel:</strong> {selectedRequest.assignedTo}</div>}
                </div>

                <div>
                  <div className="font-bold text-ink mb-1">Matter Description:</div>
                  <p className="text-ink-secondary leading-relaxed bg-surface p-3 rounded border border-border whitespace-pre-line">
                    {selectedRequest.description}
                  </p>
                </div>

                {/* Internal Notes History */}
                <div>
                  <div className="font-bold text-ink mb-1">Chamber Notes History:</div>
                  {selectedRequest.internalNotes && selectedRequest.internalNotes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRequest.internalNotes.map((n) => (
                        <div key={n.id} className="p-2.5 bg-surface rounded border border-border-subtle text-[11px]">
                          <div className="text-ink-secondary flex justify-between">
                            <strong>{n.author}</strong>
                            <span>{formatDateTime(n.createdAt)}</span>
                          </div>
                          <div className="text-ink mt-1">{n.content}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-ink-secondary text-[11px]">No notes logged yet.</p>
                  )}
                </div>

                {/* Update Status & Append Note */}
                <form onSubmit={handleUpdate} className="pt-2 border-t border-border space-y-3">
                  <div>
                    <label className="block font-semibold text-ink mb-1">Update Status:</label>
                    <select
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-border rounded bg-white text-ink font-semibold"
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
                    <label className="block font-semibold text-ink mb-1">Add Case Note / Consultation Action:</label>
                    <textarea
                      rows={2}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="e.g. Spoke with client. Retainer engagement letter drafted."
                      className="w-full px-2.5 py-1.5 border border-border rounded"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded transition-colors"
                  >
                    Save &amp; Update Record
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 text-ink-secondary text-xs">
                Select a service request from the table to view details and append notes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

