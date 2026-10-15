"use client";
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import "./Button.scss";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

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
          "button",
          `button--${variant}`,
          `button--${size}`,
          className
        )}
      >
        {loading && <Loader2 className="button__spinner" />}

        {!loading && leftIcon && (
          <span className="button__icon button__icon--left">{leftIcon}</span>
        )}

        {children && <span className="button__text">{children}</span>}

        {!loading && rightIcon && (
          <span className="button__icon button__icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
