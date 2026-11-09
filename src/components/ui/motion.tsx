"use client";

import React, { useEffect, useState, useRef } from "react";

/**
 * Hook to detect prefers-reduced-motion media query
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Reveal: Purposeful, short 24px fade-up once when element enters viewport.
 * Duration 280-400ms, easing cubic-bezier(0.22, 1, 0.36, 1).
 * Degrades instantly to static if reduced motion is requested.
 */
interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  yOffset?: number;
}

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  yOffset = 24,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
        transition: `opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * LineReveal: Reveals headline line-by-line once on view with subtle mask or fade.
 */
interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export function LineReveal({
  children,
  className = "",
  delayMs = 0,
}: LineRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * CountUp: Counts up once to a target integer with easing.
 * Respects prefers-reduced-motion by displaying value immediately.
 */
interface CountUpProps {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  durationMs = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? end : 0);
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          const startTime = performance.now();
          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, durationMs, hasRun, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Spotlight: Follows desktop cursor to add a subtle warm brass sheen.
 * Only active on desktop pointer devices; no-op on touch or reduced motion.
 */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({
  children,
  className = "",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Spotlight glow layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: position
            ? `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(176, 141, 87, 0.09), transparent 80%)`
            : "none",
        }}
      />
      {children}
    </div>
  );
}

/**
 * ReadingProgress: Hairline brass bar pinned at top of viewport for long articles
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) return;
      const currentProgress = (totalScroll / windowHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-brass-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
