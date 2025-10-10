import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from "react";
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
}

const inputVariants = {
  default:
    "bg-gray-900 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  filled:
    "bg-gray-800 border-0 focus:bg-gray-900 focus:ring-2 focus:ring-blue-200",
  outline:
    "bg-transparent border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  underline:
    "bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 rounded-none",
};

const inputSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
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
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      },
      [onChange]
    );

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
          <label className="block text-sm font-medium text-text-primary mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}

          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = node;
              }
              (
                inputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = node;
            }}
            defaultValue={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
            className={clsx(
              "w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-text-primary",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-text-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              inputVariants[variant],
              inputSizes[size],
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon,
              },
              {
                "border-text-error focus:border-text-error focus:ring-red-200":
                  error,
              },
              {
                "ring-2 ring-blue-200": isFocused && !error,
              },
              className
            )}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1">
            {error && <p className="text-sm text-text-error">{error}</p>}
            {helperText && !error && (
              <p className="text-sm text-text-muted">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
