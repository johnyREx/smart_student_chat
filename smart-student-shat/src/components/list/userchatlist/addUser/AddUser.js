import { useState } from "react";
import "./addUser.css";
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
    QuerySnapshot,
    setDoc,
    updateDoc,
    arrayUnion,
  } from "firebase/firestore";
import { db } from "../../../../db/firebase";
import { useUserStore } from "../../../../db/userStore";
function AddUser({setAddUser}) {
    const { currentUser } = useUserStore()
    const [user, setUser] = useState(null);
const handleSearch = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")

    try {
        const q = query(collection(db, "users"), where("username", "==", username));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            setUser(snapshot.docs[0].data());
          }
    } catch (error) {
        console.log(error)
    }
}
const handleAdd = async(e) => {
    e.preventDefault()

    const chatRef = collection(db, "chats")
    const userChatRef = collection(db, "chatUser")

    const newChatRef = doc(chatRef)
    console.log(newChatRef.id)
    try {
        const newChatRef = doc(chatRef);
  
        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          messages: [],
        });
  
        await updateDoc(doc(userChatRef, user.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        });
  
        await updateDoc(doc(userChatRef, currentUser.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      } catch (err) {
        console.log(err);
      }finally {
        setAddUser(false)
      }

}
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="usser">
          <div className="dettail">
            <img src={user.avatar || "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}

export default AddUser;