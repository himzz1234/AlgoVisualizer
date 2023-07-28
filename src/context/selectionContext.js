import { useState, createContext } from "react";

export const selectedSortContext = createContext([]);

export function sortValueProvider({ children }) {
  const [selectedValue, setSelectedValue] = useState("BubbleSort");

  return (
    <selectedSortContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </selectedSortContext.Provider>
  );
}
