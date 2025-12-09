import { DealCard } from "@/components/DealCard";
import { OrderCard } from "@/components/OrderCard";
import { PaymentCard } from "@/components/PaymentCard";

export default function Home() {
  return (
    <div className="h-screen bg-neutral-100 w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-xl mx-auto flex flex-col gap-8 justify-center items-center">
        <OrderCard />
      </div>
    </div>
  );
}

