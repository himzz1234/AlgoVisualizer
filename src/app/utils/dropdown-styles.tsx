import { StylesConfig, GroupBase } from "react-select";

type languageOption = {
  label: string;
  value: string;
};

type speedOption = {
  label: string;
  value: number;
};

export const speedStyles: StylesConfig<speedOption, false> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    "&:hover": {
      borderColor: "transparent",
    },
    borderColor: state.isFocused ? "transparent" : "transparent",
    backgroundColor: "#04293a",
    color: "white",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#064663" : "transparent",
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "#064663",
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#04293a",
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
};

export const codeblockstyles: StylesConfig<languageOption, false> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    "&:hover": {
      borderColor: "transparent",
    },
    borderColor: state.isFocused ? "transparent" : "transparent",
    backgroundColor: "#041c32",
    fontSize: "14px",
    color: "white",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#064663" : "transparent",
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "#064663",
    },
    fontSize: "14px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#04293a",
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
};
