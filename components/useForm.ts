"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Step } from "../utilities/types";
import { IParticipant, emptyParticipant } from "../utilities/participant";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";
import { formSchema } from "@/utilities/schemas";

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

    if (validateParticipants(participants)) {
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
    }

    setSendingEmails(false);
  };

  const validateParticipants = (participants: IParticipant[]) => {
    const newParticipants = participants;
    let canSend: boolean = false;
    canSend = participants.length >= MIN_PARTICIPANTS || organiserName !== "";

    participants.forEach((participant, i) => {
      newParticipants[i].email.error =
        !formSchema.safeParse(participant).success;

      if (canSend) {
        canSend = formSchema.safeParse(participant).success;
      }
    });

    console.log(newParticipants);
    setParticipants(newParticipants);
    return canSend;
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
