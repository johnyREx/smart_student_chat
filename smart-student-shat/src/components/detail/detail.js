import "./detail.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { LogOut, auth, db } from "../../db/firebase";
import { useUserStore } from "../../db/userStore";
import { useChatStore } from "../../db/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    const docRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(docRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img
          src={
            user?.avatar ||
            "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
          }
          alt=""
        />
        <h2>{user?.username}</h2>
        {/* <p>Master your skill in React.</p> */}
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <IoIosArrowDown />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <IoIosArrowDown />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <IoIosArrowUp />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="/salaf.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <HiDownload />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="/muslim.jpg"
                  alt=""
                />
                <span>photo_2024_3.png</span>
              </div>
              <HiDownload />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="/selefiyah.jpg"
                  alt=""
                />
                <span>photo_2024_4.png</span>
              </div>
              <HiDownload />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <IoIosArrowDown />
          </div>
        </div>
        <button onClick={handleBlock} disabled={isCurrentUserBlocked} >{isCurrentUserBlocked? "You are Blocked" : isReceiverBlocked? "Unblock User" : "Block User"}</button>
      </div>
    </div>
  );
};

export default Detail;