import { Button, Spinner, Textarea, TextInput } from "flowbite-react";
import map from "../assets/images/map.png";
import { HiLocationMarker } from "react-icons/hi";
import contact_user from "../assets/images/contact_user.png";
import { useState } from "react";
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export default function Contact() {
  const [formData, setFormData] = useState({} as FormData);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("http://localhost:3000/api/contact/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="lg:max-w-screen-2xl  mx-auto md:w-full px-4 mt-20">
      <div className="lg:max-w-screen-xl mx-auto flex gap-4">
        <div className="w-1/3 flex flex-col gap-4">
          <h1 className="text-[#3BB67F]">How can help you?</h1>
          <h1 className="text-2xl font-semibold">
            Let us know how we can help you
          </h1>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="w-2/3 grid grid-cols-2 flex-wrap gap-4">
          <div className="flex flex-col gap-4 ">
            <h1 className="font-semibold">01. Visit Feedback</h1>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <h1 className="font-semibold">02. Employee Services</h1>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <h1 className="font-semibold">03. Billing Inquiries</h1>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <h1 className="font-semibold">04. Genaral Inquiries</h1>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <img src={map} alt="" />
      </div>

      <div className="lg:max-w-screen-xl mx-auto  gap-4 grid grid-cols-3 mt-12">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#3BB67F]">Office</h1>
          <p className="text-xs text-neutral-400">
            205 NButtonorth Michigan Avenue, Suite 810
          </p>
          <p className="text-xs text-neutral-400">Chicago, 60601, USA</p>
          <p className="text-xs text-neutral-400">Phone: (123) 456-7890</p>
          <p className="text-xs text-neutral-400">Email: contact@Evara.com</p>
          <Button className="bg-[#3BB67F]">
            <HiLocationMarker className="text-xs" />
            <span>View map</span>
          </Button>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#3BB67F]">Studio</h1>
          <p className="text-xs text-neutral-400">
            205 North Michigan Avenue, Suite 810
          </p>
          <p className="text-xs text-neutral-400">Chicago, 60601, USA</p>
          <p className="text-xs text-neutral-400">Phone: (123) 456-7890</p>
          <p className="text-xs text-neutral-400">Email: contact@Evara.com</p>
          <Button className="bg-[#3BB67F]">
            <HiLocationMarker className="text-xs" />
            <span>View map</span>
          </Button>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#3BB67F]">Shop</h1>
          <p className="text-xs text-neutral-400">
            205 North Michigan Avenue, Suite 810
          </p>
          <p className="text-xs text-neutral-400">Chicago, 60601, USA</p>
          <p className="text-xs text-neutral-400">Phone: (123) 456-7890</p>
          <p className="text-xs text-neutral-400">Email: contact@Evara.com</p>
          <Button className="bg-[#3BB67F]">
            <HiLocationMarker className="text-xs" />
            <span>View map</span>
          </Button>
        </div>
      </div>

      <div className="lg:max-w-screen-xl mx-auto  gap-4 mt-12  ">
        <div className="w-full flex">
          <div className="w-2/3 space-y-4">
            <h1 className="text-xl font-semibold text-[#3BB67F]">
              Contact form
            </h1>
            <h1 className="text-4xl font-semibold">Drop Us a Line</h1>
            <p className="text-xs text-neutral-400">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                <TextInput
                  placeholder="Your Name"
                  id="name"
                  onChange={handleChange}
                />
                <TextInput
                  placeholder="Your Email"
                  id="email"
                  onChange={handleChange}
                />
                <TextInput
                  placeholder="Your Phone"
                  id="phone"
                  onChange={handleChange}
                />
                <TextInput
                  placeholder="Subject"
                  id="subject"
                  onChange={handleChange}
                />
              </div>
              <Textarea rows={"4"} id="message" onChange={handleChange} />
              <Button type="submit">
                {loading ? (
                  <div className="">
                    <Spinner size={"sm"} />
                    <span className="pl-3">Loading...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
          <div className="w-1/3 flex justify-end items-center">
            <img src={contact_user} alt="" className="w-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
