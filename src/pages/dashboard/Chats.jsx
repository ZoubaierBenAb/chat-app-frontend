import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import Search from "../../components/search-custom-components/Search";
import InputBase from "../../components/search-custom-components/InputBase";
import SearchIconWrapper from "../../components/search-custom-components/SearchIconWrapper";
import ChatElement from "../../components/ChatElement";

import { SimpleBarStyle } from "../../components/ScrollBar";
import { useState,useEffect } from "react";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { dispatch } from "../..";
import { FetchDirectConversations } from "../../state/slices/conversation";
 
function Chats() {
  const [openDialog, setOpenDialog] = useState(false);
  const {user_id} = useSelector((state)=>state.auth)

  const {conversations} = useSelector((state) => state.conversation.direct_chat);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log(data); // this data is the list of conversations
      // dispatch action

      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, []);
  return (
    <>
      <Box
        height="100vh"
        sx={{ width: 320, boxShadow: "0px 0px 2px rgba(0,0,0.25)" }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass />
              </SearchIconWrapper>
              <InputBase
                placeholder="Search...."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          <Stack spacing={1.5}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <ArchiveBox size={20} />
              <Button>
                <Typography
                  color="secondary"
                  variant={"body2"}
                  sx={{ fontWeight: "bold" }}
                >
                  Archive
                </Typography>
              </Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
            <SimpleBarStyle>
              {/*        <Stack spacing={2.4}>
                <Typography variant="subtitle2">Pinned</Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>*/ }
      
              <Stack spacing={2.4}>
                <Box></Box>
                <Typography variant="subtitle2">Chats</Typography>
                {conversations.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
}

export default Chats;
