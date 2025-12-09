"use client";

import { Card } from "@/components/Card";
import { MenuComponent } from "@/components/MenuComponent";
import { Message } from "@/components/Message";
import { OrderCard } from "@/components/OrderCard";
import { PaymentCard } from "@/components/PaymentCard";
import { TextArea } from "@/components/TextArea";
import useSendMessage from "@/hooks/useSendMessages";
import { Deal, FrontendMessage, Order, Payment } from "@repo/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDelete, MdOutlineHistory } from "react-icons/md";
import { v4 as uuid } from "uuid";

const MESSAGE_KEY = "all_message_key";

export default function Chat() {
  const { loading, sendMessage } = useSendMessage();
  const [text, setText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) {
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);

  const [messages, setMessages] = useState<FrontendMessage[]>([
    {
      id: uuid(),
      sender: "assistant",
      text: `Hey there! ${userName ? userName + " " : ""}👋 I'm your personal AI assistant. 
      Are you ready to explore Deals, Orders, or Payments? 😊`,
      timestamp: new Date(),
      relatedTo: null,
    },
  ]);

  const getMessages = () => {
    try {
      const stored = localStorage.getItem(MESSAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }

      // If no stored messages, keep initial greeting
    } catch (err) {
      console.error("Error reading messages", err);
    }
  };

  const savingMessages = () => {
    try {
      localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error("Error saving messages", err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    savingMessages();
  }, [messages]);

  return (
    <div className="w-full h-screen bg-neutral-100">
      <div className="relative w-full h-full max-w-xl mx-auto border-x-2 border-neutral-300 flex flex-col">
        {/* header */}
        <div className="px-4 py-6 bg-white absolute top-0 w-full flex justify-between items-center z-10">
          <Link
            href={"/signin"}
            className="bg-neutral-100 text-neutral-800 rounded-full flex justify-center items-center p-2"
          >
            <IoIosArrowRoundBack size={25} />
          </Link>

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4cf932]" />
              <p className="font-semibold">Your Personal Bot</p>
            </div>
            <p className="text-neutral-400 text-xs font-semibold">online</p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div
              onClick={() => {
                localStorage.removeItem(MESSAGE_KEY);
                setMessages([
                  {
                    id: uuid(),
                    sender: "assistant",
                    text: `Hey there! ${userName ? userName + " " : ""}👋 I'm your personal AI assistant. Are you ready to explore Deals, Orders, or Payments? 😊`,
                    timestamp: new Date(),
                    relatedTo: null,
                  },
                ]);
              }}
              className="bg-neutral-100 text-red-400 rounded-full flex justify-center items-center p-2"
            >
              <MdDelete size={25} />
            </div>
            <div className="bg-neutral-100 text-neutral-800 rounded-full flex justify-center items-center p-2">
              <MdOutlineHistory size={25} />
            </div>
          </div>
        </div>

        {/* CHAT / TEXT AREA */}
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="flex-1 overflow-y-auto px-6 pt-28 pb-44 space-y-4"
        >
          {messages.map((msg) => {
            if (msg.relatedTo === "orders") {
              const orders = JSON.parse(msg?.text ?? "[]") ?? [];

              return (
                <div
                  style={{
                    scrollbarWidth: "none",
                  }}
                  className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2"
                >
                  {orders.map((ord: Order) => (
                    <div key={ord.id} className="inline-block">
                      <OrderCard data={ord} />
                    </div>
                  ))}
                </div>
              );
            }

            if (msg.relatedTo === "payments") {
              const payments = JSON.parse(msg?.text ?? "[]") ?? [];

              return (
                <div
                  style={{
                    scrollbarWidth: "none",
                  }}
                  className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2"
                >
                  {payments.map((pms: Payment) => (
                    <div key={pms.id} className="inline-block">
                      <PaymentCard data={pms} />
                    </div>
                  ))}
                </div>
              );
            }

            if (msg.relatedTo === "deals") {
              const deals = JSON.parse(msg?.text ?? "[]") ?? [];

              return (
                <div
                  style={{
                    scrollbarWidth: "none",
                  }}
                  className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2"
                >
                  {deals.map((dls: Deal) => (
                    <div key={dls.id} className="inline-block">
                      <Card data={dls} />
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <Message key={msg.id} role={msg.sender} message={msg.text} />
            );
          })}
        </div>

        {/* text area */}
        <div className="w-full bg-neutral-50 absolute bottom-0 py-6 px-8 flex flex-col justify-center items-center gap-4">
          <MenuComponent />
          <div className="w-full px-16">
            <TextArea
              value={text}
              onChange={setText}
              sendMessage={sendMessage}
              allMessages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
