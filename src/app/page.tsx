"use client";

import AlgorithmCard from "@/components/AlgorithmCardComponent";
import Loading from "@/components/LoadingComponent";
import { AlgoContext } from "@/context/AlgoContext";
import { useContext, useEffect } from "react";

function Home() {
  const { isLoading, setIsLoading } = useContext(AlgoContext)!;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="lg:flex-1 py-6 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 relative gap-5 lg:gap-0">
          <div className=" h-60 w-full lg:w-96 lg:absolute lg:top-20 lg:left-1/2 lg:-translate-x-1/2">
            <AlgorithmCard name="Sort" disabled={false} color="#007BFF" />
          </div>
          <div className="h-60 w-full lg:w-96 lg:absolute lg:bottom-20 lg:left-1/2 lg:-translate-x-1/2">
            <AlgorithmCard name="Search" disabled={false} color="#28A745" />
          </div>
          <div className="h-60 w-full lg:w-96 lg:absolute lg:top-1/2 lg:left-40 lg:-translate-y-1/2">
            <AlgorithmCard name="Graph" disabled={true} />
          </div>
          <div className="h-60 w-full lg:w-96 lg:absolute lg:top-1/2 lg:right-40 lg:-translate-y-1/2">
            <AlgorithmCard name="Trees" disabled={true} />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
