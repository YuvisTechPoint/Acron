import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  Scale,
  ShieldCheck,
  Lock,
  Landmark,
  Briefcase,
  BookOpen,
  MapPin,
  Sparkles,
  CreditCard,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

interface EyebrowProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

function resolveEyebrowIcon(children: React.ReactNode, dark: boolean): React.ReactNode {
  let text = "";
  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.map((c) => (typeof c === "string" ? c : "")).join(" ");
  }

  const upper = text.toUpperCase();

  const iconClasses = dark ? "w-3 h-3 text-brass-300" : "w-3 h-3 text-brass-600";
  const badgeClasses = dark
    ? "inline-flex items-center justify-center w-5 h-5 rounded-md bg-navy-900 border border-brass-400/30 shadow-inner shrink-0"
    : "inline-flex items-center justify-center w-5 h-5 rounded-md bg-brass-500/10 border border-brass-500/30 shadow-sm shrink-0";

  let Icon = Sparkles;

  if (upper.includes("WELCOME") || upper.includes("HOME") || upper.includes("ABOUT US")) {
    Icon = Home;
  } else if (
    upper.includes("COMPASSIONATE") ||
    upper.includes("WORKPLACE") ||
    upper.includes("POSH") ||
    upper.includes("HARASSMENT") ||
    upper.includes("SUPPORT")
  ) {
    Icon = ShieldCheck;
  } else if (upper.includes("PRIVACY") || upper.includes("SACRED") || upper.includes("CONFIDENTIAL")) {
    Icon = Lock;
  } else if (
    upper.includes("GOVERNING") ||
    upper.includes("PRINCIPLE") ||
    upper.includes("LEGAL") ||
    upper.includes("COMMENTARY") ||
    upper.includes("PRECEDENT")
  ) {
    Icon = Scale;
  } else if (
    upper.includes("CHAMBERS") ||
    upper.includes("LOCATION") ||
    upper.includes("DESK") ||
    upper.includes("CONNECT")
  ) {
    Icon = MapPin;
  } else if (
    upper.includes("PROTOCOL") ||
    upper.includes("ENGAGEMENT") ||
    upper.includes("PRACTICE") ||
    upper.includes("DISCIPLINE") ||
    upper.includes("SERVICE") ||
    upper.includes("STRUCTURED")
  ) {
    Icon = Briefcase;
  } else if (upper.includes("REGISTRY") || upper.includes("STATUTORY") || upper.includes("VERIFY")) {
    Icon = Landmark;
  } else if (upper.includes("PAY") || upper.includes("SETTLEMENT")) {
    Icon = CreditCard;
  } else if (upper.includes("PROCEDURAL") || upper.includes("GUIDANCE") || upper.includes("FAQ")) {
    Icon = HelpCircle;
  } else if (upper.includes("EXCEPTION") || upper.includes("NOT FOUND")) {
    Icon = AlertCircle;
  }

  return (
    <span className={badgeClasses} aria-hidden="true">
      <Icon className={iconClasses} />
    </span>
  );
}

export function Eyebrow({ children, dark = false, className = "", icon }: EyebrowProps) {
  const renderedIcon =
    icon !== undefined ? (
      icon ? (
        <span
          className={
            dark
              ? "inline-flex items-center justify-center w-5 h-5 rounded-md bg-navy-900 border border-brass-400/30 shadow-inner shrink-0 text-brass-300"
              : "inline-flex items-center justify-center w-5 h-5 rounded-md bg-brass-500/10 border border-brass-500/30 shadow-sm shrink-0 text-brass-600"
          }
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null
    ) : (
      resolveEyebrowIcon(children, dark)
    );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {renderedIcon}
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
  icon?: React.ReactNode;
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
  icon,
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
      {eyebrow && <Eyebrow dark={dark} icon={icon}>{eyebrow}</Eyebrow>}
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
