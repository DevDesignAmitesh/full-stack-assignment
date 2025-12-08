export function Card() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 flex flex-col gap-4">
        {/* Top: Image + Title */}
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
            {/* Replace with actual img */}
            {/* <img src="/product.png" alt="product" className="w-full h-full object-cover" /> */}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-neutral-800 leading-tight">
                TWS Wireless Earbus Bluetooth 5.3
              </h3>
              <span className="text-[10px] font-medium bg-neutral-100 px-2 py-0.5 rounded-full">
                Flipkart
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="text-neutral-700 font-medium">4.8</span>
            </div>

            <p className="text-green-600 font-semibold text-sm">
              PP ~ ₹499
            </p>
          </div>
        </div>

        {/* Middle info box */}
        <div className="bg-neutral-50 rounded-xl p-3 flex flex-col gap-2 text-sm text-neutral-700">
          <p className="font-medium">Flipkart Assured Deal</p>
          <p className="flex items-center gap-2">
            🎧 High Bass & Noise Cancellation
          </p>
          <p className="text-neutral-500 text-sm">
            For Rating Deal ONLY 👇
          </p>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-black text-white font-semibold py-3 rounded-full flex justify-center items-center gap-2"
        >
          ↗ GET LINK / DM
        </button>
      </div>
    </div>
  );
}
