import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { TiSortNumericallyOutline } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { PiGraphDuotone, PiTreeStructure } from "react-icons/pi";
import { useRouter } from "next/navigation";

type CardProps = {
  name: string;
  color: string;
  disabled: boolean;
};

function AlgorithmCard({ name, disabled, color }: CardProps) {
  const router = useRouter();
  let Icon: any;
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
      onClick={() => router.push(`/${name.toLowerCase()}`)}
      className={`${
        disabled
          ? "opacity-50 pointer-events-none"
          : "hover:bg-[#04293a] opacity-100 pointer-events-auto"
      }  transition-all duration-150 border-2 border-[#063e59] h-60 w-96 rounded-md px-4 py-4 flex flex-col space-y-2`}
    >
      <h2 className="text-xl font-medium uppercase">{name}</h2>
      <p className="text-[14px] w-full flex-1 text-[#CCCCCC] leading-[25px]">
        {getDesc(name)}
      </p>

      <div className="flex items-center justify-between">
        <Link
          href={`/${name.toLowerCase()}`}
          className="text-[#ecb364] flex items-center"
        >
          {/* <p>Find out more</p>
          <GoChevronRight color="#ecb364" /> */}
        </Link>

        <Icon size={55} color={color} />
      </div>
    </div>
  );
}

export default AlgorithmCard;
