"use client";
import { Form } from "@/components/Form";
import Particles from "@/components/visuals/Particles";

export default function Home() {
  return (
    <div className="app h-full max-w-screen-2xl m-auto p-10 flex justify-center items-center flex-col gap-4">
      <Particles
        className="z-0"
        particleCount={1000}
        speed={0.2}
        moveParticlesOnHover={false}
        alphaParticles
        disableRotation
      />
      <div className="flex flex-col items-center gap-4 w-fit p-5 z-10">
        <h1>{"Échange de cadeau!"}</h1>
        <h3 className="text-center">Concept simple</h3>
        <p className="text-center">
          {`Tu entres les informations de l'échange, tu ajoutes les participants et ensuite t'envoies l'échange 👍`}
          <br></br>
          {`Minimum 3 participants, sinon fait juste donner un cadeau à l'autre
          tsé 😉`}
        </p>
      </div>
      <Form />
    </div>
  );
}
