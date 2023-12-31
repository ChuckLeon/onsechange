"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Step } from "../utilities/types";
import { IParticipant, emptyParticipant } from "../utilities/participant";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";
import { participantsSchema } from "@/utilities/schemas";
import { ZodIssue, z } from "zod";

export const useForm = () => {
  const [sendingEmails, setSendingEmails] = useState<boolean>(false);
  const [organiserName, setOrganiserName] = useState<string>("");
  const [exchangeName, setExchangeName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<Step>("SetOrganiser");
  const [canGoToSecondStep, setCanGoToSecondStep] = useState<boolean>(false);
  const [participants, setParticipants] = useState<IParticipant[]>([
    { ...emptyParticipant },
  ]);
  const formRef = useRef<HTMLFormElement>(null);

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
    setOrganiserName("");
    setExchangeName("");
    setParticipants([]);
  };

  const onDelete = (id: string) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  };

  useEffect(() => {
    setCanGoToSecondStep(organiserName.length > 0);
  }, [organiserName]);

  return {
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
  };
};
