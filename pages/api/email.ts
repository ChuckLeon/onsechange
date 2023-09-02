import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["charles_heon@hotmail.com"],
      subject: "Hello world",
      react: "Wowiiii email",
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
