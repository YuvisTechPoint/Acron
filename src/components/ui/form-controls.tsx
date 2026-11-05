"use client";

import React, { forwardRef } from "react";
import { AlertCircle, Check } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            {label}
            {props.required && <span className="text-status-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`w-full h-[52px] px-4 rounded-input bg-white border text-ink font-sans text-sm placeholder:text-ink-muted transition-all duration-180 focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-700 disabled:opacity-60 disabled:bg-surface ${
              error ? "border-status-danger focus:ring-status-danger" : "border-border"
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-status-danger flex items-center gap-1 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-ink-secondary mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  charCount?: { current: number; max: number };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, charCount, className = "", id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex justify-between items-center">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
            >
              {label}
              {props.required && <span className="text-status-danger ml-1">*</span>}
            </label>
          )}
          {charCount && (
            <span className="text-[11px] text-ink-muted">
              {charCount.current} / {charCount.max}
            </span>
          )}
        </div>
        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            className={`w-full p-4 rounded-input bg-white border text-ink font-sans text-sm placeholder:text-ink-muted transition-all duration-180 focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-700 disabled:opacity-60 disabled:bg-surface min-h-[120px] ${
              error ? "border-status-danger focus:ring-status-danger" : "border-border"
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-status-danger flex items-center gap-1 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-ink-secondary mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, options, className = "", id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            {label}
            {props.required && <span className="text-status-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full h-[52px] px-4 rounded-input bg-white border text-ink font-sans text-sm transition-all duration-180 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235B6573%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_16px_center] bg-no-repeat ${
              error ? "border-status-danger focus:ring-status-danger" : "border-border"
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p className="text-xs text-status-danger flex items-center gap-1 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-ink-secondary mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, className = "", id, ...props }, ref) => {
    const checkboxId = id || `chk-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex items-start gap-3 text-left">
        <div className="relative flex items-center h-5 mt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 rounded border-border text-navy-700 focus:ring-blue-600 focus:ring-2 cursor-pointer transition ${className}`}
            {...props}
          />
        </div>
        <div className="text-sm">
          <label htmlFor={checkboxId} className="font-sans text-ink cursor-pointer select-none">
            {label}
          </label>
          {error ? (
            <p className="text-xs text-status-danger font-medium mt-0.5">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-ink-secondary mt-0.5">{helperText}</p>
          ) : null}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
