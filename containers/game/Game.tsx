"use client";
import { Loader2, ArrowRight, Plus, RotateCcw, Check } from "lucide-react";
import { useGame } from "./useGame";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Step } from "@/utilities/types";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components";
import { LabelledInput, Player } from "@/containers";
import "./Game.scss";

const steps: { id: Step; label: string }[] = [
  { id: "SetOrganiser", label: "L'échange" },
  { id: "AddUsers", label: "Participants" },
  { id: "ExchangeSent", label: "Envoyé" },
];

export const Game = () => {
  const { currentStep, setCurrentStep } = useAppStore();
  const [autoFocusIndex, setAutoFocusIndex] = useState<number>(0);
  const {
    sendingEmails,
    canGoToSecondStep,
    players,
    playerStatuses,
    filledCount,
    startedCount,
    canSend,
    MIN_PLAYERS,
    formRef,
    exchangeNameRef,
    organiserNameRef,
    handleSubmit,
    onTopFieldChange,
    resetExchange,
    onDelete,
    addPlayer,
    onPlayerChange,
  } = useGame();

  const currentIndex = useMemo(
    () => steps.findIndex((step) => step.id === currentStep),
    [currentStep]
  );

  const sendHint = useMemo(() => {
    const missing = MIN_PLAYERS - filledCount;
    if (missing > 0) {
      return `Encore ${missing} participant${missing > 1 ? "s" : ""} à compléter pour envoyer (minimum ${MIN_PLAYERS}).`;
    }
    if (startedCount > 0) {
      return `${startedCount} carte${startedCount > 1 ? "s" : ""} commencée${startedCount > 1 ? "s" : ""} à compléter ou vider avant d'envoyer.`;
    }
    const emptyCount = players.length - filledCount;
    return `Prêt à envoyer à ${filledCount} participants.${emptyCount > 0 ? " Les cartes vides seront ignorées." : ""}`;
  }, [MIN_PLAYERS, filledCount, startedCount, players.length]);

  const progressSegments = useMemo(
    () => Array.from({ length: Math.max(MIN_PLAYERS, filledCount) }),
    [MIN_PLAYERS, filledCount]
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="game">
      <ol className="game__timeline">
        {steps.map((step, index) => {
          const isSent = currentStep === "ExchangeSent";
          const isDone =
            index < currentIndex || (isSent && index === currentIndex);
          const isClickable = !isSent && index < currentIndex;
          const content = (
            <>
              <span className="game__timeline-node">
                {isDone ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span className="game__timeline-label">{step.label}</span>
            </>
          );

          return (
            <li
              key={step.id}
              className={clsx("game__timeline-step", {
                "game__timeline-step--active": index === currentIndex,
                "game__timeline-step--done": isDone,
              })}
              aria-current={index === currentIndex ? "step" : undefined}
            >
              {isClickable ? (
                <button
                  type="button"
                  className="game__timeline-item game__timeline-item--clickable"
                  onClick={() => setCurrentStep(step.id)}
                >
                  {content}
                </button>
              ) : (
                <span className="game__timeline-item">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
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
          formNoValidate
          disabled={!canGoToSecondStep}
          className="game__next-button"
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
        {sendingEmails && (
          <div className="game__loading-container">
            <Loader2 className="game__loading-spinner" />
            <p className="game__loading-text">Envoi des courriels…</p>
          </div>
        )}
        <div
          className={clsx("game__players", {
            "game__players--hidden": sendingEmails,
          })}
        >
          <div className="game__section-header">
            <h2 className="game__section-title">Qui participe?</h2>
            <div className="game__progress">
              <div className="game__progress-bar" aria-hidden="true">
                {progressSegments.map((_, index) => (
                  <span
                    key={index}
                    className={clsx("game__progress-segment", {
                      "game__progress-segment--filled": index < filledCount,
                    })}
                  />
                ))}
              </div>
              <span className="game__count">
                {filledCount < MIN_PLAYERS
                  ? `${filledCount} / ${MIN_PLAYERS} minimum`
                  : `${filledCount} prêts`}
              </span>
            </div>
          </div>
          <div className="game__players-grid">
            {players.map((player, index) => (
              <Player
                key={player.id}
                fieldBase={index.toString()}
                title={`Participant ${String(index + 1).padStart(2, "0")}`}
                nameIsInvalid={player.name.error}
                emailIsInvalid={player.email.error}
                status={playerStatuses[player.id] ?? "empty"}
                autoFocusName={index === autoFocusIndex}
                onChange={(status) => onPlayerChange(player.id, status)}
                onDelete={() => onDelete(player.id)}
                canDelete={players.length > MIN_PLAYERS}
              />
            ))}
            <button
              type="button"
              className="game__add-player"
              onClick={() => {
                addPlayer();
                setAutoFocusIndex(players.length);
              }}
            >
              <Plus size={20} />
              Ajouter un participant
            </button>
          </div>

          <div className="game__actions">
            <Button
              type="submit"
              formNoValidate
              disabled={sendingEmails || !canSend}
              rightIcon={<ArrowRight size={16} />}
            >
              {"Envoyer!"}
            </Button>
            <p
              className={clsx("game__hint", {
                "game__hint--ready": canSend && startedCount === 0,
              })}
            >
              {sendHint}
            </p>
          </div>
        </div>
      </div>
      <div
        className={clsx("game__success-section", {
          "game__success-section--hidden": currentStep !== "ExchangeSent",
        })}
      >
        <div className="game__success-content">
          <p className="game__success-eyebrow">C&apos;est parti</p>
          <h2 className="game__success-title">{"L'échange est envoyé!"}</h2>
          <p className="game__success-description">
            Chaque participant a reçu un courriel avec le nom de la personne à
            qui offrir un cadeau.
          </p>
          <Button
            className="game__reset-button"
            variant="outline"
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
