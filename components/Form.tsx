"use client";
import { Button } from "./inputs/Button";
import { LabelledInput } from "./displays/LabelledInput";
import { Participant } from "./displays/Participant";
import { createNewParticipant } from "../utilities/participant";
import { Loader2 } from "lucide-react";
import { useForm } from "./useForm";

export const Form = () => {
  const {
    sendingEmails,
    exchangeName,
    setExchangeName,
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
    resetExchange,
    onDelete,
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
            label="Nom de l'échange"
            inputName="exchangeName"
            inputId="exchangeName"
            value={exchangeName}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExchangeName(e.currentTarget.value)
            }
          />

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
            type="submit"
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
                name={participant.name.value}
                setName={(newName) => {
                  const newParticipants = [...participants];
                  newParticipants[index].name.value = newName;
                  setParticipants(newParticipants);
                }}
                email={participant.email.value}
                setEmail={(newEmail) => {
                  const newParticipants = [...participants];
                  newParticipants[index].email.value = newEmail;
                  setParticipants(newParticipants);
                }}
                onDelete={() => onDelete(participant.id)}
                error={participant.name.error || participant.email.error}
              />
            ))}
            <Button
              type="button"
              onClick={() => {
                setParticipants([
                  ...participants,
                  { ...createNewParticipant(crypto.randomUUID()) },
                ]);
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
                    participant.name.value.length === 0 ||
                    participant.email.value.length === 0
                ).length > 0
              }
            >
              {"Envoie l'échange!!"}
            </Button>
          </>
        ))}
      {currentStep === "ExchangeSent" && (
        <div className="flex flex-col gap-2">
          <h2>{"L'échange est envoyé!"}</h2>
          <Button onClick={resetExchange}>Envoyer un autre échange</Button>
        </div>
      )}
    </form>
  );
};
