import React, { useEffect } from "react";
import { collection } from "firebase/firestore";
import db from "../db/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
// import AddNew from "./addNew";
export default function RoomChat({ path }) {
  const query = collection(db, path);
//  console.log(path)
  const [docs, loading] = useCollectionData(query);
//  useEffect(()=>{
//     {docs?.map((data) => (
//         console.log("data: " + data.name)
//       ))}
//  },[])
  
  return (
    <div className="">
      {loading && "Loading..."}
        {docs?.map((data) => (
      <ul className={`${data.msgType}-message`}>
          <li className={`message ${data.msgType}`} key={Math.random()}>{data.message}</li>
      </ul>
        ))}
        {/* <AddNew path={path} /> */}
    </div>
  );
}