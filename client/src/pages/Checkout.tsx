import {
  Breadcrumb,
  Button,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { HiOutlineReceiptPercent, HiReceiptPercent } from "react-icons/hi2";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../api/api";
import { clearCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

interface FormData {
  address: string;
  city: string;
  country: string;
  orderNotes: string;
  paymentMethod: string;
  totalPrice: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [formData, setFormData] = useState({} as FormData);
  const tax = (total * 0.05).toFixed(2); // Assuming 5% tax
  const grandTotal = (parseFloat(total) + parseFloat(tax)).toFixed(2);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.placeOrder(
        { ...formData, totalPrice: total },
        currentUser._id
      );
      if (res.data) {
        setLoading(false);
        dispatch(clearCart());
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full px-4">
      <div className="w-full bg-white">
        <div className="lg:max-w-screen-2xl mx-auto py-4 border-b">
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href="/cart"
              className="text-gray-500 hover:text-gray-700"
            >
              Cart
            </Breadcrumb.Item>
            <Breadcrumb.Item>Checkout</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="lg:max-w-screen-2xl mx-auto mt-12">
        <h1 className="text-5xl font-semibold">Checkout</h1>
        <p className="mt-2">
          There{" "}
          {cartSize > 1 ? `are ${cartSize} products` : `is ${cartSize} product`}{" "}
          in your cart{" "}
        </p>
        <form
          className="w-full lg:flex gap-6 items-center"
          onSubmit={handleSubmit}
        >
          <div className="lg:w-3/5">
            <div className="flex items-center bg-white border justify-between rounded-md mt-4">
              <div className="flex items-center gap-4 ">
                <HiOutlineReceiptPercent className="text-xl text-gray-500 ml-4" />
                <input
                  className="border-0 "
                  placeholder="Enter Coupon Code..."
                />
              </div>
              <button className="bg-slate-800 py-3 px-8 rounded-tr-md rounded-br-md text-white font-semibold">
                Apply Coupon
              </button>
            </div>

            <div className="mt-10">
              <h1 className="text-xl font-semibold">Billing Details</h1>
              <div className="">
                <div className="flex flex-col gap-4 mt-4 grid-cols-2 lg:grid">
                  <div className="">
                    <Label>Full Name</Label>
                    <TextInput
                      placeholder="Enter Full Name"
                      value={
                        currentUser?.lastName + " " + currentUser?.firstName
                      }
                      id="fullname"
                    />
                  </div>
                  <div className="">
                    <Label>Email</Label>
                    <TextInput
                      placeholder="Enter Email"
                      value={currentUser?.email}
                      id="email"
                    />
                  </div>
                  <div className="">
                    <Label>Phone Number</Label>
                    <TextInput
                      placeholder="Enter Phone Number"
                      value={currentUser?.mobile}
                      id="mobile"
                    />
                  </div>
                  <div className="">
                    <Label>Address</Label>
                    <TextInput
                      placeholder="Enter Address"
                      value={currentUser?.address}
                      id="address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <Label>City</Label>
                    <TextInput
                      placeholder="Enter City"
                      id="city"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <Label>Country</Label>
                    <TextInput
                      placeholder="Enter Country"
                      id="country"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Order Notes</Label>
                  <Textarea rows={10} id="orderNotes" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 md:mt-8 border rounded-md p-4">
            <div className="">
              <div className="flex items-center justify-between border-b py-2">
                <h1 className="text-xl font-semibold">Your Order</h1>
                <p className="text-gray-500">Subtotal</p>
              </div>
              <div className="">
                {cart.map((item) => (
                  <div
                    className="flex items-center justify-between py-2 border-b"
                    key={item.productId._id}
                  >
                    <img
                      src={item.productId.image}
                      alt=""
                      className="w-[80px]"
                    />
                    <p className="text-gray-500">x{item.quantity}</p>
                    <p className="text-[#3BB67F] font-semibold">
                      ${item.productId.prom_price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-[#3BB67F] text-xl font-semibold">
                  ${total?.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-500">Tax</p>
                <p className="text-[#3BB67F] text-xl font-semibold">${tax}</p>
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-500">Total</p>
                <p className="text-[#3BB67F] text-xl font-semibold">
                  ${grandTotal}
                </p>
                <input type="hidden" value={total} id="totalPrice" />
              </div>
              <div className="">
                <Label>Payment Method</Label>
                <select
                  className="w-full border rounded-md py-2 px-4"
                  id="paymentMethod"
                  onChange={handleChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="paypal">Paypal</option>
                  <option value="credit-card">Credit Card</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-[#3BB67F] mt-4">
                {loading ? (
                  <div className="">
                    <Spinner size={"sm"} />
                    <span className="pl-3">Loading...</span>
                  </div>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
