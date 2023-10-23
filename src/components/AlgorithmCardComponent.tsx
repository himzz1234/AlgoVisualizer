import Link from "next/link";
import { useContext } from "react";
import { TiSortNumericallyOutline } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { PiGraphDuotone, PiTreeStructure } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { AlgoContext } from "@/context/AlgoContext";

type CardProps = {
  name: string;
  color?: string;
  disabled: boolean;
};

type IconType = typeof TiSortNumericallyOutline;

function AlgorithmCard({ name, disabled, color }: CardProps) {
  const { setIsLoading } = useContext(AlgoContext)!;
  const router = useRouter();
  let Icon: IconType | null = TiSortNumericallyOutline;

  const getDesc = (name: string) => {
    switch (name) {
      case "Sort": {
        Icon = TiSortNumericallyOutline;
        return "Efficiently organize data using various sorting algorithms for improved information management";
      }
      case "Search":
        Icon = BiSearchAlt;
        return "Precision in finding items with quick, accurate search algorithms for datasets";
      case "Graph":
        Icon = PiGraphDuotone;
        return "Unlock connections, traverse data in complex networks with insightful graph algorithms";
      case "Trees":
        Icon = PiTreeStructure;
        return "Efficient management of hierarchical data structures, simplifying organization and retrieval";
    }
  };

  return (
    <div
      style={{ borderTopColor: color }}
      onClick={() => {
        router.push(`/${name.toLowerCase()}`);
        setIsLoading(true);
      }}
      className={`${
        disabled
          ? "opacity-40 pointer-events-none border-t-[#063e59]"
          : "hover:bg-[#04293a] opacity-100 pointer-events-auto"
      } cursor-pointer transition-all duration-150 border-2 h-full border-[#063e59] rounded-md px-4 py-4 flex flex-col space-y-2`}
    >
      <h2 className="text-xl font-medium uppercase">{name}</h2>
      <p className="text-[14px] w-full flex-1 text-[#CCCCCC] leading-[25px]">
        {getDesc(name)}
      </p>

      <div className="flex items-center justify-between">
        <Link
          href={`/${name.toLowerCase()}`}
          className="text-[#ecb364] flex items-center"
        ></Link>

        <Icon size={55} color={color} />
      </div>
    </div>
  );
}

export default AlgorithmCard;
