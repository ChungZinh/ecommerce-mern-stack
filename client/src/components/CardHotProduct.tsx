import { HiStar } from "react-icons/hi";

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
export default function CardHotProduct({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-4 bg-white shadow-md rounded-md p-2">
      <img src={product.image} alt="" className="w-[90px]" />
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-base">{product.name}</p>
        <div className="flex items-center gap-10 ">
          <HiStar className="text-[#FFD700] text-sm" />
          <p className="text-xs text-neutral-300">(4.0)</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-[#3BB67F]">$ {product.prom_price}</p>
          <p className="text-sm font-semibold text-neutral-400 line-through ">
            $ {product.regu_price}
          </p>
        </div>
      </div>
    </div>
  );
}
