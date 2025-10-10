import { create } from "zustand";
import { Step } from "@/utilities/types";

interface AppStore {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentStep: "SetOrganiser",
  setCurrentStep: (step) => set({ currentStep: step }),
}));
