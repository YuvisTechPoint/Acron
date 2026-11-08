"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  CheckCircle2,
  Building,
  Shield,
  ArrowRight,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { platformStore } from "@/lib/store";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Rule,
  Card,
  Input,
  Textarea,
  Checkbox,
} from "@/components/ui";
import { ChambersMap } from "@/components/chambers-map";

export default function ContactPage() {
  const [siteConfig, setSiteConfig] = useState(platformStore.getSiteConfig());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setSiteConfig(platformStore.getSiteConfig());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = platformStore.addServiceRequest({
      fullName: name,
      email: email,
      phone: phone,
      subject: "General Contact Inquiry",
      description: message,
      preferredChannel: "email",
      serviceCategory: "general_counsel",
      urgency: "standard",
    });
    setSubmittedRef(req.refNumber || `CONT-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Editorial Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">Home</Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">Contact</span>
          </nav>

          <Eyebrow>CHAMBERS INTAKE &amp; LOCATION</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Contact Our <span className="font-serif italic font-normal text-brass-700">Chambers</span>.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            Reach our Kolkata chambers for privileged consultations, statutory compliance reviews, and commercial dispute assessments.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16">
        
        {/* 1. Three Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Chambers Address */}
          <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">Chambers Location</h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {siteConfig.addressLine1}<br />
              {siteConfig.addressLine2}<br />
              {siteConfig.city}, {siteConfig.state} {siteConfig.postalCode}
            </p>
            <div className="pt-2 text-xs text-brass-700 font-semibold">
              In-person visits by prior appointment
            </div>
          </div>

          {/* Card 2: Telephone Desk */}
          <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">Chambers Telephony</h3>
            <div className="space-y-1 text-sm font-sans">
              <div>
                <span className="text-ink-muted text-xs block">Main Chambers Desk</span>
                <a href={`tel:${siteConfig.receptionPhone || BRAND_CONFIG.phone}`} className="font-semibold text-navy-700 hover:underline">
                  {siteConfig.receptionPhone || BRAND_CONFIG.phone}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-ink-muted text-xs block">Working Hours</span>
                <span className="text-ink-secondary text-xs">{siteConfig.operatingHours || "Mon – Sat: 9:30 AM – 7:30 PM IST"}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Electronic Correspondence */}
          <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">Email Correspondence</h3>
            <div className="space-y-1 text-sm font-sans">
              <div>
                <span className="text-ink-muted text-xs block">General Inquiries &amp; Conflict Checks</span>
                <a href={`mailto:${siteConfig.primaryEmail || BRAND_CONFIG.email}`} className="font-semibold text-navy-700 hover:underline">
                  {siteConfig.primaryEmail || BRAND_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-ink-muted text-xs block">POSH Act Compliance Desk</span>
                <a href={`mailto:${siteConfig.poshEmail || BRAND_CONFIG.poshEmail}`} className="font-semibold text-navy-700 hover:underline">
                  {siteConfig.poshEmail || BRAND_CONFIG.poshEmail}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Stylised Realtime Map & Short Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 6 Cols: Synchronized Google Map & Chambers Geography */}
          <div className="lg:col-span-6 space-y-6">
            <ChambersMap />

            {/* Office Hours Card */}
            <div className="p-6 bg-stone-100 rounded-card border border-border flex items-start gap-4">
              <Clock className="w-5 h-5 text-brass-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs font-sans">
                <h4 className="font-serif font-bold text-base text-ink">Chambers Working Hours</h4>
                <p className="text-ink-secondary leading-relaxed">
                  Monday – Friday: 9:30 AM – 7:30 PM IST<br />
                  Saturday: 10:00 AM – 4:00 PM IST<br />
                  Sunday &amp; Court Holidays: Closed except for urgent appellate mentioning
                </p>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Short Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-card border border-border p-8 sm:p-10 shadow-card space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-brass-700 tracking-wider">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
                Send a Confidential Inquiry
              </h3>
              <p className="font-sans text-xs text-ink-secondary mt-1">
                Responses delivered within 24 hours post routine conflict check.
              </p>
            </div>

            {submittedRef ? (
              <div className="p-8 bg-ivory-50 rounded-card border border-border text-center space-y-3 animate-fade-up">
                <div className="w-12 h-12 rounded-full bg-status-success-bg border border-status-success/30 flex items-center justify-center text-status-success mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-ink">
                  Inquiry Dispatched to Chambers
                </h4>
                <p className="font-sans text-xs text-ink-secondary max-w-sm mx-auto">
                  Thank you, {name}. Your note has been received by our chambers desk. Reference: <strong>{submittedRef}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Anirban Bose"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="counsel@institution.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Telephone Number"
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <Textarea
                  label="Message / Query Summary"
                  placeholder="Summarize your legal inquiry or appointment request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <Checkbox
                  label="I understand that submitting this message is an exploratory inquiry and does not establish formal legal representation."
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />

                <Button variant="primary" type="submit" arrow className="w-full">
                  Dispatch Message to Chambers
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
