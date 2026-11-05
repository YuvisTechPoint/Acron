"use client";

import React from "react";
import { Check } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brass" | "navy" | "success" | "warning" | "danger" | "stone";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon,
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-3 py-1 text-xs tracking-wider",
  };

  const variantStyles = {
    default: "bg-surface text-ink-secondary border border-border",
    brass: "bg-brass-500/10 text-brass-700 border border-brass-500/30",
    navy: "bg-blue-100 text-navy-700 border border-navy-700/20",
    success: "bg-[#E7F5EE] text-status-success border border-status-success/30",
    warning: "bg-[#FEF7EC] text-status-warning border border-status-warning/30",
    danger: "bg-[#FDF1F0] text-status-danger border border-status-danger/30",
    stone: "bg-stone-100 text-ink-secondary border border-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-sans font-semibold uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

interface StepItem {
  number: number | string;
  title: string;
  subtitle?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = "" }: StepperProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-5 left-8 right-8 h-[2px] bg-border -z-0" />
        
        {/* Active track line */}
        <div
          className="absolute top-5 left-8 h-[2px] bg-brass-500 transition-all duration-300 -z-0"
          style={{
            width: `${((currentStep - 1) / Math.max(steps.length - 1, 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={stepNum}
              className="flex flex-col items-center relative z-10 text-center select-none"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs font-semibold transition-all duration-200 border-2 ${
                  isCompleted
                    ? "bg-navy-700 border-navy-700 text-ivory-50"
                    : isCurrent
                    ? "bg-ivory-50 border-brass-500 text-brass-700 shadow-sm ring-4 ring-brass-500/15"
                    : "bg-white border-border text-ink-muted"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-brass-300" /> : step.number}
              </div>
              <span
                className={`text-xs font-semibold tracking-wider uppercase mt-2 ${
                  isCurrent ? "text-navy-700" : isCompleted ? "text-ink" : "text-ink-muted"
                }`}
              >
                {step.title}
              </span>
              {step.subtitle && (
                <span className="text-[11px] text-ink-secondary hidden sm:block mt-0.5 max-w-[100px]">
                  {step.subtitle}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ToastProps {
  title: string;
  message?: string;
  type?: "info" | "success" | "warning";
  onClose?: () => void;
}

export function Toast({ title, message, type = "info", onClose }: ToastProps) {
  const typeBorders = {
    info: "border-l-4 border-l-navy-700",
    success: "border-l-4 border-l-status-success",
    warning: "border-l-4 border-l-status-warning",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 max-w-sm w-full bg-white rounded-card shadow-modal border border-border p-4 z-50 animate-fade-up ${typeBorders[type]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-serif font-bold text-sm text-ink">{title}</h4>
          {message && <p className="font-sans text-xs text-ink-secondary mt-1">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink transition text-xs p-1"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
