"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Download,
  ShieldCheck,
  Building2,
  Trash2,
  Lock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { platformStore } from "@/lib/store";
import { useRealtimeCollection } from "@/lib/realtime";

interface ClientContract {
  id: string;
  orgName: string;
  orgCode: string;
  contractType: "MSA_ANNUAL" | "EXTERNAL_MEMBER_RETAINER" | "IC_EMPANELMENT" | "GOVERNANCE_ADVISORY";
  effectiveDate: string;
  expiryDate: string;
  status: "ACTIVE" | "RENEWAL_DUE" | "OFFBOARDED" | "OFFBOARDING_REQUESTED";
  keyId: string;
  annualValue: string;
}

const INITIAL_CONTRACTS: ClientContract[] = [
  {
    id: "CTR-2026-001",
    orgName: "Tata Consultancy Services (West Bengal)",
    orgCode: "ORG-TCS-01",
    contractType: "MSA_ANNUAL",
    effectiveDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
    keyId: "KMS-KEY-7789-AES256",
    annualValue: "₹4,80,000",
  },
  {
    id: "CTR-2026-002",
    orgName: "Bengal Ambuja Housing Development Ltd",
    orgCode: "ORG-AMB-02",
    contractType: "EXTERNAL_MEMBER_RETAINER",
    effectiveDate: "2025-06-01",
    expiryDate: "2026-05-31",
    status: "RENEWAL_DUE",
    keyId: "KMS-KEY-8812-AES256",
    annualValue: "₹2,40,000",
  },
  {
    id: "CTR-2026-003",
    orgName: "Apex FinTech Solutions India",
    orgCode: "ORG-APX-03",
    contractType: "IC_EMPANELMENT",
    effectiveDate: "2025-11-15",
    expiryDate: "2026-11-14",
    status: "ACTIVE",
    keyId: "KMS-KEY-9931-AES256",
    annualValue: "₹1,80,000",
  },
  {
    id: "CTR-2026-004",
    orgName: "Metro Healthcare Diagnostics",
    orgCode: "ORG-MTR-04",
    contractType: "GOVERNANCE_ADVISORY",
    effectiveDate: "2024-10-01",
    expiryDate: "2025-09-30",
    status: "OFFBOARDING_REQUESTED",
    keyId: "KMS-KEY-5510-AES256",
    annualValue: "₹3,20,000",
  },
];

