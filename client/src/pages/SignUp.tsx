import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent } from "react";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userSlice";
import { api } from "../api/api";

interface FormData {
  email: string;
  mobile: string;
  password: string;
}

export default function SignUp() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({} as FormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpStart());
    try {
      const res = await api.signUp(formData);
      if (res.data) {
        dispatch(signUpSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure(error));
    }
  };

  return (
    <div className="flex flex-1 mx-auto h-screen justify-center items-center ">
      <div className="h-[600px] w-[400px] bg-white shadow-md rounded-md p-4 dark:bg-[#1F2937]">
        <h1 className="font-semibold text-xl">Create an Account</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-sm text-neutral-500">
                Email
              </Label>
              <TextInput
                sizing={"xl"}
                type="text"
                className="border-0"
                placeholder="Your email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-sm text-neutral-500">
                Phone
              </Label>
              <div className="flex gap-4 ">
                <TextInput
                  sizing={"xl"}
                  type="text"
                  className="border-0 w-1/4 "
                  placeholder="+84"
                  id="country-code"
                />
                <TextInput
                  sizing={"md"}
                  type="text"
                  className="border-0 w-3/4"
                  placeholder="Phone"
                  id="mobile"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-sm text-neutral-500">
                Password
              </Label>
              <TextInput
                sizing={"md"}
                type="password"
                className="border-0"
                placeholder="Your password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <p className="text-sm text-neutral-400 text-center">
              By signing up, you confirm that you've read and accepted our User
              Notice and Privacy Policy
            </p>

            <Button
              color={"green"}
              className="bg-[#3BB67F] hover:text-neutral-500 text-white font-semibold"
              size="lg"
              type="submit"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
          <p className="text-center mt-4 text-sm text-neutral-400">
            or sign up with{" "}
          </p>

          <div className="w-full mt-4">
            <OAuth type="sign-up" />
          </div>

          <p className="text-center mt-6 text-sm text-neutral-400">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-green-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
