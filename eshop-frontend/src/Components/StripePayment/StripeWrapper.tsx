import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PaymentApi } from "../../Api/PaymentApi/PaymentApi";

export default function StripeWrapper() {
  const stripePromise = loadStripe(
    "pk_test_51LyGNUBdCoXZzWJAvbqGWGAgbCTcRF75y4pgkvjJoVUvWLMpagwYMUEdJwkVwuTnEI5zUBNsg00ZFg5P2Amcxs8m009g1EKM5r"
  );
  const clientSecret = useSelector((state: any) => state.checkout.clientSecret);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm />
    </Elements>
  );
}
