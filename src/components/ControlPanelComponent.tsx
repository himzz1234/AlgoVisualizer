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

type controlProps = {
  setElements: Function;
  setMetrics: Function;
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
    setElements(state.algorithmElements);
    currentRef.current.index = -1;

    currentRef.current.active = [];
    setAnimationStatus(false);

    setMetrics({ timer: 0, count: 0 });
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
          newElements.push(Math.floor(Math.random() * 300));
        });

      state.algorithmElements = [...newElements];
      setElements([...newElements]);
    }
  };

  const nextStep = (): void => {
    currentRef.current.index += 1;

    const obj: any = steps[currentRef.current.index];
    if (obj.position) {
      var [i, j]: number[] = Object.values(obj.position);
    }
    currentRef.current.active = obj;
    setMetrics((prev: { count: number; timer: number }) => ({
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

    setMetrics((prev: { count: number; timer: number }) => ({
      ...prev,
      timer: prev.timer - 1,
    }));

    if (currentRef.current.index < 0) {
      setElements(state.algorithmElements);

      currentRef.current.active = [];
      return;
    }

    if (steps[currentRef.current.index + 1].type == "swap") {
      const [a, b]: Array<number> = Object.values(
        steps[currentRef.current.index + 1].position
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
    <div className="flex items-center space-x-5">
      <div className="flex items-center space-x-4">
        <button
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
          onClick={!animationStatus ? startAnimation : stopAnimation}
          className={`${
            currentRef.current.index == steps.length - 1
              ? "disabled"
              : "not-disabled"
          } control-btn w-[120px]`}
        >
          {!animationStatus ? (
            <BsFillPlayFill color="white" size={20} />
          ) : (
            <BsFillPauseFill color="white" size={20} />
          )}
          <p>{!animationStatus ? "Play" : "Pause"}</p>
        </button>

        <button
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
          onClick={generateRandomElements}
          className={`${
            currentRef.current.index > -1 || animationStatus
              ? "disabled"
              : "not-disabled"
          } control-btn`}
        >
          <BiShuffle color="white" size={20} />
        </button>
        <button onClick={resetElements} className="control-btn">
          <MdRestartAlt color="white" size={20} />
        </button>
      </div>

      <Select
        styles={styles}
        className="w-[150px]"
        options={speedOptions}
        instanceId="select-speed"
        defaultValue={speedOptions[3]}
        onChange={(e) => changeConfig({ algorithmSpeed: e?.value })}
      />
    </div>
  );
}

export default ControlPanel;
