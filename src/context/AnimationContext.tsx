"use client";

import { createContext, useState, useRef, ReactNode } from "react";
import { Steps } from "@/types/types";

interface Props {
  children?: ReactNode; // optional
}

interface ContextType {
  steps: Steps[];
  currentRef: any;
  setSteps: Function;
  animationStatus: boolean;
  setAnimationStatus: (animationStatus: boolean) => void;
}

export const AnimationContext = createContext<ContextType | null>(null); // Union - can be of type ContextType or Null

export default function AnimationProvider({ children, ...props }: Props) {
  const [steps, setSteps] = useState([]);
  const currentRef = useRef({ active: [], index: -1 });
  const [animationStatus, setAnimationStatus] = useState(false);

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
