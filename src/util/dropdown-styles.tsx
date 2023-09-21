export const styles: any = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    "&:hover": {
      borderColor: "transparent",
    },
    borderColor: state.isFocused ? "transparent" : "transparent",
    backgroundColor: "#04293a",
    color: "white",
  }),
  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "white",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#064663" : "transparent",
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "#064663",
    },
  }),
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: "#04293a",
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
  indicatorSeparator: () => {},
};

export const codeblockstyles: any = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    "&:hover": {
      borderColor: "transparent",
    },
    borderColor: state.isFocused ? "transparent" : "transparent",
    backgroundColor: "#041c32",
    fontSize: "14px",
    color: "white",
  }),
  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "white",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#064663" : "transparent",
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "#064663",
    },
    fontSize: "14px",
  }),
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: "#04293a",
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
  indicatorSeparator: () => {},
};
