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
        text-slate-50
        bg-slate-950 hover:bg-slate-900 
        active:bg-slate-700 focus:outline-slate-50 focus:ringfocus:ring-slate-50 
        ease-in-out duration-200 
        disabled:bg-slate-500 disabled:hover:bg-slate-500 disabled:text-slate-950 disabled:opacity-30`,
        { "rounded-full": rounded },
        { "!p-1": rounded },
        { "w-fit": fitContent }
      )}
    >
      {children}
    </button>
  );
};
