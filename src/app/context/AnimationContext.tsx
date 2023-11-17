"use client";

import { createContext, useState, useRef, ReactNode } from "react";
import { Steps } from "@/app/types/types";

interface Props {
  children?: ReactNode; // optional
}

interface ContextType {
  steps: Steps[];
  currentRef: any;
  animationStatus: boolean;
  setSteps: (value: Steps[]) => void;
  setAnimationStatus: (animationStatus: boolean) => void;
}

export const AnimationContext = createContext<ContextType | null>(null); // Union - can be of type ContextType or Null

export default function AnimationProvider({ children }: Props) {
  const [steps, setSteps] = useState<Steps[]>([]);
  const currentRef = useRef({ active: {}, index: -1 });
  const [animationStatus, setAnimationStatus] = useState<boolean>(false);

  return (
    <AnimationContext.Provider
      value={{
        steps,
        setSteps,
        currentRef,
        animationStatus,
        setAnimationStatus,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
