import { chatRole } from "@repo/types/types";

export const Message = ({ role }: { role: chatRole }) => {
  return (
    <p
      className={`p-4 rounded-xl ${role === "user" ? "rounded-br-none bg-neutral-800 text-neutral-100" : "rounded-bl-none text-neutral-800 bg-neutral-100"}`}
    >
      hello this is the test by the ai
    </p>
  );
};
