import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";
import Loader from "../Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const tweetsCol = collection(db, "tweets");

  const uploadImage = async (file) => {
    if (!file || !file?.type.startsWith("image")) {
      // toast.info("Image is not in correct format");
      return null;
    }

    const imageRef = ref(storage, v4() + file.name);

    try {
      await uploadBytes(imageRef, file);

      return await getDownloadURL(imageRef);
    } catch {
      toast.error("An error occured while uploading file");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value.trim();
    const file = e.target[1].files[0];

    if (!textContent && !file) {
      return toast.info("Please write a content", { position: "bottom-right" });
    }

    setIsLoading(true);

    try {
      const url = await uploadImage(file);

      await addDoc(tweetsCol, {
        textContent: textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (error) {
      toast.error("An error occured while sending your tweet");
      return null;
    }

    setIsLoading(false);

    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1 "
        src={user?.photoURL}
      />

      <div className=" w-full">
        <input
          className=" w-full mt-1 mb-2 bg-transparent outline-none md:text-lg"
          placeholder="What's going on?"
          type="text"
        />

        <div className=" flex justify-between items-center">
          <label
            className=" text-lg transition-[0.6s] cursor-pointer rounded-full py-2 px-7 bg-transparent hover:bg-gray-400 w-0 hover:w-[74px] hover:rounded-full  hover:text-black"
            htmlFor="icon"
          >
            <BsCardImage className=" cursor-pointer" />
          </label>
          <input className="hidden" id="icon" type="file" />
          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800 ">
            {isLoading ? <Loader /> : ""}
            <span>Tweet</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
