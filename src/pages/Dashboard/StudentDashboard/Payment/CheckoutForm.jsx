import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useGetEnrollmentsQuery } from "../../../../Redux/features/api/enrollmentsApi";
import {
  usePostPaymentIntentMutation,
  usePostPaymentsMutation,
} from "../../../../Redux/features/api/paymentApi";
import Loading from "../../../../components/Loading/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CheckoutForm = ({ id }) => {
  // States
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Stripe states
  const stripe = useStripe();
  const elements = useElements();

  // Rtk query states
  const [postPaymentIntent] = usePostPaymentIntentMutation();
  const [postPayments] = usePostPaymentsMutation();
  const { data, isLoading, isError, error } = useGetEnrollmentsQuery();

  // handle error
  if (isError) {
    // showing an alert
    toast.error(error);
  }

  // finding the course data
  const enrollmentDetails = data.find((enrollment) => enrollment._id === id);

  // collecting the course price and sending it to the server
  useEffect(() => {
    if (!enrollmentDetails) return;

    const fetchClientSecret = async () => {
      try {
        const result = await postPaymentIntent({
          price: enrollmentDetails.coursePrice,
        }).unwrap();
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error("Error in fetching clientSecret:", error);
        setClientSecret("");

        // showing an alert
        toast.error(error);
      }
    };

    fetchClientSecret();
  }, [enrollmentDetails, postPaymentIntent]);

  // handle loading
  if (isLoading) {
    return <Loading />;
  }

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Start processing state
    setIsProcessing(true);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setPaymentError(error.message);
      setIsProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentError("");
    }

    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: enrollmentDetails.userName,
            email: enrollmentDetails.userEmail,
          },
        },
      });

    if (confirmError) {
      console.log("Error when confirming payment: ", confirmError);
      setIsProcessing(false);
    } else {
      // console.log("payment Intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // seving data in the payment server
        const paymentInfo = {
          enrollmentId: enrollmentDetails._id,
          courseId: enrollmentDetails.courseId,
          courseTitle: enrollmentDetails.courseTitle,
          courseTeacherName: enrollmentDetails.courseTeacherName,
          coursePrice: enrollmentDetails.coursePrice,
          userEmail: enrollmentDetails.userEmail,
          transectionId: paymentIntent.id,
        };
        postPayments(paymentInfo)
          .unwrap()
          .then(() => {
            // navigating the user and showing a success alret
            navigate("/dashboard/studentEnrollments");

            // showing an alert
            toast.success("Payment Successfull");
          })
          .catch((error) => {
            console.log("Error when saving the payment data: ", error);

            // showing an alert
            toast.error(error);
          })
          .finally(() => {
            setIsProcessing(false);
          });
      }
    }
  };
  return (
    <div className="container mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="w-full rounded-md p-2"
          options={{
            style: {
              base: {
                fontSize: "1rem", // Responsive font size
                color: "black",
                "::placeholder": {
                  color: "gray",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
          className="btn my-5 w-full bg-gradient-to-r from-purple-500 to-orange-500 py-2 text-lg"
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
        <a href="https://docs.stripe.com/testing" target="_blank">
          <button
            type="button"
            className="btn w-full bg-gradient-to-r from-orange-500 to-purple-500 py-2 text-lg"
          >
            Test Cards
          </button>
        </a>
        {paymentError && (
          <p className="mt-4 text-sm font-bold text-red-500 sm:text-base md:text-lg">
            {paymentError}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
