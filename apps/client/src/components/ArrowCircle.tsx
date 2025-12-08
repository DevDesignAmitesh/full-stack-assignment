import { RiArrowRightLine } from "react-icons/ri";

export const ArrowCircle = () => {
  return (
    <span
      className="
        ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full
        bg-linear-to-r from-green-500 to-emerald-400
        text-white
        transition-all duration-200
        group-hover:translate-x-1
      "
    >
      <RiArrowRightLine size={14} />
    </span>
  );
};
