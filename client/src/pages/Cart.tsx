import { Breadcrumb, Table } from "flowbite-react";
import React from "react";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  console.log("cart", cart);
  return (
    <div className="mx-auto w-full px-4">
      <div className="w-full bg-white">
        <div className="lg:max-w-screen-2xl mx-auto py-4 border-b">
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Cart</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="lg:max-w-screen-2xl mx-auto mt-12">
        <h1 className="text-5xl font-semibold">Your Cart</h1>
        <p className="mt-2">
          There{" "}
          {cart.length > 1
            ? `are ${cart.length} products`
            : `is ${cart.length} product`}{" "}
          in your cart{" "}
        </p>
        <div className="w-full">
          <div className="lg:w-3/4">
            {cart.length === 0 ? (
              <div className="bg-white p-4 mt-4">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="mt-2">You have no items in your cart</p>
              </div>
            ) : (
              <div className="">
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Product</Table.Cell>
                      <Table.Cell>Price</Table.Cell>
                      <Table.Cell>Quantity</Table.Cell>
                      <Table.Cell>Subtotal</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {cart.map((item) => (
                      <Table.Row key={item.product}>
                      <Table.Cell>
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <p className="ml-4">{item.name}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>${item.price}</Table.Cell>
                      <Table.Cell>{item.quantity}</Table.Cell>
                      <Table.Cell>${item.quantity * item.price}</Table.Cell>
                    </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
          <div className="lg:w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
