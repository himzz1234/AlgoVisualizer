"use client";

import { ReactNode, createContext, useState } from "react";

type state = {
  algorithm: string;
  algorithmType: string;
  algorithmSpeed: number;
  algorithmElements: number[];
};

interface Props {
  children?: ReactNode;
}

interface ContextValues {
  state: state;
  isLoading: boolean;
  changeConfig: (state: {}) => void;
  setIsLoading: (status: boolean) => void;
}

export const AlgoContext = createContext<ContextValues | null>(null);

export default function AlgoProvider({ children, ...props }: Props) {
  const initialState = {
    algorithm: "",
    algorithmType: "",
    algorithmSpeed: 1,
    algorithmElements: [],
  };

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const handleStateChange = (newState: {}) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
  };

  return (
    <AlgoContext.Provider
      value={{
        state,
        isLoading,
        setIsLoading,
        changeConfig: handleStateChange,
      }}
    >
      {children}
    </AlgoContext.Provider>
  );
}
