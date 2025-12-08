export function PaymentCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 flex flex-col gap-4">
        
        {/* Top Row: Review Submitted + Order Id */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-sm">📦</span>
            </div>
            <span className="text-sm font-semibold text-neutral-800">
              Review Submitted
            </span>
          </div>

          <span className="text-sm text-neutral-400 font-medium">
            #3513
          </span>
        </div>

        {/* Middle Row: Product */}
        <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
            {/* Product Image */}
            {/* <img src="/product.png" className="w-full h-full object-cover" /> */}
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-neutral-800 truncate max-w-[220px]">
              Digital Alarm Wall Clock with Remo...
            </p>
            <p className="text-sm text-neutral-500">
              Total: <span className="font-medium text-neutral-700">₹899</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-100" />

        {/* Bottom Row: Status + Action */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-700">
            Status:{" "}
            <span className="font-semibold text-green-600">
              Paid
            </span>
          </p>

          <button className="px-5 py-1.5 rounded-xl bg-black text-white text-sm font-semibold">
            View
          </button>
        </div>

      </div>
    </div>
  );
}
