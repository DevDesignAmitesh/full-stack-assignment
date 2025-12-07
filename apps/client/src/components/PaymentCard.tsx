export function PaymentCard({ payment }: { payment: any }) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm flex justify-between">
      <div>
        <p className="font-medium">Amount: {payment.amount}</p>
        <p className="text-sm text-neutral-500">Status: {payment.status}</p>
      </div>

      <button
        className="text-sm px-3 py-1 rounded-md border"
        onClick={() => alert("Mock: View receipt")}
      >
        Receipt
      </button>
    </div>
  );
}
