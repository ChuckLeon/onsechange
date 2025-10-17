import React, { useMemo } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { Button, Input } from "@/components";
import "./Player.scss";

interface IPlayerUncontrolledProps {
  fieldBase: string;
  title: string;
  nameIsInvalid: boolean;
  emailIsInvalid: boolean;
  autoFocusName?: boolean;
  onDelete: () => void;
  canDelete: boolean;
}

export const Player = ({
  fieldBase,
  title,
  nameIsInvalid,
  emailIsInvalid,
  autoFocusName,
  onDelete,
  canDelete,
}: IPlayerUncontrolledProps) => {
  const fieldName = useMemo(() => `player${fieldBase}-name`, [fieldBase]);
  const fieldEmail = useMemo(() => `player${fieldBase}-email`, [fieldBase]);

  return (
    <div className="player">
      {canDelete && (
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="player__delete-button"
          leftIcon={<X size={16} />}
        />
      )}

      <h3 className="player__title">{title}</h3>

      <div className="player__content">
        <div className="player__field">
          <label
            htmlFor={fieldName}
            className={clsx("player__label", {
              "player__label--error": nameIsInvalid,
            })}
          >
            Nom
          </label>
          <Input
            type="text"
            name={fieldName}
            id={fieldName}
            className={clsx("player__input", {
              "player__input--error": nameIsInvalid,
            })}
            required
            autoFocus={autoFocusName}
          />
          {nameIsInvalid && (
            <p className="player__error-message">Nom invalide</p>
          )}
        </div>

        <div className="player__field">
          <label
            htmlFor={fieldEmail}
            className={clsx("player__label", {
              "player__label--error": emailIsInvalid,
            })}
          >
            Email
          </label>
          <Input
            type="email"
            name={fieldEmail}
            id={fieldEmail}
            className={clsx("player__input", {
              "player__input--error": emailIsInvalid,
            })}
            required
          />
          {emailIsInvalid && (
            <p className="player__error-message">Email invalide</p>
          )}
        </div>
      </div>
    </div>
  );
};