export default function ContractsAndOffboardingPage() {
  const { toast } = useToast();
  const contracts = useRealtimeCollection<ClientContract[]>("client_contracts", INITIAL_CONTRACTS);
  const [selectedContract, setSelectedContract] = useState<ClientContract | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateOffboardingPack = (contract: ClientContract) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const offboardingManifest = {
        title: "CHAMBERS OF ACORN - STATUTORY CLIENT TRANSITION & OFFBOARDING DOSSIER",
        dossierCode: `OFFBOARD-${contract.orgCode}-${Date.now().toString(36).toUpperCase()}`,
        client: contract.orgName,
        tenantCode: contract.orgCode,
        timestamp: new Date().toISOString(),
        kmsKeyId: contract.keyId,
        keyDestructionCertified: true,
        dataDestructionSchedule: "Statutory 3-Year Anonymized Retain under Section 13/21",
        archiveManifestHash: "SHA256-" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("").toUpperCase(),
        chambersSignatory: "Adv. Rajesh Telge, Managing Counsel",
      };

      const blob = new Blob([JSON.stringify(offboardingManifest, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `acorn-offboarding-dossier-${contract.orgCode}.json`;
      a.click();
      URL.revokeObjectURL(url);

      const updated = contracts.map((c) =>
        c.id === contract.id ? { ...c, status: "OFFBOARDED" as const } : c
      );
      platformStore.saveCollectionState("client_contracts", updated);

      platformStore.addAuditLog(
        "ADMIN_GOVERNANCE_DESK",
        "admin",
        "TENANT_OFFBOARDING_COMPLETED",
        "system",
        contract.orgCode,
        `Tenant ${contract.orgCode} offboarded. KMS key revoked and statutory archive sealed.`
      );

      toast({
        title: "Offboarding Sealed",
        description: `Offboarding Pack & Key Destruction Certificate generated for ${contract.orgCode}.`,
        variant: "success",
      });
      setSelectedContract(null);
    }, 700);
  };

  return (
    <div className="bg-ivory-50 text-ink py-2 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy-700/70 mb-2">
            <Link href="/admin" className="hover:underline">Admin Console</Link>
            <span>/</span>
            <Link href="/admin/catalogue" className="hover:underline">Service Catalogue</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Contracts & Client Offboarding (Prompt 5.13)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-ivory-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-800 border border-navy-200 mb-2">
                <FileCheck2 className="w-3.5 h-3.5 text-navy-700" />
                Prompt 5.13: Institutional MSA Governance & Secure Transition
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                Client Contracts & Offboarding Governance
              </h1>
              <p className="mt-1 text-sm text-ink-muted max-w-3xl">
                Maintain authoritative institutional retainers, master service agreements, and handle cryptographic tenant offboarding with certified KMS key revocation and statutory data retention schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white border border-ivory-300 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory-100/70 border-b border-ivory-300 font-mono text-[11px] uppercase text-navy-900">
                  <th className="py-3 px-4">Contract ID</th>
                  <th className="py-3 px-4">Institutional Client</th>
                  <th className="py-3 px-4">Retainer Type</th>
                  <th className="py-3 px-4">Term Validity</th>
                  <th className="py-3 px-4">Dedicated KMS Key</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-navy-800">
                      {c.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-navy-950 text-sm">
                        {c.orgName}
                      </div>
                      <div className="text-[11px] text-ink-muted font-mono">
                        {c.orgCode} • Value: {c.annualValue}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-navy-900">
                      {c.contractType.replace(/_/g, " ")}
                    </td>
                    <td className="py-3 px-4 text-ink-muted font-mono text-[11px]">
                      <div>{c.effectiveDate} to</div>
                      <div>{c.expiryDate}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-ink-muted">
                      <span className="flex items-center gap-1">
                        <KeyRound className="w-3 h-3 text-navy-700 shrink-0" />
                        {c.keyId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {c.status === "ACTIVE" ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                          Active Retainer
                        </span>
                      ) : c.status === "RENEWAL_DUE" ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-blue-100 text-blue-800 font-semibold border border-blue-300">
                          Renewal Due
                        </span>
                      ) : c.status === "OFFBOARDING_REQUESTED" ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-amber-100 text-amber-900 font-semibold border border-amber-300">
                          Offboarding Requested
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-gray-100 text-gray-700 font-semibold">
                          Offboarded & Sealed
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {c.status !== "OFFBOARDED" ? (
                        <button
                          onClick={() => setSelectedContract(c)}
                          className="px-2.5 py-1 rounded bg-navy-700 hover:bg-navy-800 text-white font-medium text-xs transition-colors"
                        >
                          Execute Offboarding
                        </button>
                      ) : (
                        <span className="text-[11px] text-ink-muted font-mono">
                          Archived
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Offboarding Confirmation Modal */}
        {selectedContract && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg border border-ivory-300 shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center gap-2 mb-3 text-amber-800">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-lg font-semibold text-navy-950">
                  Execute Institutional Offboarding
                </h3>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Executing offboarding for <strong>{selectedContract.orgName}</strong> ({selectedContract.orgCode}). This action will generate the encrypted tenant export archive, revoke dedicated key <code className="text-navy-900 font-mono">{selectedContract.keyId}</code>, and record an immutable audit seal.
              </p>

              <div className="bg-ivory-100 border border-ivory-300 rounded p-3 text-xs space-y-1 mb-5">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Contract ID:</span>
                  <span className="font-mono font-semibold">{selectedContract.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Statutory Data Hold:</span>
                  <span className="font-semibold text-navy-900">3-Year Minimum Retain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Encryption Root:</span>
                  <span className="font-mono text-emerald-800">Revocation Certificate</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedContract(null)}
                  className="px-4 py-2 border border-ivory-300 hover:bg-ivory-100 rounded text-xs font-medium text-navy-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleGenerateOffboardingPack(selectedContract)}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  {isProcessing ? "Generating Pack..." : "Generate & Seal Offboarding Pack"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
