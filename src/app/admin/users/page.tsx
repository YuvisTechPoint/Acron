"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, ArrowLeft, ShieldCheck, UserCheck, Plus, CheckCircle2 } from "lucide-react";

export default function AdminUsersRBACPage() {
  const [users, setUsers] = useState([
    { id: "u-1", name: "Adv. Subhasish Mukherjee", email: "subhasish@acornlegal.in", role: "Super Admin / Managing Partner", status: "Active", mfa: true },
    { id: "u-2", name: "Adv. Debjani Sen", email: "debjani.sen@acornlegal.in", role: "Partner & External Member", status: "Active", mfa: true },
    { id: "u-3", name: "Dr. Ananya Mukherjee", email: "ananya.m@kolkatacloud.com", role: "IC Presiding Officer (TechKol)", status: "Active", mfa: true },
    { id: "u-4", name: "Operations Support Desk", email: "support@acornlegal.in", role: "Support Executive", status: "Active", mfa: true },
    { id: "u-5", name: "Finance Accounts Desk", email: "finance@acornlegal.in", role: "Finance Administrator", status: "Active", mfa: true },
  ]);

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
                Access Control &bull; RBAC
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Staff &amp; Portal Account Management
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
            <span className="font-bold text-ink uppercase tracking-wider text-[11px]">
              Active User Accounts &amp; Multi-Factor Enrolment
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">&check; Mandatory TOTP MFA Enabled</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-surface/50 border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Email (Login ID)</th>
                <th className="p-3.5">Assigned Roles</th>
                <th className="p-3.5">MFA Status</th>
                <th className="p-3.5 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface/50">
                  <td className="p-3.5 font-semibold text-ink">{u.name}</td>
                  <td className="p-3.5 text-ink-secondary font-mono">{u.email}</td>
                  <td className="p-3.5 font-medium text-primary">{u.role}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      TOTP VERIFIED
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                      {u.status}
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

