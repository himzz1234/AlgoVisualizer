import React from "react";
import Image from "next/image";

function Loading() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center">
      <Image
        src="/images/algologo.png"
        height={280}
        width={280}
        alt="loading"
        priority
      />
    </div>
  );
}

export default Loading;
