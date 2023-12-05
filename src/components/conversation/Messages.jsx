import { Stack, Box } from "@mui/material";
import { Chat_History } from "../../data";
import {
  Timeline,
  ImageMessage,
  DocMessage,
  LinkMessage,
  TextMessage,
  ReplyMessage,
} from "./MessageTypes";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../state/slices/conversation";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { dispatch } from "../..";
import { useEffect } from "react";

function Messages({ menu, isMobile }) {
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.users);
  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      console.log(data, "List of messages");
      dispatch(FetchCurrentMessages({ messages: data }));
    });
    dispatch(SetCurrentConversation(current));
  }, []);
  return (
    <Box width={"100%"} sx={{ flexGrow: 1 }} p={isMobile ? 1 : 3} >
      <Stack spacing={3} p={3}>
        {current_messages.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return <Timeline el={el} menu={menu} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <ImageMessage el={el} menu={menu} />;

                case "doc":
                  return <DocMessage el={el} menu={menu} />;

                case "link":
                  return <LinkMessage el={el} menu={menu} />;

                case "reply":
                  return <ReplyMessage el={el} menu={menu} />;

                default:
                  return <TextMessage el={el} menu={menu} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
}

export default Messages;
