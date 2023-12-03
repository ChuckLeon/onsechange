import React from "react";
import { Input } from "../inputs/Input";
import { Button } from "../inputs/Button";

interface IParticipant {
  title: string;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onDelete: () => void;
}

export const Participant = ({
  title,
  name,
  setName,
  email,
  setEmail,
  onDelete,
}: IParticipant) => {
  return (
    <div className="flex flex-col relative py-4 gap-2">
      <div className="absolute top-4 right-0">
        <Button onClick={onDelete} rounded fitContent>
          {/* from heroicons */}
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
      <label htmlFor={`name-${title}`} className="text-2xl">
        Nom
      </label>
      <Input
        type="text"
        name={`name-${title}`}
        className="w-96"
        value={name}
        required
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.currentTarget.value)
        }
      />
      <label htmlFor={`email-${title}`} className="text-2xl">
        Email
      </label>
      <Input
        type="text"
        name={`email-${title}`}
        className="w-96"
        value={email}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
      />
    </div>
  );
};
