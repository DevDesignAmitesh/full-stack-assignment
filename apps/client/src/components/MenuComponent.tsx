import { FrontendMessage } from "@repo/types/types";
import { Dispatch, SetStateAction } from "react";

export const MenuComponent = ({
  sendMessage,
  allMessages,
  setMessages,
  loading,
}: {
  allMessages: FrontendMessage[];
  setMessages: Dispatch<SetStateAction<FrontendMessage[]>>;
  loading: boolean;
  sendMessage: (
    input: string,
    allMessages: FrontendMessage[],
    setMessages: Dispatch<SetStateAction<FrontendMessage[]>>
  ) => Promise<void>;
}) => {
  const handleClick = (message: string) => {
    if (loading) return;
    sendMessage(message, allMessages, setMessages);
  };

  return (
    <div
      className={`w-full flex justify-center ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* DESKTOP (md and up) */}
      <div className="hidden md:flex justify-center items-center gap-6 text-xs font-semibold w-full">
        <div
          onClick={() => handleClick("Show me the latest deals")}
          className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          🔥 New Deals
        </div>

        <div
          onClick={() => handleClick("I want to see my orders")}
          className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          📦 Orders
        </div>

        <div
          onClick={() => handleClick("Show me my payment history")}
          className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          💳 Payments
        </div>

        <div
          onClick={() =>
            handleClick(
              "Can you tell me about yourself? What kind of assistant are you?"
            )
          }
          className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          💭 Other
        </div>
      </div>

      {/* MOBILE (< md) */}
      <div className="flex md:hidden justify-center items-center gap-4 text-xs font-semibold w-full">
        <div
          onClick={() => handleClick("Show me the latest deals")}
          className="bg-neutral-200 text-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          🔥 Deals
        </div>

        <div
          onClick={() => handleClick("I want to see my orders")}
          className="bg-neutral-200 text-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl"
        >
          📦 Orders
        </div>

        {/* other BOX */}
        <div
          onClick={() =>
            handleClick(
              "Can you tell me about yourself? What kind of assistant are you?"
            )
          }
          className="bg-neutral-300 text-black px-4 py-2 cursor-pointer rounded-xl"
        >
          ?
        </div>
      </div>
    </div>
  );
};
