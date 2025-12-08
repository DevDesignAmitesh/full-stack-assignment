import { IntroText } from "@/components/landing/IntroText";
import { RiRobot2Line } from "react-icons/ri";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black">
      <div
        className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full 
        blur-[150px] bg-[#3a4f19]"
      ></div>
      <div
        className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full 
        blur-[150px] bg-[#0f2345]"
      ></div>

      <div className="z-100 flex flex-col items-center justify-center w-full h-full mx-auto max-w-xl border-x-2 border-neutral-800">
        <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-[#a3e635] to-[#22c55e] flex justify-center items-center">
          <RiRobot2Line size={30} fill="#000" />
        </div>
        <IntroText />
        <p className="text-center text-neutral-400 text-[14px] font-semibold mt-4">
          Experience the future of shopping with your <br /> own intelligent
          companion.
        </p>

        <button 
          className="bg-white mt-28 text-black font-semibold py-3 rounded-full 
          cursor-pointer w-[80%] hover:scale-[.98] hover:opacity-90 transition-all duration-200">
          Start a new chat
        </button>

        <p className="text-center text-neutral-400 text-[13px] font-medium mt-2">
          Powered by Human
        </p>

      </div>
    </div>
  );
}
