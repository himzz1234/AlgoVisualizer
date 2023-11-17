import Header from "@/app/components/HeaderComponent";
import AlgoContextProvider from "@/app/context/AlgoContext";
import AnimationProvider from "@/app/context/AnimationContext";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <AlgoContextProvider>
        <AnimationProvider>{children}</AnimationProvider>
      </AlgoContextProvider>
    </>
  );
}
