import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

export default function Header() {
  return (
    <div className="text-white p-5 text-[22px] font-semibold flex items-center justify-between">
      <img alt="logo" src="/images/algologo.png" width={220} height={220} />

      <Link target="_blank" href="https://github.com/himzz1234/AlgoVisualizer">
        <AiFillGithub size={28} />
      </Link>
    </div>
  );
}
