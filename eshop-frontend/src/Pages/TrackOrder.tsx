import { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCheck,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { OrderApi } from "../Api/Order/OrderApi";
import Button from "../Components/Forms/Button/Button";
import TextInput from "../Components/Forms/TextInput/TextInput";
import PreviousOrders from "../Components/PreviousOrders/PreviousOrders";
import StatusBar from "../Components/StatusBar/StatusBar";
import Layout from "../Layout/Layout";

export default function TrackOrder() {
  const [steps, setSteps] = useState([
    {
      children: <AiOutlineShoppingCart></AiOutlineShoppingCart>,
      step: 0,
      completed: true,
      canClick: () => false,
      label: "Order Placed",
    },
    {
      children: <AiOutlineCheck></AiOutlineCheck>,
      step: 1,
      completed: false,
      canClick: () => false,
      label: "Order Confirmed",
    },
    {
      children: <CiDeliveryTruck></CiDeliveryTruck>,
      step: 2,
      completed: false,
      canClick: () => false,
      label: "Order Shipped",
    },
  ]);

  const params = useParams();

  const [orderStatus, setOrderStatus] = useState<any>();
  const [orderNumber, setOrderNumber] = useState(params.orderNumber ?? "");

  function trackOrder() {
    OrderApi.trackOrder(orderNumber)
      .then((res) => {
        setOrderStatus(res.data);

        setSteps((prev) => {
          return prev.map((item) => {
            return { ...item, completed: item.step <= res.data.order.steps };
          });
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Order not found");
        } else {
          toast.error("Error while tracking order, Please try again later");
        }
        setOrderStatus(null);
      });
  }
  function handleOrderNumberChange(e: any) {
    setOrderNumber(e.target.value);
  }

  useEffect(() => {
    if (params.orderNumber) {
      setOrderNumber(orderNumber);
      trackOrder();
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto h-full">
        <div className="text-center w-full md:w-2/3  mx-auto">
          <h1 className="text-3xl ">Track your order</h1>
          <p className="my-2 text-gray-400">Please enter your order number.</p>
          <div className="flex justify-center items-center gap-3">
            <TextInput onChange={handleOrderNumberChange}></TextInput>
            <Button onClick={trackOrder}>Track</Button>
          </div>
          {orderStatus && (
            <div className="my-16">
              <h1 className="text-center text-2xl my-4">
                Order #{" "}
                <span className="text-red-400">
                  {orderStatus.order.orderNumber}
                </span>
              </h1>
              <StatusBar
                steps={steps}
                step={orderStatus.order.steps}
                className={"lg:w-2/3"}
              ></StatusBar>
              <div className="relative mt-16 w-1/2 mx-auto">
                <div>
                  {orderStatus.timeline.map((item: any) => (
                    <div className="my-5">
                      <h3 className="text-lg">
                        <div className="flex justify-between">
                          <span>{item.info}</span>
                          <span className="text-gray-400">
                            {new Date(
                              Date.parse(item.created_at)
                            ).toLocaleString("sk-SK")}
                          </span>
                        </div>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl my-3">Previous orders</h1>
        <PreviousOrders></PreviousOrders>
      </div>
    </Layout>
  );
}
