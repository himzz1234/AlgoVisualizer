"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";

export default function Header() {
  const router = useRouter();
  return (
    <div className="text-white pr-4 border-b-2 border-[#063e59] pl-1 lg:px-3 h-20 text-[22px] font-semibold flex items-center w-full justify-between">
      <div onClick={() => router.replace("/")}>
        <img
          alt="logo"
          src="/images/algologo.png"
          className="w-[200px] h-[50px] md:w-[200px] md:h-[50px] cursor-pointer"
        />
      </div>

      <Link target="_blank" href="https://github.com/himzz1234/AlgoVisualizer">
        <AiFillGithub size={28} />
      </Link>
    </div>
  );
}
