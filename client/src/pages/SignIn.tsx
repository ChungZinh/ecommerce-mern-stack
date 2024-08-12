import { Button, Checkbox, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { signInStart, signInSuccess } from "../redux/user/userSlice";
import { api } from "../api/api";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({} as FormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await api.signIn(formData);
      if (res.data.user) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user);
        dispatch(signInSuccess(res.data.user));
        if (res.data.user.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(signInSuccess(error));
    }
  };
  return (
    <div className="flex flex-1  mx-auto h-screen justify-center items-center ">
      <div className="h-[600px] w-[400px] bg-white shadow-md rounded-md p-4 dark:bg-[#1F2937]">
        <h1 className="font-semibold text-xl">Sign in</h1>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-6">
            <TextInput
              sizing={"lg"}
              type="text"
              className="border-0"
              placeholder="username or email"
              id="email"
              onChange={handleChange}
            />
            <TextInput
              sizing={"lg"}
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Checkbox color={"green"} className="" id="remember" />
                <p className="text-xs text-neutral-500">Remember me</p>
              </div>

              <Link to="/forgot-password" className="text-xs text-green-500">
                Forgot password?
              </Link>
            </div>

            <Button
              color={"green"}
              className="bg-[#3BB67F] hover:text-neutral-500 text-white font-semibold"
              size="xl"
              type="submit"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
          <p className="text-center mt-4 text-sm text-neutral-400">
            or sign in with{" "}
          </p>

          <div className="w-full mt-4">
            <OAuth type="sign-in" />
          </div>

          <p className="text-center mt-6 text-sm text-neutral-400">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-green-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
