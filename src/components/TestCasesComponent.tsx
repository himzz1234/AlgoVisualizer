import React, { useRef, useContext } from "react";
import { AnimationContext } from "@/context/AnimationContext";
import { AlgoContext } from "@/context/AlgoContext";

interface TestCasesProps {
  selectedAlgo: any;
  setMetrics: Function;
  setElements: Function;
}

function TestCases({ selectedAlgo, setMetrics, setElements }: TestCasesProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentRef, animationStatus } = useContext(AnimationContext)!;
  const { changeConfig } = useContext(AlgoContext)!;

  const setTestCases = (type: string) => {
    if (type == "best") {
      setElements(selectedAlgo.test_cases.best.elements);
      changeConfig({
        algorithmElements: selectedAlgo.test_cases.best.elements,
      });
    } else {
      setElements(selectedAlgo.test_cases.worst.elements);
      changeConfig({
        algorithmElements: selectedAlgo.test_cases.worst.elements,
      });
    }
  };

  const handleInputChange = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    currentRef.current.index = -1;

    currentRef.current.active = [];
    setMetrics({ timer: 0, count: 0 });

    if (inputRef.current?.value) {
      const regex = /^\[\s*-?\d+(?:\s*,\s*-?\d+)*\s*\]$/;

      const value: string = inputRef.current.value;
      if (regex.test(value)) {
        try {
          const parsedArray = JSON.parse(value);
          if (parsedArray.length <= 10 && parsedArray.length >= 2) {
            setElements(parsedArray);
            changeConfig({ algorithmElements: parsedArray });
          }
        } catch (error) {}
      }
    }
  };
  return (
    <div
      className={`${
        animationStatus || currentRef.current.index > -1
          ? "disabled"
          : "not-disabled"
      } flex flex-col space-y-3`}
    >
      <div className="flex items-center space-x-2">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Load elements for the best-case scenario"
          data-tooltip-delay-show={1000}
          onClick={() => setTestCases("best")}
          className="transition-all duration-150 hover:text-white text-[#CCCCCC] text-sm border-2 active:bg-[#064663] hover:bg-[#064663] border-[#063e59] py-1 px-2 rounded"
        >
          Best case
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Load elements for the worst-case scenario."
          data-tooltip-delay-show={1000}
          onClick={() => setTestCases("worst")}
          className="transition-all duration-150 hover:text-white text-[#CCCCCC] text-sm border-2 active:bg-[#064663] hover:bg-[#064663] border-[#063e59] py-1 px-2 rounded"
        >
          Worst case
        </button>
      </div>
      <form onSubmit={handleInputChange}>
        <input
          ref={inputRef}
          className="placeholder:text-[#CCCCCC] bg-[#04293A] transition-all duration-150  border-2 border-[#062743] text-[15px] rounded-sm w-[300px] py-2 px-3 outline-none"
          placeholder="Enter custom case"
        ></input>
      </form>
    </div>
  );
}

export default TestCases;
