import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <p className="text-[#4F46E5] font-bold text-lg">SUCCESS</p>
      <h1 className="text-2xl sm:text-5xl font-bold text-gray-950 text-center   ">
        Your order has been placed! 🎉
      </h1>
      <p className="text-gray-600 font-bold text-lg ">
        Thank you for your purchase!
      </p>
      <button className="bg-[#4F46E5] text-white px-3.5 py-2.5 rounded-lg mt-10 ">
        <Link className="flex items-center justify-center gap-2 font-semibold " href={"/"}>Continue shopping<FaArrowRightLong/></Link>
      </button>
    </div>
  );
};

export default page;
