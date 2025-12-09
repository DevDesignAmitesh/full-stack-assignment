export const MenuComponent = () => {
  return (
    <div className="flex justify-center items-center gap-6 text-xs font-semibold w-full">
      <div className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl flex justify-center items-center gap-2">
        🔥 New Deals
      </div>
      <div className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl flex justify-center items-center gap-2">
        📦 Orders
      </div>
      <div className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl flex justify-center items-center gap-2">
        💳 Payments
      </div>
      <div className="bg-neutral-200 text-black p-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-500 rounded-xl flex justify-center items-center gap-2">
        💭 Other
      </div>
    </div>
  );
};
