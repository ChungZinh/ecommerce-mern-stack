import {
  Button,
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import uploadIcon from "../../assets/images/upload.png";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function DashAddProduct() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div className="p-12 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Add New Product</h1>

          <div className="flex items-center gap-2">
            <Button color={"green"} className="">Save to draft</Button>
            <Button  className="bg-[#3BB67F]">Publish</Button>
          </div>
        </div>

        <div className="mt-8 w-full lg:flex lg:gap-8 ">
          <div className="lg:w-3/4 mb-6 ">
            {/* BASIC */}
            <div className="bg-white shadow-md rounded-md">
              <div className="p-4 border-b">
                <h1>Basic</h1>
              </div>
              <div className="mt-2 p-4 space-y-4">
                {/* TITLE */}
                <div className="space-y-2">
                  <Label>Product title</Label>
                  <TextInput id="title" placeholder="Type here" />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <Label>Full description</Label>
                  <Textarea id="description" rows="6" placeholder="Type here" />
                </div>

                {/* PRICE */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Regular price</Label>
                    <TextInput id="regu-price" placeholder="$" />
                  </div>
                  <div className="space-y-2">
                    <Label>Promotinal price</Label>
                    <TextInput id="prom-price" placeholder="$" />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select id="par">
                      <option>USD</option>
                      <option>VND</option>
                    </Select>
                  </div>
                </div>

                {/* TAX */}
                <div className="space-y-2">
                  <Label>Tax rate</Label>
                  <TextInput id="tax" placeholder="$" />
                </div>

                {/*  */}
                <div className="flex items-center gap-2">
                  <Checkbox color={"green"} className="" id="remember" />
                  <p className=" text-base">Make a template</p>
                </div>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="mt-6  bg-white shadow-md rounded-md">
              <div className="p-4 border-b">
                <h1>Shipping</h1>
              </div>
              <div className="mt-2 p-4 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Width</Label>
                    <TextInput id="width" placeholder="Inch" />
                  </div>
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <TextInput id="height" placeholder="Inch" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <TextInput id="weight" placeholder="gam" />
                </div>
                <div className="space-y-2">
                  <Label>Shipping fees</Label>
                  <TextInput id="fees" placeholder="$" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 ">
            {/* Media */}
            <div className="rounded-md bg-white shadow-md mb-6">
              <div className="p-4 border-b">
                <h1>Media</h1>
              </div>
              <div className="p-4">
                <div
                  onClick={() => imageRef.current?.click()}
                  className="p-20 h-[200px] flex justify-center items-center border-b"
                >
                  <img src={uploadIcon} alt="" className="w-[100px]" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageRef}
                  className="hidden"
                />
                <div className="flex items-center justify-center mt-4">
                  <Button className="px-4 inline text-center">Upload</Button>
                </div>
              </div>
            </div>
            {/* Organization */}
            <div className="rounded-md bg-white shadow-md">
              <div className="p-4 border-b">
                <h1>Organization</h1>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select id="category">
                      <option>Automobiles</option>
                      <option>Electronic</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sub-category</Label>
                    <Select id="sub-category">
                      <option>Nissan</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <TextInput id="tag" placeholder="Type here" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
