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

interface ElementsProps {
  elements: any;
  setElements: Function;
  selectedValue: string;
  animationStatus: boolean;
  setAnimationStatus: Function;
}

export default function Elements({
  elements,
  setElements,
  selectedValue,
  animationStatus,
  setAnimationStatus,
}: ElementsProps) {
  const [swaps, setSwaps] = useState<any>([]);
  const timeoutRef = useRef<any>(null);
  const currentRef = useRef<any>([]);

  useEffect(() => {
    if (animationStatus) {
      switch (selectedValue) {
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
    const animate = () => {
      if (!swaps.length) {
        setAnimationStatus(false);

        currentRef.current = {};
        return;
      }

      const obj: any = swaps.shift();
      const [i, j] = obj!.indices;

      currentRef.current = obj;

      setElements((prevElements: any) => {
        const newElements = [...prevElements];

        if (obj.type === "swap") {
          const temp = newElements[i];
          newElements[i] = newElements[j];
          newElements[j] = temp;
        }

        return newElements;
      });

      timeoutRef.current = setTimeout(() => {
        animate();
      }, 500);
    };

    animate();

    return () => clearTimeout(timeoutRef.current);
  }, [swaps]);

  return (
    <div className="flex items-center space-x-2 lg:space-x-5 mt-10">
      {elements.map((element: any, index: number) => (
        <div
          key={index}
          className={`${getStyleBasedOnType(
            animationStatus,
            currentRef.current,
            index
          )} rounded-md flex items-center justify-center w-[30px] lg:w-20 h-20`}
        >
          {element}
        </div>
      ))}
    </div>
  );
}

const getStyleBasedOnType = (status: boolean, active: any, index: number) => {
  if (active.type === "comp" && active.indices.includes(index) && status) {
    return "bg-red-600 scale-110 transtion-all duration-150 ease-in-out";
  } else if (
    active.type === "swap" &&
    active.indices.includes(index) &&
    status
  ) {
    return "bg-[#cd9c59] scale-110 transtion-all duration-150 ease-in-out";
  }

  return "bg-[#064663] scale-100";
};
