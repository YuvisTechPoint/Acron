import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EyebrowProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function Eyebrow({ children, dark = false, className = "" }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`w-3.5 h-[1.5px] ${
          dark ? "bg-brass-300" : "bg-brass-500"
        }`}
        aria-hidden="true"
      />
      <span
        className={`font-sans text-[12px] font-semibold tracking-[0.16em] uppercase ${
          dark ? "text-brass-300" : "text-brass-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  size?: "md" | "lg" | "xl";
}

export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  description,
  align = "left",
  dark = false,
  className = "",
  size = "lg",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  const sizeHeading = {
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
    xl: "text-4xl sm:text-5xl md:text-6xl",
  };

  // Helper to highlight accent word with Cormorant Garamond italic in brass
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(new RegExp(`(${accentWord})`, "gi"));
    return parts.map((part, index) => {
      if (part.toLowerCase() === accentWord.toLowerCase()) {
        return (
          <span
            key={index}
            className={`font-serif italic font-normal ${
              dark ? "text-brass-300" : "text-brass-700"
            }`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col space-y-4 max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-serif font-bold tracking-tight leading-[1.12] ${
          dark ? "text-white" : "text-ink-950"
        } ${sizeHeading[size]}`}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={`font-sans text-base sm:text-lg leading-relaxed ${
            dark ? "text-slate-300" : "text-ink-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
  dark?: boolean;
  external?: boolean;
}

export function EditorialLink({
  href,
  children,
  arrow = true,
  className = "",
  dark = false,
  external = false,
}: EditorialLinkProps) {
  const content = (
    <span
      className={`link-editorial text-sm font-medium tracking-wide group ${
        dark ? "text-brass-300 hover:text-white" : "text-navy-700 hover:text-blue-600"
      } ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1 text-brass-500" />
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`hairline-rule my-8 ${className}`} role="separator" />;
}
