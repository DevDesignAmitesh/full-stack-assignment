import { ChangeEvent, ReactElement } from "react";

export const InputBox = ({
  icon,
  placeholder,
  value,
  onChange,
  type,
}: {
  icon: ReactElement;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-2 bg-neutral-100 w-full rounded-full py-4 px-4">
      {icon}
      <input
        className="outline-none placeholder:text-neutral-700 text-neutral-700 w-full"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};
