import * as React from "react";
import { cn } from "@/lib/cn";

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {props.required && <span className="text-purple-400">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full h-11 px-3.5 rounded-xl bg-[#111827] border text-slate-100 placeholder:text-slate-500 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6]",
            error
              ? "border-rose-500/80 focus:ring-rose-500/40"
              : "border-white/10 hover:border-white/20",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-rose-400 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={textareaId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {props.required && <span className="text-purple-400">*</span>}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full p-3.5 rounded-xl bg-[#111827] border text-slate-100 placeholder:text-slate-500 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] resize-y min-h-[90px]",
            error
              ? "border-rose-500/80 focus:ring-rose-500/40"
              : "border-white/10 hover:border-white/20",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-rose-400 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {props.required && <span className="text-purple-400">*</span>}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-11 px-3.5 pr-8 rounded-xl bg-[#111827] border text-slate-100 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] appearance-none cursor-pointer",
              error
                ? "border-rose-500/80 focus:ring-rose-500/40"
                : "border-white/10 hover:border-white/20",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error ? (
          <span className="text-xs text-rose-400 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";
