import { IParticipant } from "@/utilities/interfaces";

export const sendEmail = async (
  organiserName: string,
  participant: IParticipant,
  giftee: IParticipant
) => {
  try {
    const response = await fetch(
      `/api/email?organiser=${encodeURIComponent(
        organiserName
      )}&participantEmail=${encodeURI(participant.email)}
      &participantName=${encodeURI(participant.name)}
      &giftee=${encodeURI(giftee.name)}`
    );

    if (response.ok) {
      await response.json();
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
