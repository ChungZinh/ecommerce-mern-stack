import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/dashboard/DashSideBar";
import DashSetting from "../components/dashboard/DashSetting";
import DashAddProduct from "../components/dashboard/DashAddProduct";
import DashCategories from "../components/dashboard/DashCategories";
import DashProductList from "../components/dashboard/DashProductList";
import DashEditProduct from "../components/dashboard/DashEditProduct";
import DashOrderList from "../components/dashboard/DashOrderList";
import DashOrderDetail from "../components/dashboard/DashOrderDetail";
import Dash from "../components/dashboard/Dash";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="md:w-72">
        <DashSideBar />
      </div>
      {/* SETTING */}
      {tab === "dashboard" && <Dash />}
      {tab === "setting" && <DashSetting />}
      {tab === "addProduct" && <DashAddProduct />}
      {tab === "categories" && <DashCategories />}
      {tab === "product-list" && <DashProductList />}
      {tab === "editProduct" && <DashEditProduct />}
      {tab === "order-list" && <DashOrderList />}
      {tab === "order-detail" && <DashOrderDetail />}
    </div>
  );
}
