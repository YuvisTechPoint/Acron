"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "dark-primary" | "dark-secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  arrow?: boolean;
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  arrow = false,
  href,
  external = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium rounded-btn transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99] group disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "h-9 px-4 text-xs tracking-wider uppercase",
    md: "h-[52px] px-6 text-sm tracking-wide",
    lg: "h-[58px] px-8 text-base tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-navy-700 text-ivory-50 hover:bg-blue-600 shadow-sm border border-navy-800/40",
    "dark-primary":
      "bg-brass-500 text-ink-950 font-semibold hover:bg-brass-300 shadow-sm border border-brass-300",
    secondary:
      "border border-navy-700 text-navy-700 bg-transparent hover:bg-navy-700 hover:text-ivory-50",
    "dark-secondary":
      "border border-brass-500/50 text-ivory-50 bg-transparent hover:bg-brass-500/10 hover:border-brass-500",
    ghost:
      "bg-transparent text-navy-700 hover:bg-blue-100/60 hover:text-navy-900",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-brass-500" />
      ) : null}
      <span>{children}</span>
      {arrow && !loading && (
        <ArrowRight
          className={`w-4 h-4 ml-2.5 transition-transform duration-200 group-hover:translate-x-1 ${
            variant === "primary" ? "text-brass-300" : variant === "dark-primary" ? "text-ink-950" : "text-brass-500"
          }`}
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
