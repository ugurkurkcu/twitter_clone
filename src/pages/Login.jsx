import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isForgotPass, setIsForgotPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Account created");
          navigate("/home");
        })
        .catch((err) => toast.error("An error occured" + err.code));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Signed In Successfully");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("An error occured:" + " " + err.code);
          err.code === "auth/invalid-credential" && setIsForgotPass(true);
        });
    }
  };

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Reset link has been sent to your email"))
      .catch((err) => toast.error("An error occured: " + err.code));
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Signed In Successfully");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("An error occured:" + " " + err.code);
        err.code === "auth/invalid-credential" && setIsForgotPass(true);
      });
  };
  return (
    <section className=" h-screen grid place-items-center">
      <div className=" bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className=" h-[60px]" src="/x-logo.webp" />
        </div>

        <h1 className=" text-lg font-bold text-center">Login to Twitter</h1>

        <button
          onClick={handleGoogle}
          className=" bg-white flex items-center py-2 px-10 rounded-full gap-3 transition-none hover:bg-gray-300 text-black whitespace-nowrap"
        >
          <img className=" h-[20px]" src="/google-logo.svg" alt="" />
          Login Via Google
        </button>

        <form onSubmit={handleSubmit} className=" flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=" text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
          />
          <label className=" mt-5">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className=" text-black rounded mt-1 p-2 outline-none shadow-lg  focus:shadow-[gray]"
            type="password"
          />

          <button className=" mt-10 text-black rounded-full p-1 transition hover:bg-gray-300 bg-white">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="mt-5">
            <span className="text-gray-500">
              {isSignup ? "Have an account?" : "Don't have an account?"}
            </span>
            <span
              onClick={() => setIsSignup(!isSignup)}
              className=" ms-2 text-blue-500 cursor-pointer"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>

        {isForgotPass && (
          <p
            onClick={handleReset}
            className=" text-red-500 opacity-80 text-center cursor-pointer"
          >
            Forgot your password?
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
