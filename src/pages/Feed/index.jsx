import { useEffect, useState } from "react";
import Aside from "./Aside";
import MainSec from "./MainSec";
import Nav from "./Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const Feed = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);
    });
    return () => unsub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden grid grid-cols-[1fr,minmax(400px,600px),1fr]">
      <Nav user={user} />
      <MainSec user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
