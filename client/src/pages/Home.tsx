import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { api } from "../api/api";
import Slider from "@mui/material/Slider";
import { Button, Carousel, Checkbox } from "flowbite-react";
import slider1 from "../assets/images/slider_img/slider1.png";
import slider2 from "../assets/images/slider_img/slider2.png";
import banner1 from "../assets/images/deals_banner/banner1.png";
import banner2 from "../assets/images/deals_banner/banner2.png";
import banner3 from "../assets/images/deals_banner/banner3.png";
import banner4 from "../assets/images/deals_banner/banner4.png";
import banner5 from "../assets/images/deals_banner/banner5.png";
import banner6 from "../assets/images/deals_banner/banner6.png";
import banner7 from "../assets/images/deals_banner/banner7.png";
import {
  HiArrowRight,
  HiOutlineShoppingCart,
  HiShoppingCart,
  HiStar,
} from "react-icons/hi";
import CardDeal from "../components/CardDeal";
import CardProduct from "../components/CardProduct";
import { buildQueryString } from "../utils/buildQueryString";
import CardHotProduct from "../components/CardHotProduct";

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  description: string;
  image: string;
}
interface Product {
  name: string;
  stock: number;
  description: string;
  regu_price: number;
  prom_price: number;
  currency: string;
  tax: number;
  width: number;
  height: number;
  weight: number;
  shipping_fee: number;
  category: string;
  tag: string;
  image: string;
  isDraft: boolean;
  isPublished: boolean;
}
export default function Home() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState<number[]>([500, 1000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `$${value}`;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.getListCategory(query);
      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    };

    const fetchProducts = async () => {
      const queryB = buildQueryString(query);
      const res = await api.getProductsList(queryB);
      if (res.data.products) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [currentUser?._id, query]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery((prevQuery) => ({
        ...prevQuery,
        page: pageNumber,
      }));
    }
  };

  return (
    <div className="lg:max-w-screen-2xl  mx-auto md:w-full px-4">
      <div className="w-full flex gap-4 mt-4">
        <div className="w-1/5 space-y-6 md:hidden lg:inline sm:hidden ">
          {/* CATEGORY */}
          <div className="rounded-md shadow-md p-4 bg-white">
            <h1 className="py-2 border-b border-[#3BB67F] text-xl font-semibold">
              Categories
            </h1>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-neutral-50 "
                >
                  <img src={category.image} alt="image" className="w-5 h-5" />
                  <span className="text-sm text-neutral-600">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* CATEGORY */}

          {/* FILTER */}
          <div className="rounded-md shadow-md p-4 bg-white">
            <h1 className="py-2 border-b border-[#3BB67F] text-xl font-semibold">
              Fill by price
            </h1>
            <div className="">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="color-[#3BB67F]"
                size="small"
                min={0}
                max={5000}
                style={{ color: "#3BB67F" }}
              />
              <div className="flex items-center *:text-xs justify-between">
                <p className="text-xs" className="text-xs">
                  from: ${value[0]}
                </p>
                <p className="text-xs">to: ${value[1]}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm">Item Condition</p>
                <div className="flex flex-col gap-2 mt-2 *:text-sm">
                  <div className="space-x-1">
                    <Checkbox />
                    <span>New</span>
                  </div>
                  <div className="space-x-1">
                    <Checkbox />
                    <span>Used</span>
                  </div>
                  <div className="space-x-1">
                    <Checkbox />
                    <span>Refurbished</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* FILTER */}

          {/* NEW PRODUCTS */}
          <div className="rounded-md shadow-md p-4 bg-white">
            <h1 className="py-2 border-b border-[#3BB67F] text-xl font-semibold">
              New Products
            </h1>
            <div className="space-y-2 mt-2"></div>
          </div>
          {/* NEW PRODUCTS */}
        </div>

        <div className="w-4/5 md:w-full">
          <div className="w-full h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <div className="flex h-full items-center justify-center">
                <img src={slider1} alt="slider1" />
              </div>
              <div className="flex h-full items-center justify-center">
                <img src={slider2} alt="slider1" />
              </div>
            </Carousel>
          </div>
          <div className="flex  justify-between items-center">
            <h1 className="text-xl font-semibold mt-4">Popular Products</h1>
            <ul className="flex items-center gap-4">
              <li className="text-xs">All</li>

              {categories.map((category) => (
                <li key={category._id} className="text-xs">
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          {/* PRODUCTS */}
          <div className="">
            <div className="w-full mt-4 grid lg:grid-cols-5 md: grid-cols-4 gap-4">
              {products.map((product) => (
                <CardProduct key={product._id} product={product} />
              ))}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Button
                  size={"xs"}
                  color={"green"}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    size={"xs"}
                    color={"green"}
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      page === index + 1 ? "bg-green-600 text-white" : ""
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  size={"xs"}
                  color={"green"}
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}

          {/* DEALS OF THE DAY */}
          <div className=" mt-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Deals Of The Day</h1>
              <button className="flex items-center gap-2 *:hover:text-[#3BB67F] duration-200 *:text-sm *:text-neutral-400">
                <span>All Deals</span>
                <HiArrowRight />
              </button>
            </div>
            <div className="flex gap-4 mt-4 flex-wrap lg:justify-between md: justify-center ">
              <CardDeal image={banner1} time={10000000000} />
              <CardDeal image={banner2} time={12600000000} />
              <CardDeal image={banner3} time={340000000} />
              <CardDeal image={banner4} time={1000000000} />
            </div>
          </div>

          {/*  */}

          <div className="mt-6 lg:flex gap-4 md:flex md:justify-center">
            <div className="">
              <img src={banner5} alt="" />
            </div>
            <div className="">
              <img src={banner6} alt="" />
            </div>
            <div className="">
              <img src={banner7} alt="" />
            </div>
          </div>

          {/* SHOP BY CATEGORIES */}
          <div className=" mt-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Deals Of The Day</h1>
              <button className="flex items-center gap-2 *:hover:text-[#3BB67F] duration-200 *:text-sm *:text-neutral-400">
                <span>All Categories</span>
                <HiArrowRight />
              </button>
            </div>
            <div className="flex overflow-scroll scroll gap-4  mt-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex w-[130px] p-4 h-[150px] flex-col justify-center items-center rounded-md bg-neutral-300 shadow-md"
                >
                  <div className=" h-2/3 flex justify-center items-center">
                    <img
                      src={category.image}
                      alt="image"
                      className="w-[60px] "
                    />
                  </div>
                  <span className="text-sm text-center font-semibold text-neutral-600  h-1/3">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*  HOT */}
          <div className=" mt-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
              <div className="flex flex-col bg-white p-2 shadow-md rounded-md">
                <h1 className="text-base font-semibold border-b py-2 border-[#3BB67F]">
                  Top Selling
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {
                    // get 3 products from the top selling
                    products.slice(0, 3).map((product) => (
                      <CardHotProduct key={product._id} product={product} />
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col bg-white p-2 shadow-md rounded-md">
                <h1 className="text-base font-semibold border-b py-2 border-[#3BB67F]">
                  Trending Products
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {
                    // get 3 products from the top selling
                    products.slice(4, 7).map((product) => (
                      <CardHotProduct key={product._id} product={product} />
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col bg-white p-2 shadow-md rounded-md">
                <h1 className="text-base font-semibold border-b py-2 border-[#3BB67F]">
                  Recently added
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {
                    // get 3 products from the top selling
                    products.slice(5, 8).map((product) => (
                      <CardHotProduct key={product._id} product={product} />
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col bg-white p-2 shadow-md rounded-md">
                <h1 className="text-base font-semibold border-b py-2 border-[#3BB67F]">
                  Top Rated
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {
                    // get 3 products from the top selling
                    products.slice(2, 5).map((product) => (
                      <CardHotProduct key={product._id} product={product} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
