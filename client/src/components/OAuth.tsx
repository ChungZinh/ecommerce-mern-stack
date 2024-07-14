import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
export default function OAuth({ type }: { type: string }) {
  return (
    <>
      {type === "sign-up" ? (
        <div className="w-full gap-4 flex flex-row">
          <Button
            outline
            color={"green"}
            className="bg-[#3BB67F] hover:text-black text-white font-semibold w-full "
            size="lg"
          >
            <div className="flex items-center gap-4">
              <FcGoogle className="text-xl" /> <span>Google</span>
            </div>
          </Button>
          <Button
            outline
            color={"green"}
            className="bg-[#3BB67F] hover:text-black text-white font-semibold w-full "
            size="lg"
          >
            <div className="flex items-center gap-4">
              <FaFacebookSquare className="text-xl text-blue-900" />{" "}
              <span>Facebook</span>
            </div>
          </Button>
        </div>
      ) : (
        <div className="w-full gap-4 flex flex-col">
          <Button
            outline
            color={"green"}
            className="bg-[#3BB67F] hover:text-black text-white font-semibold w-full "
            size="xl"
          >
            <div className="flex items-center gap-4">
              <FcGoogle className="text-xl" /> <span>Sign in using Google</span>
            </div>
          </Button>

          <Button
            outline
            color={"green"}
            className="bg-[#3BB67F] hover:text-black text-white font-semibold w-full "
            size="xl"
          >
            <div className="flex items-center gap-4">
              <FaFacebookSquare className="text-xl text-blue-900" />{" "}
              <span>Sign in using Facebook</span>
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
