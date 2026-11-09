"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Key,
  ShieldCheck,
  Plus,
  Copy,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Code2,
  Terminal,
  Lock,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { APIClientCredential } from "@/lib/types";

export default function OrgAPIKeysPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const [clients, setClients] = useState<APIClientCredential[]>(platformStore.getAPIClients(selectedOrgId));

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["roster.read", "compliance.read"]);
  const [ipAllowlistText, setIpAllowlistText] = useState("103.21.244.0/22");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const ips = ipAllowlistText
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean);

    platformStore.addAPIClient(selectedOrgId, {
      orgId: selectedOrgId,
      clientName: newClientName,
      clientId: `acorn_live_cli_${Math.random().toString(36).substring(2, 8)}`,
      secretHash: `sha256:${Math.random().toString(36).repeat(3)}`,
      secretMasked: `ak_live_••••••••••••••••${Math.random().toString(36).substring(2, 6)}`,
      scopes: selectedScopes,
      ipAllowlist: ips,
      status: "ACTIVE",
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    });

    setClients(platformStore.getAPIClients(selectedOrgId));
    setNewClientName("");
    setShowCreateModal(false);
  };

  const handleRevoke = (id: string) => {
    if (confirm("Are you sure you want to revoke this API client? All automated scripts using these credentials will be immediately blocked.")) {
      platformStore.revokeAPIClient(selectedOrgId, id);
      setClients(platformStore.getAPIClients(selectedOrgId));
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/org/webhooks" className="text-navy-800 font-semibold hover:underline">
              Outbound Webhooks (US-241) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-700">
              <Key className="w-4 h-4 text-brass-600" />
              <span>PRD v3.0 &bull; Section 31 (US-239 &amp; US-240) Client API Gateway</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950">
              Client API Credentials &amp; Access Tokens
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-2xl leading-relaxed">
              Programmatic REST integration for enterprise HRMS, automated roster synchronization, and executive compliance telemetry. Protected by OAuth 2.0 client credentials, IP allowlisting, and BR-082 payload screening.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-semibold rounded shadow transition flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-brass-400" />
            <span>Provision New API Client</span>
          </button>
        </div>

        {/* Active Credentials Table */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-ink-950">Active API Client Applications</h2>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              TLS 1.3 &bull; Encrypted Token Store
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface text-ink-secondary uppercase tracking-wider text-[10px] border-b border-border">
                <tr>
                  <th className="py-2.5 px-3">Application Name</th>
                  <th className="py-2.5 px-3">Client ID</th>
                  <th className="py-2.5 px-3">Secret Key</th>
                  <th className="py-2.5 px-3">Granted Scopes</th>
                  <th className="py-2.5 px-3">IP Restrictions</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-white">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-ink">{c.clientName}</div>
                      <div className="text-[10px] text-ink-muted">Created: {new Date(c.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-navy-800 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span>{c.clientId}</span>
                        <button
                          onClick={() => handleCopy(c.clientId, c.id + "_id")}
                          className="text-slate-400 hover:text-ink"
                          title="Copy Client ID"
                        >
                          {copiedKey === c.id + "_id" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      {c.secretMasked}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {c.scopes.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {c.ipAllowlist.join(", ")}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {c.status === "ACTIVE" && (
                        <button
                          onClick={() => handleRevoke(c.id)}
                          className="text-rose-600 hover:text-rose-800 font-semibold text-[11px] inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Revoke</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Developer Documentation & Code Snippet */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex items-center gap-2 font-serif font-bold text-base text-ink-950">
            <Terminal className="w-4 h-4 text-brass-600" />
            <span>Interactive Integration Quickstart (OAuth 2.0)</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg text-slate-200 font-mono text-xs overflow-x-auto space-y-3">
            <div className="text-slate-400 text-[11px]"># 1. Exchange client credentials for temporary JWT access token (valid 3600s)</div>
            <div className="text-emerald-400">
              curl -X POST https://api.acornlegal.in/v1/oauth/token \<br />
              &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br />
              &nbsp;&nbsp;-d &apos;&#123;&quot;grant_type&quot;: &quot;client_credentials&quot;, &quot;client_id&quot;: &quot;acorn_live_cli_techkol_7718&quot;, &quot;client_secret&quot;: &quot;your_secret_key&quot;&#125;&apos;
            </div>

            <div className="text-slate-400 text-[11px] pt-2"># 2. Query statutory compliance summary (BR-076 Small-Cell Suppression enforced)</div>
            <div className="text-emerald-400">
              curl -X GET https://api.acornlegal.in/v1/compliance/summary \<br />
              &nbsp;&nbsp;-H &quot;Authorization: Bearer eyJhbGciOiJIUzI1NiIs...&quot;
            </div>
          </div>
        </div>

        {/* Modal: Provision New Client */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
            <div className="bg-white rounded-card border border-border shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-serif font-bold text-lg text-ink-950">Provision API Client Credentials</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-ink font-bold">✕</button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">Application / Integration Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SAP SuccessFactors Daily Sync"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">IP Range Allowlist (CIDR, comma separated)</label>
                  <input
                    type="text"
                    required
                    value={ipAllowlistText}
                    onChange={(e) => setIpAllowlistText(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded font-mono"
                  />
                  <span className="text-[10px] text-ink-muted">Requests from unauthorized IP addresses will receive 403 Forbidden.</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-ink-900 block">Authorized Scopes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["roster.read", "compliance.read", "training.write", "events.subscribe"].map((scope) => (
                      <label key={scope} className="flex items-center gap-2 p-2 bg-surface rounded border border-border cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedScopes.includes(scope)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedScopes([...selectedScopes, scope]);
                            else setSelectedScopes(selectedScopes.filter((s) => s !== scope));
                          }}
                          className="rounded text-navy-800"
                        />
                        <span className="font-mono text-[11px]">{scope}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-950 text-[11px] space-y-1">
                  <strong>Security Directive BR-082:</strong> Case complaint narrative, party names, and witness depositions cannot be accessed via Client APIs under any scope.
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-border rounded text-ink font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-800 hover:bg-navy-900 text-ivory-50 rounded font-semibold"
                  >
                    Generate Credentials
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

