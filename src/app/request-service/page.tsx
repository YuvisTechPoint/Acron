"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Clock,
  Lock,
  Upload,
  AlertCircle,
  FileText,
  User,
  Check,
  Building,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { platformStore } from "@/lib/store";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Stepper,
  Input,
  Textarea,
  Select,
  Checkbox,
} from "@/components/ui";

function RequestServiceContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || searchParams.get("category") || "Advisory";

  const [step, setStep] = useState(1);

  // Step 1: About You
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientType, setClientType] = useState<"Individual" | "Corporate" | "Institution">("Corporate");
  const [orgName, setOrgName] = useState("");

  // Step 2: Your Matter
  const [selectedPractice, setSelectedPractice] = useState(initialService);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ name: string; progress: number }[]>([]);

  // Step 3: Consent & Confirmation
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refId, setRefId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialService) {
      setSelectedPractice(initialService);
    }
  }, [initialService]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded) return;
    const fileList = Array.from(uploaded).map((f) => ({
      name: f.name,
      progress: 100,
    }));
    setFiles((prev) => [...prev, ...fileList].slice(0, 3));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Please enter a valid email address";
    if (!phone.trim()) newErrors.phone = "Please enter a contact telephone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) newErrors.subject = "Please specify a subject for your matter";
    if (!description.trim() || description.length < 20) {
      newErrors.description = "Please describe the matter in at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrors({ consent: "You must acknowledge the Bar Council compliance declaration" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generated = `ACORN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Log to platformStore if available
      try {
        platformStore.addServiceRequest({
          clientName: fullName,
          clientEmail: email,
          clientPhone: phone,
          clientType,
          orgName: orgName || undefined,
          city: "Kolkata",
          serviceCategory: selectedPractice,
          subject,
          description,
          preferredContact: "Phone",
          preferredTimeWindow: "Morning (10:00 AM - 1:00 PM)",
          urgency: "Standard",
          attachmentsCount: files.length,
        });
      } catch {}

      setIsSubmitting(false);
      setRefId(generated);
    }, 900);
  };

  const STEPPER_ITEMS = [
    { number: 1, title: "About You", subtitle: "Identity & Role" },
    { number: 2, title: "Your Matter", subtitle: "Scope & Brief" },
    { number: 3, title: "Review & Send", subtitle: "Privileged Intake" },
  ];

  return (
    <div className="bg-ivory-50 text-ink min-h-screen py-32 sm:py-40">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <Eyebrow>PRIVILEGED INTAKE</Eyebrow>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink-950 leading-[1.12]">
            Request a Formal <span className="font-serif italic font-normal text-brass-700">Consultation</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            Submit your matter to our chambers. We conduct conflict verification and respond with preliminary scope within one business day.
          </p>
        </div>

        {/* Success State */}
        {refId ? (
          <div className="max-w-2xl bg-white rounded-card border border-border shadow-modal p-8 sm:p-12 space-y-6 text-center animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-status-success-bg border border-status-success/40 flex items-center justify-center text-status-success mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold text-brass-700 tracking-widest">
                Intake Logged Successfully
              </span>
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Consultation Request Received
              </h2>
              <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
                Thank you, {fullName}. Your matter regarding &ldquo;{selectedPractice}&rdquo; has been deposited into our secure intake vault.
              </p>
            </div>

            <div className="p-4 bg-ivory-50 rounded-btn border border-border inline-block text-left space-y-1">
              <div className="text-[11px] uppercase font-semibold text-ink-muted">Chambers Intake Reference</div>
              <div className="font-mono text-base font-bold text-navy-700">{refId}</div>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" href="/" arrow>
                Return to Chambers Home
              </Button>
              <Button variant="secondary" href="/contact">
                Chambers Contact Details
              </Button>
            </div>
          </div>
        ) : (
          /* Split Layout: 3-Step Form (Left 8 cols) & Reassurance Panel (Right 4 cols) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 8 Columns: Multi-step Form */}
            <div className="lg:col-span-8 bg-white rounded-card border border-border shadow-card p-6 sm:p-10 space-y-8">
              
              {/* Stepper */}
              <Stepper steps={STEPPER_ITEMS} currentStep={step} />

              <div className="border-t border-border pt-6">
                
                {/* STEP 1: About You */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-up">
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      Step 1: Your Details &amp; Capacity
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Legal Name"
                        placeholder="e.g. Debashis Roy"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={errors.fullName}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="counsel@institution.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Telephone / Mobile Number"
                        placeholder="+91 98300 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                        required
                      />
                      <Select
                        label="Client Classification"
                        value={clientType}
                        onChange={(e) => setClientType(e.target.value as any)}
                        options={[
                          { value: "Corporate", label: "Corporate Entity / Enterprise" },
                          { value: "Institution", label: "Educational or Trust Institution" },
                          { value: "Individual", label: "Individual / Director in Personal Capacity" },
                        ]}
                      />
                    </div>

                    <Input
                      label="Organisation / Chamber Name (if applicable)"
                      placeholder="e.g. Eastern Maritime Logistics Pvt. Ltd."
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />

                    <div className="flex justify-end pt-4">
                      <Button variant="primary" onClick={handleNext} arrow>
                        Continue to Matter Details
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Your Matter */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-up">
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      Step 2: Nature of Legal Counsel
                    </h3>

                    <Select
                      label="Primary Practice Area"
                      value={selectedPractice}
                      onChange={(e) => setSelectedPractice(e.target.value)}
                      options={PRACTICE_AREAS.map((pa) => ({
                        value: pa.title,
                        label: pa.title,
                      }))}
                    />

                    <Input
                      label="Subject or Matter Heading"
                      placeholder="e.g. Section 4(2)(c) IC Constitution & Policy Audit"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      error={errors.subject}
                      required
                    />

                    <Textarea
                      label="Description of Legal Matter (Privileged)"
                      placeholder="Provide background facts, relevant statutes, opposing entities, or specific advisory deliverables needed..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      error={errors.description}
                      charCount={{ current: description.length, max: 1500 }}
                      required
                    />

                    {/* File Upload with Progress */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                        Relevant Instruments &amp; Documents (Optional, Max 3 files)
                      </label>
                      <div className="border-2 border-dashed border-border rounded-btn p-6 text-center hover:border-brass-500/50 transition bg-ivory-50/50">
                        <Upload className="w-6 h-6 text-brass-500 mx-auto mb-2" />
                        <label className="cursor-pointer text-xs font-semibold text-navy-700 hover:underline">
                          <span>Click to upload PDF, DOCX, or scan</span>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="text-[11px] text-ink-muted mt-1">
                          Up to 10 MB per document. Handled with statutory encryption.
                        </p>
                      </div>

                      {/* Uploaded File List */}
                      {files.length > 0 && (
                        <div className="space-y-2 pt-2">
                          {files.map((f, i) => (
                            <div
                              key={i}
                              className="p-2.5 bg-surface rounded-btn border border-border flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-3.5 h-3.5 text-brass-500" />
                                <span className="truncate">{f.name}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-status-success">
                                Ready
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button variant="secondary" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button variant="primary" onClick={handleNext} arrow>
                        Review and Confirm
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Review & Send */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      Step 3: Review Brief &amp; Privileged Submission
                    </h3>

                    <div className="p-6 bg-ivory-50 rounded-card border border-border space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-ink-muted uppercase tracking-wider block">Representative</span>
                          <span className="font-semibold text-ink text-sm">{fullName}</span>
                        </div>
                        <div>
                          <span className="text-ink-muted uppercase tracking-wider block">Entity</span>
                          <span className="font-semibold text-ink text-sm">{orgName || clientType}</span>
                        </div>
                        <div>
                          <span className="text-ink-muted uppercase tracking-wider block">Email</span>
                          <span className="font-semibold text-ink">{email}</span>
                        </div>
                        <div>
                          <span className="text-ink-muted uppercase tracking-wider block">Telephone</span>
                          <span className="font-semibold text-ink">{phone}</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-3">
                        <span className="text-ink-muted uppercase tracking-wider block">Practice Area</span>
                        <span className="font-semibold text-navy-700 text-sm">{selectedPractice}</span>
                      </div>

                      <div>
                        <span className="text-ink-muted uppercase tracking-wider block">Subject</span>
                        <span className="font-semibold text-ink">{subject}</span>
                      </div>

                      <div>
                        <span className="text-ink-muted uppercase tracking-wider block">Summary</span>
                        <p className="text-ink-secondary mt-0.5 line-clamp-3">{description}</p>
                      </div>

                      {files.length > 0 && (
                        <div>
                          <span className="text-ink-muted uppercase tracking-wider block">Attachments</span>
                          <span className="text-ink">{files.length} document(s) queued for upload</span>
                        </div>
                      )}
                    </div>

                    <Checkbox
                      label="I confirm that the facts stated above are accurate and understand that submitting this intake form does not create an advocate-client relationship until a formal Engagement Letter is executed."
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      error={errors.consent}
                      required
                    />

                    <div className="flex items-center justify-between pt-4">
                      <Button variant="secondary" onClick={() => setStep(2)}>
                        Modify Details
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        loading={isSubmitting}
                        arrow
                      >
                        Submit Privileged Intake
                      </Button>
                    </div>
                  </form>
                )}

              </div>
            </div>

            {/* Right 4 Columns: Sticky Reassurance Panel on Navy */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="bg-ink-950 text-white rounded-card border border-navy-800 p-8 shadow-raised space-y-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-brass-300" />
                  <span className="text-xs uppercase font-semibold text-brass-300 tracking-widest">
                    Chambers Reassurance
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    We respond within one business day.
                  </h3>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    Every inquiry is personally reviewed by a partner. We perform a conflict-of-interest check prior to scheduling formal advisory calls.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-navy-800 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-brass-500 shrink-0 mt-0.5" />
                    <span>Protected by Section 126 advocate-client privilege under Indian Evidence Act.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brass-500 shrink-0 mt-0.5" />
                    <span>Working chambers hours: Mon – Sat, 9:30 AM to 7:30 PM IST.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-navy-800">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Direct Chambers Telephone
                  </span>
                  <a
                    href={`tel:${BRAND_CONFIG.phone}`}
                    className="text-sm font-bold text-brass-300 hover:text-white flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{BRAND_CONFIG.phone}</span>
                  </a>
                </div>
              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
}

export default function RequestServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory-50 py-40 text-center font-serif text-xl">Loading intake desk...</div>}>
      <RequestServiceContent />
    </Suspense>
  );
}
