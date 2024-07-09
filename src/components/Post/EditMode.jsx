import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

const EditMode = ({ tweet, close }) => {
  const [isPicDel, setIsPicDel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.target[0].value;

    const tweetRef = doc(db, "tweets", tweet.id);

    if (isPicDel) {
      updateDoc(tweetRef, {
        textContent: newTitle,
        isEdited: true,
        imageContent: null,
      })
        .then(() => {
          toast.success("Tweet has been updated");
          close();
        })
        .catch(() => toast.error("Error has been occured updating tweet"));
    } else {
      updateDoc(tweetRef, { textContent: newTitle, isEdited: true })
        .then(() => {
          toast.success("Tweet has been updated");
          close();
        })
        .catch(() => toast.error("Error has been occured updating tweet"));
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" my-4">
      <input
        defaultValue={tweet.textContent}
        className="rounded p-1 text-black"
        type="text"
      />
      <button
        type="submit"
        className=" mx-5 p-1 border border-zinc-500 text-green-400 rounded-xl shadow hover:bg-zinc-700"
      >
        <FaSave />
      </button>
      <button
        type="button"
        onClick={close}
        className=" mx-5 p-1 border border-zinc-500 text-red-400 rounded-xl shadow hover:bg-zinc-700"
      >
        <MdOutlineCancel />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`
                ${isPicDel ? "blur" : ""}
                my-4 rounded-lg w-full object-cover max-h-[400px] `}
            src={tweet.imageContent}
          />
          <button
            type="button"
            onClick={() => setIsPicDel(!isPicDel)}
            className="absolute top-2 right-2 text-xl p-2 transition text-red-600 hover:scale-90 rounded-full shadow-lg bg-[#ffffffa2] shadow-white"
          >
            {isPicDel ? <GiCancel /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </form>
  );
};

export default EditMode;
