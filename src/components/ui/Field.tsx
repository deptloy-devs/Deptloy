import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface FieldBaseProps {
  label: string;
  error?: string;
  helperText?: string;
}

/** Shared control styles — 48px tall, visible focus ring, danger border on error. */
const control = (error?: string) =>
  cn(
    "w-full rounded-control border bg-raised text-fg text-base sm:text-sm placeholder:text-fg-subtle",
    "transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-brand-400",
    error ? "border-danger/70 focus:ring-danger/40" : "border-line hover:border-line-strong"
  );

/**
 * Label + control + message. The message is linked to the control with
 * aria-describedby and aria-invalid, so screen readers announce errors.
 */
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
      <label htmlFor={id} className="text-sm font-medium text-fg-soft">
        {label}
        {required && (
          <span className="ml-0.5 text-brand-300" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({
        "aria-invalid": error ? true : undefined,
        "aria-describedby": hasMessage ? messageId : undefined,
      })}
      {error ? (
        <p id={messageId} className="flex items-center gap-1.5 text-caption font-medium text-danger">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : helperText ? (
        <p id={messageId} className="text-caption text-fg-muted">
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
        {(a11y) => <input id={inputId} ref={ref} className={cn(control(error), "h-12 px-4", className)} {...a11y} {...props} />}
      </FieldShell>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBaseProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    return (
      <FieldShell id={textareaId} label={label} error={error} helperText={helperText} required={props.required}>
        {(a11y) => (
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            className={cn(control(error), "min-h-28 resize-y px-4 py-3", className)}
            {...a11y}
            {...props}
          />
        )}
      </FieldShell>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, FieldBaseProps {
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    return (
      <FieldShell id={selectId} label={label} error={error} helperText={helperText} required={props.required}>
        {(a11y) => (
          <div className="relative">
            <select
              id={selectId}
              ref={ref}
              className={cn(control(error), "h-12 cursor-pointer appearance-none pl-4 pr-10", className)}
              {...a11y}
              {...props}
            >
              {children}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted"
              aria-hidden="true"
            />
          </div>
        )}
      </FieldShell>
    );
  }
);
Select.displayName = "Select";
