import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import useResponsive from "../../hooks/useResponsive";
import { useRef,useEffect} from "react";
import { useSelector } from "react-redux";

function Conversation() {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const messageListRef = useRef(null);
 
  const  current_messages  = useSelector(
    (state) => state.conversation.direct_chat.current_messages
  );

  
  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      sx={{ overflow: "scroll" }}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*Header*/}
      <Header />
      <Box
    ref={messageListRef}
       width={"100%"}
       sx={{
         position: "relative",
         flexGrow: 1,
         overflow: "scroll",
         boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
       }}>
            {/*Msgs */}
     <Messages menu={true} isMobile={isMobile} />
      </Box>
  
      {/* footer */}
      <Footer />
    </Stack>
  );
}

export default Conversation;
