"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { usePrefersReducedMotion } from "@/components/ui/motion";

export interface ScrollWordItem {
  text: string;
  isAccent?: boolean;
}

interface ScrollTextRevealProps {
  words?: ScrollWordItem[];
  text?: string;
  accentWords?: string[];
  className?: string;
  onProgressChange?: (progress: number) => void;
}

const DEFAULT_QUOTE_WORDS: ScrollWordItem[] = [
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

export function ScrollTextReveal({
  words,
  text,
  accentWords = ["highest", "standards"],
  className = "",
  onProgressChange,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Normalize words list
  const parsedWords: ScrollWordItem[] = useMemo(() => {
    if (words && words.length > 0) return words;
    if (!text) return DEFAULT_QUOTE_WORDS;

    const tokens = text.split(/\s+/).filter(Boolean);
    const cleanAccentSet = new Set(
      accentWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
    );

    return tokens.map((token) => {
      const cleanToken = token.toLowerCase().replace(/[^a-z0-9]/g, "");
      const isAccent = cleanAccentSet.has(cleanToken);
      return { text: token, isAccent };
    });
  }, [words, text, accentWords]);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start revealing when the element is at bottom 88% of screen
    // Reach 100% illumination when the element is centered (around 32% of screen)
    const startOffset = windowHeight * 0.88;
    const endOffset = windowHeight * 0.32;
    const totalDistance = startOffset - endOffset;

    const currentOffset = startOffset - rect.top;
    const rawProgress = currentOffset / totalDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    setScrollProgress(clampedProgress);
    if (onProgressChange) {
      onProgressChange(clampedProgress);
    }
  }, [onProgressChange]);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      return;
    }

    let rafId: number | null = null;
    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [reducedMotion, updateProgress]);

  if (reducedMotion) {
    return (
      <p className={className}>
        {parsedWords.map((word, idx) => (
          <span
            key={idx}
            className={`inline-block mr-[0.26em] ${
              word.isAccent ? "font-serif italic text-brass-700" : "text-ink-950"
            }`}
          >
            {word.text}
          </span>
        ))}
      </p>
    );
  }

  const totalWords = parsedWords.length;

  return (
    <p
      ref={containerRef}
      className={`select-none transition-colors duration-150 ${className}`}
      aria-label="To protect what matters, navigate complexity with confidence, and uphold the highest standards of professional integrity."
    >
      {parsedWords.map((word, idx) => {
        // Stagger each word across the [0, 1] scroll range with a smooth overlap window
        const wordStart = idx / totalWords;
        const wordEnd = Math.min(1, (idx + 1.35) / totalWords);
        const wordSpan = wordEnd - wordStart;

        const rawWordProgress = (scrollProgress - wordStart) / wordSpan;
        const wordProgress = Math.max(0, Math.min(1, rawWordProgress));

        // Smooth opacity ramp: starts at soft muted baseline (0.18), ramps smoothly to 1.0
        const opacity = word.isAccent
          ? 0.22 + wordProgress * 0.78
          : 0.18 + wordProgress * 0.82;

        // Subtle tactile upward glide: 3.5px -> 0px as word comes into view
        const translateY = (1 - wordProgress) * 3.5;

        return (
          <span
            key={idx}
            style={{
              opacity,
              transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
              willChange: "opacity, transform",
              transition: "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className={`inline-block mr-[0.26em] ${idx === totalWords - 1 ? "mr-0" : ""}`}
          >
            <span
              className={
                word.isAccent
                  ? "font-serif italic text-brass-700 font-normal transition-colors"
                  : "text-ink-950 transition-colors"
              }
            >
              {word.text}
            </span>
          </span>
        );
      })}
    </p>
  );
}

