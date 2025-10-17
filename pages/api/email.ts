import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailApiRequest, EmailApiError } from "@/utilities/types";
import { CreateEmailResponse } from "resend/build/src/emails/interfaces";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateEmailResponse | EmailApiError>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    exchangeName,
    organiser,
    playerEmail,
    playerName,
    giftee,
  }: EmailApiRequest = req.body;

  if (!exchangeName || !organiser || !playerEmail || !playerName || !giftee) {
    return res.status(400).json({
      error:
        "Missing required fields: exchangeName, organiser, playerEmail, playerName, giftee",
    });
  }

  try {
    const trimmedPlayerEmail = playerEmail.trim();
    const trimmedPlayerName = playerName.trim();
    const trimmedExchangeName = exchangeName.trim();
    const trimmedOrganiser = organiser.trim();
    const trimmedGiftee = giftee.trim();

    const data = await resend.emails.send({
      from: "Échange de cadeau <send@echangedecadeau.com>",
      to: `${trimmedPlayerEmail}`,
      subject: `🎁 Salut ${trimmedPlayerName} vous êtes invité(e) à l'échange ${trimmedExchangeName} de ${trimmedOrganiser}! 🎁`,
      html: `
        <h1>Salut ${trimmedPlayerName}</h1>        
        <p>Vous êtes chanceux(se), ${trimmedOrganiser} vous partage une invitation pour participer à ${trimmedExchangeName}</p>
        <p>N'oubliez pas que c'est un secret 🤫</p>
        <p>Vous avez pigé: <u>${trimmedGiftee}</u></p>
        <img src="https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Christmas image" width="653" height="435" style="border-radius: 10px" />        
      `,
    });

    res.status(200).json(data);
  } catch (error) {
    const errorResponse: EmailApiError = {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
    res.status(400).json(errorResponse);
  }
}
