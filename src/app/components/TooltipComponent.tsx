"use client";

import React from "react";
import { Tooltip } from "react-tooltip";

function ToolTip() {
  return (
    <Tooltip
      id="my-tooltip"
      place="top-start"
      opacity={1}
      style={{
        backgroundColor: "#064663",
        color: "white",
      }}
    />
  );
}

export default ToolTip;
