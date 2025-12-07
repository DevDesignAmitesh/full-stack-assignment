import { paramsType } from "@repo/types/types";
import { PaymentCard } from "./PaymentCard";
import { OrderCard } from "./OrderCard";
import { DealCard } from "./DealCard";

interface ResponseCardsProps {
  type: paramsType;
  data: any[];
}

export function ResponseCards({ type, data }: ResponseCardsProps) {
  if (type === "deals") {
    return (
      <div className="grid gap-3 max-w-[90%]">
        {data.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    );
  }

  if (type === "orders") {
    return (
      <div className="grid gap-3 max-w-[90%]">
        {data.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    );
  }

  if (type === "payments") {
    return (
      <div className="grid gap-3 max-w-[90%]">
        {data.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    );
  }

  return null;
}
