import  {forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInput>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx("w-96 bg-white rounded p-3 text-stone-950", className)}
    />
  );
});

Input.displayName = "Input";
