import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./SideNav.jsx";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket.js";
import { showSnackBar } from "../../state/slices/snackBar.js";
import { dispatch } from "../..";
import { SelectConvo, FetchUsers } from "../../state/slices/users.js";
import {
  AddDirectConversations,
  UpdateDirectConversations,
  AddDirectMessage,
  FetchDirectConversations,
} from "../../state/slices/conversation.js";
import CallNotification from "../../sections/main/audio/CallNotification.jsx";
import {
  PushToAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../state/slices/audioCall.js";
import {
  PushToVideoCallQueue,
  UpdateVideoCallDialog,
} from "../../state/slices/videoCall.js";

function DashboardLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const theme = useTheme();
;
const user_id = window.localStorage.getItem('user_id')
  useEffect(() => {
    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
    window.onload();
  }, [isLoggedIn]);

  useEffect(() => {
    const initializeSocket = () => {
      if (!socket) {
        connectSocket(user_id);
      }
      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("request sent", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("friend_request_accepted", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id ? true : false,
              outgoing: message.from === user_id ? true : false,
            })
          );
        }
      });
      socket.on("start_chat", (data) => {
        console.log("8:06", data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(UpdateDirectConversations({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversations({ conversation: data }));
        }
        dispatch(SelectConvo({ room_id: data._id }));
      });
    };

    if (isLoggedIn) {
      initializeSocket();
    }

    return () => {
      // Cleanup code
      socket?.off("new_friend_request");
      socket?.off("request sent");
      socket?.off("friend_request_accepted");
      socket?.off("new_message");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket]);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.alt }} display="flex">
      <SideNav />
      <Outlet />
    </Box>
  );
}

export default DashboardLayout;
