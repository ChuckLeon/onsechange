"use client";
import { FormEvent, useRef, useState } from "react";
import { Step } from "../utilities/types";
import { IParticipant, emptyParticipant } from "../utilities/participant";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";
import { participantsSchema } from "@/utilities/schemas";
import { ZodIssue, z } from "zod";

export const useForm = () => {
  const [sendingEmails, setSendingEmails] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<Step>("SetOrganiser");
  const [canGoToSecondStep, setCanGoToSecondStep] = useState<boolean>(false);
  const [participants, setParticipants] = useState<IParticipant[]>([
    { ...emptyParticipant },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const exchangeNameRef = useRef<HTMLInputElement>(null);
  const organiserNameRef = useRef<HTMLInputElement>(null);

  const MIN_PARTICIPANTS = 3;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingEmails(true);

    validateParticipants(participants).then((errors) => {
      if (errors === null) {
        sendToParticipants();
      } else {
        manageErrors(errors);
      }
    });

    setSendingEmails(false);
  };

  const validateParticipants = async (
    participants: IParticipant[]
  ): Promise<ZodIssue[] | null> => {
    try {
      participantsSchema.parse(participants);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors;
      }
    }

    return null;
  };

  const sendToParticipants = async () => {
    const exchangeName = exchangeNameRef.current?.value ?? "";
    const organiserName = organiserNameRef.current?.value ?? "";
    let giftees: IParticipant[] = [];

    for (const participant of participants) {
      const notPickedParticipants = participants.filter(
        (participant) =>
          giftees.findIndex(
            (giftee) =>
              giftee.email.value === participant.email.value &&
              giftee.name.value === participant.name.value
          ) === -1
      );
      const randomGiftee = getRandomItemFromArray(
        notPickedParticipants,
        participant
      );

      giftees.push(randomGiftee);

      await sendEmail(exchangeName, organiserName, participant, randomGiftee);
    }

    setCurrentStep("ExchangeSent");
  };

  const manageErrors = (errors: ZodIssue[]) => {
    setParticipants((prevState) => {
      const newParticipants = [...prevState];
      errors.forEach((error) => {
        const key = error.path[1];

        if (key === "name")
          newParticipants[error.path[0] as number].name.error = true;
        else if (key === "email")
          newParticipants[error.path[0] as number].email.error = true;
      });

      return newParticipants;
    });
  };

  const resetExchange = () => {
    setCurrentStep("SetOrganiser");
    if (organiserNameRef.current) organiserNameRef.current.value = "";
    if (exchangeNameRef.current) exchangeNameRef.current.value = "";
    setParticipants([]);
    setCanGoToSecondStep(false);
  };

  const onDelete = (id: string) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
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
    participants,
    setParticipants,
    MIN_PARTICIPANTS,
    formRef,
    exchangeNameRef,
    organiserNameRef,
    handleSubmit,
    onTopFieldChange,
    resetExchange,
    onDelete,
  };
};
