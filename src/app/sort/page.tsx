"use client";

import { useContext, useEffect, useState } from "react";
import { sortOptions } from "@/app/utils/data";
import { IoIosOptions } from "react-icons/io";
import { AlgoContext } from "@/app/context/AlgoContext";
import Elements from "@/app/sort/components/ElementsComponent";
import CodeBlock from "@/app/components/CodeBlockComponent";
import AlgorithmModal from "@/app/components/AlgorithmModalComponent";
import ControlPanel from "@/app/components/ControlPanelComponent";
import { AnimationContext } from "@/app/context/AnimationContext";
import AlgorithmDetail from "@/app/components/AlgorithmDetailComponent";
import Confetti from "react-confetti";
import TestCases from "@/app/components/TestCasesComponent";
import { AlgoMetadata } from "@/app/types/types";

function Sort() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state, changeConfig } = useContext(AlgoContext)!;
  const { animationStatus, currentRef, setAnimationStatus, steps } =
    useContext(AnimationContext)!;
  const [metrics, setMetrics] = useState({ count: 0, timer: 0 });
  const [elements, setElements] = useState([7, 2, 4, 1, 6, 5, 0, 4, 2]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const selectedSort: AlgoMetadata =
    sortOptions.find((option) => option.value === state.algorithmType) ||
    sortOptions[0];

  useEffect(() => {
    currentRef.current = { active: {}, index: -1 };
    setAnimationStatus(false);

    const data = {
      algorithm: "Sort",
      algorithmSpeed: 1,
      algorithmType: "BubbleSort",
      algorithmElements: elements,
    };

    changeConfig(data);
  }, []);

  return (
    <>
      {isOpen && <AlgorithmModal {...{ setIsOpen, setMetrics, setElements }} />}
      <Confetti
        recycle={false}
        tweenDuration={2000}
        numberOfPieces={500}
        width={dimensions.width - 20}
        height={dimensions.height - 20}
        run={currentRef.current!.index == steps.length - 1}
        onConfettiComplete={(confetti) => confetti?.reset()}
      />

      <div className="flex-1 flex lg:flex-row flex-col">
        <div className="flex-1 pl-4 pr-4 lg:pl-7 lg:pr-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-[20px] flex-1 text-[#ecb364] font-medium uppercase">
                {selectedSort.label}
              </h1>
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Choose between a set of different algorithms."
                data-tooltip-delay-show={1000}
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
            <p className="lg:w-[800px] leading-[28px] text-[15px]">
              {selectedSort.desc}
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
              <div className="bg-[#04293A] rounded-sm sm:rounded-md w-24 py-2 px-3 outline-none text-sm">
                <p className="flex items-center">
                  {metrics.count} <span className="ml-2">swaps</span>
                </p>
              </div>
              <div className="bg-[#04293A] rounded-sm sm:rounded-md w-20 py-2 px-3 outline-none text-sm">
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
              selectedAlgo={selectedSort}
              {...{ setMetrics, setElements }}
            />
          </div>

          <AlgorithmDetail selectedAlgo={selectedSort} />
        </div>

        <CodeBlock selectedAlgo={selectedSort} />
      </div>
    </>
  );
}

export default Sort;
