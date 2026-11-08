"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  PhoneCall,
  Smartphone,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  LogOut,
} from "lucide-react";

export default function PoshChannelsPage() {
  const [quickExitActive, setQuickExitActive] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackRequested, setCallbackRequested] = useState(false);

  const triggerQuickExit = () => {
    // Instantly purge session & redirect
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      window.location.replace("https://www.accuweather.com/en/in/kolkata/206690/weather-forecast/206690");
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackNumber) return;
    setCallbackRequested(true);
  };

  return (
    <div className={`min-h-screen ${isLowBandwidth ? "bg-white text-black" : "bg-slate-50 text-slate-800"} pb-20`}>
      {/* Quick Exit Emergency Floater */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={triggerQuickExit}
          className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-full shadow-lg flex items-center gap-2 border border-rose-500 transition-all hover:scale-105"
          title="Instantly leave this site and open weather news"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Quick Exit (Esc)</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Inclusive Access Channels</span>
                <span>•</span>
                <span>PRD Section 34 (E26)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Omnichannel Intake &amp; Anonymous Access
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl font-sans">
                Access statutory POSH guidance via encrypted messaging, callback telephony, or cryptographic tokenized threads without leaving digital footprints.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLowBandwidth(!isLowBandwidth)}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
                  isLowBandwidth
                    ? "bg-amber-400 text-black border-amber-500 font-bold"
                    : "bg-[#101F38] text-brass-300 border-brass-500/30"
                }`}
              >
                {isLowBandwidth ? "2G Mode: ON" : "Toggle 2G Text Mode"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Channel 1: WhatsApp Verified Gateway */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">WhatsApp Enterprise Bot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interact with the Chambers guidance concierge via Meta-verified end-to-end encryption. Content-free callbacks only.
              </p>
              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded">
                Number: +91 (033) 2486-7700
              </div>
            </div>

            <a
              href="https://wa.me/9103324867700?text=I%20wish%20to%20receive%20confidential%20POSH%20information"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition text-center block"
            >
              Start WhatsApp Session
            </a>
          </div>

          {/* Channel 2: Anonymous Cryptographic Token Line */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-50 border border-navy-200 flex items-center justify-center text-navy-800">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Anonymous Token Desk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ask questions directly to an Acorn External IC Member with a self-destructing secret token. Zero IP or browser fingerprinting.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 p-2 rounded">
                BR-086 Zero Footprint Mode
              </div>
            </div>

            <Link
              href="/posh/anonymous"
              className="w-full py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition text-center block"
            >
              Open Anonymous Thread
            </Link>
          </div>

          {/* Channel 3: Confidential Voice Callback */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Chambers Voice Callback</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Request a discreet phone callback from our statutory compliance officer within 2 business hours.
              </p>

              {callbackRequested ? (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded text-xs font-medium">
                  ✓ Callback queued. We will call from an unlisted Chambers number.
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-2">
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile number"
                    value={callbackNumber}
                    onChange={(e) => setCallbackNumber(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-brass-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-medium transition"
                  >
                    Request Secure Call
                  </button>
                </form>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-center">
              Available Mon–Sat: 9:30 AM – 7:30 PM IST
            </div>
          </div>

        </div>

        {/* Safety & Discretion Guide */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-base text-slate-900">Your Privacy &amp; Digital Safety Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-slate-800 block">Use Incognito / Private Browsing</strong>
              <p className="text-[11px]">Prevent your web browser history from recording URLs or search queries.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-slate-800 block">Do Not Use Shared Work Devices</strong>
              <p className="text-[11px]">Company-issued laptops may have screen logging or network proxy monitoring.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-slate-800 block">Hit Quick Exit Anytime</strong>
              <p className="text-[11px]">The red button in the top right will instantly close this page and open AccuWeather.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

