"use client";
import { Button } from "./inputs/Button";
import { LabelledInput } from "./displays/LabelledInput";
import { Player } from "./displays/Player";
import { createNewPlayer } from "../utilities/player";
import { Loader2 } from "lucide-react";
import { useForm } from "./useForm";
import clsx from "clsx";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export const Form = () => {
  const { currentStep, setCurrentStep } = useAppStore();
  const [autoFocusIndex, setAutoFocusIndex] = useState<number>(0);
  const {
    sendingEmails,
    canGoToSecondStep,
    players,
    setPlayers,
    MIN_PLAYERS,
    formRef,
    exchangeNameRef,
    organiserNameRef,
    handleSubmit,
    onTopFieldChange,
    resetExchange,
    onDelete,
  } = useForm();

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-fit flex flex-col items-start gap-2 z-10"
    >
      <div
        className={clsx("flex flex-col items-start gap-4", {
          hidden: currentStep !== "SetOrganiser",
        })}
      >
        <div className="flex flex-col gap-2">
          <LabelledInput
            label="Nom de l'échange"
            inputName="exchangeName"
            inputId="exchangeName"
            ref={exchangeNameRef}
            autoFocus
            onChange={onTopFieldChange}
          />

          <LabelledInput
            label="Nom de l'organisateur"
            inputName="organiser"
            inputId="organiser"
            ref={organiserNameRef}
            onChange={onTopFieldChange}
          />
        </div>

        <Button
          type="submit"
          onClick={() => setCurrentStep("AddUsers")}
          disabled={!canGoToSecondStep}
          className="w-full"
        >
          Prochaine étape
        </Button>
      </div>

      <div className={clsx({ hidden: currentStep !== "AddUsers" })}>
        {sendingEmails ? (
          <Loader2 className="spin" />
        ) : (
          <>
            {players.map((player, index) => (
              <Player
                key={player.id}
                fieldBase={index.toString()}
                title={`Participant ${index + 1}`}
                nameIsInvalid={player.name.error}
                emailIsInvalid={player.email.error}
                autoFocusName={index === autoFocusIndex}
                onDelete={() => onDelete(player.id)}
              />
            ))}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                disabled={sendingEmails}
                onClick={() => {
                  setPlayers([
                    ...players,
                    { ...createNewPlayer(crypto.randomUUID()) },
                  ]);
                  setAutoFocusIndex(players.length);
                }}
              >
                {"Ajouter un participant"}
              </Button>
              <Button
                type="submit"
                disabled={sendingEmails || players.length < MIN_PLAYERS}
              >
                {"Envoie l'échange!!"}
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={clsx({ hidden: currentStep !== "ExchangeSent" })}>
        <div className="flex flex-col gap-2">
          <h2>{"L'échange est envoyé!"}</h2>
          <Button onClick={resetExchange}>Commencer un autre échange</Button>
        </div>
      </div>
    </form>
  );
};
