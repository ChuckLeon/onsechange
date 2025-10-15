"use client";
import { Game } from "@/components/Game";
import Particles from "@/components/visuals/Particles";
import Header from "@/components/header/Header";
import { useAppStore } from "@/lib/store";
import "./page.scss";

export default function Home() {
  const { currentStep } = useAppStore();

  return (
    <div className="app">
      <Particles particleCount={1000} speed={0.2} alphaParticles />
      <Header />
      {currentStep === "SetOrganiser" && (
        <div className="app__intro">
          <h3 className="app__intro-title">Concept simple</h3>
          <p className="app__intro-description">
            {`Tu entres les informations de l'échange, tu ajoutes les participants et ensuite t'envoies l'échange 👍`}
            <br></br>
            {`Minimum 3 participants, sinon fait juste donner un cadeau à l'autre
            tsé 😉`}
          </p>
        </div>
      )}
      <Game />
    </div>
  );
}
