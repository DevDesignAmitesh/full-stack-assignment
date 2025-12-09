import { FrontendMessage } from "@repo/types/types";
import { Dispatch, SetStateAction } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

interface TextAreaProps {
  value: string;
  loading: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  allMessages: FrontendMessage[];
  setMessages: Dispatch<SetStateAction<FrontendMessage[]>>;
  sendMessage: (
    input: string,
    allMessages: FrontendMessage[],
    setMessages: Dispatch<SetStateAction<FrontendMessage[]>>
  ) => Promise<void>;
}

export const TextArea = ({
  value,
  loading,
  onChange,
  sendMessage,
  allMessages,
  setMessages,
}: TextAreaProps) => {
  const handleSend = () => {
    if (!value.trim()) return;
    sendMessage(value, allMessages, setMessages);
    onChange("");
  };

  return (
    <div className="bg-white px-4 py-2 rounded-full w-full flex justify-center items-center shadow border border-neutral-300">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={1}
        className="placeholder:text-neutral-500 text-neutral-800 outline-none resize-none w-full"
        placeholder="Message here..."
      />
      <button
        disabled={loading}
        onClick={handleSend}
        className="bg-neutral-800 text-neutral-100 rounded-full p-3"
      >
        <IoPaperPlaneOutline size={20} />
      </button>
    </div>
  );
};
