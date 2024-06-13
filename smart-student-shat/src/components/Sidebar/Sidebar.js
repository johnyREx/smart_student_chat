import "./sidebar.css";
import { AiFillMessage } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { IoVideocam } from "react-icons/io5";
import { useUserStore } from "../../db/userStore";
import { LogOut } from "../../db/firebase";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
function Sidebar() {
  const { currentUser, isChatRoom, isLoading, fetchUserInfo, changeChatType } =
    useUserStore();

  const handleChatType = (type) => {
    changeChatType(type);
  };
  return (
    <div className="side-bar">
          <div className="top">
            <img
              src="https://th.bing.com/th/id/R.0c033ff47449ad26c2c1b79e48ee9d59?rik=8hCCD5JbHoUxVg&pid=ImgRaw&r=0"
              alt="logo"
            />
            <img
              src={
                currentUser?.avatar ||
                "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png"
              }
              alt="Profile"
            />
            <p>{currentUser?.username}</p>
          </div>
          <div className="middle">
            <AiFillMessage
              className="side-icons"
              onClick={() => handleChatType("userChats")}
            />
            <HiUserGroup
              className="side-icons"
              onClick={() => handleChatType("chatRooms")}
            />
            <IoVideocam className="side-icons" />
          </div>
          <div className="bottom">
            <IoMdSettings className="side-icons" />
            <TbLogout2 className="side-icons" onClick={() => LogOut()} />
          </div>
    </div>
  );
}

export default Sidebar;