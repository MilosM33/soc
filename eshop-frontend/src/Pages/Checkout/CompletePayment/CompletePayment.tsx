import StripeWrapper from "../../../Components/StripePayment/StripeWrapper";
import Layout from "../../../Layout/Layout";

export default function CompletePayment() {
  return (
    <div className="container mt-5  ">
      <StripeWrapper></StripeWrapper>
    </div>
  );
}
