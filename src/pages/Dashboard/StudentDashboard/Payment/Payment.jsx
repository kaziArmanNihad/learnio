import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";

const Payment = () => {
  // states
  const { id } = useParams();
  const stripePromise = loadStripe(import.meta.env.VITE_GETWAY_PK);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-1/2 w-4/5 space-y-5 rounded-xl bg-orange-500/10 p-5">
        <h1 className="p-2 text-center text-base font-bold md:text-2xl">
          Make Payment
        </h1>
        <div className="p-5">
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
