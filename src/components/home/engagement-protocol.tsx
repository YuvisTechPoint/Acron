"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Check } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";

export interface PathwayStep {
  num: string;
  title: string;
  desc: string;
}

interface EngagementProtocolProps {
  steps: PathwayStep[];
}

export function EngagementProtocol({ steps }: EngagementProtocolProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(20);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isUserInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll handler to track progression through the 5 stages
  const updateProgress = useCallback(() => {
    if (isUserInteractingRef.current) return;
    if (!cardRefs.current.length || !sectionRef.current) return;

    const viewportTrigger = window.innerHeight * 0.45;

    // 1. Identify which card is closest to or past the viewport trigger point
    let currentIdx = 0;
    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportTrigger) {
          currentIdx = i;
        }
      }
    }
    setActiveStep(currentIdx);

    // 2. Calculate continuous fractional scroll progress across all 5 cards
    const firstCard = cardRefs.current[0];
    const lastCard = cardRefs.current[cardRefs.current.length - 1];
    if (firstCard && lastCard) {
      const firstRect = firstCard.getBoundingClientRect();
      const lastRect = lastCard.getBoundingClientRect();

      const start = firstRect.top;
      const end = lastRect.top;
      const totalDistance = end - start;

      if (totalDistance > 0) {
        const scrolledPast = viewportTrigger - start;
        const ratio = Math.max(0, Math.min(1, scrolledPast / totalDistance));
        // Scale smoothly between 20% (Stage 1) and 100% (Stage 5)
        const minPct = 20;
        const computed = minPct + ratio * (100 - minPct);
        setScrollProgress(Math.round(computed));
      } else {
        setScrollProgress(((currentIdx + 1) / steps.length) * 100);
      }
    }
  }, [steps.length]);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [updateProgress]);

  // Jump smoothly to a specific stage on click
  const scrollToStep = (index: number) => {
    setActiveStep(index);
    setScrollProgress(Math.round(((index + 1) / steps.length) * 100));

    isUserInteractingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 800);

    const targetEl = cardRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section ref={sectionRef} className="bg-ivory-50 py-20 sm:py-28 lg:py-32 border-b border-border relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Sticky Left Column (Spans 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <Eyebrow>ENGAGEMENT PROTOCOL</Eyebrow>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-950 leading-[1.12]">
              How We Work: A <span className="font-serif italic font-normal text-brass-700">Disciplined</span> Pathway.
            </h2>

            <p className="font-sans text-base text-ink-secondary leading-relaxed">
              From privileged intake to final resolution, every step follows a structured methodology to safeguard legal interests and maintain strict fiduciary accountability.
            </p>

            <div className="pt-1">
              <Button variant="primary" href="/request-service" arrow>
                Initiate an Engagement
              </Button>
            </div>

            {/* PROGRESSIVE STAGE DASHBOARD (Desktop Sticky) */}
            <div className="pt-6 sm:pt-8 border-t border-border space-y-4">
              
              {/* Stage Header & Counter Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brass-500" />
                  <span>PROGRESSIVE STAGE</span>
                </span>
                <span className="font-mono text-[11px] font-bold text-navy-900 bg-brass-500/20 border border-brass-500/40 px-2.5 py-0.5 rounded-full shadow-xs">
                  Stage 0{activeStep + 1} of 0{steps.length}
                </span>
              </div>

              {/* Current Active Stage Headline & Percentage */}
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-serif text-lg font-bold text-ink-950 flex items-center gap-2">
                  <span className="text-brass-700">{currentStep.num}.</span>
                  <span>{currentStep.title}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-brass-700 shrink-0">
                  {scrollProgress}% Processed
                </span>
              </div>

              {/* Gradual Continuous Progress Bar */}
              <div
                role="progressbar"
                aria-valuenow={scrollProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progressive stage progression: ${scrollProgress}%`}
                className="w-full h-2.5 bg-stone-200/90 rounded-full overflow-hidden border border-border/70 shadow-inner"
              >
                <div
                  className="h-full bg-gradient-to-r from-brass-600 via-brass-500 to-brass-400 transition-all duration-200 ease-out rounded-full"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {/* Numbered Pipeline: fully counted 1, 2, 3, 4, 5 */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] uppercase font-semibold tracking-wider text-ink-muted">
                  Fully Counted Stages (Click to Navigate)
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {steps.map((st, i) => {
                    const isPast = i < activeStep;
                    const isCurrent = i === activeStep;
                    return (
                      <button
                        key={st.num || i}
                        type="button"
                        onClick={() => scrollToStep(i)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 ${
                          isCurrent
                            ? "bg-navy-900 text-white shadow-md ring-2 ring-brass-500 scale-105"
                            : isPast
                            ? "bg-brass-500/20 text-brass-800 border border-brass-500/40 hover:bg-brass-500/30"
                            : "bg-white/80 border border-border text-ink-secondary hover:bg-white hover:text-ink hover:border-brass-300"
                        }`}
                        title={`Stage ${st.num}: ${st.title}`}
                        aria-label={`Stage ${st.num}: ${st.title} ${isCurrent ? "(Current Active Stage)" : isPast ? "(Completed)" : ""}`}
                      >
                        <span className={`text-xs font-bold font-mono ${
                          isCurrent ? "text-brass-300" : isPast ? "text-brass-700" : "text-ink-secondary"
                        }`}>
                          {isPast ? "✓" : st.num}
                        </span>
                        <span className={`text-[9.5px] font-medium tracking-tight truncate w-full text-center mt-0.5 ${
                          isCurrent ? "text-white font-semibold" : isPast ? "text-ink-950 font-medium" : "text-ink-muted"
                        }`}>
                          {st.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Scrolling Right Column (Spans 7 cols) - Interactive 5 Step Cards */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Mobile Top Progress Banner (Shows on small screens where sticky column scrolls off) */}
            <div className="lg:hidden p-4 rounded-xl bg-white border border-border shadow-sm space-y-3 mb-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brass-500" />
                  <span>PROGRESSIVE STAGE</span>
                </span>
                <span className="font-mono text-[11px] font-bold text-navy-900 bg-brass-500/20 px-2 py-0.5 rounded-full border border-brass-500/30">
                  Stage 0{activeStep + 1} of 0{steps.length} &bull; {scrollProgress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden border border-border/60">
                <div
                  className="h-full bg-gradient-to-r from-brass-600 via-brass-500 to-brass-400 transition-all duration-200 rounded-full"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {/* Mobile 5 Stage Buttons */}
              <div className="grid grid-cols-5 gap-1 pt-1">
                {steps.map((st, i) => {
                  const isPast = i < activeStep;
                  const isCurrent = i === activeStep;
                  return (
                    <button
                      key={st.num || i}
                      type="button"
                      onClick={() => scrollToStep(i)}
                      className={`py-1.5 px-0.5 rounded text-center transition-all ${
                        isCurrent
                          ? "bg-navy-900 text-brass-300 font-bold border border-brass-400"
                          : isPast
                          ? "bg-brass-500/20 text-brass-800 font-semibold border border-brass-500/30"
                          : "bg-surface border border-border text-ink-muted"
                      }`}
                    >
                      <span className="block text-[11px] font-mono leading-none">{isPast ? "✓" : st.num}</span>
                      <span className="block text-[8.5px] truncate mt-0.5">{st.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* The 5 Step Cards */}
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = idx < activeStep;

              return (
                <div
                  key={step.num || idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => scrollToStep(idx)}
                  className={`p-6 sm:p-8 rounded-card border transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-white border-brass-500 shadow-raised ring-1 ring-brass-500/40 -translate-y-0.5"
                      : isPast
                      ? "bg-white/90 border-border/90 hover:bg-white shadow-xs"
                      : "bg-surface/50 border-border hover:bg-white opacity-85 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Big Numeral */}
                    <div className="shrink-0 flex flex-col items-center">
                      <span className={`font-serif text-3xl sm:text-4xl font-bold transition-colors ${
                        isCurrent ? "text-brass-700" : isPast ? "text-brass-600/70" : "text-navy-700/30"
                      }`}>
                        {step.num}
                      </span>
                      {isPast && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1" />
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className={`font-serif text-2xl font-bold transition-colors ${
                          isCurrent ? "text-ink-950" : "text-ink"
                        }`}>
                          {step.title}
                        </h3>

                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brass-700 bg-brass-500/15 border border-brass-500/30 px-2 py-0.5 rounded-full shrink-0">
                            Active Stage
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                            Completed
                          </span>
                        )}
                      </div>

                      <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
