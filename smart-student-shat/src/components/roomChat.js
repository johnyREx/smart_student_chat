import React, { useEffect } from "react";
import { collection } from "firebase/firestore";
import db from "../db/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function RoomChat({ path }) {
  const query = collection(db, path);
  const [docs, loading] = useCollectionData(query);

  useEffect(() => {
    if (docs) {
      docs.forEach((data) => {
        console.log("data: " + data.message);
      });
    }
  }, [docs]); // Run useEffect whenever 'docs' changes

  return (
    <div className="">
      {loading && "Loading..."}
      {docs &&
        docs.map((data) => (
          <ul className={`${data.msgType}-message`} key={Math.random()}>
            <li className={`message ${data.msgType}`}>{data.message}</li>
          </ul>
        ))}
    </div>
  );
}
