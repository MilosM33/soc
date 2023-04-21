import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { Product } from "../../Api/Product/Product";
import Button from "../../Components/Forms/Button/Button";
import IconButton from "../../Components/Forms/IconButton/IconButton";
import SearchInput from "../../Components/Forms/SearchInput/SearchInput";
import Select from "../../Components/Forms/Select/Select";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import Modal from "../../Components/Modal/Modal";

export default function AdminEditOrders({
  setSelectedRow,
  selectedRow,
  onSearch,
  search,
}: any) {
  const [orderItems, setOrderItems] = useState<any>([]);
  const [orderStatus, setOrderStatus] = useState<any>(selectedRow.status);

  useEffect(() => {
    Product.getItemsFromOrder(selectedRow.id).then((res) => {
      setOrderItems(res.data);
    });
  }, []);

  function addItem() {
    setOrderItems([
      ...orderItems,
      {
        name: "",
        variant_name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  }
  function updateOrder() {
    Product.updateOrder({
      order_id: selectedRow.id,
      status: orderStatus,
      items: orderItems,
    }).then((res: any) => {
      setSelectedRow(null);
      toast.success("Order updated");
      onSearch(search);
    });
  }
  function removeItem(variant_name: any) {
    Product.removeItemFromOrder({
      order_id: selectedRow.id,
      variant_name,
    }).then((res: any) => {
      setOrderItems(
        orderItems.filter((item: any) => item.variant_name != variant_name)
      );
      onSearch(search);

      toast.success("Item removed");
    });
  }

  return (
    <Modal
      isOpen={true}
      title={"Edit order"}
      onClose={() => {
        setSelectedRow(null);
      }}
    >
      <div className="w-72">
        <Select
          options={["pending", "processing", "shipped"]}
          selected={orderStatus}
          onChange={(e: any) => setOrderStatus(e.target.value)}
        ></Select>
        <h1>Products</h1>
        <section>
          <div
            style={{ maxHeight: 350 }}
            className=" overflow-y-auto space-y-5"
          >
            {orderItems &&
              orderItems.map((item: any, index: number) => (
                <div>
                  <SearchInput
                    icon={<AiOutlineShoppingCart></AiOutlineShoppingCart>}
                    placeholder="Search products"
                    getData={Product.searchProducts}
                    value={item.name}
                    key={index}
                    onChange={(value: any) => {
                      console.log(index);
                      let newArr = [...orderItems];
                      newArr[index].name = value.title;

                      setOrderItems(newArr);
                    }}
                  ></SearchInput>
                  <div className="my-2">
                    <SearchInput
                      icon={<AiOutlineShoppingCart></AiOutlineShoppingCart>}
                      placeholder="Search variants"
                      titleProperty="name"
                      value={item.variant_name}
                      getData={(search: string) =>
                        Product.searchVariants(search, item.name)
                      }
                      key={index}
                      onChange={(value: any) => {
                        let newArr = [...orderItems];
                        newArr[index].variant_name = value.name;
                        newArr[index].variant_id = value.id;

                        setOrderItems(newArr);
                      }}
                    ></SearchInput>
                  </div>
                  <div className="w-32">
                    Quantity
                    <TextInput
                      fullWidth={false}
                      value={item.quantity}
                      key={index}
                      onChange={(e: any) => {
                        let newArr = [...orderItems];
                        newArr[index].quantity = e.target.value;

                        setOrderItems(newArr);
                      }}
                    ></TextInput>
                  </div>
                  <div className="w-32">
                    Price
                    <TextInput
                      fullWidth={false}
                      value={item.price}
                      key={index}
                      onChange={(e: any) => {
                        let newArr = [...orderItems];
                        newArr[index].price = e.target.value;

                        setOrderItems(newArr);
                      }}
                    ></TextInput>
                  </div>

                  <div>
                    Price for {item.quantity} items:{" "}
                    {item.price * item.quantity} €
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => removeItem(item.variant_name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

            {orderItems.length == 0 && <div>No items</div>}
          </div>
          <Button variant="secondary" onClick={addItem}>
            Add item
          </Button>
        </section>

        <Button variant="primary">
          <span className="text-white" onClick={updateOrder}>
            Update
          </span>
        </Button>
      </div>
    </Modal>
  );
}
