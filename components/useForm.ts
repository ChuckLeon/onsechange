"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Step } from "../utilities/types";
import { IParticipant, emptyParticipant } from "../utilities/interfaces";
import { sendEmail } from "@/scripts/sendEmail";
import { getRandomItemFromArray } from "@/utilities/array";

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
    if (participants.length < MIN_PARTICIPANTS || organiserName === "") return;

    setSendingEmails(true);

    let giftees: IParticipant[] = [];

    for (const participant of participants) {
      const notPickedParticipants = participants.filter(
        (participant) =>
          giftees.findIndex(
            (giftee) =>
              giftee.email === participant.email &&
              giftee.name === participant.name
          ) === -1
      );
      const randomGiftee = getRandomItemFromArray(
        notPickedParticipants,
        participant
      );

      giftees.push(randomGiftee);

      await sendEmail(exchangeName, organiserName, participant, randomGiftee);
    }

    setSendingEmails(false);
    setCurrentStep("ExchangeSent");
  };

  const resetExchange = () => {
    setCurrentStep("SetOrganiser");
    setOrganiserName("");
    setExchangeName("");
    setParticipants([]);
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
  };
};
