import './list.css'
import Chatlist from './userchatlist/UserChatList'
import ChatRooms from './chatrooms/chatrooms'
import { useUserStore } from '../../db/userStore'
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
function List() {
  const {currentUser, isChatRoom, isLoading, fetchUserInfo, changeChatType} = useUserStore()

  return (
    <div className='list'>
      {isLoading? (

        <Box padding="1" boxShadow="lg"  width="100%" height="100%">
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
        </Box>
      ):(
        isChatRoom? 
          <ChatRooms /> : 
          <Chatlist/> 
        
      )}
    </div>
  )
}

export default List