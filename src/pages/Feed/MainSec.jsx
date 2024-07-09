import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const MainSec = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    const tweetsCol = collection(db, "tweets");

    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const temp = [];
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setTweets(temp);
    });
    return () => unsub();
  }, []);
  return (
    <div className=" border border-y-0 border-zinc-600 overflow-y-auto">
      <header className=" font-bold p-4 border-b border-zinc-600">
        Main Page
      </header>

      <Form user={user} />

      {!tweets ? (
        <div className=" w-full h-1/2 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet, index) => <Post key={index} tweet={tweet} />)
      )}
    </div>
  );
};

export default MainSec;
