import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  isChatRoom: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false, isChatRoom: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        return set({ currentUser: docSnap.data(), isLoading: false,  isChatRoom: false, });
        // return set((state)=> ({...state, currentUser: docSnap.data(), isLoading: false }))
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        // return set({ currentUser: null, isLoading: false });
        return set((state)=> ({...state, currentUser: null, isLoading: false}))
      }
    } catch (error) {
      console.log(error);
      // return set({ currentUser: null, isLoading: false });
      return set((state)=> ({...state, currentUser: null, isLoading: false}))
    }
  },
  changeChatType: (chatType) => {
    if (chatType === "chatRooms") {
      console.log("chat changed to chatRooms")
      return set((state)=> ({...state, isChatRoom: true}))
    }else {
      console.log("chat changed to userChats")
      return set((state)=> ({...state, isChatRoom: false}))
    } 
  }
}));