import "./App.css";
import { signal, useSignal } from "@preact/signals-react";
import Sidebar from "./components/sidebar/Sidebar";
import Chatlist from "./components/list/List";
import Chats from "./components/chat/chat";
import Detail from "./components/detail/detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import DefaultPage from "./components/defaultPage/DefaultPage";
import { useEffect, useState } from "react";
import { useUserStore } from "./db/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, UseAuth } from "./db/firebase";
import { useChatStore } from "./db/chatStore";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function App() {
  const [login, setLogin] = useState(false);
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <div className="container">
      {isLoading ? (
        <Box padding="1" boxShadow="lg"  width="90vw" height="100%">
          <SkeletonCircle size="10" />
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
       ) : (
        <>
          {currentUser ? (
            <>
              <Sidebar />
              <Chatlist />
              {chatId ? (
                <>
                  <Chats />
                  <Detail />
                </>
              ) : (
                <DefaultPage />
              )}
            </>
          ) : (
            <Login />
          )}
        </>
      )}
      <Notification />
    </div>
  );
  
}

export default App;