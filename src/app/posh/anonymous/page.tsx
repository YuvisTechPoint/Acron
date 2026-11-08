"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Send,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Copy,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { AnonymousThread } from "@/lib/types";

export default function PoshAnonymousPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [activeToken, setActiveToken] = useState<string>("anon-tk-7729-hash");
  const [newMessage, setNewMessage] = useState("");
  const [copyNotice, setCopyNotice] = useState(false);
  const [threads, setThreads] = useState<AnonymousThread[]>(platformStore.getAnonymousThreads());

  const currentThread = threads.find((t) => t.tokenHash === activeToken) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    platformStore.sendAnonymousMessage(currentThread.tokenHash, newMessage, "COMPLAINANT");
    setThreads(platformStore.getAnonymousThreads());
    setNewMessage("");

    // Simulate IC Member reply
    setTimeout(() => {
      platformStore.sendAnonymousMessage(
        currentThread.tokenHash,
        "Thank you for sharing this. An Acorn legal advisor has received your query. In-camera conciliation or a Section 9 inquiry can be initiated at your discretion.",
        "IC_EXTERNAL_MEMBER"
      );
      setThreads(platformStore.getAnonymousThreads());
    }, 1500);
  };

  const handleGenerateNew = () => {
    const newToken = `anon-tok-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
    setActiveToken(newToken);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(currentThread.tokenHash);
    setCopyNotice(true);
    setTimeout(() => setCopyNotice(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Cryptographic Protected Inquiries</span>
                <span>•</span>
                <span>PRD BR-086</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Anonymous Token Advisory Desk
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl font-sans">
                Communicate directly with an Acorn External IC Member. No account, email, or telephone number required. Zero IP address logging.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                Zero Footprint Mode: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Token Custody Warning */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3">
          <KeyRound className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-950 uppercase tracking-wider text-[11px]">
              Secret Token Custody (Save Immediately)
            </span>
            <p className="leading-relaxed">
              Your secret token is the only key to access this exchange. Because no personal data or email is recorded, <strong>if you lose this token, the conversation cannot be recovered</strong> by anyone, including system administrators.
            </p>
          </div>
        </div>

        {/* Current Token Banner */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400">Active Token:</span>
            <strong className="text-navy-900 bg-slate-100 px-2.5 py-1 rounded select-all">
              {currentThread.tokenHash}
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToken}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition font-medium inline-flex items-center gap-1.5"
            >
              {copyNotice ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyNotice ? "Copied!" : "Copy Secret Token"}</span>
            </button>
            <button
              onClick={handleGenerateNew}
              className="px-3 py-1 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded transition font-medium"
            >
              Generate New Token
            </button>
          </div>
        </div>

        {/* Messaging Box */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-[460px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-900">Encrypted Consultation Channel</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Acorn External Member Presiding</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Retention: 30 Days from Last Message
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {currentThread.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "COMPLAINANT" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-lg leading-relaxed ${
                    m.sender === "COMPLAINANT"
                      ? "bg-[#101F38] text-white rounded-br-none"
                      : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  {m.sender === "COMPLAINANT" ? "You (Anonymous)" : "Adv. Debjani Sen (Acorn)"} • {new Date(m.sentAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your question or situation details here (confidential)..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-brass-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded-md text-xs font-medium transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Elevation to Formal Complaint Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-sm text-slate-900">Ready to initiate formal statutory action?</h3>
            <p className="text-xs text-slate-600">
              You can transition your discussion into a formal Section 9 inquiry or non-monetary conciliation under the POSH Act.
            </p>
          </div>
          <Link
            href="/posh/file"
            className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition inline-flex items-center gap-1.5 shrink-0"
          >
            <span>File Statutory Complaint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

