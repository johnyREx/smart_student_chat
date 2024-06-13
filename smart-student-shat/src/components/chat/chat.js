import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { MdOutlinePhone } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../db/firebase";
import { useChatStore } from "../../db/chatStore";
import { useUserStore } from "../../db/userStore";
import upload from "../../db/upload";
import { toast } from "react-toastify";

function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const endRef = useRef();
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const f = new Intl.DateTimeFormat("en-us", {
    // dateStyle: "short",
    // weekday: "narrow",
    timeStyle: "short",
  });
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unsub();
    };
  }, [chatId]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
    toast.success("hello")
    console.log(chat);
  };
  const handleSend = async () => {
    if (text === "" && !img.file) {
      return;
    }

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "chatUser", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setText("");
      setImg({
        file: null,
        url: "",
      });
    }
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img
            src={
              user?.avatar ||
              "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
            }
            alt=""
          />
          <div className="texts">
            <span>{user?.username || "Username"}</span>
          </div>
        </div>
        <div className="icons">
          <MdOutlinePhone />
          <IoVideocam />
          <FaCircleInfo />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              {message.text &&<p>{message.text}</p>}
              <span>{f.format(message.createdAt.toDate())}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <MdAddPhotoAlternate />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <FaCamera />
          <FaMicrophone />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <GrEmoji onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} disabled={isCurrentUserBlocked || isReceiverBlocked}/>
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
export default Chat;