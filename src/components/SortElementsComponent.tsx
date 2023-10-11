"use client";

import { useEffect, useRef, useContext } from "react";
import {
  BubbleSort,
  QuickSort,
  InsertionSort,
  SelectionSort,
  HeapSort,
  ShellSort,
} from "@/sortingAlgos";
import { Inconsolata } from "next/font/google";
import { AlgoContext } from "@/context/AlgoContext";
import { AnimationContext } from "@/context/AnimationContext";

interface ElementsProps {
  elements: number[];
  setMetrics: Function;
  setElements: Function;
}

const inconsolata = Inconsolata({ subsets: ["latin"] });
export default function Elements({
  elements,
  setMetrics,
  setElements,
}: ElementsProps) {
  const timeoutRef = useRef<any>(null);
  const { state } = useContext(AlgoContext)!;
  const { steps, setSteps, animationStatus, setAnimationStatus, currentRef } =
    useContext(AnimationContext)!;
  const blockRefs = useRef(Array(elements.length).fill(null));

  const getStyleBasedOnType = (index: number): string => {
    if (currentRef.current.active.type === "sorting-finish") {
      return "bg-green-700 scale-110 transtion-all duration-150 ease-in-out";
    }

    if (
      currentRef.current.active.position &&
      Object.values(currentRef.current.active.position).includes(index)
    ) {
      if (currentRef.current.active.type === "comp")
        return "bg-[#3498db] scale-110 transtion-all duration-150 ease-in-out";
      else
        return "bg-[#c0392b] scale-110 transtion-all duration-150 ease-in-out";
    }

    return "bg-[#064663] scale-100";
  };

  useEffect(() => {
    const selectedSort = state.algorithmType;

    let arr: any[] = [];
    switch (selectedSort) {
      case "BubbleSort": {
        arr = BubbleSort([...elements]);
        break;
      }
      case "QuickSort": {
        arr = QuickSort([...elements]);
        break;
      }
      case "InsertionSort": {
        arr = InsertionSort([...elements]);
        break;
      }
      case "SelectionSort": {
        arr = SelectionSort([...elements]);
        break;
      }
      case "HeapSort": {
        arr = HeapSort([...elements]);
        break;
      }
      case "ShellSort": {
        arr = ShellSort([...elements]);
        break;
      }
    }

    setSteps([...arr]);
  }, [state.algorithmType, state.algorithmElements]);

  useEffect(() => {
    const animate = () => {
      if (!steps.length || currentRef.current.index == steps.length - 1) {
        setAnimationStatus(false);
        return;
      }

      currentRef.current.index += 1;
      const obj: any = steps[currentRef.current.index];

      currentRef.current.active = obj;
      if (obj.position) {
        var [i, j]: number[] = Object.values(obj.position);
        var a = blockRefs.current[i];
        var b = blockRefs.current[j];
      }

      setElements((prevElements: number[]) => {
        const newElements = [...prevElements];
        setMetrics((prev: { count: number; timer: number }) => ({
          ...prev,
          timer: prev.timer + 1,
        }));

        if (obj.type === "swap") {
          setMetrics((prev: { count: number; timer: number }) => ({
            ...prev,
            count: prev.count + 1,
          }));

          [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
        }

        return newElements;
      });

      timeoutRef.current = setTimeout(() => {
        animate();
      }, 500 / state.algorithmSpeed);
    };

    if (animationStatus) animate();

    return () => clearTimeout(timeoutRef.current);
  }, [state.algorithmSpeed, animationStatus]);

  return (
    <div className="space-y-10">
      <div className="flex items-center mt-5 flex-wrap gap-y-8 lg:gap-y-5 gap-x-2 lg:gap-x-5">
        {elements.map((element: number, index: number) => {
          return (
            <div
              key={index}
              ref={(e) => (blockRefs.current[index] = e)}
              className="space-y-2 relative mb-5"
            >
              <div
                className={`${getStyleBasedOnType(
                  index
                )} rounded-md flex items-center justify-center w-[60px] md:w-[74px] h-[74px] transition-all duration-150`}
              >
                <p className={`font-['Inconsolata'] text-[18px]`}>{element}</p>
              </div>
              {currentRef.current.active.position && (
                <p className="w-full text-center absolute left-1/2 -translate-x-1/2 text-[12.5px] md:text-[13.5px] top-[75px]">
                  {Object.values(currentRef.current.active.position).includes(
                    index
                  )
                    ? `( ${Object.keys(currentRef.current.active.position).find(
                        (key) =>
                          currentRef.current.active.position[key] === index
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
