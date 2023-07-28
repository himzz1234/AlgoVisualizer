import { Inter } from "next/font/google";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 600,
      ticks: {
        stepSize: 100,
      },
    },
  },
  plugins: {
    tooltip: {
      displayColors: false,
      callbacks: {
        title: () => "",
      },
    },
  },
};

const labels = ["100", "500", "1000", "5000", "10000", "50000", "100000"];

interface SidebarProps {
  selectedSort: any;
}

const inter = Inter({ subsets: ["latin"] });

export default function Sidebar({ selectedSort }: SidebarProps) {
  const data = {
    labels,
    datasets: [
      {
        label: selectedSort.label,
        borderColor: "#ecb364",
        data: selectedSort.data,
        backgroundColor: "rgba(255, 99, 132, 0)",
      },
    ],
  };

  return (
    <div
      className={`${inter.className} h-auto w-full lg:w-[27%] lg:px-5 flex flex-col rounded-md lg:border-r-[1px] border-[#064663]`}
    >
      <div className="space-y-5">
        <h1 className="text-[22px] text-[#ecb364] font-medium">
          {selectedSort.label}
        </h1>
      </div>
      <div className="mt-5 leading-[30px] break-words">{selectedSort.desc}</div>
      <div className="mt-5 h-[240px]">
        <Line options={options} data={data} />
      </div>
      <div className="mt-10 space-y-4 flex-1 text-[15px]">
        <p>
          <span className="font-medium">Time Complexity: </span>
          {selectedSort.complexity.time}
        </p>
        <p>
          <span className="font-medium">Space Complexity: </span>
          {selectedSort.complexity.space}
        </p>
        <p>
          <span className="font-medium">Method: </span>
          {selectedSort.method}
        </p>
        <p>
          <span className="font-medium">Stable: </span>
          {selectedSort.stable}
        </p>
      </div>
    </div>
  );
}
