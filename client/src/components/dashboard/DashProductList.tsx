import {
  Button,
  Checkbox,
  Select,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";
import { FaCheck, FaTimes } from "react-icons/fa";
import { formatCreatedAt } from "../../utils/formatDate";
import { Link } from "react-router-dom";

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

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  description: string;
}
export default function DashProductList() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [cQuery, setCQuery] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryB = buildQueryString(query)
        const res = await api.getProductsList(currentUser._id, queryB);
        if (res.data.products) {
          setProducts(res.data.products);
          setLoading(false);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await api.getListCategory(currentUser._id, cQuery);
        if (res.data) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();

    fetchProducts();
  }, [currentUser._id, query]);

  const buildQueryString = (queryObject: { [key: string]: any }) => {
    const queryString = Object.keys(queryObject)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
      )
      .join("&");
    return `?${queryString}`;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery((prevQuery) => ({
        ...prevQuery,
        page: pageNumber,
      }));
    }
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      category: e.target.value,
    }));
  };

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      searchTerm: e.target.value,
    }));
  };

  return (
    <div className="p-12 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Products List</h1>
            <p className="text-base text-neutral-500">List product</p>
          </div>
          <div className="flex items-center gap-2">
            <Button color={"green"}>Export</Button>
            <Button color={"green"}>Import</Button>
            <Button className="bg-[#3BB67F]">
              <Link to={`/dashboard?tab=addProduct`}>Create new</Link>
            </Button>
          </div>
        </div>

        <div className="w-full mt-4 bg-white p-4 rounded-md shadow-md min-h-[800px]">
          <div
            className="table-auto w-full  overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
             dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700"
          >
            <div className="">
              <div className="py-2 border-b w-full flex items-center justify-between">
                <TextInput placeholder="Search..." onChange={handleSearchTerm} />
                <div className="">
                  <Select onChange={handleFilterCategory}>
                    <option value={""}>All category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Table>
                <Table.Head>
                  <Table.HeadCell>
                    <Checkbox color={"green"} />
                  </Table.HeadCell>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Regular price</Table.HeadCell>
                  <Table.HeadCell>Draft/Published</Table.HeadCell>
                  <Table.HeadCell>Created At</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {loading ? (
                    <Spinner />
                  ) : (
                    products.map((product, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Checkbox color={"green"} />
                        </Table.Cell>
                        <Table.Cell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>${product.regu_price}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-1">
                            {product.isDraft ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaTimes color="red" />
                            )}{" "}
                            /{" "}
                            {product.isPublished ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaTimes color="red" />
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          {formatCreatedAt(product.createdAt)}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-1">
                            <Button size={"sm"} className="bg-[#3BB67F]">
                              Edit
                            </Button>
                            <Button size={"sm"} color={"green"}>
                              Delete
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
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
                className={page === index + 1 ? "bg-green-600 text-white" : ""}
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
    </div>
  );
}
