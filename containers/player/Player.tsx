import { useCallback, useMemo, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import { Button, Input } from "@/components";
import { isValidEmail } from "@/utilities/schemas";
import { PlayerStatus } from "@/utilities/player";
import "./Player.scss";

interface IPlayerUncontrolledProps {
  fieldBase: string;
  title: string;
  nameIsInvalid: boolean;
  emailIsInvalid: boolean;
  status: PlayerStatus;
  autoFocusName?: boolean;
  onChange: (status: PlayerStatus) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export const Player = ({
  fieldBase,
  title,
  nameIsInvalid,
  emailIsInvalid,
  status,
  autoFocusName,
  onChange,
  onDelete,
  canDelete,
}: IPlayerUncontrolledProps) => {
  const fieldName = useMemo(() => `player${fieldBase}-name`, [fieldBase]);
  const fieldEmail = useMemo(() => `player${fieldBase}-email`, [fieldBase]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailBlurError, setEmailBlurError] = useState(false);
  const showEmailError = emailIsInvalid || emailBlurError;
  const hasError = nameIsInvalid || showEmailError;

  const handleChange = useCallback(() => {
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const emailIsValid = isValidEmail(email);
    if (emailIsValid) setEmailBlurError(false);
    if (name.length > 0 && emailIsValid) onChange("filled");
    else if (name.length > 0 || email.length > 0) onChange("started");
    else onChange("empty");
  }, [onChange]);

  const handleEmailBlur = useCallback(() => {
    const email = emailRef.current?.value.trim() ?? "";
    setEmailBlurError(email.length > 0 && !isValidEmail(email));
  }, []);

  return (
    <div
      className={clsx("player", {
        "player--empty": status === "empty" && !hasError,
        "player--filled": status === "filled",
        "player--error": hasError,
      })}
    >
      <div className="player__header">
        <h3 className="player__title">
          {title}
          {status === "filled" && <Check size={14} className="player__check" />}
        </h3>
        {canDelete && (
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="player__delete-button"
            aria-label={`Retirer ${title}`}
            leftIcon={<X size={16} />}
          />
        )}
      </div>
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
            ref={nameRef}
            type="text"
            name={fieldName}
            id={fieldName}
            className={clsx({ "player__input--error": nameIsInvalid })}
            placeholder="Prénom"
            autoFocus={autoFocusName}
            onChange={handleChange}
          />
          {nameIsInvalid && (
            <p className="player__error-message">Nom invalide</p>
          )}
        </div>

        <div className="player__field">
          <label
            htmlFor={fieldEmail}
            className={clsx("player__label", {
              "player__label--error": showEmailError,
            })}
          >
            Email
          </label>
          <Input
            ref={emailRef}
            type="email"
            name={fieldEmail}
            id={fieldEmail}
            className={clsx({ "player__input--error": showEmailError })}
            placeholder="nom@exemple.com"
            onChange={handleChange}
            onBlur={handleEmailBlur}
            aria-invalid={showEmailError}
          />
          {showEmailError && (
            <p className="player__error-message">Email invalide</p>
          )}
        </div>
      </div>
    </div>
  );
};
