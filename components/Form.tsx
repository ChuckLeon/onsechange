"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "./inputs/Button";
import { Step } from "../utilities/types";
import { LabelledInput } from "./displays/LabelledInput";
import { Participant } from "./displays/Participant";
import { IParticipant, emptyParticipant } from "../utilities/interfaces";

export const Form = () => {
  const [organiserName, setOrganiserName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<Step>("SetOrganiser");
  const [canGoToSecondStep, setCanGoToSecondStep] = useState<boolean>(false);
  const [participants, setParticipants] = useState<IParticipant[]>([
    { ...emptyParticipant },
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  const MIN_PARTICIPANTS = 3;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //todo: send email here

    setCurrentStep("ExchangeSent");
  };

  useEffect(() => {
    setCanGoToSecondStep(organiserName.length > 0);
  }, [organiserName]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-fit flex flex-col items-start gap-2"
    >
      {currentStep === "SetOrganiser" && (
        <>
          <LabelledInput
            label="Nom de l'organisateur"
            inputName="organiser"
            inputId="organiser"
            value={organiserName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrganiserName(e.currentTarget.value)
            }
          />

          <Button
            type="button"
            onClick={() => setCurrentStep("AddUsers")}
            disabled={!canGoToSecondStep}
          >
            Prochaine étape
          </Button>
        </>
      )}
      {currentStep === "AddUsers" && (
        <>
          {participants.map((participant, index) => (
            <Participant
              key={`participant-${index}`}
              title={`Participant ${index + 1}`}
              name={participant.name}
              setName={(newName) => {
                const newParticipants = [...participants];
                newParticipants[index].name = newName;
                setParticipants(newParticipants);
              }}
              email={participant.email}
              setEmail={(newEmail) => {
                const newParticipants = [...participants];
                newParticipants[index].email = newEmail;
                setParticipants(newParticipants);
              }}
            />
          ))}
          <Button
            type="button"
            onClick={() => {
              setParticipants([...participants, { ...emptyParticipant }]);
            }}
          >
            {"Ajouter un participant"}
          </Button>
          <Button
            type="submit"
            disabled={
              participants.length < MIN_PARTICIPANTS ||
              participants.filter(
                (participant) =>
                  participant.name.length === 0 &&
                  participant.email.length === 0
              ).length > 0
            }
          >
            {"Envoie l'échange!!"}
          </Button>
        </>
      )}
      {currentStep === "ExchangeSent" && <h2>{"Lets goooo c'est envoyé"}</h2>}
    </form>
  );
};
