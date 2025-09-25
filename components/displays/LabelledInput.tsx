import React from "react";
import { Input } from "../inputs/Input";

interface ILablledInput {
  label: string;
  inputName: string;
  inputId: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = React.forwardRef<HTMLInputElement, ILablledInput>(
  ({ label, inputName, inputId, autoFocus, onChange }, ref) => {
    return (
      <>
        <label htmlFor={inputName} className="text-2xl">
          {label}
        </label>
        <Input
          ref={ref}
          type="text"
          name={inputName}
          id={inputId}
          className="w-96"
          autoFocus={autoFocus}
          onChange={onChange}
        />
      </>
    );
  }
);

LabelledInput.displayName = "LabelledInput";
