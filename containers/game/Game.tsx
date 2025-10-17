"use client";
import { createNewPlayer } from "../../utilities/player";
import { Loader2, ArrowRight, Plus, Send, RotateCcw } from "lucide-react";
import { useGame } from "./useGame";
import clsx from "clsx";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components";
import { LabelledInput, Player } from "@/containers";
import "./Game.scss";

export const Game = () => {
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
  } = useGame();

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="game">
      <div
        className={clsx("game__organiser-section", {
          "game__organiser-section--hidden": currentStep !== "SetOrganiser",
        })}
      >
        <div className="game__form-fields">
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
          className="m-auto"
          rightIcon={<ArrowRight size={16} />}
        >
          Ajouter des participants
        </Button>
      </div>

      <div
        className={clsx("game__users-section", {
          "game__users-section--hidden": currentStep !== "AddUsers",
        })}
      >
        {sendingEmails ? (
          <div className="game__loading-container">
            <Loader2 className="game__loading-spinner" />
          </div>
        ) : (
          <>
            <div
              className={clsx("game__players-grid", {
                "game__players-grid--single": players.length === 1,
                "game__players-grid--double": players.length === 2,
                "game__players-grid--triple": players.length >= 3,
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
                  canDelete={players.length > 1}
                />
              ))}
            </div>

            <div className="game__actions">
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
      <div
        className={clsx("game__success-section", {
          "game__success-section--hidden": currentStep !== "ExchangeSent",
        })}
      >
        <div className="game__success-content">
          <h2 className="game__success-title">{"L'échange est envoyé!"}</h2>
          <Button
            className="game__reset-button"
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
