"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  ShieldCheck,
  ShieldAlert,
  Users,
  FileText,
  Clock,
  ArrowLeft,
  Circle,
  Lock,
  Radio,
  CheckCircle2,
} from "lucide-react";

export default function VirtualHearingRoomPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "ACN-POSH-2026-0041";
  const hearingId = (params?.hid as string) || "vhr-0041-01";

  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [activeTab, setActiveTab] = useState<"DEPOSITION" | "ROSTER" | "ORDER">("DEPOSITION");
  const [depositionNotes, setDepositionNotes] = useState(
    "Hearing commenced at 14:02 IST. Presiding Officer verified quorum (3 members present, 66% women). Complainant affirmed truth of Exhibit A-01 statement under solemn affirmation. Scribe recording verbatim notes."
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Bar: Case & Quorum Status */}
      <div className="bg-[#050C17] border-b border-navy-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Link
            href={`/posh/ic/cases/${caseId}/hearings`}
            className="text-brass-400 hover:text-brass-300 font-mono inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Hearings List</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="font-mono font-bold text-white tracking-wider">{caseId}</span>
          <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>IN-CAMERA SESSION (SEC 11)</span>
          </span>
        </div>

        {/* Quorum Metric */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-slate-400">Section 4(2) Quorum:</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            3/3 CONFIRMED (PO + External + 1 Member)
          </span>
        </div>
      </div>

      {/* Main Grid: Video Stage & Scribe Panel */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Video Canvas Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#081224] rounded-lg border border-navy-800 p-4 relative overflow-hidden">
          
          {/* Active Speakers Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 mb-4">
            
            {/* Presiding Officer Stream */}
            <div className="relative bg-[#101F38] rounded-lg border border-brass-500/30 flex flex-col items-center justify-center min-h-[220px] overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-navy-800 border border-brass-400 flex items-center justify-center text-brass-300 text-xl font-serif font-bold">
                AM
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-[11px] font-sans flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Dr. Ananya Mukherjee (Presiding Officer)</span>
              </div>
            </div>

            {/* External Counsel Stream */}
            <div className="relative bg-[#101F38] rounded-lg border border-brass-500/30 flex flex-col items-center justify-center min-h-[220px] overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-navy-800 border border-brass-400 flex items-center justify-center text-brass-300 text-xl font-serif font-bold">
                DS
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-[11px] font-sans flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Adv. Debjani Sen (External Legal Member)</span>
              </div>
            </div>

            {/* Complainant Stream (Segregated) */}
            <div className="relative bg-[#0d1829] rounded-lg border border-navy-700/60 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-xl font-serif">
                CW
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-[11px] font-sans flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Complainant (In Camera Witness)</span>
              </div>
            </div>

            {/* Isolated Respondent Waiting Room Status */}
            <div className="relative bg-[#0a101d] rounded-lg border border-dashed border-navy-700 flex flex-col items-center justify-center min-h-[220px] text-center p-4">
              <Lock className="w-8 h-8 text-slate-500 mb-2" />
              <div className="text-xs font-semibold text-slate-300">Segregated Waiting Lounge</div>
              <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                Respondent is currently staged in isolated virtual lobby awaiting Complainant cross-deposition per BR-085.
              </p>
              <button className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded font-mono transition">
                Admit to Hearing
              </button>
            </div>

          </div>

          {/* Controls Dock */}
          <div className="bg-[#050C17] border border-navy-800 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-2 rounded-full border transition ${
                  micActive ? "bg-slate-800 text-white border-slate-700" : "bg-rose-950 text-rose-300 border-rose-500"
                }`}
              >
                {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideoActive(!videoActive)}
                className={`p-2 rounded-full border transition ${
                  videoActive ? "bg-slate-800 text-white border-slate-700" : "bg-rose-950 text-rose-300 border-rose-500"
                }`}
              >
                {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>E2EE 256-bit Secure Audio Log</span>
              </span>
            </div>

            <button
              onClick={() => alert("Session adjourned by Presiding Officer. Deposition minutes saved to docket.")}
              className="px-3.5 py-1.5 bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold rounded transition"
            >
              Adjourn Hearing
            </button>
          </div>

        </div>

        {/* Deposition & Procedural Scribe (4 cols) */}
        <div className="lg:col-span-4 bg-[#081224] rounded-lg border border-navy-800 flex flex-col justify-between overflow-hidden">
          {/* Scribe Tabs */}
          <div className="flex items-center border-b border-navy-800 bg-[#050C17] text-xs">
            <button
              onClick={() => setActiveTab("DEPOSITION")}
              className={`flex-1 py-3 font-semibold transition border-b-2 text-center ${
                activeTab === "DEPOSITION"
                  ? "border-brass-400 text-brass-300 bg-[#101F38]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Deposition Scribe
            </button>
            <button
              onClick={() => setActiveTab("ROSTER")}
              className={`flex-1 py-3 font-semibold transition border-b-2 text-center ${
                activeTab === "ROSTER"
                  ? "border-brass-400 text-brass-300 bg-[#101F38]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Quorum Roster
            </button>
          </div>

          {/* Scribe Content */}
          <div className="p-4 flex-1 flex flex-col space-y-3">
            {activeTab === "DEPOSITION" ? (
              <>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Official In-Camera Minutes</span>
                  <span className="text-[10px] font-mono text-emerald-400">Auto-Saving to Hash Chain</span>
                </div>
                <textarea
                  value={depositionNotes}
                  onChange={(e) => setDepositionNotes(e.target.value)}
                  className="flex-1 w-full bg-[#050C17] border border-navy-800 rounded p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-brass-500 resize-none"
                />
                <button
                  onClick={() => alert("Deposition recorded and sealed with SHA-256 custody checksum.")}
                  className="w-full py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 text-xs font-semibold rounded border border-brass-500/30 transition"
                >
                  Seal &amp; Inscribe Deposition Record
                </button>
              </>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#050C17] border border-navy-800 rounded space-y-1">
                  <div className="font-bold text-white">Dr. Ananya Mukherjee</div>
                  <div className="text-brass-400 text-[11px]">Presiding Officer (Senior Woman)</div>
                  <div className="text-emerald-400 text-[10px] font-mono">Present • Audio Verified</div>
                </div>
                <div className="p-3 bg-[#050C17] border border-navy-800 rounded space-y-1">
                  <div className="font-bold text-white">Adv. Debjani Sen</div>
                  <div className="text-brass-400 text-[11px]">External Member (Acorn Legal)</div>
                  <div className="text-emerald-400 text-[10px] font-mono">Present • Audio Verified</div>
                </div>
                <div className="p-3 bg-[#050C17] border border-navy-800 rounded space-y-1">
                  <div className="font-bold text-white">Ms. Rita Basu</div>
                  <div className="text-brass-400 text-[11px]">Employee Member</div>
                  <div className="text-emerald-400 text-[10px] font-mono">Present • Audio Verified</div>
                </div>
                <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] rounded text-center font-bold">
                  Quorum Valid under Section 4(2)
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

