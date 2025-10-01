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
      // Build players from FormData to avoid per-keystroke state updates
      const formData = new FormData(formRef.current!);
      const formPlayers: IPlayer[] = buildPlayersFromFormData(formData);

      const errors = await validatePlayers(formPlayers);

      if (errors) {
        manageErrors(errors);
        return;
      }

      await sendToPlayers(formPlayers);
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

  const sendToPlayers = async (playersToSend: IPlayer[]) => {
    const exchangeName = exchangeNameRef.current?.value ?? "";
    const organiserName = organiserNameRef.current?.value ?? "";

    let giftees: IPlayer[] = [];

    // TODO: validate why we dont see the last player name
    try {
      for (const player of playersToSend) {
        const notPickedPlayers = playersToSend.filter(
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

  const buildPlayersFromFormData = (formData: FormData): IPlayer[] => {
    // Expect fields like players[0][name], players[0][email]
    const indexed: Record<string, Partial<IPlayer>> = {};
    formData.forEach((value, key) => {
      const stringValue = value?.toString() ?? "";
      const match = key.match(/^players\[(\d+)\]\[(name|email)\]$/);
      if (!match) return;
      const index = match[1];
      const field = match[2] as "name" | "email";
      if (!indexed[index]) indexed[index] = {} as Partial<IPlayer>;
      if (field === "name") {
        (indexed[index] as any).name = { value: stringValue, error: false };
      } else if (field === "email") {
        (indexed[index] as any).email = { value: stringValue, error: false };
      }
    });
    // Preserve existing ids order/length based on current state
    const result: IPlayer[] = Object.keys(indexed)
      .sort((a, b) => Number(a) - Number(b))
      .map((idx, i) => {
        const existing = players[i];
        const id = existing?.id ?? crypto.randomUUID();
        const partial = indexed[idx] as any;
        return {
          id,
          name: partial.name ?? { value: "", error: false },
          email: partial.email ?? { value: "", error: false },
        } as IPlayer;
      });
    return result;
  };

  const manageErrors = (errors: ZodIssue[]) => {
    setPlayers((prevState) => {
      const newPlayers = [...prevState];
      errors.forEach((error) => {
        const key = error.path[1];
        const index = error.path[0] as number;
        if (!newPlayers[index]) return;
        if (key === "name") newPlayers[index].name.error = true;
        else if (key === "email") newPlayers[index].email.error = true;
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
