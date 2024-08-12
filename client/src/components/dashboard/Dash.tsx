import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiBookOpen,
  HiCash,
  HiCurrencyDollar,
  HiTruck,
  HiUser,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";
import { HiWindow } from "react-icons/hi2";

export default function Dash() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthProducts, setLastMonthProducts] = useState(0);
  const [lastMonthCategories, setLastMonthCategories] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  useEffect(() => {
    // Fetch all data needed for the
    const fetchUsers = async () => {
      // Fetch all users
      try {
        const res = await api.getUsers("", currentUser._id);
        console.log("Users", res.data.users);
        if (res.data.users) {
          setTotalUsers(res.data.total);
          setLastMonthUsers(res.data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      // Fetch all products
      try {
        const res = await api.getProductsList("");
        console.log("Products", res.data.products);
        if (res.data.products) {
          setTotalProducts(res.data.totalProducts);
          setLastMonthProducts(res.data.lastMonthProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      // Fetch all categories
      try {
        const res = await api.getListCategory("");
        console.log("Categories", res.data.categories);
        if (res.data.categories) {
          setTotalCategories(res.data.totalCategories);
          setLastMonthCategories(res.data.lastMonthCategories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOrders = async () => {
      // Fetch all orders
      try {
        const res = await api.getOrders(currentUser._id, "");
        console.log("Orders", res.data.orders);
        if (res.data.orders) {
          setTotalOrders(res.data.totalOrders);
          setLastMonthOrders(res.data.lastMonthOrders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    fetchCategories();
    fetchProducts();
    fetchUsers();
  }, [currentUser._id]);

  return (
    <div className="p-12 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-base text-neutral-500">
              Whole data about your business here
            </p>
          </div>
          <Button className="bg-[#3BB57F]">Create export</Button>
        </div>
        <div>
          <div className="mt-8">
            <div className="flex gap-4 bg-white rounded-md p-4 shadow-md">
              <div className="w-[50px] h-[50px] bg-[#D9F1E4] rounded-full flex items-center justify-center">
                <HiUser className="text-4xl text-[#3BB57F]" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">Users</h1>
                <p className="text-base text-neutral-500">
                  Total: {totalUsers} users
                </p>
                <p className="text-base text-neutral-500">
                  Last month: {lastMonthUsers} users
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-md p-4 shadow-md mt-4">
              <div className="w-[50px] h-[50px] bg-[#D9F1E4] rounded-full flex items-center justify-center">
                <HiCash className="text-4xl text-[#3BB57F]" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">Products</h1>
                <p className="text-base text-neutral-500">
                  Total: {totalProducts} products
                </p>
                <p className="text-base text-neutral-500">
                  Last month: {lastMonthProducts} products
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-md p-4 shadow-md mt-4">
              <div className="w-[50px] h-[50px] bg-[#D9F1E4] rounded-full flex items-center justify-center">
                <HiBookOpen className="text-4xl text-[#3BB57F]" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">Categories</h1>
                <p className="text-base text-neutral-500">
                  Total: {totalCategories} categories
                </p>
                <p className="text-base text-neutral-500">
                  Last month: {lastMonthCategories} categories
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-md p-4 shadow-md mt-4">
              <div className="w-[50px] h-[50px] bg-[#D9F1E4] rounded-full flex items-center justify-center">
                <HiTruck className="text-4xl text-[#3BB57F]" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">Orders</h1>
                <p className="text-base text-neutral-500">
                  Total: {totalOrders} orders
                </p>
                <p className="text-base text-neutral-500">
                  Last month: {lastMonthOrders} orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
