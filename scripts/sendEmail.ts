import { IPlayer } from "@/utilities/player";
import { EmailApiRequest, EmailApiError } from "@/utilities/types";

export const sendEmail = async (
  exchangeName: string,
  organiserName: string,
  player: IPlayer,
  giftee: IPlayer
): Promise<any | null> => {
  try {
    const requestBody: EmailApiRequest = {
      exchangeName,
      organiser: organiserName,
      playerEmail: player.email.value,
      playerName: player.name.value,
      giftee: giftee.name.value,
    };

    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData: EmailApiError = await response.json();
      throw new Error(`Failed to send email: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
