"use client";
import { Button } from "./inputs/Button";
import { LabelledInput } from "./displays/LabelledInput";
import { Player } from "./displays/Player";
import { createNewPlayer } from "../utilities/player";
import { Loader2 } from "lucide-react";
import { useForm } from "./useForm";
import clsx from "clsx";

export const Form = () => {
  const {
    sendingEmails,
    currentStep,
    setCurrentStep,
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

  console.log(currentStep);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-fit flex flex-col items-start gap-2"
    >
      <div
        className={clsx("flex flex-col items-start gap-2", {
          hidden: currentStep !== "SetOrganiser",
        })}
      >
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

        <Button
          type="submit"
          onClick={() => setCurrentStep("AddUsers")}
          disabled={!canGoToSecondStep}
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
                key={`player-${index}`}
                title={`Participant ${index + 1}`}
                name={player.name.value}
                nameIsInvalid={player.name.error}
                setName={(newName) => {
                  const newPlayers = [...players];
                  newPlayers[index].name.value = newName;
                  setPlayers(newPlayers);
                }}
                email={player.email.value}
                emailIsInvalid={player.email.error}
                setEmail={(newEmail) => {
                  const newPlayers = [...players];
                  newPlayers[index].email.value = newEmail;
                  setPlayers(newPlayers);
                }}
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
                }}
              >
                {"Ajouter un participant"}
              </Button>
              <Button
                type="submit"
                disabled={
                  sendingEmails ||
                  players.length < MIN_PLAYERS ||
                  players.filter(
                    (player) =>
                      player.name.value.length === 0 ||
                      player.email.value.length === 0
                  ).length > 0
                }
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
