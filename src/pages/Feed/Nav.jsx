import React from "react";
import { navSections } from "../../utils/constant";
import { BiDoorOpen } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img className="w-14 mb-4 " src="/x-logo.webp" alt="" />

        {navSections.map((i, index) => (
          <div
            key={index}
            className=" flex items-center gap-2 text-2xl md:text-lg p-3 cursor-pointer rounded-lg transition hover:bg-[#505050b7] max-md:justify-center"
          >
            {i.icon}
            <span className=" whitespace-nowrap max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>

      <div>
        {!user ? (
          <div className=" w-12 h-12 bg-gray-400 opacity-50 rounded-full animate-bounce" />
        ) : (
          <div className="flex flex-col gap-3 p-1 items-center max-md:items-end">
            <div className=" flex flex-col  gap-2 justify-center items-center md:px-6">
              <img className=" w-12 h-12 rounded-full" src={user.photoURL} />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <button
              onClick={() => signOut(auth)}
              className="flex justify-center w-12 h-12 p-1 items-center bg-zinc-700 rounded text-3xl md:text-[20px] transition hover:bg-zinc-900"
            >
              <BiDoorOpen />
            </button>

            <span className=" max-md:hidden">Log Out</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
