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

      {/* <div className="flex absolute bottom-5 left-1/2 -translate-x-1/2 items-center space-x-1 text-[14px]">
        <p>Made with ❤️ by Himanshu</p>
      </div> */}
    </div>
  );
}

export default Loading;
