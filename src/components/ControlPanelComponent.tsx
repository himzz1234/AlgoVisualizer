import React, { useContext } from "react";
import {
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPauseFill,
} from "react-icons/bs";
import Select from "react-select";
import { BiShuffle } from "react-icons/bi";
import { speedOptions } from "@/util/data";
import { MdRestartAlt } from "react-icons/md";
import { styles } from "@/util/dropdown-styles";
import { AlgoContext } from "@/context/AlgoContext";
import { AnimationContext } from "@/context/AnimationContext";
import { AlgoMetrics } from "@/types/types";

type controlProps = {
  setElements: (updater: (prevElements: number[]) => number[]) => void;
  setMetrics: (updater: (prevMetrics: AlgoMetrics) => AlgoMetrics) => void;
};

function ControlPanel({ setElements, setMetrics }: controlProps) {
  const { state, changeConfig } = useContext(AlgoContext)!;
  const { steps, currentRef, animationStatus, setAnimationStatus } =
    useContext(AnimationContext)!;

  const startAnimation = (): void => {
    setAnimationStatus(true);
  };

  const stopAnimation = (): void => {
    setAnimationStatus(false);
  };

  const resetElements = (): void => {
    setElements((prev: number[]) => [...state.algorithmElements]);
    currentRef.current.index = -1;

    currentRef.current.active = [];
    setAnimationStatus(false);

    setMetrics((prev: AlgoMetrics) => ({
      count: 0,
      timer: 0,
    }));
  };

  const generateRandomElements = (): void => {
    const length = Math.floor(Math.random() * 10);

    if (length < 2) {
      generateRandomElements();
    } else {
      let newElements: number[] = [];

      Array(length)
        .fill("")
        .forEach(() => {
          newElements.push(Math.floor(Math.random() * 201) - 100);
        });

      state.algorithmElements = [...newElements];
      setElements((prev: number[]) => [...newElements]);
    }
  };

  const nextStep = (): void => {
    currentRef.current.index += 1;

    const obj: any = steps[currentRef.current.index];
    if (obj.position) {
      var [i, j]: number[] = Object.values(obj.position);
    }

    currentRef.current.active = obj;
    setMetrics((prev: AlgoMetrics) => ({
      ...prev,
      timer: prev.timer + 1,
    }));

    setElements((prevElements: number[]) => {
      const newElements: number[] = [...prevElements];

      if (obj.type === "swap") {
        setMetrics((prev: { count: number; timer: number }) => ({
          ...prev,
          count: prev.count + 1,
        }));

        [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
      }

      return newElements;
    });

    if (currentRef.current.index >= steps.length - 1) {
      setElements((prevElements: number[]) => [...prevElements]);
      return;
    }
  };

  const previousStep = (): void => {
    currentRef.current.index -= 1;

    setMetrics((prev: AlgoMetrics) => ({
      ...prev,
      timer: prev.timer - 1,
    }));

    if (currentRef.current.index < 0) {
      setElements((prev: number[]) => [...state.algorithmElements]);

      currentRef.current.active = [];
      return;
    }

    if (steps[currentRef.current.index + 1].type == "swap") {
      const [a, b]: number[] = Object.values(
        steps[currentRef.current.index + 1].position!
      );

      setElements((prevElements: number[]) => {
        const newElements = [...prevElements];

        [newElements[a], newElements[b]] = [newElements[b], newElements[a]];
        setMetrics((prev: { count: number; timer: number }) => ({
          ...prev,
          count: prev.count - 1,
        }));

        return newElements;
      });
    }

    const obj: any = steps[currentRef.current.index];
    currentRef.current.active = obj;
  };

  return (
    <div className="flex items-center gap-5 lg:gap-0 lg:space-x-5 flex-wrap lg:flex-nowrap">
      <div className="flex items-center space-x-4">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Go back one step in the animation."
          data-tooltip-delay-show={1000}
          onClick={previousStep}
          className={`${
            animationStatus || currentRef.current.index < 0
              ? "disabled"
              : "not-disabled"
          } control-btn`}
        >
          <BsFillSkipStartFill color="white" size={20} />
        </button>

        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Play or pause the animation."
          data-tooltip-delay-show={1000}
          onClick={!animationStatus ? startAnimation : stopAnimation}
          className={`${
            currentRef.current.index == steps.length - 1
              ? "disabled"
              : "not-disabled"
          } control-btn w-[50px] lg:w-[120px]`}
        >
          {!animationStatus ? (
            <BsFillPlayFill color="white" size={20} />
          ) : (
            <BsFillPauseFill color="white" size={20} />
          )}
          <p className="lg:block hidden">
            {!animationStatus ? "Play" : "Pause"}
          </p>
        </button>

        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Advance one step in the animation."
          data-tooltip-delay-show={1000}
          onClick={nextStep}
          className={`${
            animationStatus || currentRef.current.index >= steps.length - 1
              ? "disabled"
              : "not-disabled"
          } control-btn`}
        >
          <BsFillSkipEndFill color="white" size={20} />
        </button>

        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Create a new random set of elements."
          data-tooltip-delay-show={1000}
          onClick={generateRandomElements}
          className={`${
            currentRef.current.index > -1 || animationStatus
              ? "disabled"
              : "not-disabled"
          } control-btn`}
        >
          <BiShuffle color="white" size={20} />
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Restore the original elements."
          data-tooltip-delay-show={1000}
          onClick={resetElements}
          className="control-btn"
        >
          <MdRestartAlt color="white" size={20} />
        </button>
      </div>

      <Select
        styles={styles}
        className="w-[100px] lg:w-[150px] rounded-sm sm:rounded-md"
        options={speedOptions}
        instanceId="select-speed"
        defaultValue={speedOptions[3]}
        onChange={(e) => changeConfig({ algorithmSpeed: e?.value })}
      />
    </div>
  );
}

export default ControlPanel;
