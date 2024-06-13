import { useEffect, useRef, useState } from "react";
import { signal, useSignal } from "@preact/signals-react";
import { MdAddCircle } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import db from "../db/firebase";
import SearchAppBar from "./search";

import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import RoomChat from "./roomChat";


 function Home() {
    const [currentChatRoom, setCurrentChatRoom] = useState([])
    const [chatRooms, setChatRooms] = useState([
      { image: "Loading...", name: "Loading..." },
    ]);
    const messageRef = useRef()

    useEffect(() => {
      const q = query(collection(db, "chat-rooms"), orderBy("timeStamp", "desc"));
  
      const ress = onSnapshot(q, (snapshot) =>
        setChatRooms(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      return ress;
    }, []);
    const selectChatRoom = (data) => {
      setCurrentChatRoom(data);
    }
    const sendMessage = async () => {
        const payload = {
            message: messageRef.current.value,
            msgType: 'recieved'
        }
        await addDoc(collection(db, `chat-rooms/${currentChatRoom.id}/messages`), payload);
        console.log("message sent secessfully");
        console.log(messageRef.current.value);
        messageRef.current.value = ''

    }
    // console.log(chatRooms);
    const singleRooms = signal("Ibnuj");
    return (
      <div className="chat">
        <header className="chat-rooms">
          <div className="search-rooms">
            <SearchAppBar />
          </div>
          {chatRooms.map((group) => (
            <li key={group.id} onClick={()=>selectChatRoom(group)}>
              <img src={group.image} alt={group.name} />
              <p>{group.name}</p>
            </li>
          ))}
          <div className="add-room">
            <input placeholder="Add Room" />
            <MdAddCircle id="add-icon" />
          </div>
        </header>
        <section className="single-room">
          <div className="single-room-nav">
            <img src={currentChatRoom.image} />
            <p>{currentChatRoom.name}</p>
          </div>
          <div className="single-room-body">
            <RoomChat path={`chat-rooms/${currentChatRoom.id}/messages`}/>
          </div>
          <div className="send-message">
            <input placeholder="Send a message" ref={messageRef}/>
            <IoSend id="send-btn" onClick={sendMessage}/>
          </div>
        </section>
      </div>
    );
};
export default Home