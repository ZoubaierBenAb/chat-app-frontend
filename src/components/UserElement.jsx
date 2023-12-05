import {
  Avatar,
  Typography,
  styled,
  Stack,
  Button,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { StyledBadge } from "./StyledBadge";
import { socket } from "../socket";
import { Chat } from "phosphor-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteRequest, SelectConvo } from "../state/slices/users";
import { dispatch } from "..";
import { AddDirectConversations, FetchCurrentMessages, FetchDirectConversations, SetCurrentConversation } from "../state/slices/conversation";
const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));



const UserElement = ({ img, firstName, lastName, online, _id }) => {
  const theme = useTheme();
const user_id = useSelector((state)=>state.auth.user_id)
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("friend_request", { to: _id, from: user_id }, () => {
                alert("request sent");
              });
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};


const FriendRequestElement = ({
  img,
  firstName,
  lastName,
  online,
  id,
}) => {
  const theme = useTheme();

  const user_id = useSelector((state)=>state.auth.user_id)
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              //  emit "accept_request" event
              socket.emit("accept_request", { request_id: id });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

// FriendElement

const FriendElement = ({
  img,
  firstName,
  lastName,
  incoming,
  missed,
  online,
  _id,
}) => {
  const theme = useTheme();
  const user__id = useSelector((state) => state.auth.user_id);
  const {room_id} = useSelector((state)=>state.users)
  const {conversations} = useSelector((state)=>state.conversation.direct_chat)
  const name = `${firstName} ${lastName}`;
 ;

  const handleStartConversation = async () => {

    socket.emit("start_conversation", { to: _id, from: user__id });
    const chatDetailsPromise = new Promise((resolve) => {
      socket.on("start_chat", (details) => {
        resolve(details);
      });
    });
    const chatDetails = await chatDetailsPromise;
    
    console.log('chatDetails',chatDetails)
    dispatch(AddDirectConversations({conversation : chatDetails}))
   
    dispatch(SelectConvo({ room_id: chatDetails._id }));
  
  
    
    socket.emit('get_messages', { conversation_id: chatDetails._id }, (messages) => {
      console.log('messages',messages)
      dispatch(FetchCurrentMessages({ messages }));
    });
    const current = conversations.find((el)=>el?.id === room_id)
    console.log('current',current)
    dispatch(SetCurrentConversation(current))
  };
  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={handleStartConversation}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserElement, FriendRequestElement, FriendElement };
