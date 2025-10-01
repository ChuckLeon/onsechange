import React from "react";
import { Input } from "../inputs/Input";
import { Button } from "../inputs/Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface IPlayerUncontrolledProps {
  title: string;
  nameFieldName: string;
  emailFieldName: string;
  nameIsInvalid: boolean;
  emailIsInvalid: boolean;
  autoFocusName?: boolean;
  onDelete: () => void;
}

export const Player = ({
  title,
  nameFieldName,
  emailFieldName,
  nameIsInvalid,
  emailIsInvalid,
  autoFocusName,
  onDelete,
}: IPlayerUncontrolledProps) => {
  return (
    <div className={clsx("flex flex-col relative py-4 gap-2")}>
      <div className="absolute top-4 right-0">
        <Button onClick={onDelete} rounded fitContent>
          <X />
        </Button>
      </div>
      <h2>{title}</h2>
      <div className="flex flex-col">
        <label
          htmlFor={nameFieldName}
          className={clsx("text-2xl", { "text-red-500": nameIsInvalid })}
        >
          Nom
        </label>
        <Input
          type="text"
          name={nameFieldName}
          id={nameFieldName}
          className={clsx("w-96", { "text-red-500": nameIsInvalid })}
          required
          autoFocus={autoFocusName}
        />
        {nameIsInvalid && <p className="text-red-500">Nom invalide</p>}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={emailFieldName}
          className={clsx("text-2xl", { "text-red-500": emailIsInvalid })}
        >
          Email
        </label>
        <Input
          type="email"
          name={emailFieldName}
          id={emailFieldName}
          className={clsx("w-96", { "text-red-500": emailIsInvalid })}
          required
        />
        {emailIsInvalid && <p className="text-red-500">Email invalide</p>}
      </div>
    </div>
  );
};
