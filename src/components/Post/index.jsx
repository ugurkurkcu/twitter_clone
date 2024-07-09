import React, { useState } from "react";
import UserInfo from "./UserInfo";
import Content from "./Content";
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    deleteDoc(tweetRef)
      .then(() => toast.success("Tweet has been removed"))
      .catch((err) => toast.error("Error has been occured removing tweet"));
  };

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const toggleLike = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className=" flex gap-3 border-b py-5 px-3 border-zinc-600">
      <img
        className=" w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />
      <div className=" w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <UserInfo tweet={tweet} />
          {auth.currentUser.uid === tweet.user.id && (
            <Dropdown handleDelete={handleDelete} handleEdit={handleEdit} />
          )}
        </div>
        <div className=" flex ">
          {isEditMode ? (
            <EditMode close={() => setIsEditMode(false)} tweet={tweet} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>
        <Buttons
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeCount={tweet.likes.length}
        />
      </div>
    </div>
  );
};

export default Post;
