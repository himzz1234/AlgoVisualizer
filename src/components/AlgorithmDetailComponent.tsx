import React from "react";
import { AlgoMetadata } from "@/types/types";

interface DetailProps {
  selectedAlgo: AlgoMetadata;
}

function AlgorithmDetail({ selectedAlgo }: DetailProps) {
  return (
    <div className="mt-6 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 px-2 border-t-2 border-[#063e59] py-6">
      <div className="md:border-r-2 md:border-r-[#063e59] pr-5">
        <h4 className="font-medium uppercase text-[16px] text-[#ecb364]">
          Time Complexity
        </h4>
        <table className="border-separate border-spacing-y-3 table-auto w-[250px]">
          <tbody>
            <tr className="text-[15px]">
              <td>Best Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.time.best}
              </td>
            </tr>
            <tr className="text-[15px]">
              <td>Average Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.time.average}
              </td>
            </tr>
            <tr className="text-[15px]">
              <td>Worst Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.time.worst}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="lg:border-r-2 lg:border-[#063e59] pr-5">
        <h4 className="font-medium uppercase text-[16px] text-[#ecb364]">
          Space Complexity
        </h4>
        <table className="border-separate border-spacing-y-3 table-auto w-[250px]">
          <tbody>
            <tr className="text-[15px]">
              <td>Best Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.space.best}
              </td>
            </tr>
            <tr className="text-[15px]">
              <td>Average Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.space.average}
              </td>
            </tr>
            <tr className="text-[15px]">
              <td>Worst Case</td>
              <td className="text-right">
                {selectedAlgo.complexity.space.worst}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <h4 className="font-medium uppercase text-[16px] text-[#ecb364]">
            Stability
          </h4>
          <p className="text-[15px]">{selectedAlgo.stable}</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium uppercase text-[16px] text-[#ecb364]">
            Method
          </h4>
          <p className="text-[15px]">{selectedAlgo.method}</p>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmDetail;
