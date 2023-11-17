import { useEffect, useRef, useContext } from "react";
import {
  BubbleSort,
  QuickSort,
  InsertionSort,
  SelectionSort,
  HeapSort,
  ShellSort,
} from "@/app/sort/utils/algorithms";
import { AlgoMetrics, Steps } from "@/app/types/types";
import { AlgoContext } from "@/app/context/AlgoContext";
import { AnimationContext } from "@/app/context/AnimationContext";

interface ElementsProps {
  elements: number[];
  setElements: (updater: (prevElements: number[]) => number[]) => void;
  setMetrics: (updater: (prevMetrics: AlgoMetrics) => AlgoMetrics) => void;
}

export default function Elements({
  elements,
  setMetrics,
  setElements,
}: ElementsProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { state } = useContext(AlgoContext)!;
  const { steps, setSteps, animationStatus, setAnimationStatus, currentRef } =
    useContext(AnimationContext)!;
  const containerRef = useRef<HTMLDivElement>(null);

  const getStyleBasedOnType = (index: number): string => {
    const activePosition = currentRef.current.active.position;
    const activeAnimationType = currentRef.current.active.type;

    if (activeAnimationType === "sorting-finish") {
      return "bg-green-700 sm:scale-110";
    }

    if (activePosition && Object.values(activePosition).includes(index)) {
      if (activeAnimationType === "comp") return "bg-[#3498db] sm:scale-110";
      else return "bg-[#c0392b] sm:scale-110";
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

    return "76px";
  };

  useEffect(() => {
    const selectedSort: string = state.algorithmType;
    const sortingAlgorithms: {
      [key: string]: (elements: number[]) => Steps[];
    } = {
      BubbleSort: BubbleSort,
      QuickSort: QuickSort,
      InsertionSort: InsertionSort,
      SelectionSort: SelectionSort,
      HeapSort: HeapSort,
      ShellSort: ShellSort,
    };

    if (sortingAlgorithms[selectedSort]) {
      const arr: Steps[] = sortingAlgorithms[selectedSort]([...elements]);
      setSteps(arr);
    }
  }, [state.algorithmType, state.algorithmElements]);

  useEffect(() => {
    const animate = () => {
      if (!steps.length || currentRef.current.index == steps.length - 1) {
        setAnimationStatus(false);
        return;
      }

      currentRef.current.index += 1;
      const obj: Steps = steps[currentRef.current.index];

      currentRef.current.active = obj;
      if (obj.position) {
        var [i, j]: number[] = Object.values(obj.position);
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

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state.algorithmSpeed, animationStatus]);

  return (
    <div ref={containerRef} className="space-y-10 h-[240px] sm:h-auto">
      <div className="flex md:items-center items-end justify-center sm:justify-start mt-10 md:mt-5 flex-wrap gap-y-8 lg:gap-y-5 gap-x-2 xl:gap-x-3 2xl:gap-x-5">
        {elements.map((element: number, index: number) => {
          return (
            <div key={index} className="space-y-2 relative md:mb-5">
              <div
                style={{ height: `${computeHeights(element)}` }}
                className={`${getStyleBasedOnType(
                  index
                )} relative sm:transition-all sm:duration-150 sm:ease-in-out rounded-sm sm:rounded-md flex items-center justify-center w-[25px] sm:w-[53px] md:w-[67.5px] xl:w-[69.5px] 2xl:w-[72.5px]`}
              >
                <p className="absolute top-full translate-y-1/3 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 font-['Inconsolata'] text-[16px] sm:text-[18px]">
                  {element}
                </p>
              </div>
              {currentRef.current.active.position && (
                <p className="hidden sm:block w-full text-center absolute left-1/2 -translate-x-1/2 text-[12.5px] md:text-[13.5px] top-[75px]">
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
