import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { IoNotificationsSharp } from "react-icons/io5";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTheme } from "../redux/theme/themeSlice";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { api } from "../api/api";
import { logoutSuccess } from "../redux/user/userSlice";
export default function Header({ role }: { role: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.value);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      const res = await api.logout(currentUser._id);
      console.log(res)
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
                  <Link to={"/dashboard?tab=profile"}>
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
        <div>
          <h1>User Dashboard</h1>
        </div>
      )}
    </div>
  );
}
