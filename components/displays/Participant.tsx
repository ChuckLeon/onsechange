import React from "react";
import { Input } from "../inputs/Input";

interface IParticipant {
  title: string;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export const Participant = ({
  title,
  name,
  setName,
  email,
  setEmail,
}: IParticipant) => {
  return (
    <div className="flex flex-col py-4 gap-2">
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
