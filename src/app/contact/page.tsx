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
import { useRealtimeSiteConfig } from "@/lib/realtime";
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
import dynamic from "next/dynamic";
import { useToast } from "@/components/ui/toast";

const ChambersMap = dynamic(
  () => import("@/components/chambers-map").then((mod) => mod.ChambersMap),
  { ssr: false }
);
import {
  trackConsultationSubmitted,
  trackPhoneClick,
  trackWhatsAppClick,
} from "@/lib/analytics";

export default function ContactPage() {
  const siteConfig = useRealtimeSiteConfig();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          practiceArea: "General Advisory",
          subject: "General Contact Inquiry",
          description: message,
          preferredMode: "ONLINE_VC",
        }),
      });
      const data = await res.json();
      const refNumber = data.referenceNumber || data.refNumber;

      const req = platformStore.addServiceRequest({
        fullName: name,
        email,
        phone,
        subject: "General Contact Inquiry",
        description: message,
        preferredChannel: "email",
        serviceCategory: "general_counsel",
        urgency: "standard",
      });

      const finalRef = refNumber || req.refNumber || `CONT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(finalRef);
      trackConsultationSubmitted(finalRef, "General Contact");
      toast({
        title: "Inquiry Transmitted",
        description: `Your communication has been lodged under reference ${finalRef}.`,
        variant: "success",
      });
    } catch {
      const req = platformStore.addServiceRequest({
        fullName: name,
        email,
        phone,
        subject: "General Contact Inquiry",
        description: message,
        preferredChannel: "email",
        serviceCategory: "general_counsel",
        urgency: "standard",
      });
      const fallbackRef = req.refNumber || `CONT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(fallbackRef);
      trackConsultationSubmitted(fallbackRef, "General Contact");
      toast({
        title: "Inquiry Transmitted",
        description: `Your inquiry has been logged under reference ${fallbackRef}.`,
        variant: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h3 className="font-serif text-2xl font-bold text-ink">Helpline &amp; Advocates</h3>
            <div className="space-y-2 text-sm font-sans">
              <div>
                <span className="text-ink-muted text-xs block">Main Desk &amp; WhatsApp</span>
                <a href="https://wa.me/918286936899" target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 hover:text-brass-700 hover:underline">
                  +91 828 69 36 899
                </a>
              </div>
              <div className="pt-1">
                <span className="text-ink-muted text-xs block">Advocate on Panel (Mr. Rajesh Telge)</span>
                <a href="tel:+918369171822" className="font-semibold text-navy-700 hover:text-brass-700 hover:underline">
                  +91 8369171822
                </a>
              </div>
              <div className="pt-1">
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
            <div className="space-y-2 text-sm font-sans">
              <div>
                <span className="text-ink-muted text-xs block">Official Chambers Email</span>
                <a href={`mailto:${siteConfig.primaryEmail || "acornconsultant2014@gmail.com"}`} className="font-semibold text-navy-700 hover:text-brass-700 hover:underline break-all">
                  {siteConfig.primaryEmail || "acornconsultant2014@gmail.com"}
                </a>
              </div>
              <div className="pt-1">
                <span className="text-ink-muted text-xs block">Educational, Tax &amp; Legal Desk</span>
                <span className="text-xs text-ink-secondary">Over 15 Years of Dedicated Advisory</span>
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
