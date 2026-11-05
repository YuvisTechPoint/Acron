"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "./motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "white" | "ivory" | "navy" | "stone";
  hoverEffect?: boolean;
  href?: string;
  className?: string;
  arrowOnHover?: boolean;
}

export function Card({
  children,
  variant = "white",
  hoverEffect = true,
  href,
  className = "",
  arrowOnHover = false,
  ...props
}: CardProps) {
  const variantStyles = {
    white: "bg-white border-border text-ink",
    ivory: "bg-ivory-50 border-border text-ink",
    stone: "bg-stone-100 border-border text-ink",
    navy: "bg-navy-900 border-navy-800 text-white",
  };

  const hoverClass = hoverEffect
    ? "card-hover transition-all duration-200 hover:border-brass-500/40"
    : "";

  const baseClasses = `rounded-card border p-6 sm:p-8 shadow-card relative group ${variantStyles[variant]} ${hoverClass} ${className}`;

  const innerContent = (
    <>
      {children}
      {arrowOnHover && (
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-border text-brass-500 shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block group focus:outline-none">
        <SpotlightCard className={baseClasses} {...props}>
          {innerContent}
        </SpotlightCard>
      </Link>
    );
  }

  return (
    <SpotlightCard className={baseClasses} {...props}>
      {innerContent}
    </SpotlightCard>
  );
}
