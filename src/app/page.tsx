"use client";

import { useRef, useState } from "react";
import Select from "react-select";
import { options } from "@/util/data";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AiFillStop } from "react-icons/ai";
import { Fira_Code } from "next/font/google";
import Elements from "@/components/Elements";
import { BsFillPlayFill } from "react-icons/bs";
import Timer from "@/components/Timer";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function Home() {
  const [elements, setElements] = useState([7, -2, 4, 1, 6, 5, 0, -4, 2]);
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [animationStatus, setAnimationStatus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitValue = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      const regex = /^\[\s*-?\d+(?:\s*,\s*-?\d+)*\s*\]$/;

      const value: string = inputRef.current.value;
      if (regex.test(value)) {
        try {
          const parsedArray = JSON.parse(value);
          setElements(parsedArray);
        } catch (error) {
          console.log("Invalid array");
        }
      } else console.log("Invalid");
    }
  };

  function handleChange(obj: any) {
    setSelectedValue(obj);
  }

  return (
    <div className="flex flex-col bg-[#041C32] min-h-screen">
      <Header />

      <div className="flex-1 flex gap-10 px-5 pb-5 text-white">
        <Sidebar {...{ selectedValue }} />

        <div className={`py-4 flex-1 ${firaCode.className}`}>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setAnimationStatus(true)}
              className={`${
                animationStatus && "disabled"
              } flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md`}
            >
              <BsFillPlayFill />
              <p>Start</p>
            </button>

            <button
              onClick={() => setAnimationStatus(false)}
              className={`${
                animationStatus ? "not-disabled" : "disabled"
              } flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md`}
            >
              <AiFillStop />
              <p>Stop</p>
            </button>

            <Select
              instanceId="select-sort"
              options={options}
              onChange={handleChange}
              defaultValue={options[0]}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  "&:hover": {
                    borderColor: "transparent",
                  },
                  opacity: animationStatus ? "40%" : "100%",
                  pointerEvents: animationStatus ? "none" : "auto",
                  borderColor: state.isFocused ? "transparent" : "transparent",
                  backgroundColor: "#04293a",
                  color: "white",
                  width: "220px",
                }),
                singleValue: (baseStyles, state) => ({
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
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#04293a",
                }),
              }}
            />
          </div>

          <Elements
            {...{
              elements,
              setElements,
              selectedValue: selectedValue.value,
              animationStatus,
              setAnimationStatus,
            }}
          />

          <div className="mt-10 flex items-center space-x-2">
            <h5>Time:</h5>

            <Timer {...{ animationStatus, input: inputRef.current?.value }} />
          </div>

          <form onSubmit={submitValue} className="mt-8 flex flex-col space-y-2">
            <h5>Input:</h5>
            <input
              ref={inputRef}
              className={`${
                animationStatus && "disabled"
              } bg-[#04293A] rounded-md w-60 py-2 px-3 outline-none`}
              placeholder="Enter your input"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}
