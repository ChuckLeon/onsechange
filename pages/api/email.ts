import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { exchangeName, organiser, participantEmail, participantName, giftee } =
    req.query;

  try {
    const trimmedParticipantEmail = participantEmail?.toString().trim();
    const trimmedParticipantName = participantName?.toString().trim();
    const trimmedExchangeName = exchangeName?.toString().trim();
    const trimmedOrganiser = organiser?.toString().trim();
    const trimmedGiftee = giftee?.toString().trim();

    const data = await resend.emails.send({
      from: "On s'échange <send@onsechange.com>",
      to: `${trimmedParticipantEmail}`,
      subject: `🎁 Salut ${trimmedParticipantName} vous êtes invité(e) à l'échange ${trimmedExchangeName} de ${trimmedOrganiser}! 🎁`,
      html: `
        <h1>Salut ${trimmedParticipantName}</h1>        
        <p>Vous êtes chanceux(se), ${trimmedOrganiser} vous partage une invitation pour participer à ${trimmedExchangeName}</p>
        <p>N'oubliez pas que c'est un secret 🤫</p>
        <p>Vous avez pigé: <u>${trimmedGiftee}</u></p>
        <img src="https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Christmas image" width="653" height="435" style="border-radius: 10px" />        
      `,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
