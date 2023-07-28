import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

export default function Header() {
  return (
    <div className="text-white pr-4 pl-1 lg:px-7 h-24 text-[22px] font-semibold flex items-center w-full justify-between">
      <img
        alt="logo"
        src="/images/algologo.png"
        className="w-[200px] h-[50px] md:w-[200px] md:h-[50px]"
      />

      <Link target="_blank" href="https://github.com/himzz1234/AlgoVisualizer">
        <AiFillGithub size={28} />
      </Link>
    </div>
  );
}
