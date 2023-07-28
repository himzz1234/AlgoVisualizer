import { useState, useRef, useEffect } from "react";

interface TimerProps {
  animationStatus: boolean;
  input: any;
  selectedSort: string;
}

export default function Timer({
  animationStatus,
  input,
  selectedSort,
}: TimerProps) {
  const [timer, setTimer] = useState("00.00s");
  const millisecondsRef = useRef(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setTimer("00.00s");
    millisecondsRef.current = 0;
  }, [input, selectedSort]);

  useEffect(() => {
    if (animationStatus) {
      timerRef.current = window.setInterval(() => {
        millisecondsRef.current += 10;

        const seconds = Math.floor((millisecondsRef.current / 1000) % 60)
          .toString()
          .padStart(2, "0");
        const milliseconds = Math.floor((millisecondsRef.current % 1000) / 10)
          .toString()
          .padStart(2, "0");
        setTimer(`${seconds}.${milliseconds}s`);
      }, 10);
    } else clearInterval(timerRef.current);

    return () => clearInterval(timerRef.current);
  }, [animationStatus]);

  return (
    <div className="bg-[#04293A] rounded-md w-20 py-2 px-3 outline-none text-sm">
      {timer}
    </div>
  );
}
