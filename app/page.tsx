"use client";
import { Form } from "@/components/Form";
import { Button } from "@/components/inputs/Button";

export default function Home() {
  const sendEmail = async () => {
    try {
      const response = await fetch("/api/email");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app h-full max-w-screen-2xl m-auto p-10 flex justify-center items-center flex-col gap-4">
      <Button onClick={sendEmail}>Send email test</Button>
      <div className="flex flex-col items-center gap-4 w-fit p-5">
        <h1>{"On s'échange"}</h1>
        <p className="text-center">
          Concept simple:
          <br></br>
          {`  Tu entres le nom de l'organisateur, tu ajoutes le courriel de chaque
          participant et ensuite t'envoies l'échange 👍`}
          <br></br>
          {`Minimum 3 participants, sinon fait juste donner un cadeau à l'autre
          tsé 😉`}
        </p>
      </div>
      <Form />
    </div>
  );
}
