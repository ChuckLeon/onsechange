import { z } from "zod";

export const formSchema = z.object({
  name: z.object({
    value: z.string().min(1, { message: "Ce champ doit être remplis." }),
    error: z.boolean(),
  }),
  email: z.object({
    value: z
      .string()
      .min(1, { message: "Ce champ doit être remplis." })
      .email("Ce n'est pas un courriel valide"),
    error: z.boolean(),
  }),
});

export const playersSchema = z.array(formSchema);
