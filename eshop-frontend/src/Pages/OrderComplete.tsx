import Layout from "../Layout/Layout";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../Reducers/Cart/CartReducer";
export default function OrderComplete() {
  const dispatch = useDispatch();

  useEffect(() => {
    toast.success("Order Complete", {
      toastId: "order-complete",
    });

    dispatch(clearCart());
  }, []);
  return (
    <Layout>
      <div className="container mx-auto text-center ">
        <h1 className="text-3xl text-center mb-2">Order Complete</h1>
        <section className="text-center">
          <p className="text-center">
            Thank you for your order. We will send you a confirmation email
            shortly.
          </p>
          <AiOutlineCheck className="text-6xl text-green-400 animate-fill mx-auto"></AiOutlineCheck>
        </section>
      </div>
    </Layout>
  );
}
