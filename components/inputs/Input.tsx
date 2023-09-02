import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: IInput) => {
  return (
    <input {...props} className=" w-96 bg-white rounded p-3 text-stone-950" />
  );
};
