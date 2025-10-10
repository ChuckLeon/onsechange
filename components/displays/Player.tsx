import React, { useMemo } from "react";
import { Input } from "../inputs/Input";
import { Button } from "../inputs/Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface IPlayerUncontrolledProps {
  fieldBase: string;
  title: string;
  nameIsInvalid: boolean;
  emailIsInvalid: boolean;
  autoFocusName?: boolean;
  onDelete: () => void;
}

export const Player = ({
  fieldBase,
  title,
  nameIsInvalid,
  emailIsInvalid,
  autoFocusName,
  onDelete,
}: IPlayerUncontrolledProps) => {
  const fieldName = useMemo(() => `player${fieldBase}-name`, [fieldBase]);
  const fieldEmail = useMemo(() => `player${fieldBase}-email`, [fieldBase]);

  return (
    <div className={clsx("flex flex-col relative py-4 gap-2")}>
      <div className="absolute top-4 right-0">
        <Button onClick={onDelete} rounded fitContent>
          <X size={15} />
        </Button>
      </div>
      <h2>{title}</h2>
      <div className="flex flex-col">
        <label
          htmlFor={fieldName}
          className={clsx("text-2xl", { "text-error": nameIsInvalid })}
        >
          Nom
        </label>
        <Input
          type="text"
          name={fieldName}
          id={fieldName}
          className={clsx("w-96", { "text-error border-error": nameIsInvalid })}
          required
          autoFocus={autoFocusName}
        />
        {nameIsInvalid && <p className="text-error">Nom invalide</p>}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={fieldEmail}
          className={clsx("text-2xl", { "text-error": emailIsInvalid })}
        >
          Email
        </label>
        <Input
          type="email"
          name={fieldEmail}
          id={fieldEmail}
          className={clsx("w-96", {
            "text-error border-error": emailIsInvalid,
          })}
          required
        />
        {emailIsInvalid && <p className="text-error">Email invalide</p>}
      </div>
    </div>
  );
};
