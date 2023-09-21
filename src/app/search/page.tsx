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
import Image from "next/image";

function Search() {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTargetRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { state, changeConfig } = useContext(AlgoContext)!;
  const { currentRef, setAnimationStatus, animationStatus } =
    useContext(AnimationContext)!;
  const [target, setTarget] = useState<number>(9);
  const [metrics, setMetrics] = useState({ count: 0, timer: 0 });
  const [elements, setElements] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const selectedSearch: any = searchOptions.find(
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

            setError("");
          } else setError("Array length: 2-10 numbers");
        } catch (error) {
          setError("Invalid array");
        }
      } else setError("Invalid array");
    } else {
      setError("Input field cannot be empty");
    }
  };

  const currentInstruction = (): string => {
    if (currentRef.current.index < 0) {
      return `Choose a searching algorithm and click 'Play' to see it in action.`;
    } else return currentRef.current.active.detail;
  };

  useEffect(() => {
    currentRef.current = { active: [], index: -1 };
    setAnimationStatus(false);

    const data = {
      algorithm: "Search",
      algorithmSpeed: 1,
      algorithmType: "LinearSearch",
      algorithmElements: elements,
    };

    changeConfig(data);
    setLoading(false);
  }, []);

  return (
    <>
      {isOpen && <AlgorithmModal {...{ setIsOpen, setMetrics, setElements }} />}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/images/loader.svg"
            width={50}
            height={50}
            alt="loading"
          />
        </div>
      ) : (
        <>
          {currentRef.current.active.type == "match" && (
            <Confetti
              recycle={false}
              tweenDuration={2000}
              numberOfPieces={500}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
          <div className={`flex-1 flex`}>
            <div className="flex-1 pl-7 pr-4 py-4">
              <div className={`space-y-2`}>
                <div className="flex items-center justify-between">
                  <h1 className="text-[20px] text-[#ecb364] font-medium uppercase">
                    {selectedSearch.label}
                  </h1>
                  <div
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={`cursor-pointer btnclick`}
                  >
                    <IoIosOptions size={20} />
                  </div>
                </div>
                <p className="w-[800px] leading-[28px] text-[15px]">
                  {selectedSearch.desc}
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
                  {/* <div className="bg-[#04293A] rounded-md w-24 py-2 px-3 outline-none text-sm">
                    <p className="flex items-center">
                      {metrics.count} <span className="ml-2">Comp</span>
                    </p>
                  </div> */}
                  <div className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm">
                    {metrics.timer} sec
                  </div>
                  <form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      setTarget(currentTargetRef.current?.value);
                    }}
                    className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm"
                  >
                    <input
                      defaultValue={target}
                      ref={currentTargetRef}
                      className={`${
                        currentRef.current.index > -1
                          ? "disabled"
                          : "not-disabled"
                      } w-full bg-transparent outline-none`}
                    />
                  </form>
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

              <div className="flex mt-8 space-x-5 items-baseline">
                <div className="border-2 border-[#063e59] bg-transparent w-[400px] h-[84px] py-1 px-3 rounded-md">
                  <p
                    className={`leading-[27.5px] text-[15.5px] ${
                      currentRef.current.index < 0
                        ? "text-[#CCCCCC]"
                        : "text-white"
                    }`}
                  >
                    {currentInstruction()}
                  </p>
                </div>
                <form
                  onSubmit={handleInputChange}
                  className="flex flex-col space-y-2"
                >
                  <h5 className="text-[15px]">Custom Input:</h5>
                  <input
                    ref={inputRef}
                    className={`${
                      animationStatus ? "disabled" : "not-disabled"
                    } placeholder:text-[#CCCCCC] bg-[#04293A] transition-all duration-150  border-2 border-[#062743] text-[15px] rounded-sm w-[300px] py-2 px-3 outline-none`}
                    placeholder="Enter your input"
                  ></input>
                </form>
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
