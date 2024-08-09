import { Breadcrumb, Button, Label, Textarea, TextInput } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { HiOutlineReceiptPercent, HiReceiptPercent } from "react-icons/hi2";

export default function Checkout() {
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tax = (total * 0.05).toFixed(2); // Assuming 5% tax
  const grandTotal = (parseFloat(total) + parseFloat(tax)).toFixed(2);

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
        <form className="w-full lg:flex gap-6 items-center">
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
                    />
                  </div>
                  <div className="">
                    <Label>City</Label>
                    <TextInput placeholder="Enter City" id="city" />
                  </div>
                  <div className="">
                    <Label>Country</Label>
                    <TextInput placeholder="Enter Country" id="country" />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Order Notes</Label>
                  <Textarea rows={10} id="order_notes" />
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
              </div>
              <div className="">
                <Label>Payment Method</Label>
                <select
                  className="w-full border rounded-md py-2 px-4"
                  id="payment_method"
                >
                  <option value="">Select Payment Method</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="paypal">Paypal</option>
                  <option value="credit-card">Credit Card</option>
                </select>
              </div>
              <Button className="w-full bg-[#3BB67F] mt-4">Place Order</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
