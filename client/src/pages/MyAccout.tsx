import { Breadcrumb, Sidebar, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiLogout,
  HiOutlineLocationMarker,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import { api } from "../api/api";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { formatCreatedAt } from "../utils/formatDate";
import { logoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function MyAccout() {
  const [tab, setTab] = useState<string>("orders");
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await api.logout(currentUser._id);
      console.log(res);
      if (res.message) {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto w-full">
      <div className="w-full bg-white">
        <div className="lg:max-w-screen-2xl mx-auto py-4 border-b">
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>My Accout</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="lg:max-w-screen-2xl mx-auto mt-12 lg:flex gap-6 shadow-md p-4 rounded-md bg-white">
        <div className="lg:w-1/3">
          <Sidebar className="w-full border-r border-neutral-200">
            <Sidebar.Items>
              <Sidebar.ItemGroup className="cursor-pointer">
                <Sidebar.Item active={tab === "orders"}>
                  <div className="flex items-center">
                    <HiOutlineShoppingBag className="mr-2 text-xl text-neutral-400" />
                    <p onClick={() => setTab("orders")}>Orders</p>
                  </div>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "cart"}>
                  <div className="flex items-center">
                    <HiOutlineShoppingBag className="mr-2 text-xl text-neutral-400" />
                    <p onClick={() => setTab("cart")}>Track Your Order</p>
                  </div>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "my-address"}>
                  <div className="flex items-center">
                    <HiOutlineLocationMarker className="mr-2 text-xl text-neutral-400" />
                    <p onClick={() => setTab("my-address")}>My Address</p>
                  </div>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "detail-account"}>
                  <div className="flex items-center">
                    <HiOutlineUser className="mr-2 text-2xl text-neutral-400" />
                    <p onClick={() => setTab("detail-account")}>
                      Account Details
                    </p>
                  </div>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "logout"}>
                  <div className="flex items-center">
                    <HiLogout className="mr-2 text-xl text-neutral-400" />
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="lg:w-2/3 md:mt-6">
          {tab === "orders" && <Orders />}
          {tab === "cart" && <TrackOrder />}
          {tab === "my-address" && <MyAddress />}
          {tab === "detail-account" && <AccountDetails />}
        </div>
      </div>
    </div>
  );
}

const Orders = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getOrdersByUser(currentUser._id);
        if (res.data) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [currentUser._id]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <div className="">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orders.map((order: any, index: number) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{formatCreatedAt(order.createdAt)}</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>
                    ${order.totalPrice} for {order.orderItems.length} items
                  </Table.Cell>
                  <Table.Cell>
                    <button className="btn btn-primary text-[#3BB67F]">
                      View
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

const TrackOrder = () => {
  return <div>Track Order</div>;
};

const MyAddress = () => {
  return <div>My Address</div>;
};

const AccountDetails = () => {
  return <Profile />;
};
