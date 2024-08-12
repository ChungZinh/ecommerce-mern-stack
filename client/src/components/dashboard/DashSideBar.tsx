import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiChartBar,
  HiChartPie,
  HiCog,
  HiCurrencyDollar,
  HiFolderAdd,
  HiShoppingBag,
  HiShoppingCart,
  HiTag,
  HiUser,
  HiViewGridAdd,
} from "react-icons/hi";
import { HiWallet } from "react-icons/hi2";
import { MdComment, MdStars } from "react-icons/md";

export default function DashSideBar() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  // const handleLogout = async () => {
  //   await logout(dispatch, currentUser);
  // };
  return (
    <Sidebar className="w-full border-r bg-white border-neutral-200">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item active={tab === "dashboard"} icon={HiChartPie}>
            <Link to={"/dashboard?tab=dashboard"}>Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="Products">
            <Sidebar.Item href="#" active={tab === "product-list"}>
              <Link to={"/dashboard?tab=product-list"}>Product List</Link>
            </Sidebar.Item>
            <Sidebar.Item href="#">Product Gird</Sidebar.Item>
            <Sidebar.Item href="#" active={tab === "categories"}>
              <Link to={"/dashboard?tab=categories"}>Categories</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiShoppingCart} label="Orders">
            <Sidebar.Item active={tab === "order-list"}>
              <Link to={"/dashboard?tab=order-list"}>Order list 1</Link>
            </Sidebar.Item>
            <Sidebar.Item href="#">Order list 2</Sidebar.Item>
            <Sidebar.Item active={tab === "order-detail"}>
              <Link to={"/dashboard?tab=order-detail"}>Order Detail</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiWallet} label="Sellers">
            <Sidebar.Item href="#">Sellers cards</Sidebar.Item>
            <Sidebar.Item href="#">Sellers list</Sidebar.Item>
            <Sidebar.Item href="#">Sellers profile</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item active={tab === "addProduct"} icon={HiViewGridAdd}>
            <Link to={"/dashboard?tab=addProduct"}>Add Product</Link>
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiCurrencyDollar} label="Transactions">
            <Sidebar.Item href="#">Transaction 1</Sidebar.Item>
            <Sidebar.Item href="#">Transaction 2</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiUser} label="Account">
            <Sidebar.Item href="#">Account list 1</Sidebar.Item>
            <Sidebar.Item href="#">Account list 1</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item active={tab === "review"} icon={MdComment}>
            <Link to={"/dashboard?tab=review"}>Reviews</Link>
          </Sidebar.Item>
          <Sidebar.Item active={tab === "brand"} icon={MdStars}>
            <Link to={"/dashboard?tab=brand"}>Brands</Link>
          </Sidebar.Item>
          <Sidebar.Item active={tab === "stactistic"} icon={HiChartBar}>
            <Link to={"/dashboard?tab=stactistic"}>Stactistics</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse icon={HiCog} label="Settings">
            <Sidebar.Item active={tab === "setting"}>
              <Link to={"/dashboard?tab=setting"}>Setting sample 1</Link>
            </Sidebar.Item>
            <Sidebar.Item active={tab === "setting"}>
              <Link to={"/dashboard?tab=setting"}>Setting sample 2</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item active={tab === "stactistic"} icon={HiTag}>
            <Link to={"/dashboard?tab=stactistic"}>Starter Page</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
