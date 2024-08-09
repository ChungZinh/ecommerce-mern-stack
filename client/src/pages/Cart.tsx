import {
  Breadcrumb,
  Button,
  Checkbox,
  Select,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiClipboard,
  HiHome,
  HiOutlineClipboard,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { api } from "../api/api";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  fetchCart,
  removeItemFromCart,
  updateCart,
} from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { loading } = useSelector((state: RootState) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);

  useEffect(() => {
    dispatch(fetchCart(currentUser._id));
  }, [currentUser._id]);

  const handleRemove = async (productId: string) => {
    dispatch(removeItemFromCart({ userId: currentUser._id, productId }));
  };

  const handleUpdateItem = (productId: string, quantity: number) => {
    dispatch(updateCart({ userId: currentUser._id, productId, quantity }));
  };

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
          {cartSize > 1 ? `are ${cartSize} products` : `is ${cartSize} product`}{" "}
          in your cart{" "}
        </p>
        <div className="w-full lg:flex gap-6">
          <div className="lg:w-3/4">
            {cartSize === 0 ? (
              <div className="bg-white p-4 mt-4">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="mt-2">You have no items in your cart</p>
              </div>
            ) : (
              <div className="mt-8 border p-4 rounded-md">
                {loading && <Spinner />}
                <Table hoverable>
                  <Table.Head className="text-[#3BB578] bg-gray-100">
                    <Table.HeadCell>
                      <Checkbox></Checkbox>
                    </Table.HeadCell>
                    <Table.HeadCell>Product</Table.HeadCell>
                    <Table.HeadCell>Unit Price</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>Subtotal</Table.HeadCell>
                    <Table.HeadCell>Remove</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {cart.map((item) => (
                      <Table.Row key={item.productId._id}>
                        <Table.Cell>
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center">
                            <img
                              src={item.productId.image}
                              alt={item.productId.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <p className="ml-4">{item.productId.name}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>${item.productId.prom_price}</Table.Cell>
                        <Table.Cell>
                          <div className="w-[90px]   rounded-md border border-[#3BB67F] flex  items-center">
                            <p className="w-[80px] text-center">
                              {item.quantity}
                            </p>
                            <div className="flex flex-col items-center">
                              <button
                                onClick={() =>
                                  handleUpdateItem(
                                    item.productId._id,
                                    item.quantity + 1
                                  )
                                }
                                className=" rounded-md px-2 py-1 text-[#3BB67F]"
                              >
                                <IoIosArrowUp />
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateItem(
                                    item.productId._id,
                                    item.quantity - 1
                                  )
                                }
                                className=" rounded-md px-2 py-1 text-[#3BB67F]"
                              >
                                <IoIosArrowDown />
                              </button>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          $
                          {(item.productId.prom_price * item.quantity).toFixed(
                            2
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => handleRemove(item.productId._id)}
                            size={"xs"}
                            className="text-white bg-[#3BB578]"
                            disabled={loading}
                          >
                            Remove
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
            <div className="flex justify-between items-center  mt-4">
              <Button
                size={"md"}
                className="text-white bg-[#3BB578] flex items-center   "
              >
                <HiArrowLeft className="text-xl mr-2" />
                <span>Continue Shopping</span>
              </Button>

              <div className="">
                <Button
                  size={"md"}
                  className="text-white bg-[#3BB578] flex items-center gap-2"
                >
                  <PiArrowsCounterClockwise className="text-xl mr-2" />
                  Update Cart
                </Button>
              </div>
            </div>

            <div className="lg:flex justify-between">
              <div className=" mt-4 border p-4 rounded-md">
                <div className="">
                  <div className="">
                    <h1 className="text-xl font-semibold">
                      Calculate Shipping
                    </h1>
                    <p className="*:text-xs text-xs text-neutral-400 ">
                      Flat rate <span className="text-[#3BB578]">5%</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <CountrySelect
                      onChange={(e) => {
                        setCountryid(e.id);
                      }}
                      placeHolder="Select Country"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-4 gap-4">
                    <StateSelect
                      countryid={countryid}
                      onChange={(e) => {
                        setstateid(e.id);
                      }}
                      placeHolder="Select State"
                    />
                    <CitySelect
                      countryid={countryid}
                      stateid={stateid}
                      onChange={(e) => {
                        console.log(e);
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex flex-col justify-center items-center mt-4 gap-4 border rounded-md p-4">
                <h1 className="text-xl font-semibold">Calculate Shipping</h1>
                <p className="text-xs text-neutral-400">Using A Promo Code?</p>
                <div className="flex items-center gap-2">
                  <TextInput placeholder="Enter promo code" />
                  <Button size={"md"} className="text-white bg-[#3BB578]">
                    <HiOutlineClipboard />
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 mt-4">
            <div className="mt-4 border rounded-md p-4">
              <h1 className="text-xl font-semibold md:text-center">
                Cart Totals
              </h1>
              <div className="flex justify-between items-center mt-4 border p-2 ">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mt-4 border p-2">
                <p>Shipping</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between items-center mt-4 border p-2">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button
                size={"md"}
                className="text-white bg-[#3BB578] md:w-full mt-4"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
