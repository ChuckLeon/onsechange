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
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg min-h-[200px] min-w-[300px] flex flex-col">
      <Button
        onClick={onDelete}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-8 w-8 p-0 !rounded-full !text-white/70 hover:!text-white hover:bg-red-500/20 hover:border-red-400/30 border border-transparent transition-all"
      >
        <X size={16} />
      </Button>

      <h3 className="text-lg font-semibold text-white mb-3 pr-8">{title}</h3>

      <div className="space-y-3 flex-1">
        <div className="space-y-1">
          <label
            htmlFor={fieldName}
            className={clsx("block text-sm font-medium text-white/90", {
              "text-red-400": nameIsInvalid,
            })}
          >
            Nom
          </label>
          <Input
            type="text"
            name={fieldName}
            id={fieldName}
            className={clsx("h-10", {
              "border-red-400 bg-red-50/10 text-red-200": nameIsInvalid,
            })}
            required
            autoFocus={autoFocusName}
          />
          {nameIsInvalid && (
            <p className="text-xs text-red-400">Nom invalide</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor={fieldEmail}
            className={clsx("block text-sm font-medium text-white/90", {
              "text-red-400": emailIsInvalid,
            })}
          >
            Email
          </label>
          <Input
            type="email"
            name={fieldEmail}
            id={fieldEmail}
            className={clsx("h-10", {
              "border-red-400 bg-red-50/10 text-red-200": emailIsInvalid,
            })}
            required
          />
          {emailIsInvalid && (
            <p className="text-xs text-red-400">Email invalide</p>
          )}
        </div>
      </div>
    </div>
  );
};
