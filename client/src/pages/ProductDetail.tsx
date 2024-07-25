import { Breadcrumb, Button, Rating } from "flowbite-react";
import { useState } from "react";
import {
  HiHome,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiShare,
  HiStar,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import product1 from "../assets/images/product_img/banana.png";
import product2 from "../assets/images/product_img/carrot.png";
import product3 from "../assets/images/product_img/mango.png";
import product4 from "../assets/images/product_img/orange.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Product {
  _id: string; // Ensure _id is included
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

export default function ProductDetail() {
  const location = useLocation();
  const { product } = location.state as { product?: Product }; // Type assertion for better type safety
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [sizes, setSizes] = useState(50); // Added state for size
  const [quantity, setQuantity] = useState(1); // Added state for quantity
  const [selectedTab, setSelectedTab] = useState("Description");
  const selectImage = (image: string) => {
    setImageUrl(image);
  };

  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <div className="mx-auto w-full px-4">
      <div className="w-full bg-white">
        <div className="lg:max-w-screen-2xl mx-auto py-2 border-b">
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
            <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* PRODUCT */}
      <div className="lg:max-w-screen-2xl mx-auto mt-4">
        <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          <div className="">
            <div className="w-full md:flex flex-col justify-center items-center">
              <img
                src={imageUrl}
                alt={product.name} // Improved alt text
                className="lg:w-[500px] md:w-[500px]"
              />
              <div className="flex gap-2">
                {[product.image, product1, product2, product3, product4].map(
                  (img, index) => (
                    <div
                      key={index}
                      onClick={() => selectImage(img)}
                      className={`md:w-[150px] md:h-[150px] lg:w-[100px] lg:h-[100px] border cursor-pointer border-neutral-200 justify-center items-center flex rounded-md ${
                        imageUrl === img ? "border-green-400" : ""
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} />{" "}
                      {/* Improved alt text */}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div className="flex  gap-4 items-center">
              <Rating size="md">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
              <p>(32 review)</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-5xl font-semibold text-[#3BB67F]">
                ${product.currency} {product.prom_price}
              </p>
              <p className="text-xl font-semibold  line-through text-neutral-300">
                ${product.currency} {product.regu_price}
              </p>
            </div>
            <p className="text-neutral-400">
              {product.description} Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Aliquam rem officia, corrupti reiciendis minima
              nisi modi, quasi, odio minus dolore impedit fuga eum eligendi.
            </p>

            <div className=" flex gap-4 items-center">
              <p>Size/Weight:</p>
              {[50, 100, 200, 500].map((size, index) => {
                const isSelected = sizes === size;
                return (
                  <button
                    onClick={() => setSizes(size)}
                    key={index}
                    className={`border border-neutral-200 rounded-md px-2 py-1 mx-1 ${
                      isSelected ? "bg-green-400 text-white" : ""
                    }`}
                  >
                    {size}g
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col ">
              <div className="flex gap-4">
                <div className="w-[90px]   rounded-md border border-[#3BB67F] flex  items-center">
                  <p className="w-[80px] text-center">{quantity}</p>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      className=" rounded-md px-2 py-1 text-[#3BB67F]"
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className=" rounded-md px-2 py-1 text-[#3BB67F]"
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
                <Button className="bg-[#3BB67F] flex items-center justify-center">
                  <HiOutlineShoppingCart className="mr-2 text-xl" />
                  Add to Cart
                </Button>

                <Button className="bg-[#3BB67F] flex items-center justify-center">
                  Buy Now
                </Button>

                <Button className="border-[#3BB67F] border bg-white flex items-center justify-center">
                  <HiOutlineHeart className="text-2xl text-[#3BB67F]" />
                </Button>

                <Button className="border-[#3BB67F] border bg-white flex items-center justify-center">
                  <HiShare className="text-2xl text-[#3BB67F]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL */}
      <div className="lg:max-w-screen-2xl mx-auto mt-12 border p-10 rounded-md">
        <div className="border-b pb-4">
          {["Description", "Additional Information", "Vender", "Reviews"].map(
            (tab, index) => {
              const isSelected = selectedTab === tab;
              return (
                <button
                  onClick={() => setSelectedTab(tab)}
                  key={index}
                  className={`border border-neutral-200 rounded-md px-4 py-2 mx-2 ${
                    isSelected ? "bg-[#3BB578] text-white" : ""
                  }`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>
        <div className="mt-10 space-y-4">
          <p className="text-sm text-neutral-400">
            Uninhibited carnally hired played in whimpered dear gorilla koala
            depending and much yikes off far quetzal goodness and from for
            grimaced goodness unaccountably and meadowlark near unblushingly
            crucial scallop tightly neurotic hungrily some and dear furiously
            this apart.
          </p>
          <p className="text-sm text-neutral-400">
            Spluttered narrowly yikes left moth in yikes bowed this that grizzly
            much hello on spoon-fed that alas rethought much decently richly and
            wow against the frequent fluidly at formidable acceptably flapped
            besides and much circa far over the bucolically hey precarious
            goldfinch mastodon goodness gnashed a jellyfish and one however
            because.
          </p>

          <div className="gap-2 border-b  pb-4">
            <strong>Type Of Packing:</strong> Packet
            <br />
            <strong>Country of Origin:</strong> India
            <br />
            <strong>Manufacturer Details:</strong> XYZ Company
            <br />
            <strong>Manufacturer/Importer Details:</strong> XYZ
            <br />
            <strong>Marketed By:</strong> XYZ
            <br />
            <strong>Best Before:</strong> 6 Months
            <br />
            <strong>Imported By:</strong> XYZ
          </div>

          <p className="text-sm text-neutral-400">
            Laconic overheard dear woodchuck wow this outrageously taut beaver
            hey hello far meadowlark imitatively egregiously hugged that yikes
            minimally unanimous pouted flirtatiously as beaver beheld above
            forward energetic across this jeepers beneficently cockily less a
            the raucously that magic upheld far so the this where crud then
            below after jeez enchanting drunkenly more much wow callously
            irrespective limpet.
          </p>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Packaging & Delivery</h1>
            <p className="text-sm text-neutral-400">
              Uninhibited carnally hired played in whimpered dear gorilla koala
              depending and much yikes off far quetzal goodness and from for
              grimaced goodness unaccountably and meadowlark near unblushingly
              crucial scallop tightly neurotic hungrily some and dear furiously
              this apart.
            </p>
            <p className="text-sm text-neutral-400">
              Spluttered narrowly yikes left moth in yikes bowed this that
              grizzly much hello on spoon-fed that alas rethought much decently
              richly and wow against the frequent fluidly at formidable
              acceptably flapped besides and much circa far over the bucolically
              hey precarious goldfinch mastodon goodness gnashed a jellyfish and
              one however because.
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Suggested Use</h1>
            <p className="text-sm text-neutral-400">
              Refrigeration not necessary.
            </p>
            <p className="text-sm text-neutral-400">Stir before serving</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Other Ingredients</h1>
            <p className="text-sm text-neutral-400">
              Organic raw pecans, organic raw cashews.
            </p>
            <p className="text-sm text-neutral-400">
              This butter was produced using a LTG (Low Temperature Grinding)
              process
            </p>
            <p className="text-sm text-neutral-400">
              Made in machinery that processes tree nuts but does not process
              peanuts, gluten, dairy or soy
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Warnings</h1>
            <p className="text-sm text-neutral-400">
              Oil separation occurs naturally. May contain pieces of shell.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
