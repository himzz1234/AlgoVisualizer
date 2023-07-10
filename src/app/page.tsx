"use client";

import Select from "react-select";
import { useState } from "react";
import Header from "@/components/Header";
import { animate } from "@/animateAlgos";
import Sidebar from "@/components/Sidebar";
import { AiFillStop } from "react-icons/ai";
import { Fira_Code } from "next/font/google";
import { RiRestartLine } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import {
  BubbleSort,
  QuickSort,
  InsertionSort,
  SelectionSort,
} from "@/sortingAlgos";

const firaCode = Fira_Code({ subsets: ["latin"] });

const options = [
  {
    value: "BubbleSort",
    label: "Bubble Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "QuickSort",
    label: "Quick Sort",
    complexity: { time: "O(N*logN)", space: "O(N)" },
    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "InsertionSort",
    label: "Insertion Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "SelectionSort",
    label: "Selection Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    method: "Exchanging",
    stable: "Yes",
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [elements, setElements] = useState([7, -2, 4, 1, 6, 5, 0, -4, 2]);

  const submitValue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input) {
      const regex = /^\[\s*-?\d+(?:\s*,\s*-?\d+)*\s*\]$/;

      const value: string = input;
      if (regex.test(value)) {
        try {
          console.log(document.querySelector(".array-objectContainer"));
          const parsedArray = JSON.parse(value);
          setElements(parsedArray);

          console.log(parsedArray);
        } catch (error) {
          console.log("Invalid array");
        }
      } else console.log("Invalid");
    }
  };

  function startAnimation() {
    document.querySelector("#start-btn")?.classList.add("disabled");
    let swaps = [];

    const updatedElements: number[] = Array.from(
      document.querySelectorAll<HTMLElement>(".array-object")
    ).map((ele: HTMLElement) => {
      return Number(ele.innerText);
    });

    switch (selectedValue.value) {
      case "BubbleSort": {
        swaps = BubbleSort([...updatedElements]);
        break;
      }

      case "QuickSort": {
        swaps = QuickSort([...updatedElements]);
        break;
      }

      case "InsertionSort": {
        swaps = InsertionSort([...updatedElements]);
        break;
      }

      case "SelectionSort": {
        swaps = SelectionSort([...updatedElements]);
        break;
      }
    }

    animate(swaps);

    document
      .querySelector("#stop-btn")
      ?.classList.replace("disabled", "not-disabled");
  }

  function resetElements() {
    document.querySelector(".array-objectContainer")!.innerHTML = "";
    elements.map((ele, indx) => {
      document.querySelector(".array-objectContainer")!.innerHTML += `
      <div
        id="ele-${indx}"
        class="array-object bg-[#064663] rounded-md flex items-center justify-center w-[30px] lg:w-20 h-20"
      >
        <p>${ele}</p>
      </div>
      `;
    });
  }

  function handleChange(obj: any) {
    setSelectedValue(obj);
  }

  return (
    <div className="flex flex-col bg-[#041C32] min-h-screen">
      <Header />

      <div className="flex-1 flex gap-10 px-5 pb-5 text-white">
        <Sidebar selectedValue={selectedValue} />

        <div className={`flex-1 ${firaCode.className}`}>
          <div className="flex items-center gap-5">
            <button
              id="start-btn"
              onClick={startAnimation}
              className="flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md"
            >
              <BsFillPlayFill />
              <p>Start</p>
            </button>

            <button
              id="stop-btn"
              className="flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md disabled"
            >
              <AiFillStop />
              <p>Stop</p>
            </button>

            {/* <button
              id="reset-btn"
              onClick={resetElements}
              className="flex items-center space-x-2 bg-[#04293a] px-4 py-2 rounded-md disabled"
            >
              <RiRestartLine />
              <p>Reset</p>
            </button> */}

            <Select
              instanceId="select-sort"
              options={options}
              placeholder="Select"
              onChange={handleChange}
              defaultValue={options[0]}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  "&:hover": {
                    borderColor: "transparent",
                  },
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

          <div className="array-objectContainer flex items-center space-x-2 lg:space-x-5 mt-10">
            {elements.map((ele, indx) => (
              <div
                id={`ele-${indx}`}
                key={indx}
                className="array-object bg-[#064663] rounded-md flex items-center justify-center w-[30px] lg:w-20 h-20"
              >
                <p>{ele}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center space-x-2">
            <h5>Time:</h5>
            <div
              id="display-time"
              className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm"
            >
              0.00s
            </div>
          </div>

          <form onSubmit={submitValue} className="mt-8 flex flex-col space-y-2">
            <h5>Input:</h5>
            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              className="bg-[#04293A] rounded-md w-60 py-2 px-3 outline-none"
              placeholder="Enter your input"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}
