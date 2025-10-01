import { IPlayer } from "@/utilities/player";

export const sendEmail = async (
  exchangeName: string,
  organiserName: string,
  player: IPlayer,
  giftee: IPlayer
) => {
  try {
    const response = await fetch(
      `/api/email?exchangeName=${encodeURIComponent(exchangeName)}
      &organiser=${encodeURIComponent(organiserName)}
      &playerEmail=${encodeURI(player.email.value)}
      &playerName=${encodeURI(player.name.value)}
      &giftee=${encodeURI(giftee.name.value)}`
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
