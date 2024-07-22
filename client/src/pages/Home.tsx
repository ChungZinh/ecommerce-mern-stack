import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { api } from "../api/api";
import Slider from "@mui/material/Slider";
import { Carousel, Checkbox } from "flowbite-react";
import slider1 from "../assets/images/slider_img/slider1.png";
import slider2 from "../assets/images/slider_img/slider2.png";
import blue_diamon from "../assets/images/product_img/blue_diamond.png";
import { HiOutlineShoppingCart, HiShoppingCart, HiStar } from "react-icons/hi";

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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `$${value}`;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.getListCategory(currentUser._id, query);
      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    };

    const fetchProducts = async () => {
      const res = await api.getProductsList(currentUser._id, query);
      if (res.data.products) {
        setProducts(res.data.products);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [currentUser._id, query]);

  return (
    <div className="lg:max-w-screen-2xl mx-auto md:w-full px-4">
      <div className="w-full flex gap-4 mt-4">
        <div className="w-1/5 space-y-6 ">
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
        <div className="w-4/5">
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
          <div className="w-full mt-4 flex flex-wrap gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="w-[220px] border p-2 bg-white rounded-lg shadow-md"
              >
                <div className="w-full flex items-center justify-center">
                  <img src={product.image} alt="" className="" />
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-base font-semibold ">{product.name}</h1>
                  <div className="w-full flex justify-between items-center">
                    <HiStar className="text-[#FFD700] text-sm" />
                    <p className="text-sm text-neutral-300"> (4.0)</p>
                  </div>
                  <p className="text-start text-xs font-semibold items-center">
                    By<span className="text-[#3BB67F]"> NestFood</span>
                  </p>

                  <div className="flex justify-between mt-2">
                    <div className=" flex gap-2 items-center">
                      <p className="text-[#3BB67F] text-sm font-semibold">
                        $ {product.prom_price}
                      </p>
                      <p className="text-neutral-500 font-semibold line-through text-xs">
                        $ {product.regu_price}
                      </p>
                    </div>
                    <button className="flex  items-center bg-[#D9F1E4] p-1 rounded-md">
                      <HiOutlineShoppingCart className="text-[#3BB67F] text-sm" />
                      <span className="text-[#3BB67F] text-sm">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
