import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
        navigate("/");
      })
      .catch((err) => toast.error("An error occured: " + err.code));
  };
  return (
    <div className=" place-content-center grid gap-5">
      <p className="text-center">home</p>

      <p className="text-center">Welcome {auth.currentUser?.displayName}</p>

      <button
        onClick={handleSignOut}
        className=" w-fit justify-self-center text-center border-2 outline-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
