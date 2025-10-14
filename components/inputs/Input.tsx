import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from "react";
import clsx from "clsx";
import "./Input.scss";

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
  default: "input__field--default",
  filled: "input__field--filled",
  outline: "input__field--outline",
  underline: "input__field--underline",
};

const inputSizes = {
  sm: "input__field--sm",
  md: "input__field--md",
  lg: "input__field--lg",
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
      <div className="input">
        {label && <label className="input__label">{label}</label>}

        <div className="input__container">
          {leftIcon && (
            <div className="input__icon input__icon--left">{leftIcon}</div>
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
              "input__field",
              inputVariants[variant],
              inputSizes[size],
              {
                "input__field--with-left-icon": leftIcon,
                "input__field--with-right-icon": rightIcon,
              },
              {
                "input__field--error": error,
              },
              {
                "input__field--focused": isFocused && !error,
              },
              className
            )}
          />

          {rightIcon && (
            <div className="input__icon input__icon--right">{rightIcon}</div>
          )}
        </div>

        {(error || helperText) && (
          <div className="input__message">
            {error && <p className="input__message--error">{error}</p>}
            {helperText && !error && (
              <p className="input__message--helper">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
