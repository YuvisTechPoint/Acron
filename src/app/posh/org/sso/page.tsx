"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  Server,
  Globe,
  Users,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SSOConfiguration } from "@/lib/types";

export default function OrgSSOPage() {
  const [configs, setConfigs] = useState<SSOConfiguration[]>(platformStore.getSSOConfigs());
  const [selectedOrg, setSelectedOrg] = useState<string>("TECHKOL");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState<string | null>(null);

  const activeConfig = configs.find((c) => c.orgCode === selectedOrg) || configs[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const verifyDns = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const updated = configs.map((c) => {
        if (c.orgCode === selectedOrg) {
          return { ...c, verified: true };
        }
        return c;
      });
      setConfigs(updated);
      platformStore.saveSSOConfig({ ...activeConfig, verified: true });
      setIsVerifying(false);
    }, 1200);
  };

  const simulateScimLeaver = () => {
    setSimulationStatus("Initiating SCIM Deactivation Event...");
    setTimeout(() => {
      setSimulationStatus(
        "BR-081 Verified: User 'dr.ananya@techkolkata.io' deactivated in 12s. Presiding Officer vacancy alert dispatched to Board of Directors with 30-day statutory clock."
      );
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Enterprise Identity &amp; Access Architecture</span>
                <span>•</span>
                <span>PRD Section 31 (E20 &amp; E21)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Single Sign-On (SSO) &amp; SCIM 2.0 Provisioning
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Configure corporate IdP federation via SAML 2.0 or OIDC. Directory groups grant organizational oversight roles only; case roles are sealed behind Section 16 IC appointments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Employer Tenant:</span>
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="bg-[#101F38] border border-brass-500/30 text-brass-300 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-brass-400 font-mono"
              >
                <option value="TECHKOL">TECHKOL (Kolkata Cloud Tech)</option>
                <option value="BENGALIND">BENGALIND (Bengal Precision Eng.)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Statutory Governance Card */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-950 uppercase tracking-wider text-[11px]">
              Business Rules BR-080 &amp; BR-081 Active
            </span>
            <p className="leading-relaxed">
              <strong>BR-080:</strong> Directory group mappings grant organizational roles only (e.g. Org HR, Admin). They can <em>never</em> grant access to individual POSH complaints or case proceedings.<br />
              <strong>BR-081:</strong> SCIM deactivation must execute within 1 minute. If a departing user is an active Internal Committee Presiding Officer, a statutory notification is immediately dispatched to ensure quorum compliance.
            </p>
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Federation & Identity Setup */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Protocol & Endpoints */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-brass-600" />
                  <h2 className="font-serif font-bold text-base text-slate-900">Federated Identity Configuration</h2>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                  activeConfig.verified ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  {activeConfig.verified ? "DOMAIN VERIFIED" : "PENDING DNS PROOF"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">SSO Protocol</label>
                  <div className="font-mono bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800 font-bold">
                    {activeConfig.protocol === "SAML2" ? "SAML 2.0 Web Browser SSO" : "OpenID Connect (OIDC Authorization Code)"}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1">IdP Entity ID / Issuer</label>
                  <div className="font-mono bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800 truncate" title={activeConfig.entityId}>
                    {activeConfig.entityId}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-500 font-medium mb-1">IdP Single Sign-On URL</label>
                  <div className="font-mono bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800 truncate">
                    {activeConfig.ssoUrl}
                  </div>
                </div>

                {activeConfig.certificateFingerprint && (
                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 font-medium mb-1">X.509 Certificate SHA-256 Fingerprint</label>
                    <div className="font-mono bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600 text-[11px] break-all">
                      {activeConfig.certificateFingerprint}
                    </div>
                  </div>
                )}
              </div>

              {/* DNS Verification Section */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900">Domain Ownership Verification</h3>
                    <p className="text-[11px] text-slate-500">Publish this TXT record to your root DNS zone before live activation.</p>
                  </div>
                  <button
                    onClick={verifyDns}
                    disabled={isVerifying || activeConfig.verified}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
                    <span>{isVerifying ? "Querying DNS..." : activeConfig.verified ? "Verified ✓" : "Verify TXT Record"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono">
                  <span className="text-slate-700 select-all">{activeConfig.domainTxtRecord}</span>
                  <button
                    onClick={() => handleCopy(activeConfig.domainTxtRecord, "txt")}
                    className="text-slate-400 hover:text-slate-700 transition"
                    title="Copy TXT record"
                  >
                    {copyFeedback === "txt" ? <span className="text-emerald-600 text-[10px] font-sans">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* SCIM 2.0 Automated Deprovisioning */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brass-600" />
                  <h2 className="font-serif font-bold text-base text-slate-900">SCIM 2.0 User Provisioning &amp; Leaver Guard</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  SCIM 2.0 RFC 7644
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">SCIM Base Endpoint</label>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-3 py-2 font-mono">
                    <span className="text-slate-800">https://acornlegal.in/api/scim/v2/Users</span>
                    <button
                      onClick={() => handleCopy("https://acornlegal.in/api/scim/v2/Users", "scim-url")}
                      className="text-slate-400 hover:text-slate-700 transition"
                    >
                      {copyFeedback === "scim-url" ? <span className="text-emerald-600 text-[10px] font-sans">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1">Bearer Token (Masked for Security)</label>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-3 py-2 font-mono">
                    <span className="text-slate-800">{activeConfig.scimTokenMasked}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-sans">Rotated 30d ago</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1">Statutory Leaver Handling Policy (BR-081)</label>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900">Automatic PO Resignation &amp; Gazette Alert</div>
                    <p className="text-[11px] text-slate-500">
                      When SCIM issues <code>DELETE /Users/{`{id}`}</code> or sets <code>active=false</code>, access terminates immediately (&lt;60s). If user holds an IC post, an urgent statutory vacancy advisory is generated.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={simulateScimLeaver}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-xs transition border border-slate-300 inline-flex items-center gap-2"
                  >
                    <span>Simulate SCIM Leaver Webhook Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {simulationStatus && (
                    <div className="mt-3 p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                      {simulationStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Directory Group Mapping Rules (BR-080) */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-base text-slate-900">Directory Group Role Mapping</h3>
                <p className="text-xs text-slate-500 mt-0.5">Map corporate directory groups to tenant workspace tiers.</p>
              </div>

              <div className="space-y-3">
                {activeConfig.groupMappings.map((gm, idx) => (
                  <div key={idx} className="p-3 rounded border border-slate-100 bg-slate-50/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-semibold text-navy-900 text-[11px]">{gm.idpGroup}</span>
                      <span className="px-2 py-0.5 rounded bg-navy-100 text-navy-800 text-[10px] font-bold">
                        {gm.internalRole}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Grants tenant portal access. Sealed from case proceeding records.
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="p-3 rounded bg-blue-50/70 border border-blue-200 text-blue-900 text-[11px] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Section 16 Statutory Protection</span>
                  </div>
                  <p>
                    POSH Act Section 16 prohibits anyone outside the appointed Internal Committee from viewing case files. Corporate directory groups cannot override this barrier.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 text-xs space-y-3">
              <div className="font-semibold text-slate-800">Related Enterprise Portals</div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/posh/org/integrations" className="hover:text-brass-600 transition flex items-center justify-between">
                    <span>HRMS Connectors (Zoho/Keka)</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/posh/org/audit-packs" className="hover:text-brass-600 transition flex items-center justify-between">
                    <span>Section 19 Inspection-Ready Audit Packs</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/posh/org" className="hover:text-brass-600 transition flex items-center justify-between">
                    <span>Employer Governance Dashboard</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
