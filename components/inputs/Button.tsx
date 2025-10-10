"use client";
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariants = {
  primary:
    "bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm hover:shadow-md",
  secondary:
    "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border border-gray-200 shadow-sm",
  outline:
    "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm",
  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 hover:text-gray-900",
  danger:
    "bg-error-500 hover:bg-error-600 active:bg-error-700 text-white shadow-sm hover:shadow-md",
};

const buttonSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-8 text-sm",
  xl: "h-12 px-10 text-base",
};

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButton>>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      type,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={isDisabled}
        {...props}
        className={clsx(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "rounded-md",

          // Variant styles
          buttonVariants[variant],

          // Size styles
          buttonSizes[size],

          className
        )}
      >
        {loading && <Loader2 className="animate-spin h-4 w-4" />}

        {!loading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}

        {children && <span>{children}</span>}

        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
