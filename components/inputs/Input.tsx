import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          "w-96 bg-white rounded p-2 text-secondary-900 border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
