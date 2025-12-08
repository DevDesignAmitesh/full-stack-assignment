"use client";

import useSendMessage from "@/hooks/useSendMessages";
import { FrontendMessage } from "@repo/types/types";
import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { parseBotResponse } from "@/utils";
import { ResponseCards } from "./ResponseCards";
import { RiRobot2Line } from "react-icons/ri";

const MESSAGE_KEY = "all_message_key";

export default function ChatPage() {
  const { loading, sendMessage } = useSendMessage();

  const [messages, setMessages] = useState<FrontendMessage[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(MESSAGE_KEY);
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-screen w-full bg-black flex justify-center">
      {/* Phone container */}
      <div className="flex flex-col w-full max-w-xl h-full bg-neutral-50 border-x border-neutral-800">

        {/* Header */}
        <div className="h-14 flex items-center gap-3 px-4 border-b border-neutral-200 bg-white sticky top-0 z-10">
          <div className="h-9 w-9 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center">
            <RiRobot2Line size={20} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Mobo Deal Bot</span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg, idx) => {
            const parsed =
              msg.sender === "assistant"
                ? parseBotResponse(msg.text)
                : null;

            if (
              msg.sender === "assistant" &&
              parsed &&
              parsed.relatedTo &&
              Array.isArray(parsed.message)
            ) {
              return (
                <ResponseCards
                  key={idx}
                  type={parsed.relatedTo}
                  data={parsed.message}
                />
              );
            }

            const bubbleText =
              msg.sender === "assistant" &&
              parsed &&
              typeof parsed.message === "string"
                ? parsed.message
                : msg.text;

            return (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                  max-w-[80%] px-4 py-2 text-sm leading-relaxed
                  ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-neutral-200 text-neutral-800 rounded-2xl rounded-bl-sm"
                  }
                `}
                >
                  {bubbleText}
                </div>
              </div>
            );
          })}

          {/* Typing */}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center">
                <RiRobot2Line size={14} />
              </div>
              <div className="bg-white border border-neutral-200 px-4 py-2 rounded-xl flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-neutral-200 bg-white flex gap-2">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask for deals, orders, status..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!text.trim()) return;
                sendMessage(text, messages, setMessages);
                setText("");
              }
            }}
            className="flex-1 resize-none rounded-xl px-4 py-3 text-sm border border-neutral-200 focus:ring-1 focus:ring-green-500 outline-none"
          />
          <button
            disabled={loading}
            onClick={() => {
              if (!text.trim()) return;
              sendMessage(text, messages, setMessages);
              setText("");
            }}
            className="h-11 w-11 rounded-xl bg-green-600 text-white flex items-center justify-center disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
