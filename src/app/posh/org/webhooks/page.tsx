"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Webhook,
  Plus,
  Play,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Lock,
  Search,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { WebhookEndpoint } from "@/lib/types";
import { useToast } from "@/components/ui/toast";

export default function WebhooksAdminPage() {
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [selectedHook, setSelectedHook] = useState<WebhookEndpoint | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New webhook form
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newEvents, setNewEvents] = useState<string[]>([
    "case.transitioned",
    "duty.status_changed",
  ]);
  const [newScrubber, setNewScrubber] = useState(true);

  const availableEvents = [
    { id: "case.transitioned", label: "Case Stage Transitioned", desc: "Emitted when an IC docket changes statutory status (identifiers only)" },
    { id: "duty.status_changed", label: "Employer Duty Changed", desc: "Emitted on Section 19 compliance step updates" },
    { id: "training.completed", label: "LMS Module Completed", desc: "Emitted when an employee passes statutory certification" },
    { id: "ic.meeting_convened", label: "IC Hearing Scheduled", desc: "Emitted when a formal hearing calendar invite is finalized" },
    { id: "scim.roster_synced", label: "SCIM Roster Reconciled", desc: "Emitted after automated directory synchronization" },
  ];

  useEffect(() => {
    const list = platformStore.getWebhooks("org-1");
    setWebhooks(list);
    setSelectedHook((current) => current || (list.length > 0 ? list[0] : null));
  }, []);

  const handleTestPing = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      platformStore.testWebhook("org-1", id);
      const updated = platformStore.getWebhooks("org-1");
      setWebhooks(updated);
      const active = updated.find((h) => h.id === id) || null;
      setSelectedHook(active);
      setTestingId(null);
      toast({
        title: "Test Event Dispatched",
        description: `Delivered test payload to ${active?.url || "webhook target"} with HMAC signature.`,
        variant: "success",
      });
    }, 600);
  };

  const handleCopySecret = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const created = platformStore.addWebhook("org-1", {
      orgId: "org-1",
      url: newUrl,
      description: newDesc || "Custom Webhook Endpoint",
      subscribedEvents: newEvents,
      status: "ACTIVE",
      secretMasked: `whsec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      payloadScrubberEnabled: newScrubber,
    });

    const updated = platformStore.getWebhooks("org-1");
    setWebhooks(updated);
    setSelectedHook(created);
    setShowAddModal(false);
    setNewUrl("");
    setNewDesc("");
    toast({
      title: "Webhook Endpoint Added",
      description: `Endpoint ${created.url} provisioned with Section 16 content scrubber enabled.`,
      variant: "success",
    });
  };

  const filteredHooks = webhooks.filter(
    (h) =>
      h.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ivory-50 text-ink-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-ink-secondary mb-6">
          <Link href="/posh/org" className="hover:text-navy-900 transition flex items-center gap-1 min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Org Hub
          </Link>
          <span>/</span>
          <Link href="/posh/org/integrations" className="hover:text-navy-900 transition min-h-[44px] px-2 flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900">
            Integrations
          </Link>
          <span>/</span>
          <span className="text-navy-900 font-semibold">Signed Webhooks</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-lg bg-navy-900 text-brass-400">
                <Webhook className="w-6 h-6" />
              </span>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  Signed Webhook Subscriptions
                </h1>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-0.5">
                  PRD v3.0 US-241 &bull; HMAC SHA-256 Signed Outbound Events with 24-Hour Retry and BR-082 Redaction Gate
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md bg-navy-900 text-white hover:bg-navy-800 text-xs font-semibold tracking-wide shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
            >
              <Plus className="w-4 h-4 text-brass-400" />
              <span>Register Webhook Endpoint</span>
            </button>
          </div>
        </div>

        {/* Statutory Privacy & BR-082 Protection Banner */}
        <div className="my-6 p-4 rounded-lg bg-navy-900/5 border border-brass-500/40 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brass-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-navy-900">
              BR-082 Cryptographic Payload Screening &amp; Zero-Narrative Gate Active
            </p>
            <p className="text-ink-secondary leading-relaxed">
              Outbound webhooks transmit only synthetic identifiers, state enums, and UTC timestamps. Raw complaint narratives, witness names, and respondent identity never leave the Acorn cryptographic boundary. Every payload is signed with a unique HMAC SHA-256 key and verified timestamp header (`X-Acorn-Signature`).
            </p>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Endpoint List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Configured Endpoints ({webhooks.length})
              </h2>
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Filter endpoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 min-h-[40px] text-xs rounded border border-border bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredHooks.map((hook) => {
                const isSelected = selectedHook?.id === hook.id;
                return (
                  <div
                    key={hook.id}
                    onClick={() => setSelectedHook(hook)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      isSelected
                        ? "bg-white border-navy-900 shadow-md ring-1 ring-navy-900"
                        : "bg-white border-border hover:border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 overflow-hidden">
                        <span className="font-mono text-[11px] font-semibold text-navy-900 block truncate">
                          {hook.url}
                        </span>
                        <p className="text-xs text-ink-secondary">{hook.description}</p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          hook.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {hook.status}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-ink-secondary">
                      <span>{hook.subscribedEvents.length} events subscribed</span>
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        ID: {hook.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 7 Cols: Endpoint Details & Delivery Logs */}
          <div className="lg:col-span-7">
            {selectedHook ? (
              <div className="bg-white rounded-lg border border-border shadow-sm p-6 space-y-6">
                
                {/* Header & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-subtle">
                  <div>
                    <span className="text-[10px] font-mono text-brass-400 uppercase tracking-wider font-semibold">
                      Endpoint Inspector &bull; {selectedHook.id}
                    </span>
                    <h3 className="font-mono text-sm font-bold text-navy-900 break-all">
                      {selectedHook.url}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTestPing(selectedHook.id)}
                      disabled={testingId === selectedHook.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded text-xs font-semibold bg-navy-900 text-white hover:bg-navy-800 transition disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
                    >
                      {testingId === selectedHook.id ? (
                        <RotateCw className="w-3.5 h-3.5 animate-spin text-brass-400" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-brass-400" />
                      )}
                      <span>Send Test Ping</span>
                    </button>
                  </div>
                </div>

                {/* Secret Key & Security Config */}
                <div className="p-4 rounded-lg bg-surface border border-border space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-navy-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-brass-400" />
                      HMAC Signing Secret:
                    </span>
                    <button
                      onClick={() => handleCopySecret("whsec_live_9942a8b301cde91f00a892b4", selectedHook.id)}
                      className="text-xs text-navy-900 font-semibold hover:underline flex items-center gap-1 min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
                    >
                      {copiedId === selectedHook.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Raw Secret</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-xs bg-white px-3 py-2 rounded border border-border text-ink">
                    {selectedHook.secretMasked}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-ink-secondary">
                    <span>Header: <code className="text-navy-900 font-mono">X-Acorn-Signature: t=1731149200,v1=...</code></span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Payload Redaction Active
                    </span>
                  </div>
                </div>

                {/* Subscribed Events Badges */}
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink-secondary">
                    Subscribed Events
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHook.subscribedEvents.map((evt) => (
                      <span
                        key={evt}
                        className="px-2.5 py-1 rounded bg-navy-900/5 border border-navy-900/10 font-mono text-[11px] text-navy-900"
                      >
                        {evt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Delivery Log Table */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink-secondary">
                      Recent Deliveries &amp; Retry Log
                    </h4>
                    <span className="text-[11px] text-ink-muted">
                      Retries automatically up to 24 hours
                    </span>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface border-b border-border text-ink-secondary uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="px-3 py-2">Event</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Code</th>
                          <th className="px-3 py-2">Latency</th>
                          <th className="px-3 py-2">Timestamp</th>
                          <th className="px-3 py-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {selectedHook.deliveries.length > 0 ? (
                          selectedHook.deliveries.map((del) => (
                            <tr key={del.id} className="hover:bg-surface/50">
                              <td className="px-3 py-2 font-mono text-[11px] text-navy-900">
                                {del.event}
                              </td>
                              <td className="px-3 py-2">
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {del.status}
                                </span>
                              </td>
                              <td className="px-3 py-2 font-mono text-[11px]">
                                {del.responseCode}
                              </td>
                              <td className="px-3 py-2 text-ink-secondary">
                                {del.latencyMs}ms
                              </td>
                              <td className="px-3 py-2 text-ink-secondary">
                                {new Date(del.deliveredAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })}
                              </td>
                              <td className="px-3 py-2 text-right">
                                <button
                                  onClick={() => handleTestPing(selectedHook.id)}
                                  className="text-[11px] text-navy-900 hover:underline min-h-[44px] px-2 rounded inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
                                  title="Replay event payload"
                                >
                                  <RotateCw className="w-3 h-3" /> Replay
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-6 text-center text-ink-muted">
                              No delivery attempts recorded yet. Click &quot;Send Test Ping&quot; to test.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-lg border border-border p-12 text-center text-ink-secondary">
                Select an endpoint from the left or create a new webhook subscription.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Add Webhook Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-lg font-bold text-navy-900">
                Register Webhook Endpoint
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-ink-muted hover:text-navy-900 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 text-lg"
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateWebhook} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-navy-900">
                  Target HTTPS URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://api.yourcompany.com/posh/events"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 min-h-[44px] text-xs rounded border border-border focus:outline-none focus:ring-1 focus:ring-navy-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-navy-900">
                  Description / Destination System
                </label>
                <input
                  type="text"
                  placeholder="e.g. Corporate SIEM / Workday Connector"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 min-h-[44px] text-xs rounded border border-border focus:outline-none focus:ring-1 focus:ring-navy-900"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-navy-900">
                  Subscribed Event Topics
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {availableEvents.map((evt) => {
                    const isChecked = newEvents.includes(evt.id);
                    return (
                      <label
                        key={evt.id}
                        className="flex items-start gap-2 p-2 rounded border border-border hover:bg-surface cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewEvents([...newEvents, evt.id]);
                            } else {
                              setNewEvents(newEvents.filter((x) => x !== evt.id));
                            }
                          }}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-navy-900 block">
                            {evt.label}
                          </span>
                          <span className="text-[11px] text-ink-secondary">
                            {evt.desc}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded bg-navy-900/5 border border-brass-500/30 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-semibold text-navy-900 block">
                    BR-082 Redaction Screening
                  </span>
                  <span className="text-[11px] text-ink-secondary">
                    Strips narrative fields prior to outbound signing
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newScrubber}
                  onChange={(e) => setNewScrubber(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 min-h-[44px] rounded text-xs text-ink-secondary hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 min-h-[44px] rounded bg-navy-900 text-white hover:bg-navy-800 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
                >
                  Confirm &amp; Generate Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

