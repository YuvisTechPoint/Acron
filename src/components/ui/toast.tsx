"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastVariant = "success" | "info" | "warning" | "danger";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "success", duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = "toast-" + Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, variant, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback for non-provider usage
    return {
      toast: ({ title }: { title: string }) => {
        if (typeof window !== "undefined") console.log(`[Toast] ${title}`);
      },
      removeToast: () => {},
    };
  }
  return context;
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((item) => {
        return (
          <div
            key={item.id}
            className="pointer-events-auto bg-white border border-border border-l-4 border-l-brass-500 rounded-card p-4 shadow-raised flex items-start gap-3 animate-fade-up text-ink"
            role="status"
          >
            <div className="shrink-0 mt-0.5">
              {item.variant === "success" && (
                <CheckCircle2 className="w-5 h-5 text-brass-500" />
              )}
              {item.variant === "warning" && (
                <AlertCircle className="w-5 h-5 text-status-warning" />
              )}
              {item.variant === "danger" && (
                <AlertCircle className="w-5 h-5 text-status-danger" />
              )}
              {item.variant === "info" && (
                <Info className="w-5 h-5 text-navy-700" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <h5 className="font-serif font-bold text-sm text-ink-950 leading-snug">
                {item.title}
              </h5>
              {item.description && (
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onDismiss(item.id)}
              className="text-ink-muted hover:text-ink transition p-0.5 -mr-1 -mt-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// Standalone Toast component for static showcase
export function Toast({
  title,
  description,
  variant = "success",
  className = "",
}: {
  title: string;
  description?: string;
  variant?: ToastVariant;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-border border-l-4 border-l-brass-500 rounded-card p-4 shadow-card flex items-start gap-3 text-ink ${className}`}
      role="status"
    >
      <div className="shrink-0 mt-0.5">
        {variant === "success" && <CheckCircle2 className="w-5 h-5 text-brass-500" />}
        {variant === "warning" && <AlertCircle className="w-5 h-5 text-status-warning" />}
        {variant === "danger" && <AlertCircle className="w-5 h-5 text-status-danger" />}
        {variant === "info" && <Info className="w-5 h-5 text-navy-700" />}
      </div>
      <div className="flex-1 space-y-0.5">
        <h5 className="font-serif font-bold text-sm text-ink-950 leading-snug">{title}</h5>
        {description && (
          <p className="font-sans text-xs text-ink-secondary leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}

