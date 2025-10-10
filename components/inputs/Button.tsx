"use client";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  fitContent?: boolean;
}

export const Button = ({
  className,
  rounded,
  fitContent,
  children,
  type,
  ...props
}: PropsWithChildren<IButton>) => {
  return (
    <button
      type={type ?? "button"}
      {...props}
      className={clsx(
        className,
        `
        py-1 px-4 rounded 
        text-white
        bg-primary-800 hover:bg-primary-700 
        active:bg-primary-600 focus:outline-primary-500 focus:ring-2 focus:ring-primary-500 
        ease-in-out duration-200 
        disabled:bg-secondary-600 disabled:hover:bg-secondary-600 disabled:text-secondary-300 disabled:opacity-30`,
        { "rounded-full": rounded },
        { "!p-1": rounded },
        { "w-fit": fitContent }
      )}
    >
      {children}
    </button>
  );
};
