"use client";
import { HiClock, HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import hotline from "../assets/images/hotline.png";
import footer from "../assets/images/footer.png";
import logo from "../assets/images/logo.png";
import appstore from "../assets/images/app-store.png";
import googleplay from "../assets/images/google-play.png";
import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";
export default function Footer() {
  const location = useLocation();
  const role = location.pathname === "/dashboard" ? "admin" : "user";
  return (
    <>
      {role === "user" ? (
        <div className=" lg:max-w-screen-2xl  mx-auto md:w-full px-4 mt-20">
          <div className="">
            <img src={footer} alt="" />
          </div>

          <FlowbiteFooter className="mt-10">
            <div className="w-full p-2 mt">
              <div className="grid w-full justify-between sm:flex  grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 lg:grid-cols-6 ">
                <div className="">
                  <FlowbiteFooter.LinkGroup col className="gap-2">
                    <div className="">
                      <img src={logo} alt="" className="w-[150px]" />
                      <span>Awesome grocery store website template</span>
                    </div>

                    <p className="flex items-center gap-1">
                      <HiLocationMarker />
                      Address: 5171 W Campbell Ave
                    </p>
                    <p className="flex items-center gap-1">
                      <HiPhone />
                      Call Us:(+91) - 540-025-124553
                    </p>
                    <p className="flex items-center gap-1">
                      <HiMail />
                      Email:sale@Nest.com
                    </p>
                    <p className="flex items-center gap-1">
                      <HiClock />
                      Hours:10:00 - 18:00, Mon - Sat
                    </p>
                  </FlowbiteFooter.LinkGroup>
                </div>
                <div className="">
                  <FlowbiteFooter.Title title="Company" />
                  <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href="#">About Us</FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Delivery Information
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Privacy Policy
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Terms & Conditions
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Contact Us
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Support Center
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">Careers</FlowbiteFooter.Link>
                  </FlowbiteFooter.LinkGroup>
                </div>
                <div className="">
                  <FlowbiteFooter.Title title="Account" />
                  <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href="#">Sign In</FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      View Cart
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      My Wishlist
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Track My Order
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Help Ticket
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Shipping Details
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Compare products
                    </FlowbiteFooter.Link>
                  </FlowbiteFooter.LinkGroup>
                </div>
                <div className="md:hidden lg:inline">
                  <FlowbiteFooter.Title title="Corporate" />
                  <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href="#">
                      Become a Vendor
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Affiliate Program
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Farm Business
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Farm Careers
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Our Suppliers
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Accessibility
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Promotions
                    </FlowbiteFooter.Link>
                  </FlowbiteFooter.LinkGroup>
                </div>
                <div className="md:hidden sm:hidden lg:inline">
                  <FlowbiteFooter.Title title="Popolar" />
                  <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href="#">
                      Milk & Flavoured Milk
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Butter and Margarine
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Eggs Substitutes
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Marmalades
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Sour Cream and Dips
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">
                      Tea & Kombucha
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href="#">Cheese</FlowbiteFooter.Link>
                  </FlowbiteFooter.LinkGroup>
                </div>
                <div className="gap-2">
                  <FlowbiteFooter.Title title="Install App" />
                  <div className="flex gap-2 md:flex-col">
                    <img src={appstore} alt="" />
                    <img src={googleplay} alt="" />
                  </div>
                  <p className="mt-4">Secured Payment Gateways</p>
                </div>
              </div>
              <div className="w-full  px-4 py-6 sm:flex sm:items-center sm:justify-between">
                <FlowbiteFooter.Copyright href="#" by="Nest" year={2022} />
                <div className="">
                  <img src={hotline} alt="" />
                </div>
                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                  <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
                  <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
                  <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
                  <FlowbiteFooter.Icon href="#" icon={BsGithub} />
                  <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
                </div>
              </div>
            </div>
          </FlowbiteFooter>
        </div>
      ) : (
        <div className="">
          <FlowbiteFooter.Copyright href="#" by="Nest" year={2022} />
        </div>
      )}
    </>
  );
}
