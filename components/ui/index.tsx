import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react";

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "brand" | "success" | "warning" | "neutral" | "danger";

const badgeStyles: Record<BadgeVariant, string> = {
  brand:   "bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800",
  success: "bg-success-50 text-success-700 ring-green-200 dark:bg-green-950 dark:text-green-300 dark:ring-green-800",
  warning: "bg-warning-50 text-warning-700 ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:ring-yellow-800",
  neutral: "bg-neutral-100 text-neutral-600 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700",
  danger:  "bg-danger-50 text-danger-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800",
};

export function Badge({ children, variant = "neutral", className }: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ring-1",
      badgeStyles[variant],
      className,
    )}>
      {children}
    </span>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const btnVariants = {
  primary:   "bg-brand-600 text-white shadow-brand/20 shadow-md hover:bg-brand-700 active:bg-brand-800",
  secondary: "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 ring-1 ring-neutral-300 dark:ring-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:bg-neutral-100",
  ghost:     "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200",
  danger:    "bg-danger-500 text-white hover:bg-danger-700",
  success:   "bg-success-600 text-white hover:bg-success-700 active:bg-success-800",
};

const btnSizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        btnVariants[variant],
        btnSizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-0.5 w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              "px-3 transition-all outline-none",
              "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500",
              "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
              error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
              leftIcon && "pl-9",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {hint && !error && <p className="text-xs text-neutral-400 dark:text-neutral-500">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
            "p-3 transition-all outline-none resize-none",
            "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500",
            "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
            error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger-500">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">{label}</label>}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100",
            "px-3 transition-all outline-none appearance-none",
            "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500",
            "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
            error && "border-danger-500",
            className,
          )}
          {...props}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {error && <p className="text-xs text-danger-500">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className, hover = false }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn(
      "bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-card",
      hover && "hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
      className,
    )}>
      {children}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800", className)} />;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = "md", src }: { name: string; size?: "sm" | "md" | "lg"; src?: string }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const sizes = { sm: "w-6 h-6 text-[10px]", md: "w-8 h-8 text-xs", lg: "w-10 h-10 text-sm" };
  if (src) return (
    <Image
      src={src}
      alt={name}
      width={size === "sm" ? 24 : size === "lg" ? 40 : 32}
      height={size === "sm" ? 24 : size === "lg" ? 40 : 32}
      className={cn("rounded-full object-cover", sizes[size])}
      loading="lazy"
    />
  );
  return (
    <div className={cn("rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center flex-shrink-0", sizes[size])}>
      {initials}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-neutral-700 dark:text-neutral-200">{title}</p>
        {description && <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1 max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
