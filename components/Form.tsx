"use client";
import { Button } from "./inputs/Button";
import { LabelledInput } from "./displays/LabelledInput";
import { Participant } from "./displays/Participant";
import { emptyParticipant } from "../utilities/interfaces";
import { Loader2 } from "lucide-react";
import { useForm } from "./useForm";

export const Form = () => {
  const {
    sendingEmails,
    organiserName,
    setOrganiserName,
    currentStep,
    setCurrentStep,
    canGoToSecondStep,
    participants,
    setParticipants,
    MIN_PARTICIPANTS,
    formRef,
    handleSubmit,
  } = useForm();

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
      {currentStep === "AddUsers" &&
        (sendingEmails ? (
          <Loader2 className="spin" />
        ) : (
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
                    participant.name.length === 0 ||
                    participant.email.length === 0
                ).length > 0
              }
            >
              {"Envoie l'échange!!"}
            </Button>
          </>
        ))}
      {currentStep === "ExchangeSent" && <h2>{"Lets goooo c'est envoyé"}</h2>}
    </form>
  );
};
