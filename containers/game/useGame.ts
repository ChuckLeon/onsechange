"use client";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { Step } from "../../utilities/types";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";
import { playersSchema } from "@/utilities/schemas";
import { ZodIssue, z } from "zod";
import { createNewPlayer, IPlayer, PlayerStatus } from "@/utilities/player";
import { useAppStore } from "@/lib/store";

const MIN_PLAYERS = 3;

const createInitialPlayers = (): IPlayer[] =>
  Array.from({ length: MIN_PLAYERS }, () =>
    createNewPlayer(crypto.randomUUID())
  );

export const useGame = () => {
  const { currentStep, setCurrentStep } = useAppStore();
  const [sendingEmails, setSendingEmails] = useState<boolean>(false);
  const [canGoToSecondStep, setCanGoToSecondStep] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>(createInitialPlayers);
  const [playerStatuses, setPlayerStatuses] = useState<
    Record<string, PlayerStatus>
  >({});
  const formRef = useRef<HTMLFormElement>(null);
  const exchangeNameRef = useRef<HTMLInputElement>(null);
  const organiserNameRef = useRef<HTMLInputElement>(null);

  const filledCount = useMemo(
    () =>
      players.filter((player) => playerStatuses[player.id] === "filled").length,
    [players, playerStatuses]
  );
  const startedCount = useMemo(
    () =>
      players.filter((player) => playerStatuses[player.id] === "started")
        .length,
    [players, playerStatuses]
  );
  const canSend = filledCount >= MIN_PLAYERS;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep === "SetOrganiser") {
      if (canGoToSecondStep) {
        setCurrentStep("AddUsers");
        requestAnimationFrame(() =>
          formRef.current
            ?.querySelector<HTMLInputElement>('[name="player0-name"]')
            ?.focus()
        );
      }
      return;
    }

    const formData = new FormData(formRef.current!);
    const formPlayers: IPlayer[] = buildPlayersFromFormData(formData);
    const startedIndexes = formPlayers
      .map((_, index) => index)
      .filter(
        (index) =>
          formPlayers[index].name.value.trim() ||
          formPlayers[index].email.value.trim()
      );
    const playersToSend = startedIndexes.map((index) => formPlayers[index]);
    const errors = await validatePlayers(playersToSend);

    showErrors(
      (errors ?? []).map((error) => ({
        index: startedIndexes[error.path[0] as number],
        field: error.path[1],
      }))
    );

    if (errors || playersToSend.length < MIN_PLAYERS) return;

    setSendingEmails(true);

    try {
      await sendToPlayers(playersToSend);
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
      const match = key.match(/^player(\d+)-(name|email)$/);
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

  const showErrors = (errors: { index: number; field: unknown }[]) => {
    const hasError = (index: number, field: "name" | "email") =>
      errors.some((error) => error.index === index && error.field === field);

    setPlayers((prevState) =>
      prevState.map((player, index) => ({
        ...player,
        name: { ...player.name, error: hasError(index, "name") },
        email: { ...player.email, error: hasError(index, "email") },
      }))
    );
  };

  const resetExchange = () => {
    setCurrentStep("SetOrganiser");
    if (organiserNameRef.current) organiserNameRef.current.value = "";
    if (exchangeNameRef.current) exchangeNameRef.current.value = "";
    setPlayers(createInitialPlayers());
    setPlayerStatuses({});
    setCanGoToSecondStep(false);
  };

  const addPlayer = () => {
    setPlayers([...players, createNewPlayer(crypto.randomUUID())]);
  };

  const onDelete = (id: string) => {
    if (players.length > MIN_PLAYERS) {
      setPlayers(players.filter((player) => player.id !== id));
      setPlayerStatuses(({ [id]: _, ...rest }) => rest);
    }
  };

  const onPlayerChange = useCallback((id: string, status: PlayerStatus) => {
    setPlayerStatuses((prev) =>
      prev[id] === status ? prev : { ...prev, [id]: status }
    );
    setPlayers((prev) =>
      prev.some((p) => p.id === id && (p.name.error || p.email.error))
        ? prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  name: { ...p.name, error: false },
                  email: { ...p.email, error: false },
                }
              : p
          )
        : prev
    );
  }, []);

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
  };
};
