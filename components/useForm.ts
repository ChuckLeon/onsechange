"use client";
import { FormEvent, useRef, useState } from "react";
import { Step } from "../utilities/types";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";
import { playersSchema } from "@/utilities/schemas";
import { ZodIssue, z } from "zod";
import { emptyPlayer, IPlayer } from "@/utilities/player";

export const useForm = () => {
  const [sendingEmails, setSendingEmails] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<Step>("SetOrganiser");
  const [canGoToSecondStep, setCanGoToSecondStep] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>([{ ...emptyPlayer }]);
  const formRef = useRef<HTMLFormElement>(null);
  const exchangeNameRef = useRef<HTMLInputElement>(null);
  const organiserNameRef = useRef<HTMLInputElement>(null);

  const MIN_PLAYERS = 3;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingEmails(true);

    try {
      const errors = await validatePlayers(players);

      if (errors) {
        manageErrors(errors);
      }

      sendToPlayers();
    } catch (error) {
      console.error(error);
    } finally {
      setSendingEmails(false);
    }
  };

  const validatePlayers = async (
    players: IPlayer[]
  ): Promise<ZodIssue[] | null> => {
    try {
      playersSchema.parse(players);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors;
      }
    }

    return null;
  };

  const sendToPlayers = async () => {
    const exchangeName = exchangeNameRef.current?.value ?? "";
    const organiserName = organiserNameRef.current?.value ?? "";

    let giftees: IPlayer[] = [];

    try {
      for (const player of players) {
        const notPickedPlayers = players.filter(
          (player) =>
            giftees.findIndex(
              (giftee) =>
                giftee.email.value === player.email.value &&
                giftee.name.value === player.name.value
            ) === -1
        );
        const randomGiftee = getRandomItemFromArray(notPickedPlayers, player);

        giftees.push(randomGiftee);

        await sendEmail(exchangeName, organiserName, player, randomGiftee);

        setCurrentStep("ExchangeSent");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const manageErrors = (errors: ZodIssue[]) => {
    setPlayers((prevState) => {
      const newPlayers = [...prevState];
      errors.forEach((error) => {
        const key = error.path[1];

        if (key === "name")
          newPlayers[error.path[0] as number].name.error = true;
        else if (key === "email")
          newPlayers[error.path[0] as number].email.error = true;
      });

      return newPlayers;
    });
  };

  const resetExchange = () => {
    setCurrentStep("SetOrganiser");
    if (organiserNameRef.current) organiserNameRef.current.value = "";
    if (exchangeNameRef.current) exchangeNameRef.current.value = "";
    setPlayers([]);
    setCanGoToSecondStep(false);
  };

  const onDelete = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const onTopFieldChange = () => {
    const hasOrganiser = (organiserNameRef.current?.value ?? "").length > 0;
    setCanGoToSecondStep(hasOrganiser);
  };

  return {
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
  };
};
