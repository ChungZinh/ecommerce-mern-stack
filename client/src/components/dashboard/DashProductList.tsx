import { Button, Checkbox, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";
import { FaCheck, FaTimes } from "react-icons/fa";

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

export default function DashProductList() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.getProductsList(currentUser._id, query);
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
    fetchProducts();
  }, [currentUser._id]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery(`?page=${pageNumber}`);
    }
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
            <Button className="bg-[#3BB67F]">Create new</Button>
          </div>
        </div>

        <div className="w-full mt-4 bg-white p-4 rounded-md shadow-md min-h-[800px]">
          <div
            className="table-auto w-full  overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
             dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700"
          >
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
                      <Table.Cell >
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
                      <Table.Cell>{product.category.name}</Table.Cell>
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

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Button
              size={'xs'}
              color={"green"}
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                size={'xs'}
                color={"green"}
                onClick={() => handlePageChange(index + 1)}
                className={page === index + 1 ? 'bg-green-600 text-white' : ''}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              size={'xs'}
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
