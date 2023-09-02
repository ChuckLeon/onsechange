import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { organiser, participantEmail, participantName, giftee } = req.query;

  try {
    const data = await resend.emails.send({
      from: "hello@onsechange.com",
      to: [`${participantEmail}`],
      subject: `${organiser} t'as invité à son échange de cadeau! 🎁`,
      html: `Salut ${participantName} <br> Tu as pigé: ${giftee}`,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
