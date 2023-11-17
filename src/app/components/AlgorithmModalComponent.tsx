import React, { useContext } from "react";
import { Inter } from "next/font/google";
import { algoOptions } from "@/app/utils/data";
import { LiaTimesSolid } from "react-icons/lia";
import { AlgoContext } from "@/app/context/AlgoContext";
import { AnimationContext } from "@/app/context/AnimationContext";
import { AlgoMetrics, AlgorithmOption } from "@/app/types/types";

const inter = Inter({ subsets: ["latin"] });

type ModalProps = {
  setMetrics: (metrics: AlgoMetrics) => void;
  setIsOpen: (isOpen: boolean) => void;
  setElements: (elements: number[]) => void;
};

function AlgorithmModal({ setIsOpen, setMetrics, setElements }: ModalProps) {
  const { currentRef, setAnimationStatus } = useContext(AnimationContext)!;
  const { state, changeConfig } = useContext(AlgoContext)!;

  const algoCategory: AlgorithmOption =
    algoOptions.find(
      (option: AlgorithmOption) => option.category == state.algorithm
    ) || algoOptions[0];

  const switchAlgorithm = (item: string) => {
    setElements(state.algorithmElements);
    currentRef.current!.index = -1;

    currentRef.current!.active = {};
    setAnimationStatus(false);

    setMetrics({ timer: 0, count: 0 });
    changeConfig({ algorithmType: item });
  };

  return (
    <div
      className={`${inter.className} px-5 sm:px-0 fixed h-screen top-0 left-0 bg-modalBackground w-full z-40 flex items-center justify-center`}
    >
      <div className="w-[500px] bg-[#041c32] shadow-md rounded-md">
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[#063e59]">
          <h1 className="text-xl">Choose an Algorithm</h1>

          <div
            className="cursor-pointer btnclick"
            onClick={() => setIsOpen(false)}
          >
            <LiaTimesSolid />
          </div>
        </div>
        <ul>
          {Object.keys(algoCategory.algorithms).map((item, index) => (
            <li
              key={index}
              onClick={() => switchAlgorithm(item)}
              className={`cursor-pointer px-5 py-3 ${
                state.algorithmType == item && "bg-[#064663]"
              }`}
            >
              {algoCategory.algorithms[item]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AlgorithmModal;
