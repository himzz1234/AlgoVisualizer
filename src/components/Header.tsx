import Image from "next/image";

export default function Header() {
  return (
    <div className="text-white p-5 text-[22px] font-semibold">
      <img alt="logo" src="/images/algologo.png" width={220} height={220} />
    </div>
  );
}
