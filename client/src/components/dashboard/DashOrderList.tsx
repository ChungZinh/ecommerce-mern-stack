import { Button, Select, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatCreatedAt } from "../../utils/formatDate";
import { buildQueryString } from "../../utils/buildQueryString";

export default function DashOrderList() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const queryB = buildQueryString(query);
        const res = await api.getOrders(currentUser._id, queryB);
        if (res.data) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderList();
  }, [currentUser._id]);

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
    <div className="p-12 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Order List</h1>
            <p className="text-base text-neutral-500">List product</p>
          </div>
        </div>
        <div className="w-full mt-4 bg-white p-4 rounded-md shadow-md min-h-[800px] ">
          <div className="flex justify-between items-center border-b pb-4">
            <TextInput placeholder="Search..." />
            <div className="flex items-center gap-4">
              <Select>
                <option>Sort by</option>
                <option>Price</option>
                <option>Rating</option>
                <option>Popularity</option>
              </Select>
              =
              <Select>
                <option>Order</option>
                <option>Ascending</option>
                <option>Descending</option>
              </Select>
            </div>
          </div>
          <div className="">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Order ID</Table.HeadCell>
                <Table.HeadCell>Customer</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {orders.map((order, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{order._id}</Table.Cell>
                    <Table.Cell>{order.customer.email}</Table.Cell>
                    <Table.Cell>{order.totalPrice}</Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>{formatCreatedAt(order.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <Button  className="bg-[#3BB67F]">Detal</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
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
