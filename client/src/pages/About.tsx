import about1 from "../assets/images/about_img/image/about1.png";
import session from "../assets/images/about_img/image/session.png";
import iconOffer from "../assets/images/about_img/icon/offer.png";
import iconDeal from "../assets/images/about_img/icon/deal.png";
import iconWide from "../assets/images/about_img/icon/wide_assortment.png";
import iconReturn from "../assets/images/about_img/icon/easy_return.png";
import iconDeliveru from "../assets/images/about_img/icon/free_delivery.png";
import iconSatsfacton from "../assets/images/about_img/icon/transaction.png";
import about2 from "../assets/images/about_img/image/about2.png";
import about3 from "../assets/images/about_img/image/about3.png";
import member1 from "../assets/images/about_img/image/member1.png";
import member2 from "../assets/images/about_img/image/member2.png";
import { Button } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitch,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
export default function About() {
  return (
    <div className=" lg:max-w-screen-xl  mx-auto md:w-full px-4 mt-20">
      <div className="w-full lg:flex md:flex ">
        <div className="w-1/2">
          <img
            src={about1}
            alt=""
            className="lg:max-w-[500px] md:max-w-[380px] "
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-center">
          <h1 className="text-xl font-semibold">Welcome to Nest</h1>
          <p className="lg:text-sm md:text-xs text-neutral-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate id est laborum.
          </p>
          <p className="lg:text-sm md:text-xs text-neutral-400">
            Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta
            et Ut placerat legendos interpre.Donec vitae sapien ut libero
            venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis
            commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut
            ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate id
            est laborum.
          </p>
          <div className="flex justify-center items-center">
            <img src={session} alt="" className="md:h-[150px] lg:h-[200px]" />
          </div>
        </div>
      </div>

      <div className="">
        <h1 className="text-xl font-semibold">What We Provide?</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-4 flex-wrap gap-4">
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconOffer} alt="" className="w-[60px]" />
            <p className="font-semibold">Best Price & Offers</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconWide} alt="" className="w-[60px]" />
            <p className="font-semibold">Wide Assortment</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconDeliveru} alt="" className="w-[60px]" />
            <p className="font-semibold">Free Delivery</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconReturn} alt="" className="w-[60px]" />
            <p className="font-semibold">Easy Returns</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconSatsfacton} alt="" className="w-[60px]" />
            <p className="font-semibold">100% Satisfaction</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
          <div className="flex items-center justify-center flex-col border border-neutral-200  rounded-md gap-2 p-2">
            <img src={iconDeal} alt="" className="w-[60px]" />
            <p className="font-semibold">Great Daily Deal</p>
            <p className="text-sm text-neutral-400 text-center">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form
            </p>
            <button className="text-sm text-[#3BB67F] cursor-pointer">
              Read more
            </button>
          </div>
        </div>
      </div>

      <div className=" w-full mt-12 flex ">
        <div className="w-1/2">
          <img src={about2} alt="" />
        </div>
        <div className="flex flex-col justify-center gap-4 w-1/2">
          <p className="text-base text-neutral-400">Our performance</p>
          <h1 className="text-2xl font-semibold">
            Your Partner for e- commerce grocery solution
          </h1>
          <p className="text-xs text-neutral-400">
            Ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto
          </p>
          <p className="text-xs text-neutral-400">
            Pitatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia
          </p>
        </div>
      </div>

      <div className="w-full flex mt-12 gap-24">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Who we are</h1>
          <p className="text-sm text-neutral-400">
            Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim
            ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac
            odio orci ultrices in.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Our history</h1>
          <p className="text-sm text-neutral-400">
            Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim
            ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac
            odio orci ultrices in.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Our mission</h1>
          <p className="text-sm text-neutral-400">
            Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim
            ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac
            odio orci ultrices in.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-12">
        <img src={about3} alt="" />
      </div>

      <div className="mt-12 pb-12">
        <h1 className="text-xl font-semibold">What We Provide?</h1>
        <div className="w-full flex justify-center gap-4">
          <div className="w-1/3 flex flex-col justify-center gap-4">
            <p className="text-xs text-[#3BB67F]">Our Team</p>
            <h1 className="text-xl font-semibold">Meet Our Expert Team</h1>
            <p className="text-xs text-neutral-400">
              Proin ullamcorper pretium orci. Donec necscele risque leo. Nam
              massa dolor imperdiet neccon sequata congue idsem. Maecenas
              malesuada faucibus finibus.
            </p>
            <p className="text-xs text-neutral-400">
              Proin ullamcorper pretium orci. Donec necscele risque leo. Nam
              massa dolor imperdiet neccon sequata congue idsem. Maecenas
              malesuada faucibus finibus.
            </p>
            <Button className="bg-[#3BB67F]">View All Members</Button>
          </div>
          <div className="w-1/3 flex justify-center relative">
            <img src={member1} alt="" className="w-[350px]" />
            <div
              className="absolute bg-white p-2 rounded-md shadow-md flex flex-col justify-center items-center gap-2
            bottom-[-50px] w-[250px] h-[100px]"
            >
              <h1 className="font-semibold">H. Merinda</h1>
              <p className="text-sm text-neutral-400">CEO & Co-Founder</p>
              <div className="flex gap-2 ">
                <BsFacebook className="text-xs text-[#3BB67F]" />
                <BsTwitter className="text-xs text-[#3BB67F]" />
                <BsInstagram className="text-xs text-[#3BB67F]" />
                <BsYoutube className="text-xs text-[#3BB67F]" />
              </div>
            </div>
          </div>
          <div className="w-1/3  flex justify-center relative">
            <img src={member2} alt="" className="w-[350px]" />
            <div
              className="absolute bg-white p-2 rounded-md shadow-md flex flex-col justify-center items-center gap-2
            bottom-[-50px] w-[250px] h-[100px]"
            >
              <h1 className="font-semibold">Dilan Specter</h1>
              <p className="text-sm text-neutral-400">Head Engineer</p>
              <div className="flex gap-2 ">
                <BsFacebook className="text-xs text-[#3BB67F]" />
                <BsTwitter className="text-xs text-[#3BB67F]" />
                <BsInstagram className="text-xs text-[#3BB67F]" />
                <BsYoutube className="text-xs text-[#3BB67F]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
