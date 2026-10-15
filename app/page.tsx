"use client";
import { Header, Particles } from "@/components";
import { Game } from "@/containers";
import clsx from "clsx";
import { useAppStore } from "@/lib/store";
import "./page.scss";

export default function Home() {
  const { currentStep } = useAppStore();

  return (
    <div className="app">
      <Particles particleCount={600} speed={0.2} alphaParticles />
      <Header />
      <main
        className={clsx("app__main", {
          "app__main--split": currentStep === "SetOrganiser",
        })}
      >
        {currentStep === "SetOrganiser" && (
          <section className="app__intro">
            <p className="app__eyebrow">Concept simple</p>
            <h1 className="app__intro-title">
              Organise ton échange de cadeaux.
            </h1>
            <div className="app__intro-description">
              <p>
                {`Tu entres les informations de l'échange, tu ajoutes les participants et ensuite t'envoies l'échange 👍`}
              </p>
              <p>
                {`Minimum 3 participants, sinon fait juste donner un cadeau à l'autre tsé 😉`}
              </p>
            </div>
          </section>
        )}
        <Game />
      </main>
    </div>
  );
}
