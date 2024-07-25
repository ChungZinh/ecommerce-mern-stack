import {
  Button,
  Checkbox,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import uploadIcon from "../../assets/images/upload.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";
import { uploadFileToS3 } from "../../aws/s3UploadImage";
import { s3Config } from "../../aws/s3Config";

interface category {
  name: string;
  subCategories?: category[];
  slug: string;
  tag?: string;
  description: string;
}

interface FormData {
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

interface Category {
  _id: string;
  name: string;
  slug: string;
  parent: string;
  description: string;
  subCategories?: Category[];
}
export default function DashAddProduct() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [formData, setFormData] = useState({} as FormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.getListCategory(query);
        if (res.data) {
          setCategories(res.data.categories);
          // set all text fields to empty
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, [currentUser._id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const selectedCategory = categories?.find(
    (cat) => cat._id === formData.category
  );

  const handleUpload = async () => {
    setLoading(true);
    if (!image) {
      setLoading(false);
      return;
    }
    uploadFileToS3(
      "products",
      image,
      s3Config,
      (url: string) => {
        setImageUrl(url);
        setLoading(false);
        setFormData({ ...formData, image: url });
        console.log("Uploaded");
      },
      (error: any) => {
        console.error("Error uploading image", error);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.createProduct(formData, currentUser._id);
      if (res.data) {
        console.log("Product added successfully", res.data);
        setLoading(false);
        setFormData({
          name: "",
          stock: 0,
          description: "",
          regu_price: 0,
          prom_price: 0,
          currency: "USD",
          tax: 0,
          width: 0,
          height: 0,
          weight: 0,
          shipping_fee: 0,
          category: "",
          tag: "",
          image: "",
          isDraft: false,
          isPublished: false,
        });
      } else {
        setLoading(false);
        console.log("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="p-12 w-full ">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Add New Product</h1>

          <div className="flex items-center gap-2">
            <Button
              color={"green"}
              onClick={() => setFormData({ ...formData, isDraft: true })}
              type="submit"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Save to draft"
              )}
            </Button>
            <Button
              onClick={() => setFormData({ ...formData, isPublished: true })}
              className="bg-[#3BB67F]"
              type="submit"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Publish"
              )}
            </Button>
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
                  <TextInput
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Type here"
                    required
                  />
                </div>

                {/* QUANTITY */}
                <div className="space-y-2">
                  <Label>Product stock</Label>
                  <TextInput
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Type here"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <Label>Full description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    required
                    placeholder="Type here"
                  />
                </div>

                {/* PRICE */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Regular price</Label>
                    <TextInput
                      onChange={handleChange}
                      value={formData.regu_price}
                      id="regu_price"
                      required
                      placeholder="$"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Promotinal price</Label>
                    <TextInput
                      onChange={handleChange}
                      value={formData.prom_price}
                      id="prom_price"
                      required
                      placeholder="$"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select
                      id="currency"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value={"USD"}>USD</option>
                      <option value={"VND"}>VND</option>
                      <option value={"EUR"}>EUR</option>
                      <option value={"JPY"}>JPY</option>
                    </Select>
                  </div>
                </div>

                {/* TAX */}
                <div className="space-y-2">
                  <Label>Tax rate</Label>
                  <TextInput
                    id="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    required
                    placeholder="$"
                  />
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
                    <TextInput
                      id="width"
                      value={formData.width}
                      onChange={handleChange}
                      required
                      placeholder="Inch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <TextInput
                      onChange={handleChange}
                      value={formData.height}
                      id="height"
                      required
                      placeholder="Inch"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <TextInput
                    onChange={handleChange}
                    value={formData.weight}
                    id="weight"
                    required
                    placeholder="gam"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Shipping fees</Label>
                  <TextInput
                    id="shipping_fee"
                    onChange={handleChange}
                    value={formData.shipping_fee}
                    required
                    placeholder="$"
                  />
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
                  <img
                    src={imageUrl === "" ? uploadIcon : imageUrl}
                    alt="image"
                    className="w-[100px]"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageRef}
                  className="hidden"
                />
                <div className="flex items-center justify-center mt-4">
                  <Button
                    className="px-4 inline text-center"
                    onClick={handleUpload}
                  >
                    {loading ? (
                      <div className="">
                        <Spinner size={"sm"} />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Upload"
                    )}
                  </Button>
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
                    <Select id="category" onChange={handleChange}>
                      <option value="">None</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sub-category</Label>
                    <Select id="sub-category" onChange={handleChange}>
                      <option value="">None</option>
                      {selectedCategory &&
                        selectedCategory.subCategories &&
                        selectedCategory.subCategories.map((subCategory) => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <TextInput
                    onChange={handleChange}
                    id="tag"
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
