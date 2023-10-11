"use client";

import "./globals.css";
import Header from "@/components/HeaderComponent";
import AlgoContextProvider from "../context/AlgoContext";
import AnimationProvider from "@/context/AnimationContext";
import { Tooltip } from "react-tooltip";

export const metadata = {
  title: "AlgoVisualizer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`font-['Inter'] bg-[#041c32] flex flex-col w-full min-h-screen text-white`}
      >
        <AlgoContextProvider>
          <AnimationProvider>
            <Header />
            {children}

            <Tooltip
              id="my-tooltip"
              place="top-start"
              opacity={1}
              style={{
                backgroundColor: "#064663",
                color: "white",
              }}
            />
          </AnimationProvider>
        </AlgoContextProvider>
      </body>
    </html>
  );
}
