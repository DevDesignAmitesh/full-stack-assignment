import { IoPaperPlaneOutline } from "react-icons/io5";

export const TextArea = () => {
  return (
    <div className="bg-white px-4 py-2 rounded-full w-[70%] flex justify-center items-center">
      <textarea
        rows={1}
        className="placeholder:text-neutral-400 text-neutral-700 outline-none resize-none w-full"
        placeholder="Message here..."
      />
      <div className="bg-neutral-800 text-neutral-100 rounded-full p-3">
        <IoPaperPlaneOutline size={20} />
      </div>
    </div>
  );
};
