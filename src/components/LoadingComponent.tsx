import React from "react";
import Image from "next/image";

function Loading() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center">
      <Image
        priority
        width={280}
        height={280}
        alt="loading"
        src="/images/algologo.png"
      />
    </div>
  );
}

export default Loading;
