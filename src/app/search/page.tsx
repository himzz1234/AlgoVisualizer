"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { searchOptions } from "@/util/data";
import { IoIosOptions } from "react-icons/io";
import { AlgoContext } from "@/context/AlgoContext";
import CodeBlock from "@/components/CodeBlockComponent";
import Elements from "@/components/SearchElementsComponent";
import ControlPanel from "@/components/ControlPanelComponent";
import AlgorithmModal from "@/components/AlgorithmModalComponent";
import AlgorithmDetail from "@/components/AlgorithmDetailComponent";
import { AnimationContext } from "@/context/AnimationContext";
import Confetti from "react-confetti";
import { BiSolidPencil } from "react-icons/bi";
import Loading from "@/components/LoadingComponent";
import TestCases from "@/components/TestCasesComponent";
import { AlgoMetadata } from "@/types/types";

function Search() {
  const currentTargetRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<number>(9);
  const { state, isLoading, setIsLoading, changeConfig } =
    useContext(AlgoContext)!;
  const [metrics, setMetrics] = useState({ count: 0, timer: 0 });
  const { currentRef, setAnimationStatus } = useContext(AnimationContext)!;
  const [elements, setElements] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const selectedSearch: AlgoMetadata =
    searchOptions.find((option) => option.value === state.algorithmType) ||
    searchOptions[0];

  useEffect(() => {
    setAnimationStatus(false);
    currentRef.current = { active: {}, index: -1 };

    const data = {
      algorithm: "Search",
      algorithmSpeed: 1,
      algorithmType: "LinearSearch",
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
          {currentRef.current!.active.type == "match" && (
            <Confetti
              recycle={false}
              tweenDuration={2000}
              numberOfPieces={500}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
          <div className="flex-1 flex lg:flex-row flex-col">
            <div className="flex-1 pl-4 pr-4 lg:pl-7 lg:pr-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-[20px] text-[#ecb364] font-medium uppercase">
                    {selectedSearch.label}
                  </h1>
                  <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Choose between a set of different algorithms."
                    data-tooltip-delay-show={1000}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={`cursor-pointer btnclick`}
                  >
                    <IoIosOptions size={20} />
                  </div>
                </div>
                <p className="w-full lg:w-[800px] leading-[28px] text-[15px]">
                  {selectedSearch.desc}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center flex-wrap gap-5 lg:gap-0 lg:space-x-5">
                  <ControlPanel
                    {...{
                      setElements,
                      setMetrics,
                    }}
                  />

                  <div className="bg-[#04293A] rounded-sm sm:rounded-md w-20 py-2 px-3 outline-none text-sm">
                    {metrics.timer} sec
                  </div>
                  <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Enter the element to search for in the array."
                    data-tooltip-delay-show={1000}
                    className={`${
                      currentRef.current!.index > -1
                        ? "disabled"
                        : "not-disabled"
                    } bg-[#04293A] flex items-center rounded-sm sm:rounded-md w-20 h-9 outline-none text-sm`}
                  >
                    <input
                      defaultValue={target}
                      ref={currentTargetRef}
                      className="w-full bg-transparent outline-none py-2 px-2"
                    />
                    <div
                      onClick={() => {
                        if (currentTargetRef.current) {
                          setTarget(Number(currentTargetRef.current.value));
                        }
                      }}
                      className="cursor-pointer btnclick bg-[#064663] h-full px-2 rounded-r-sm sm:rounded-r-md flex items-center justify-center"
                    >
                      <BiSolidPencil size={14} />
                    </div>
                  </div>
                </div>
                <Elements
                  {...{
                    elements,
                    setMetrics,
                    setElements,
                    target,
                  }}
                />
              </div>

              <div className="flex mt-12 sm:mt-8 space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row flex-col">
                <div className="border-2 border-[#063e59] bg-transparent w-full sm:w-[400px] h-[84px] py-1 px-3 rounded-md">
                  <p
                    className={`leading-[27.5px] text-[15.5px] ${
                      currentRef.current!.index < 0
                        ? "text-[#CCCCCC]"
                        : "text-white"
                    }`}
                  >
                    {currentRef.current!.index < 0
                      ? `Choose a sorting algorithm and click 'Play' to see it in action.`
                      : currentRef.current!.active.detail}
                  </p>
                </div>

                <TestCases
                  selectedAlgo={selectedSearch}
                  {...{ setMetrics, setElements }}
                />
              </div>

              <AlgorithmDetail selectedAlgo={selectedSearch} />
            </div>

            <CodeBlock selectedAlgo={selectedSearch} />
          </div>
        </>
      )}
    </>
  );
}

export default Search;
