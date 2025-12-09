import { HTTP_URL, parseBotResponse } from "@/utils";
import { chatRole, FrontendMessage, paramsType } from "@repo/types/types";
import axios from "axios";
import { matchesGlob } from "path";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

export default function useSendMessage() {
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMessage(
    input: string,
    allMessages: FrontendMessage[],
    setMessages: Dispatch<SetStateAction<FrontendMessage[]>>
  ) {
    if (loading) return;
    try {
      setLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          text: input,
          id: uuid(),
          sender: "user",
          timestamp: new Date(),
        },
      ]);
      const res = await axios.post(
        `${HTTP_URL}/chat/talk`,
        {
          recentMessage: input,
          allMessages: allMessages.map((item) => {
            return {
              role: item.sender,
              message: item.text,
            };
          }),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const response = res?.data?.data;

      if (!response) {
        toast.error("unable to parse ai response");
        return;
      }

      if (res.status === 201) {
        console.log("this is the responfe from the ai", response)
        const parsed = parseBotResponse(JSON.stringify(response));

        if (!parsed) return;

        setMessages((prev) => [
          ...prev,
          ...parsed.map((item) => ({
            id: uuid(),
            sender: "assistant" as chatRole,
            text:
              typeof item.message === "string"
                ? item.message
                : JSON.stringify(item.message),
            relatedTo: item.relatedTo,
            timestamp: new Date(),
          })),
        ]);

        return;
      }

      toast.error(res?.data?.message ?? "Internal server error");

      return;
    } catch (error: any) {
      console.log("error in send message", error);
      toast.error(error?.response?.data?.message ?? "Internal server error");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }

  return { loading, sendMessage };
}
