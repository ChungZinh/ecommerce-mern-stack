import Countdown from "react-countdown";
import { HiOutlineShoppingCart, HiStar } from "react-icons/hi";

export default function CardDeal({
  image,
  time,
}: {
  image: string;
  time: number;
}) {
  return (
    <div className="w-[250px] h-[300px] relative">
      <img src={image} alt="" className="w-full" />
      <Countdown
        date={Date.now() + time}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return (
              <span className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded">
                Deal has expired!
              </span>
            );
          } else {
            return (
              <div className="absolute w-full bottom-0">
                <div className=" flex items-center justify-center gap-4">
                  <div className="w-10 h-12 flex flex-col justify-center items-center bg-white rounded-md">
                    <span className="font-semibold text-[#3BB67F]">{days}</span>
                    <span className="text-xs text-neutral-400">Days</span>
                  </div>
                  <div className="w-10 h-12 flex flex-col justify-center items-center bg-white rounded-md">
                    <span className="font-semibold text-[#3BB67F]">
                      {hours}
                    </span>
                    <span className="text-xs text-neutral-400">Hours</span>
                  </div>
                  <div className="w-10 h-12 flex flex-col justify-center items-center bg-white rounded-md">
                    <span className="font-semibold text-[#3BB67F]">
                      {minutes}
                    </span>
                    <span className="text-xs text-neutral-400">Mins</span>
                  </div>
                  <div className="w-10 h-12 flex flex-col justify-center items-center bg-white rounded-md">
                    <span className="font-semibold text-[#3BB67F]">
                      {seconds}
                    </span>
                    <span className="text-xs text-neutral-400">Sec</span>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center mt-4">
                  <div className="flex flex-col bg-white w-[200px] p-3 rounded-md shadow-md ">
                    <h1 className="text-sm font-semibold ">
                      Seeds of Change Organic Quinoa, Brown
                    </h1>
                    <div className="w-full flex justify-between items-center">
                      <HiStar className="text-[#FFD700] text-sm" />
                      <p className="text-sm text-neutral-300"> (4.0)</p>
                    </div>
                    <p className="text-start text-xs font-semibold items-center">
                      By<span className="text-[#3BB67F]"> NestFood</span>
                    </p>

                    <div className="flex justify-between mt-2">
                      <div className=" flex gap-2 items-center *:text-xs">
                        <p className="text-[#3BB67F] text-sm font-semibold">
                          $32.85
                        </p>
                        <p className="text-neutral-500 font-semibold line-through text-xs">
                          $33.8
                        </p>
                      </div>
                      <button className="flex  items-center bg-[#D9F1E4] p-1 rounded-md">
                        <HiOutlineShoppingCart className="text-[#3BB67F] text-sm" />
                        <span className="text-[#3BB67F] text-sm">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }}
      />
    </div>
  );
}
