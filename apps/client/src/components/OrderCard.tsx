import { Order } from "@repo/types/types";

export function OrderCard({ data }: { data: Order }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
        {/* Top: Order ID + Review status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <span className="text-white text-lg">📦</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Order ID
              </span>
              <span className="text-sm font-semibold text-neutral-800">
                #{data?.id?.slice(0, 7)}
              </span>
            </div>
          </div>

          <span className="px-4 py-1 rounded-full bg-purple-100 text-[11px] font-semibold text-purple-600">
            {data?.status}
          </span>
        </div>

        {/* Middle: Product details */}
        <div className="flex items-center gap-4 border-t border-neutral-100 pt-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-200">
            <img src={data.imgUrl} />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-800">
              Digital Alarm Wall Clock with Remote Control
            </p>
            <p className="text-[12px] text-neutral-500">
              Qty {data?.quantity}{" "}
              <span className="ml-2 font-semibold text-green-600">₹899</span>
            </p>
          </div>
        </div>

        {/* Bottom: Total + Paid status */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
          <div>
            <p className="text-[12px] text-neutral-500">Total Amount</p>
            <p className="text-lg font-semibold text-neutral-800">₹899.00</p>
          </div>

          <span className="px-5 py-1 rounded-full bg-green-50 text-[12px] font-semibold text-green-600">
            Paid
          </span>
        </div>
      </div>
    </div>
  );
}
