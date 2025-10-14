import React from "react";
import { Input } from "../inputs/Input";
import "./LabelledInput.scss";

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
      <div className="labelled-input">
        <label htmlFor={inputName} className="labelled-input__label">
          {label}
        </label>
        <Input
          ref={ref}
          type="text"
          name={inputName}
          id={inputId}
          className="labelled-input__input"
          autoFocus={autoFocus}
          onChange={onChange}
        />
      </div>
    );
  }
);

LabelledInput.displayName = "LabelledInput";
