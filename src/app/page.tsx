"use client";

import { useRef, useState } from "react";
import Select from "react-select";
import { sortOptions, speedOptions } from "@/util/data";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AiFillStop } from "react-icons/ai";
import { Fira_Code } from "next/font/google";
import Elements from "@/components/Elements";
import { BsFillPlayFill } from "react-icons/bs";
import Timer from "@/components/Timer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coldWinterTheme } from "@/util/cold-winter.js";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function Home() {
  const [elements, setElements] = useState([7, -2, 4, 1, 6, 5, 0, -4, 2]);
  const [selectedSpeed, setSelectedSpeed] = useState(speedOptions[3]);
  const [selectedSort, setselectedSort] = useState(sortOptions[0]);
  const [animationStatus, setAnimationStatus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<number>(0);

  const dropdownStyles = {
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
  };

  const submitValue = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      const regex = /^\[\s*-?\d+(?:\s*,\s*-?\d+)*\s*\]$/;

      const value: string = inputRef.current.value;
      if (regex.test(value)) {
        try {
          const parsedArray = JSON.parse(value);
          if (parsedArray.length <= 10 && parsedArray.length >= 2)
            setElements(parsedArray);
        } catch (error) {
          console.log("Invalid array");
        }
      } else console.log("Invalid");
    }
  };

  function handleSort(obj: any) {
    setselectedSort(obj);

    setCount(0);
    setElements([7, -2, 4, 1, 6, 5, 0, -4, 2]);
    setAnimationStatus(false);
  }

  function handleSpeedValue(obj: any) {
    setSelectedSpeed(obj);
  }

  return (
    <div className="flex flex-col w-full bg-[#041C32] min-h-screen">
      <Header />

      <div className="flex-1 w-full flex lg:flex-row flex-col gap-5 px-5 pb-5 text-white">
        <Sidebar {...{ selectedSort }} />

        <div className={`lg:w-[73%] ${firaCode.className}`}>
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => setAnimationStatus(true)}
              className={`${
                animationStatus && "disabled"
              } flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md`}
            >
              <BsFillPlayFill />
              <p>Sort</p>
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
              options={sortOptions}
              onChange={handleSort}
              defaultValue={sortOptions[0]}
              styles={dropdownStyles}
              className={`w-[220px] ${
                animationStatus
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            />

            <Select
              instanceId="select-speed"
              options={speedOptions}
              onChange={handleSpeedValue}
              defaultValue={speedOptions[3]}
              styles={dropdownStyles}
              className="w-[150px]"
            />
          </div>

          <Elements
            {...{
              elements,
              setElements,
              setCount,
              selectedSort: selectedSort.value,
              animationStatus,
              setAnimationStatus,
              selectedSpeed: selectedSpeed.value,
            }}
          />

          <div className="flex lg:flex-row flex-col w-full lg:space-x-10 gap-y-10 lg:gap-y-0 lg:space-y-0 mt-10 lg:mt-10">
            <div className="code-block order-2 lg:order-1 bg-[#04293a] whitespace-pre p-3 rounded-md w-full h-[200px] md:h-[400px] lg:w-1/2">
              <SyntaxHighlighter
                language="javascript"
                style={coldWinterTheme}
                showLineNumbers={true}
              >
                {selectedSort.code}
              </SyntaxHighlighter>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex  items-center space-x-2">
                  <h5 className="text-[14.5px]">Time:</h5>
                  <Timer
                    {...{
                      animationStatus,
                      input: inputRef.current?.value,
                      selectedSort: selectedSort.value,
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <h5 className="text-[14.5px]">Swaps:</h5>

                  <div className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm">
                    {count}
                  </div>
                </div>
              </div>

              <form
                onSubmit={submitValue}
                className="mt-8 flex flex-col space-y-2"
              >
                <h5 className="text-[14.5px]">Input:</h5>
                <input
                  ref={inputRef}
                  className={`${
                    animationStatus && "disabled"
                  } bg-[#04293A] placeholder:text-[#446b7b] rounded-md w-[240px] py-2 px-3 outline-none`}
                  placeholder="Enter your input"
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
