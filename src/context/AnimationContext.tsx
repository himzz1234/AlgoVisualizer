"use client";

import { createContext, useState, useRef, ReactNode } from "react";
import { Steps } from "@/types/types";

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
  const [animationStatus, setAnimationStatus] = useState<boolean>(false);
  const currentRef = useRef<{ active: Steps | null; index: number }>({
    active: null,
    index: -1,
  });

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
