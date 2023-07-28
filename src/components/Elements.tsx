"use client";

import { useState, useEffect, useRef } from "react";
import {
  BubbleSort,
  QuickSort,
  InsertionSort,
  SelectionSort,
  HeapSort,
  ShellSort,
} from "@/sortingAlgos";
import { Inter } from "next/font/google";

interface ElementsProps {
  elements: any;
  setElements: Function;
  setCount: Function;
  selectedSort: string;
  animationStatus: boolean;
  setAnimationStatus: Function;
  selectedSpeed: number;
}
const inter = Inter({ subsets: ["latin"] });

export default function Elements({
  elements,
  setElements,
  setCount,
  selectedSort,
  animationStatus,
  setAnimationStatus,
  selectedSpeed,
}: ElementsProps) {
  const [swaps, setSwaps] = useState<any>([]);
  const timeoutRef = useRef<any>(null);
  const currentRef = useRef<any>([]);
  const flagRef = useRef(false);

  const getStyleBasedOnType = (isSwapped: boolean, index: number) => {
    if (
      currentRef.current.indices &&
      Object.values(currentRef.current.indices).includes(index) &&
      animationStatus
    ) {
      if (currentRef.current.type === "comp")
        return "bg-red-600 scale-110 transtion-all duration-150 ease-in-out";
      else
        return "bg-[#cd9c59] scale-110 transtion-all duration-150 ease-in-out";
    } else if (
      isSwapped ||
      (animationStatus && !swaps.length && flagRef.current)
    )
      return "bg-green-700 scale-100";

    return "bg-[#064663] scale-100";
  };

  useEffect(() => {
    if (animationStatus) {
      switch (selectedSort) {
        case "BubbleSort": {
          const arr = BubbleSort([...elements]);
          setSwaps([...arr]);
          break;
        }
        case "QuickSort": {
          const arr = QuickSort([...elements]);
          setSwaps([...arr]);
          break;
        }
        case "InsertionSort": {
          const arr = InsertionSort([...elements]);
          setSwaps([...arr]);
          break;
        }
        case "SelectionSort": {
          const arr = SelectionSort([...elements]);
          setSwaps([...arr]);
          break;
        }
        case "HeapSort": {
          const arr = HeapSort([...elements]);
          setSwaps([...arr]);
          break;
        }
        case "ShellSort": {
          const arr = ShellSort([...elements]);
          setSwaps([...arr]);
          break;
        }
      }
    } else setSwaps([]);
  }, [animationStatus]);

  useEffect(() => {
    console.log(selectedSpeed);
    const animate = () => {
      flagRef.current = true;
      if (!swaps.length) {
        setAnimationStatus(false);
        flagRef.current = false;

        currentRef.current = {};
        return;
      }

      const obj: any = swaps.shift();

      let indices: object = obj.indices;
      const [i, j] = Object.values(indices);

      currentRef.current = obj;

      setElements((prevElements: any) => {
        const newElements = [...prevElements];

        if (obj.type === "swap") {
          setCount((prevCount: number) => prevCount + 1);
          const temp = newElements[i];
          newElements[i] = newElements[j];
          newElements[j] = temp;
        }

        return newElements;
      });

      timeoutRef.current = setTimeout(() => {
        animate();
      }, 500 / selectedSpeed);
    };

    animate();

    return () => clearTimeout(timeoutRef.current);
  }, [swaps, selectedSpeed]);

  const remainElements = swaps.flatMap((swap: any) =>
    Object.values(swap.indices)
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center mt-5 flex-wrap gap-y-8 lg:gap-y-5 gap-x-2 lg:gap-x-5">
        {elements.map((element: any, index: number) => {
          const swapped =
            remainElements.length && !remainElements.includes(index);
          return (
            <div key={index} className="space-y-2 relative mb-5">
              <div
                className={`${getStyleBasedOnType(
                  swapped,
                  index
                )} rounded-md flex items-center justify-center w-[60px] md:w-20 h-20`}
              >
                <p>{element}</p>
              </div>
              {currentRef.current.indices && (
                <p
                  className={`${inter.className} w-full text-center absolute left-1/2 -translate-x-1/2 text-[12.5px] md:text-[13.5px] top-[85px]`}
                >
                  {Object.values(currentRef.current.indices).includes(index)
                    ? `( ${Object.keys(currentRef.current.indices).find(
                        (key) => currentRef.current.indices[key] === index
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
