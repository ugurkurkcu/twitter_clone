import React from "react";

const Content = ({ tweet }) => {
  return (
    <div>
      {tweet.textContent && <p>{tweet.textContent}</p>}

      {tweet.imageContent && (
        <a href={tweet.imageContent} target="#">
          <img className=" rounded-lg my-2 object-cover w-full max-h-[400px]" src={tweet?.imageContent} alt="img" />
        </a>
      )}
    </div>
  );
};

export default Content;
