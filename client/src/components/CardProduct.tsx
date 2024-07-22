import { HiOutlineShoppingCart, HiStar } from "react-icons/hi";

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
export default function CardProduct({ product }: Product) {
  return (
    <div
      key={product._id}
      className="md:w-[200px] lg:w-[225px] lg:h-[300px] border p-2 flex flex-col justify-between bg-white rounded-lg shadow-md"
    >
      <div className="w-full flex items-center justify-center">
        <img src={product.image} alt="" className="h-[150px]" />
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
  );
}
