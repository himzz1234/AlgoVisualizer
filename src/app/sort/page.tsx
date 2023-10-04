"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { sortOptions } from "@/util/data";
import { IoIosOptions } from "react-icons/io";
import { AlgoContext } from "@/context/AlgoContext";
import Elements from "@/components/SortElementsComponent";
import CodeBlock from "@/components/CodeBlockComponent";
import AlgorithmModal from "@/components/AlgorithmModalComponent";
import ControlPanel from "@/components/ControlPanelComponent";
import { AnimationContext } from "@/context/AnimationContext";
import AlgorithmDetail from "@/components/AlgorithmDetailComponent";
import Confetti from "react-confetti";
import Image from "next/image";
import Loading from "@/components/LoadingComponent";

function Sort() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state, isLoading, setIsLoading, changeConfig } =
    useContext(AlgoContext)!;
  const { animationStatus, currentRef, setAnimationStatus, steps } =
    useContext(AnimationContext)!;
  const [metrics, setMetrics] = useState({ count: 0, timer: 0 });
  const [elements, setElements] = useState([7, -2, 4, 1, 6, 5, 0, -4, 2]);

  const setTestCases = (type: string) => {
    if (type == "best") {
      setElements(selectedSort.test_cases.best.elements);
      changeConfig({
        algorithmElements: selectedSort.test_cases.best.elements,
      });
    } else {
      setElements(selectedSort.test_cases.worst.elements);
      changeConfig({
        algorithmElements: selectedSort.test_cases.worst.elements,
      });
    }
  };

  const selectedSort: any = sortOptions.find(
    (option) => option.value === state.algorithmType
  );

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

  useEffect(() => {
    currentRef.current = { active: [], index: -1 };
    setAnimationStatus(false);

    const data = {
      algorithm: "Sort",
      algorithmSpeed: 1,
      algorithmType: "BubbleSort",
      algorithmElements: elements,
    };

    changeConfig(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isOpen && <AlgorithmModal {...{ setIsOpen, setMetrics, setElements }} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentRef.current.index == steps.length - 1 && (
            <Confetti
              recycle={false}
              tweenDuration={2000}
              numberOfPieces={500}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}

          <div className="flex-1 flex">
            <div className="flex-1 pl-7 pr-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-[20px] text-[#ecb364] font-medium uppercase">
                    {selectedSort.label}
                  </h1>
                  <div
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={`${
                      animationStatus ? "disabled" : "not-disabled"
                    } cursor-pointer btnclick`}
                  >
                    <IoIosOptions size={20} />
                  </div>
                </div>
                <p className="w-[800px] leading-[28px] text-[15px]">
                  {selectedSort.desc}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center space-x-5">
                  <ControlPanel
                    {...{
                      setElements,
                      setMetrics,
                    }}
                  />
                  <div className="bg-[#04293A] rounded-md w-24 py-2 px-3 outline-none text-sm">
                    <p className="flex items-center">
                      {metrics.count} <span className="ml-2">swaps</span>
                    </p>
                  </div>
                  <div className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm">
                    {metrics.timer} sec
                  </div>
                </div>
                <Elements
                  {...{
                    elements,
                    setMetrics,
                    setElements,
                  }}
                />
              </div>
              <div className="flex mt-8 space-x-5">
                <div className="border-2 border-[#063e59] bg-transparent w-[400px] h-[84px] py-1 px-3 rounded-md">
                  <p
                    className={`leading-[27.5px] text-[15.5px] ${
                      currentRef.current.index < 0
                        ? "text-[#CCCCCC]"
                        : "text-white"
                    }`}
                  >
                    {currentRef.current.index < 0
                      ? `Choose a sorting algorithm and click 'Play' to see it in action.`
                      : currentRef.current.active.detail}
                  </p>
                </div>

                <form
                  onSubmit={handleInputChange}
                  className={`${
                    animationStatus ? "disabled" : "not-disabled"
                  }  flex flex-col space-y-3`}
                >
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setTestCases("best")}
                      className="transition-all duration-150 hover:text-white text-[#CCCCCC] text-sm border-2 active:bg-[#064663] hover:bg-[#064663] border-[#063e59] py-1 px-2 rounded"
                    >
                      Best case
                    </button>
                    <button
                      onClick={() => setTestCases("worst")}
                      className="transition-all duration-150 hover:text-white text-[#CCCCCC] text-sm border-2 active:bg-[#064663] hover:bg-[#064663] border-[#063e59] py-1 px-2 rounded"
                    >
                      Worst case
                    </button>
                  </div>
                  <input
                    ref={inputRef}
                    className="placeholder:text-[#CCCCCC] bg-[#04293A] transition-all duration-150  border-2 border-[#062743] text-[15px] rounded-sm w-[300px] py-2 px-3 outline-none"
                    placeholder="Enter custom case"
                  ></input>
                </form>
              </div>

              <AlgorithmDetail selectedAlgo={selectedSort} />
            </div>

            <CodeBlock selectedAlgo={selectedSort} />
          </div>
        </>
      )}
    </>
  );
}

export default Sort;
