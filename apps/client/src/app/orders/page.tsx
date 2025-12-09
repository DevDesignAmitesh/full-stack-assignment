"use client";

import { OrderCard } from "@/components/OrderCard";
import { Order } from "@repo/types/types";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";

const DATA: Order[] = [
  {
    id: "1f56ef13-4ab1-4f97-8238-c67618a4c6a6",
    productName: "Office Chair",
    imgUrl:
      "https://images.pexels.com/photos/1447261/pexels-photo-1447261.jpeg",
    quantity: "1",
    status: "PENDING",
  },
  {
    id: "48d358e2-f6dc-49d9-9893-90bc71961b57",
    productName: "Smart Watch",
    imgUrl:
      "https://images.pexels.com/photos/8311884/pexels-photo-8311884.jpeg",
    quantity: "1",
    status: "REJECTED",
  },
];

export default function Orders() {
  const [loading, setLoading] = useState(true);

  // ✅ Fake loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-neutral-100">
      <div className="relative w-full h-full max-w-xl mx-auto border-x-2 border-neutral-300 flex flex-col">
        {/* header */}
        <div className="px-4 py-6 bg-white absolute top-0 w-full flex items-center z-10">
          <Link
            href={"/chat"}
            className="bg-neutral-100 text-neutral-800 rounded-full flex justify-center items-center p-2"
          >
            <IoIosArrowRoundBack size={25} />
          </Link>

          <p className="font-semibold absolute left-1/2 -translate-x-1/2">
            Orders History
          </p>
        </div>

        {/* ✅ CONTENT AREA */}
        <div className="pt-28 px-4 flex flex-col gap-4">
          {loading ? (
            // ✅ Fake loading spinner
            <div className="flex justify-center items-center py-20">
              <div className="h-6 w-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            DATA.map((ord) => <OrderCard key={ord.id} data={ord} />)
          )}
        </div>
      </div>
    </div>
  );
}
