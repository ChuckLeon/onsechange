import React from "react";
import { Input } from "../inputs/Input";

interface ILablledInput {
  label: string;
  inputName: string;
  inputId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({
  label,
  inputName,
  inputId,
  value,
  onChange,
}: ILablledInput) => {
  return (
    <>
      <label htmlFor={inputName} className="text-2xl">
        {label}
      </label>
      <Input
        type="text"
        name={inputName}
        id={inputId}
        className="w-96"
        value={value}
        onChange={onChange}
      />
    </>
  );
};
