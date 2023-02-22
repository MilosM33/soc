import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { OrderApi } from "../../Api/Order/OrderApi";
import { Product } from "../../Api/Product/Product";
import Button from "../../Components/Forms/Button/Button";
import IconButton from "../../Components/Forms/IconButton/IconButton";
import SearchInput from "../../Components/Forms/SearchInput/SearchInput";
import Select from "../../Components/Forms/Select/Select";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import Modal from "../../Components/Modal/Modal";
import AdminEditOrders from "./AdminEditOrders";

export default function AdminOrders() {
  const [search, setSearch] = useState({
    id: "",
    status: "",
    total_price: "",
    created_at: "",
    page: 1,
    show: 10,
  });

  const [data, setData] = useState<any>({
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  function onSearch(newSearch: any) {
    setSearch(newSearch);
    setLoading(true);
    setData({
      data: [],
    });

    OrderApi.searchOrders(newSearch).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    OrderApi.searchOrders(search).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <section>
      {selectedRow != null && (
        <AdminEditOrders
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          onSearch={onSearch}
          search={search}
        ></AdminEditOrders>
      )}
      <table>
        <thead>
          <tr>
            <th>
              <TextInput
                placeholder="Order id"
                onChange={(e) => onSearch({ ...search, id: e.target.value })}
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Status"
                onChange={(e) =>
                  onSearch({ ...search, status: e.target.value })
                }
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Total price"
                onChange={(e) =>
                  onSearch({ ...search, total_price: e.target.value })
                }
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Created at"
                onChange={(e) =>
                  onSearch({ ...search, created_at: e.target.value })
                }
              ></TextInput>
            </th>
          </tr>
          <tr>
            <th>Order id</th>
            <th>Status</th>
            <th>Total price</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array(10)
              .fill(0)
              .map((_, i) => (
                <tr className="odd:bg-blue-100 animate-pulse">
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                </tr>
              ))}

          {data.data.length !== 0 &&
            data.data.map((order: any) => (
              <tr
                className=" odd:bg-blue-100 cursor-pointer"
                onContextMenu={(e: any) => {
                  e.preventDefault();
                  setSelectedRow(order);
                }}
              >
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.total_price} €</td>
                <td className="p-2">
                  {new Date(order.created_at).toLocaleDateString("sk-sk")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="my-2">
        Page {search.page} of {data.last_page} Go to page:
        <ValueIncrement
          value={search.page}
          onChange={(value: number) => {
            if (value < 1) {
              value = 1;
            }
            if (value > data.last_page) {
              value = data.last_page;
            }
            onSearch({ ...search, page: value });
          }}
        ></ValueIncrement>
      </div>
      <div className="my-3">
        Show:{" "}
        <ValueIncrement
          value={search.show}
          onChange={(value: number) => {
            if (value < 1) {
              value = 1;
            }
            onSearch({ ...search, show: value });
          }}
        ></ValueIncrement>
      </div>
    </section>
  );
}
