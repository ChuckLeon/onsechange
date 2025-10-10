import { forwardRef, InputHTMLAttributes, useState, useCallback } from "react";
import clsx from "clsx";

type InputVariant = "default" | "filled" | "outline" | "underline";
type InputSize = "sm" | "md" | "lg";

interface IInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const inputVariants = {
  default:
    "bg-white border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
  filled:
    "bg-secondary-50 border-0 focus:bg-white focus:ring-2 focus:ring-primary-200",
  outline:
    "bg-transparent border-2 border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
  underline:
    "bg-transparent border-0 border-b-2 border-secondary-300 focus:border-primary-500 rounded-none",
};

const inputSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue !== "";
    const showClearButton = clearable && hasValue && !props.disabled;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [value, onChange]
    );

    const handleClear = useCallback(() => {
      if (value === undefined) {
        setInternalValue("");
      }
      onClear?.();
    }, [value, onClear]);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
      },
      [props]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
      },
      [props]
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
            className={clsx(
              // Base styles
              "w-full rounded-md transition-all duration-200",
              "text-secondary-900 placeholder-secondary-400",
              "focus:outline-none",
              "disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed",

              // Variant styles
              inputVariants[variant],

              // Size styles
              inputSizes[size],

              // Icon padding
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon || showClearButton,
              },

              // Error state
              {
                "border-error-500 focus:border-error-500 focus:ring-error-200":
                  error,
              },

              // Focus state
              {
                "ring-2 ring-primary-200": isFocused && !error,
              },

              className
            )}
          />

          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
              tabIndex={-1}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {rightIcon && !showClearButton && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1">
            {error && <p className="text-sm text-error-600">{error}</p>}
            {helperText && !error && (
              <p className="text-sm text-secondary-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
