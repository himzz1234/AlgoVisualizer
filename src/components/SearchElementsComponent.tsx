"use client";

import { AlgoContext } from "@/context/AlgoContext";
import { AnimationContext } from "@/context/AnimationContext";
import { Inconsolata } from "next/font/google";
import { useContext, useEffect, useRef } from "react";
import { colorConfig, LinearSearch, BinarySearch } from "@/searchingAlgos";

interface ElementProps {
  elements: number[];
  setMetrics: Function;
  setElements: Function;
  target: number;
}

const inconsolata = Inconsolata({ subsets: ["latin"] });
export default function Elements({
  elements,
  setMetrics,
  setElements,
  target,
}: ElementProps) {
  const timeoutRef = useRef<any>(null);
  const { state } = useContext(AlgoContext)!;
  const { steps, setSteps, animationStatus, setAnimationStatus, currentRef } =
    useContext(AnimationContext)!;

  const getStyleBasedOnType = (index: number): string => {
    console.log(elements.indexOf(Number(target)));
    if (currentRef.current.active.position) {
      if (index == elements.indexOf(Number(target))) {
        return "border-[2px] border-dashed border-[#E0E0E0]";
      }

      if (Object.values(currentRef.current.active.position).includes(index)) {
        return "scale-110 transtion-all duration-150 ease-in-out";
      }
    }

    return "bg-[#064663] scale-100";
  };

  useEffect(() => {
    const selectedSearch = state.algorithmType;

    let arr: any[] = [];
    switch (selectedSearch) {
      case "LinearSearch": {
        arr = LinearSearch([...elements], Number(target));
        break;
      }
      case "BinarySearch": {
        arr = BinarySearch([...elements], Number(target));
        break;
      }
    }

    setSteps([...arr]);
  }, [state.algorithmType, state.algorithmElements, Number(target)]);

  useEffect(() => {
    const animate = () => {
      if (!steps.length || currentRef.current.index == steps.length - 1) {
        setAnimationStatus(false);
        return;
      }

      currentRef.current.index += 1;
      const obj: any = steps[currentRef.current.index];
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

    return () => clearTimeout(timeoutRef.current);
  }, [state.algorithmSpeed, animationStatus]);

  return (
    <div className="space-y-10">
      <div className="flex items-center mt-5 flex-wrap gap-y-8 lg:gap-y-5 gap-x-2 lg:gap-x-5">
        {elements.map((element: number, index: number) => {
          const obj = currentRef.current.active.position;
          const type = currentRef.current.active.type;

          const color =
            obj &&
            colorConfig[
              `${Object.keys(obj).find((key) => obj[key] === index)}_${type}`
            ];

          return (
            <div key={index} className="space-y-2 relative mb-5">
              <div
                style={{ backgroundColor: color }}
                className={`${getStyleBasedOnType(
                  index
                )} rounded-md flex items-center justify-center w-[60px] md:w-[74px] h-[74px]`}
              >
                <p className={`${inconsolata.className} text-[18px]`}>
                  {element}
                </p>
              </div>

              {currentRef.current.active.position && (
                <p className="w-full text-center absolute left-1/2 -translate-x-1/2 text-[12.5px] md:text-[13.5px] top-[75px]">
                  {Object.values(obj).includes(index)
                    ? `( ${Object.keys(obj).find(
                        (key) => obj[key] === index
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
