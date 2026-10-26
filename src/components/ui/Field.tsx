import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface FieldBaseProps {
  label: string;
  error?: string;
  helperText?: string;
}

const control = (error?: string) =>
  cn(
    "w-full border bg-[var(--paper)] text-[var(--deep)] text-base sm:text-sm placeholder:text-[var(--mute)]/70",
    "transition-colors duration-150 focus:outline-none focus:border-[var(--pur)] focus:bg-white",
    error ? "border-red-500 focus:border-red-500" : "border-[var(--peri)] hover:border-[var(--pur)]"
  );

function FieldShell({
  id,
  label,
  error,
  helperText,
  required,
  children,
}: FieldBaseProps & {
  id: string;
  required?: boolean;
  children: (a11y: { "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error || helperText);
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--deep)]">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--or)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({
        "aria-invalid": error ? true : undefined,
        "aria-describedby": hasMessage ? messageId : undefined,
      })}
      {error ? (
        <p id={messageId} className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : helperText ? (
        <p id={messageId} className="text-xs text-[var(--mute)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement>, FieldBaseProps {}

export const Input = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <FieldShell id={inputId} label={label} error={error} helperText={helperText} required={props.required}>
        {(a11y) => (
          <input
            ref={ref}
            id={inputId}
            className={cn(control(error), "h-11 px-3.5", className)}
            {...a11y}
            {...props}
          />
        )}
      </FieldShell>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBaseProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <FieldShell id={inputId} label={label} error={error} helperText={helperText} required={props.required}>
        {(a11y) => (
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            className={cn(control(error), "p-3.5 resize-none", className)}
            {...a11y}
            {...props}
          />
        )}
      </FieldShell>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, FieldBaseProps {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <FieldShell id={inputId} label={label} error={error} helperText={helperText} required={props.required}>
        {(a11y) => (
          <div className="relative w-full">
            <select
              ref={ref}
              id={inputId}
              className={cn(control(error), "h-11 appearance-none px-3.5 pr-10 cursor-pointer", className)}
              {...a11y}
              {...props}
            >
              {children}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mute)]"
              aria-hidden="true"
            />
          </div>
        )}
      </FieldShell>
    );
  }
);
Select.displayName = "Select";
