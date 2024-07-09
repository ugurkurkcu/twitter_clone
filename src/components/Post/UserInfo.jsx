import moment from "moment";
import React from "react";

const UserInfo = ({ tweet }) => {
  const date = moment(tweet.createdAt?.toDate()).fromNow();

  return (
    <div className=" flex gap-3 items-center whitespace-nowrap flex-wrap">
      <p>{tweet.user.name}</p>

      <p className=" text-gray-400 text-sm">
        @{tweet.user.name.toLowerCase().split(" ").join("_")}
      </p>

      <p className=" text-gray-400 text-sm">{date}</p>
      {tweet.isEdited && <p className=" text-gray-400 text-sm ">*edited</p>}
    </div>
  );
};

export default UserInfo;
