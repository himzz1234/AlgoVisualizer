"use client";

import { AlgoContext } from "@/context/AlgoContext";
import { AnimationContext } from "@/context/AnimationContext";
import { useContext, useEffect, useRef } from "react";
import {
  colorConfig,
  LinearSearch,
  BinarySearch,
} from "@/algorithms/searchingAlgos";
import { AlgoMetrics, Steps } from "@/types/types";

interface ElementProps {
  target: number;
  elements: number[];
  setMetrics: (updater: (prevMetrics: AlgoMetrics) => AlgoMetrics) => void;
  setElements: (updater: (prevElements: number[]) => number[]) => void;
}

export default function Elements({
  target,
  elements,
  setMetrics,
  setElements,
}: ElementProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { state } = useContext(AlgoContext)!;
  const { steps, setSteps, animationStatus, setAnimationStatus, currentRef } =
    useContext(AnimationContext)!;
  const containerRef = useRef<HTMLDivElement>(null);

  const getStyleBasedOnType = (index: number): string => {
    const activePosition = currentRef.current.active.position;

    if (activePosition) {
      const targetIndex = elements.indexOf(Number(target));
      if (index === targetIndex) {
        return "border-[2px] border-dashed border-[#E0E0E0]";
      }

      if (Object.values(activePosition).includes(index)) {
        return "md:scale-110 transtion-all duration-150 ease-in-out";
      }
    }

    return "bg-[#064663] scale-100";
  };

  const computeHeights = (val: number): string => {
    if (containerRef.current) {
      const height =
        window.innerWidth >= 640
          ? 75
          : (val / Math.max(...elements)) *
            containerRef.current.getBoundingClientRect().height;

      return `${height + 1}px`;
    }

    return "";
  };

  useEffect(() => {
    const selectedSearch = state.algorithmType;

    let arr: Steps[] = [];
    switch (selectedSearch) {
      case "LinearSearch":
        arr = LinearSearch([...elements], Number(target));
        break;

      case "BinarySearch":
        arr = BinarySearch([...elements], Number(target));
        break;

      default:
        console.warn(`Unrecognized algorithm type: ${selectedSearch}`);
    }

    setSteps(arr);
  }, [state.algorithmType, state.algorithmElements, Number(target)]);

  useEffect(() => {
    const animate = () => {
      if (!steps.length || currentRef.current.index == steps.length - 1) {
        setAnimationStatus(false);
        return;
      }

      currentRef.current.index += 1;
      const obj: Steps = steps[currentRef.current.index];
      currentRef.current.active = obj;

      setElements((prevElements: number[]) => {
        const newElements = [...prevElements];
        setMetrics((prev: { count: number; timer: number }) => ({
          ...prev,
          timer: prev.timer + 1,
        }));

        if (currentRef.current.active.type === "comp") {
          setMetrics((prev: { count: number; timer: number }) => ({
            ...prev,
            count: prev.count + 1,
          }));
        }

        return newElements;
      });

      timeoutRef.current = setTimeout(() => {
        animate();
      }, 500 / state.algorithmSpeed);
    };

    if (animationStatus) animate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state.algorithmSpeed, animationStatus]);

  return (
    <div ref={containerRef} className="space-y-10 h-[240px] sm:h-auto">
      <div className="flex md:items-center items-end justify-center sm:justify-start mt-10 sm:mt-5 flex-wrap gap-y-8 lg:gap-y-5 gap-x-2 xl:gap-x-3 2xl:gap-x-5">
        {elements.map((element: number, index: number) => {
          const currentElements: { [key: string]: number } =
            currentRef.current.active.position;
          const animationType: string = currentRef.current.active.type;

          const color: string =
            currentElements &&
            colorConfig[
              `${Object.keys(currentElements).find(
                (key) => currentElements[key] === index
              )}_${animationType}`
            ];

          return (
            <div key={index} className="space-y-2 relative sm:mb-5">
              <div
                style={{
                  backgroundColor: color,
                  height: `${computeHeights(element)}`,
                }}
                className={`${getStyleBasedOnType(
                  index
                )} relative rounded-sm sm:rounded-md flex items-center justify-center w-[25px] sm:w-[53px] md:w-[67.5px] xl:w-[69.5px] 2xl:w-[72.5px]`}
              >
                <p className="absolute top-full translate-y-1/3 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 font-['Inconsolata'] text-[16px] sm:text-[18px]">
                  {element}
                </p>
              </div>

              {currentElements && (
                <p className="hidden md:block w-full text-center absolute left-1/2 -translate-x-1/2 text-[12.5px] md:text-[13.5px] top-[75px]">
                  {Object.values(currentElements).includes(index)
                    ? `( ${Object.keys(currentElements).find(
                        (key) => currentElements[key] === index
                      )} )`
                    : ""}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
