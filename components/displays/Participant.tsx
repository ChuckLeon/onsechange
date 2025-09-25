import React from "react";
import { Input } from "../inputs/Input";
import { Button } from "../inputs/Button";
import clsx from "clsx";

interface IParticipant {
  title: string;
  name: string;
  nameIsInvalid: boolean;
  setName: (value: string) => void;
  email: string;
  emailIsInvalid: boolean;
  setEmail: (value: string) => void;
  onDelete: () => void;
}

export const Participant = ({
  title,
  name,
  nameIsInvalid,
  setName,
  email,
  emailIsInvalid,
  setEmail,
  onDelete,
}: IParticipant) => {
  return (
    <div className={clsx("flex flex-col relative py-4 gap-2")}>
      <div className="absolute top-4 right-0">
        <Button onClick={onDelete} rounded fitContent>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
      <h2>{title}</h2>
      <div className="flex flex-col">
        <label
          htmlFor={`name-${title}`}
          className={clsx("text-2xl", { "text-red-500": nameIsInvalid })}
        >
          Nom
        </label>
        <Input
          type="text"
          name={`name-${title}`}
          className={clsx("w-96", { "text-red-500": nameIsInvalid })}
          value={name}
          required
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
        {nameIsInvalid && <p className="text-red-500">Nom invalide</p>}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={`email-${title}`}
          className={clsx("text-2xl", { "text-red-500": emailIsInvalid })}
        >
          Email
        </label>
        <Input
          type="text"
          name={`email-${title}`}
          className={clsx("w-96", { "text-red-500": emailIsInvalid })}
          value={email}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        {emailIsInvalid && <p className="text-red-500">Email invalide</p>}
      </div>
    </div>
  );
};
