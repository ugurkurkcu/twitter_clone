import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    const tweetCol = collection(db, "tweets");

    onSnapshot(tweetCol, (snapshot) => {
      setCount(snapshot.size);
    });
  }, []);

  return (
    <div className=" max-xl:hidden p-4">
      <span>{count > 0 && count}</span>
      <span>{!count ? "" : count === 1 ? " post" : count > 1 && " posts"}</span>
    </div>
  );
};

export default React.memo(Aside);
