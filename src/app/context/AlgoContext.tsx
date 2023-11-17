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
  changeConfig: (state: {}) => void;
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

  const handleStateChange = (newState: {}) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
  };

  return (
    <AlgoContext.Provider
      value={{
        state,

        changeConfig: handleStateChange,
      }}
    >
      {children}
    </AlgoContext.Provider>
  );
}
