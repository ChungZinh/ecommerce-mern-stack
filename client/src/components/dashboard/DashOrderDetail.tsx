import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../api/api";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { HiCalendar } from "react-icons/hi2";
import { formatCreatedAt_v1 } from "../../utils/formatDate";
import { Button, Label, Select, Table, Textarea } from "flowbite-react";
import {
  HiCreditCard,
  HiLocationMarker,
  HiPrinter,
  HiTruck,
  HiUser,
} from "react-icons/hi";

export default function DashOrderDetail() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("id");
  const query = `?orderId=${orderId}`;
  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    // Fetch order details using the orderId
    const fetchOrder = async () => {
      try {
        const res = await api.getOrders(currentUser._id, query);
        if (res.data) {
          setOrder(res.data.orders[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  console.log("order", order);

  const date = formatCreatedAt_v1(order.createdAt);

  // Fetch and display the order details using the orderId
  return (
    <div className="p-12 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Order Detail</h1>
            <p className="text-base text-neutral-500">
              Details for Order ID: {orderId}
            </p>
          </div>
        </div>
        <div className="w-full mt-4 bg-white p-4 rounded-md shadow-md min-h-[800px] ">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <HiCalendar className="text-2xl text-primary-500" />
                <span className="ml-2">{date}</span>
              </div>
              <p className="text-neutral-400">Order ID: {orderId}</p>
            </div>
            <div className="flex items-center  gap-4">
              <Select value="Sort by">
                <option>Sort by</option>
                <option>Price</option>
                <option>Rating</option>
                <option>Popularity</option>
              </Select>
              <Button className="bg-[#3BB67F]">Save</Button>
              <Button className="bg-neutral-600">
                <HiPrinter className="text-xl" />
              </Button>
            </div>
          </div>

          <div className=" mt-4">
            <div className="*:text-sm flex justify-around">
              <div className="flex gap-4 ">
                <div className="rounded-full w-[40px] h-[40px] flex justify-center items-centers bg-[#D9F1E4]">
                  <HiUser className="text-3xl text-[#3BB67F] " />
                </div>
                <div className="">
                  <h1 className="text-base font-semibold">Customer</h1>
                  <>
                    {order.customer?.lastName + " " + order.customer?.firstName}
                  </>
                  <p>{order.customer?.email}</p>
                  <p>{order.customer?.mobile}</p>

                  <Link to={"#"}>
                    <p className="text-[#3BB67F]">View profile</p>
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full w-[40px] h-[40px] flex justify-center items-centers bg-[#D9F1E4]">
                  <HiTruck className="text-3xl text-[#3BB67F] " />
                </div>
                <div className="">
                  <h1 className="text-base font-semibold">Order Info</h1>
                  <p>Shipping: XTX Express</p>
                  <p>Pay method:{order.paymentMethod}</p>
                  <p>Status:{order.status}</p>
                  <Link to={"#"}>
                    <p className="text-[#3BB67F]">Download info</p>
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full w-[40px] h-[40px] flex justify-center items-centers bg-[#D9F1E4]">
                  <HiLocationMarker className="text-3xl text-[#3BB67F] " />
                </div>
                <div className="">
                  <h1 className="text-base font-semibold">Deliver To</h1>
                  <p>City: {order.shippingAddress?.city}</p>
                  <p>{order.shippingAddress?.address}</p>
                  <p>Country: {order.shippingAddress?.country}</p>
                  <Link to={"#"}>
                    <p className="text-[#3BB67F]">View profile</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-full mt-6 lg:flex lg:gap-6">
              <div className="lg:w-2/3 ">
                <div className="min-h-[400px] overflow-y-scroll">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Product</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Quantity</Table.HeadCell>
                      <Table.HeadCell>Total</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {order.orderItems?.map((item: any, index: number) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell className="flex items-center gap-2">
                              <img
                                src={item.cartItem.productId.image}
                                alt=""
                                className="w-12 h-12"
                              />
                              {item.cartItem.productId.name}
                            </Table.Cell>
                            <Table.Cell>
                              {item.cartItem.productId.prom_price}
                            </Table.Cell>
                            <Table.Cell>{item.cartItem.quantity}</Table.Cell>
                            <Table.Cell>
                              {item.cartItem.productId.prom_price *
                                item.cartItem.quantity}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
                <div className="flex flex-col *:text-sm *:font-semiboldi items-end gap-1 mt-4">
                  <p>Subtotal: ${order.totalPrice}</p>
                  <p>Shipping: ${10}</p>
                  <p>Total: ${order.totalPrice + 10}</p>
                  <p className="text-neutral-400">Status: {order.status}</p>
                </div>
              </div>
              <div className="lg:w-1/3 md:mt-6">
                <div className=" bg-[#F9F8FA] p-4 rounded-md shadow-md">
                  <h1 className="text-base font-semibold">Payment info</h1>

                  <p className="flex items-center gap-2">
                    <HiCreditCard className="text-3xl text-[#3BB67F] " />{" "}
                    {order.paymentMethod}
                  </p>
                  <p>Card: {order.paymentMethod}</p>
                  <p>Phone: {order.customer?.mobile}</p>
                </div>
                <div className="mt-4">
                  <Label>Order Note</Label>
                  <Textarea placeholder="Note" rows={5} />
                </div>

                <div className="mt-4">
                  <Button className="bg-[#3BB67F]">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
