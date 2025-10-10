"use client";
import { Button } from "./inputs/Button";
import { LabelledInput } from "./displays/LabelledInput";
import { Player } from "./displays/Player";
import { createNewPlayer } from "../utilities/player";
import { Loader2, ArrowRight, Plus, Send, RotateCcw } from "lucide-react";
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
          rightIcon={<ArrowRight size={16} />}
        >
          Ajouter des participants
        </Button>
      </div>

      <div
        className={clsx("w-full max-w-6xl", {
          hidden: currentStep !== "AddUsers",
        })}
      >
        {sendingEmails ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div
              className={clsx("grid gap-3 mb-6", {
                "grid-cols-1": players.length === 1,
                "grid-cols-1 md:grid-cols-2": players.length === 2,
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3":
                  players.length >= 3,
              })}
            >
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
            </div>

            <div className="flex gap-3 w-100 justify-center">
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
                leftIcon={<Plus size={16} />}
              >
                {"Ajouter"}
              </Button>
              <Button
                type="submit"
                disabled={sendingEmails || players.length < MIN_PLAYERS}
                leftIcon={<Send size={16} />}
              >
                {"Envoyer!"}
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={clsx({ hidden: currentStep !== "ExchangeSent" })}>
        <div className="flex flex-col gap-6">
          <h2>{"L'échange est envoyé!"}</h2>
          <Button
            className="w-fit m-auto"
            onClick={resetExchange}
            leftIcon={<RotateCcw size={16} />}
          >
            Commencer un autre échange
          </Button>
        </div>
      </div>
    </form>
  );
};
