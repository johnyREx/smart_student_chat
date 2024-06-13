import "./userchatlist.css";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../db/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import AddUser from "./addUser/AddUser";
import { useChatStore } from "../../../db/chatStore";
import { format } from "timeago.js";
import DisplayPreview from "./DisplayPreview";

const Userchatlist = () => {
  const [addUser, setAddUser] = useState(false);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const searchRef = useRef();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chatUser", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSlectedChat = async (chat) => {

    const userChats = chats.map((item) => {
      const { user, ...res } = item;
      return res;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "chatUser", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(search)
  );
  return (
    <div className="chat-list">
      <div className="head">
        <div className="title">
          <h3>Messages</h3>
          <p>12</p>
        </div>
        {addUser ? (
          <FiMinus
            className="add-icon"
            onClick={() => setAddUser((prev) => !prev)}
          />
        ) : (
          <MdAdd
            className="add-icon"
            onClick={() => setAddUser((prev) => !prev)}
          />
        )}
      </div>
      <div className="search">
        <IoMdSearch />
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}        />
      </div>
      {filteredChats?.map((chat) => (
        <section
          className="user"
          key={chat.chatId}
          onClick={() => handleSlectedChat(chat)}
        >
          <img
            src={
              chat.user.avatar ||
              "https://th.bing.com/th/id/OIF.sKoYVONqShbLxYUCTvGU5w?rs=1&pid=ImgDetMain"
            }
          />
          <div className="user-info">
            <div className="sub-top">
              <p className="user-name">{chat.user.username}</p>
              <p>{format(chat.updatedAt)}</p>
            </div>
            <div className="sub-btm">
              <div className="message-preview">
                <DisplayPreview text={chat.lastMessage} />
              </div>
              {chat.isSeen ? (
                <IoCheckmarkDone className="seen-marker" />
              ) : (
                <FaCircle
                  className="seen-marker"
                  style={{ color: "#3e37f3" }}
                />
              )}
            </div>
          </div>
        </section>
      ))}
      {addUser && <AddUser setAddUser={setAddUser}/>}
    </div>
  );
};

export default Userchatlist;