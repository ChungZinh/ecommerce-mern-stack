import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { IoNotificationsSharp } from "react-icons/io5";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTheme } from "../redux/theme/themeSlice";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import {
  AiOutlineApple,
  AiOutlineAppstore,
  AiOutlineSearch,
} from "react-icons/ai";
import { api } from "../api/api";
import { logoutSuccess } from "../redux/user/userSlice";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import {
  HiHeart,
  HiOutlineFire,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiSearch,
  HiShoppingCart,
  HiUser,
} from "react-icons/hi";
import { HiOutlineWindow } from "react-icons/hi2";
export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const role = location.pathname === "/dashboard" ? "admin" : "user";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.value);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      const res = await api.logout(currentUser._id);
      console.log(res);
      if (res.message) {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      {role === "admin" ? (
        <div className="">
          <Navbar className="border-b border-neutral-200">
            <div className="flex gap-12">
              <Link to="/" className="">
                <img src={logo} alt="" width={120} />
              </Link>
              <form action="">
                <TextInput
                  className="hidden lg:inline"
                  type="text"
                  placeholder="Search..."
                  rightIcon={AiOutlineSearch}
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <Button className="w-12 h-10 lg:hidden" color={"gray"}>
                <AiOutlineSearch size={18} />
              </Button>
            </div>

            <div className="flex items-center gap-3 ">
              <Link to={"/notification"}>
                <IoNotificationsSharp className="text-xl text-neutral-400" />
              </Link>
              <button
                onClick={toggleTheme}
                className="*:text-xl text-neutral-400"
              >
                {theme === "light" ? <IoMdMoon /> : <MdSunny />}
              </button>
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt={currentUser.avatar} rounded />}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{currentUser.email}</span>
                    {/* <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span> */}
                  </Dropdown.Header>
                  <Link to={"/dashboard?tab=setting"}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown>
              ) : (
                <Button className="bg-[#3BB67F] hover:bg-[#D9F1E4] duration-200">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
          </Navbar>
        </div>
      ) : (
        <div className="w-full  bg-white border-b">
          <Navbar className="">
            <div className="w-full">
              <div className="flex justify-between items-center border-b *:text-xs">
                <div className="flex">
                  <ul className="flex divide-x *:px-2">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/account">My Accout</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link to="/order-tracking">Order Tracking</Link>
                    </li>
                  </ul>
                </div>
                <p className="md:hidden lg:inline">
                  100% Secure delivery without contacting the courier
                </p>
                <div className="flex items-center gap-1 ">
                  <p>
                    Need help? Call Us:<span>+1800900</span>
                  </p>
                  <select className="text-xs border-0 " name="" id="">
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                  </select>
                  <select className="text-xs border-0 " name="" id="">
                    <option value="USD">USD</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>
              <div className="">
                <Navbar className="py-4 border-b">
                  <div className="flex items-center gap-4">
                    <Link to={"/"}>
                      <img src={logo} alt="logo" />
                    </Link>

                    <TextInput
                      className="lg:w-[800px] hidden lg:inline border rounded-lg border-[#3BB67F]"
                      rightIcon={HiSearch}
                      placeholder="Search for items..."
                    />
                  </div>
                  <div className="flex items-center gap-4 ">
                    <select className="text-xs border-neutral-200 ">
                      <option>Your Location</option>
                    </select>
                    <Link to={"/compare"} className="flex items-center">
                      <PiArrowsCounterClockwise className="text-2xl text-[#3BB67F]" />
                      <span className="text-sm">Compare</span>
                    </Link>
                    <Link to={"/wishlist"} className="flex items-center">
                      <HiOutlineHeart className="text-2xl text-[#3BB67F]" />
                      <span className="text-sm">Wishlist</span>
                    </Link>
                    <Link to={"/cart"} className="">
                      <div className="relative flex justify-center items-center h-[40px] ">
                        <div className="flex items-center  ">
                          <HiOutlineShoppingCart className="text-2xl text-[#3BB67F]" />
                          <span className="text-sm">Cart</span>
                        </div>
                        {currentUser && cartSize > 0 && (
                          <span className="text-xs bg-[#3BB67F] text-white absolute top-0 right-[-10px] rounded-full w-4 font-semibold text-center h-4">
                            {cartSize}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="">
                      {currentUser ? (
                        <Dropdown
                          arrowIcon={false}
                          inline
                          label={
                            <div className="flex items-center">
                              <HiOutlineUser className="text-2xl text-[#3BB67F]" />
                              <span className="text-sm">Account</span>
                            </div>
                          }
                        >
                          <Dropdown.Header>
                            <div className="flex items-center">
                              <HiOutlineUser className="text-2xl text-[#3BB67F]" />
                              <span className="block text-sm">
                                {currentUser.email}
                              </span>
                            </div>
                          </Dropdown.Header>
                          <Link to={"/profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                          </Link>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleLogout}>
                            Sign out
                          </Dropdown.Item>
                        </Dropdown>
                      ) : (
                        <Button className="bg-[#3BB67F] hover:bg-[#D9F1E4] duration-200">
                          <Link to="/sign-in">Sign In</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </Navbar>
              </div>
              <div className="flex gap-2 border-b items-center py-2">
                <div className="flex flex-col">
                  <Link
                    to={"/"}
                    className="flex items-center py-1 rounded-md  px-2 bg-[#3BB67F] gap-1"
                  >
                    <AiOutlineAppstore className="text-xl text-white" />
                    <span className=" text-white"> Browse All Categories</span>
                  </Link>
                  <Navbar.Toggle />
                </div>

                <Navbar.Collapse className="">
                  <Navbar.Link active={path === "/deals"} as={"div"}>
                    <Link to={"/deals"} className="flex items-center gap-1">
                      <HiOutlineFire className="text-xl text-[#3BB67F]" />
                      <span>Deals</span>
                    </Link>
                  </Navbar.Link>
                  <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to={"/"}>Home</Link>
                  </Navbar.Link>
                  <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to={"/about"}>About</Link>
                  </Navbar.Link>
                  <Navbar.Link active={path === "/contact"} as={"div"}>
                    <Link to={"/contact"}>Contact</Link>
                  </Navbar.Link>
                  <Navbar.Link active={path === "/faq"} as={"div"}>
                    <Link to={"/faq"}>FAQ</Link>
                  </Navbar.Link>
                </Navbar.Collapse>
              </div>
            </div>
          </Navbar>
        </div>
      )}
    </div>
  );
}
