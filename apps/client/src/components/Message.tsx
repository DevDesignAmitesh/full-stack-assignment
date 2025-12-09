import { chatRole } from "@repo/types/types";

export const Message = ({
  role,
  message,
}: {
  role: chatRole;
  message: string;
}) => {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl shadow-sm
          ${isUser
            ? "bg-neutral-800 text-white rounded-br-sm"
            : "bg-white text-neutral-800 rounded-bl-sm"}
        `}
      >
        {message}
      </p>
    </div>
  );
};
