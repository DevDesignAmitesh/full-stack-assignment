"use client";

import useSendMessage from "@/hooks/useSendMessages";
import { FrontendMessage, paramsType } from "@repo/types/types";
import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { parseBotResponse } from "@/utils";
import { ResponseCards } from "./ResponseCards";

const MESSAGE_KEY = "all_message_key";

export default function ChatPage() {
  const { loading, sendMessage } = useSendMessage();

  const [messages, setMessages] = useState<FrontendMessage[]>(
    JSON.parse(localStorage.getItem(MESSAGE_KEY) ?? "[]")
  );
  const [text, setText] = useState<string>("");

  const getMessages = () => {
    try {
      const stringifyMessages = localStorage.getItem(MESSAGE_KEY);
      const parsedMessage = JSON.parse(stringifyMessages ?? "[]");

      setMessages(parsedMessage);
    } catch (error) {
      console.log("error in getMessage ", error);
    } finally {
    }
  };

  const savingMessages = () => {
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
  };

  useEffect(() => {
    savingMessages();
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border-x border-neutral-300">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none bg-neutral-50">
        {loading && messages.length === 0 ? (
          <p className="text-center text-neutral-500">Fetching chats...</p>
        ) : (
          messages.map((msg, idx) => {
            const parsed =
              msg.sender === "assistant" ? parseBotResponse(msg.text) : null;

            // Assistant → cards
            if (
              msg.sender === "assistant" &&
              parsed &&
              parsed.relatedTo &&
              Array.isArray(parsed.message)
            ) {
              return (
                <div key={idx} className="flex justify-start">
                  <ResponseCards
                    type={parsed.relatedTo}
                    data={parsed.message}
                  />
                </div>
              );
            }

            // Decide bubble content
            const bubbleText =
              msg.sender === "assistant" &&
              parsed &&
              typeof parsed.message === "string"
                ? parsed.message
                : msg.text;

            // Normal chat bubble
            return (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg text-sm whitespace-pre-wrap
                ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-neutral-200 text-neutral-900 rounded-bl-none"
                }
              `}
                >
                  {bubbleText}
                </div>
              </div>
            );
          })
        )}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start mt-1">
            <div className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                <span
                  className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></span>
                <span
                  className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></span>
              </span>
              Bot is typing…
            </div>
          </div>
        )}
        <style jsx>{`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-neutral-300 bg-white flex gap-3">
        <textarea
          placeholder="Write your message..."
          className="flex-1 p-3 rounded-lg border border-neutral-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none resize-none"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!text.trim()) return;
              sendMessage(text, messages, setMessages);
              setText("");
            }
          }}
        />

        <button
          disabled={loading}
          onClick={() => {
            if (!text.trim()) return;
            sendMessage(text, messages, setMessages);
            setText("");
          }}
          className="bg-green-600 text-white p-3 rounded-lg disabled:opacity-50 flex items-center"
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
        </button>
      </div>
    </div>
  );
}
