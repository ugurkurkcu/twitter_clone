import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";

const Buttons = ({ likeCount, toggleLike, isLiked }) => {
  return (
    <div className=" flex justify-around items-center">
      <div className=" p-3 rounded-full cursor-pointer transition-colors hover:bg-[#001aff56]">
        <LuMessageCircle />
      </div>

      <div className=" p-3 rounded-full cursor-pointer transition-colors hover:bg-[#00ff5e3a]">
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className=" flex items-center gap-3 p-3 rounded-full cursor-pointer transition-colors hover:bg-[#ee00ff4a]"
      >
        {!isLiked ? <FaRegHeart /> : <FaHeart className="text-red-500" />}
        {likeCount}
      </div>

      <div className=" p-3 rounded-full cursor-pointer transition-colors hover:bg-[#4a4a537d]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
