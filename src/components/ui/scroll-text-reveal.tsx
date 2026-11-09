"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/motion";

interface WordItem {
  text: string;
  isAccent?: boolean;
}

const GOVERNING_QUOTE_WORDS: WordItem[] = [
  { text: "“To" },
  { text: "protect" },
  { text: "what" },
  { text: "matters," },
  { text: "navigate" },
  { text: "complexity" },
  { text: "with" },
  { text: "confidence," },
  { text: "and" },
  { text: "uphold" },
  { text: "the" },
  { text: "highest", isAccent: true },
  { text: "standards", isAccent: true },
  { text: "of" },
  { text: "professional" },
  { text: "integrity.”" },
];

export function GoverningPrincipleScrollReveal({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Progress ranges from 0 to 1
  const [progress, setProgress] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentProgressRef = useRef(0);
  const inViewRef = useRef(false);

  // Keep ref synced
  useEffect(() => {
    currentProgressRef.current = progress;
  }, [progress]);

  // 1. Intersection Observer to detect when section enters viewport
  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoTyping();
        } else {
          stopAutoTyping();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      stopAutoTyping();
    };
  }, [reducedMotion]);

  // 2. Auto-typing generator: smoothly advances unrevealed words when user pauses
  const startAutoTyping = () => {
    stopAutoTyping();
    if (reducedMotion || !inViewRef.current) return;

    autoIntervalRef.current = setInterval(() => {
      if (isScrollingRef.current) return;

      const totalWords = GOVERNING_QUOTE_WORDS.length;
      const step = 1 / totalWords;
      const nextProgress = Math.min(1, currentProgressRef.current + step);

      setProgress(nextProgress);

      if (nextProgress >= 1) {
        stopAutoTyping();
      }
    }, 130);
  };

  const stopAutoTyping = () => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
  };

  // 3. Scroll text effect: dynamically illuminates or dims words based on scroll position
  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      isScrollingRef.current = true;
      stopAutoTyping();

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Start revealing when element enters from bottom (rect.top <= windowHeight * 0.82)
          // Fully illuminate by the time it reaches upper-center (rect.top <= windowHeight * 0.38)
          const start = windowHeight * 0.82;
          const end = windowHeight * 0.38;
          const scrollFraction = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

          setProgress(scrollFraction);
          ticking = false;
        });
        ticking = true;
      }

      // When scrolling stops, restart auto-typing if in view and not fully revealed
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        if (inViewRef.current && currentProgressRef.current < 1) {
          startAutoTyping();
        }
      }, 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      stopAutoTyping();
    };
  }, [reducedMotion]);

  const activeProgress = reducedMotion ? 1 : progress;

  return (
    <p
      ref={containerRef}
      className={`font-serif text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.22] tracking-tight text-center select-text transition-colors ${className}`}
      aria-label="“To protect what matters, navigate complexity with confidence, and uphold the highest standards of professional integrity.”"
    >
      {GOVERNING_QUOTE_WORDS.map((item, index) => {
        // Calculate threshold for this word
        const wordThreshold = index / (GOVERNING_QUOTE_WORDS.length - 1);
        const isRevealed = activeProgress >= wordThreshold || reducedMotion;

        let activeColorClass = "";
        let inactiveColorClass = "";

        if (item.isAccent) {
          activeColorClass = "text-brass-700 font-serif italic";
          inactiveColorClass = "text-brass-700/25 font-serif italic";
        } else {
          activeColorClass = "text-ink-950 font-serif";
          inactiveColorClass = "text-ink-950/20 font-serif";
        }

        return (
          <span
            key={index}
            className={`inline-block mr-[0.25em] last:mr-0 transition-colors duration-200 ease-out ${
              isRevealed ? activeColorClass : inactiveColorClass
            }`}
          >
            {item.text}
          </span>
        );
      })}
    </p>
  );
}
