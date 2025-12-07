import { HTTP_URL } from "@/utils";
import { FrontendMessage, paramsType } from "@repo/types/types";
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
        }
      );

      const response = res?.data?.data as {
        relatedTo: paramsType;
        message: string;
      } | null;

      if (!response) {
        toast.error("unable to parse ai response");
        return;
      }

      if (res.status === 201) {
        console.log("this is the response from the ai", response);
        setMessages((prev) => [
          ...prev,
          {
            text: JSON.stringify(response),
            id: uuid(),
            sender: "assistant",
            timestamp: new Date(),
          },
        ]);
        return;
      }
      toast.error(res?.data?.message ?? "Internal server error");
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
