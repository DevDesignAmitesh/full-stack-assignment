export function OrderCard({ order }: { order: any }) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm flex gap-3">
      <img src={order.imgUrl} className="h-16 w-16 rounded-md object-cover" />

      <div className="flex-1">
        <h4 className="font-medium">{order.productName}</h4>
        <p className="text-sm text-neutral-500">Status: {order.status}</p>

        <button
          className="mt-2 text-sm underline text-blue-600"
          onClick={() => alert("Mock: Track order")}
        >
          Track Order
        </button>
      </div>
    </div>
  );
}
