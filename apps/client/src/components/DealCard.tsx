export function DealCard({ deal }: { deal: any }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <img
        src={deal.imgUrl}
        alt={deal.title}
        className="h-32 w-full object-cover rounded-md"
      />

      <div className="mt-2">
        <h3 className="font-semibold">{deal.title}</h3>
        <p className="text-sm text-neutral-600">{deal.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-green-600">₹{deal.price}</span>

          <button
            className="px-3 py-1 text-sm bg-green-600 text-white rounded-md"
            onClick={() => alert("Mock: Deal clicked")}
          >
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
}
