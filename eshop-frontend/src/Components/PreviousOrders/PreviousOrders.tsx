import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderApi } from "../../Api/Order/OrderApi";
import NavLink from "../Navigation/NavLink/NavLink";
import Skeleton from "../Skeleton/Skeleton";

export default function PreviousOrders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state: any) => state.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user.isAuth) {
      OrderApi.getOrders()
        .then((res) => {
          setOrders(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {});
    }
  }, [user.isAuth]);

  if (!user.isAuth) {
    return null;
  }

  return (
    <div>
      {!isLoaded && (
        <div className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton></Skeleton>
            ))}
        </div>
      )}
      {isLoaded && (
        <table className="table-auto min-w-full ">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>Order Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="text-center">
                <td className="text-red-400 underline ">
                  <NavLink to={`/orders/${order.id}`}>{order.id}</NavLink>
                </td>
                <td>{new Date(order.created_at).toLocaleString("sk-sk")}</td>
                <td>{order.total_price} €</td>
                <td>{order.status}</td>
                <td>
                  <a
                    href={`http://everydayessentials.tech:8000/api/invoice/${order.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-400 underline "
                  >
                    Invoice
                  </a>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  <h1 className="text-2xl my-3">No orders found</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
