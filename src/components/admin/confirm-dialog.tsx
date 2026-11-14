"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-white rounded-card border border-border shadow-raised max-w-md w-full p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isDestructive ? "bg-red-50 text-red-600" : "bg-brass-500/10 text-brass-700"}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 id="confirm-dialog-title" className="font-serif font-bold text-base text-ink-950">
            {title}
          </h3>
        </div>

        <p id="confirm-dialog-desc" className="text-xs text-ink-secondary leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 min-h-[44px] border border-border rounded-btn text-xs font-semibold text-ink-secondary hover:bg-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 min-h-[44px] text-white text-xs font-bold rounded-btn transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-sm ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
                : "bg-navy-700 hover:bg-blue-600 focus-visible:ring-brass-500"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
