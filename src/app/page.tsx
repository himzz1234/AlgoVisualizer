"use client";

import AlgorithmCard from "@/components/AlgorithmCardComponent";

function Home() {
  return (
    <div className="flex-1 py-6l flex flex-col">
      {/* <h1 className="text-center text-2xl font-medium">
        Unlock the Power of Algorithms
      </h1>
      <p className="text-[16px] mt-3 text-[#E0E0E0]">Start Exploring Now!</p> */}

      <div className="my-6 relative flex-1">
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <AlgorithmCard name="Sort" disabled={false} color="#007BFF" />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <AlgorithmCard name="Search" disabled={false} color="#28A745" />
        </div>
        <div className="absolute top-1/2 left-40 -translate-y-1/2">
          <AlgorithmCard name="Graph" disabled={true} color="#FFA500" />
        </div>
        <div className="absolute top-1/2 right-40 -translate-y-1/2">
          <AlgorithmCard name="Trees" disabled={true} color="#8B4513" />
        </div>
      </div>
    </div>
  );
}

export default Home;
