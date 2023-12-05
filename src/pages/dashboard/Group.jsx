import {
  Box,
  Stack,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import InputBase from "../../components/search-custom-components/InputBase";
import SearchIconWrapper from "../../components/search-custom-components/SearchIconWrapper";
import Search from "../../components/search-custom-components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import CreateGroup from "../../sections/main/CreateGroup";
import { useState } from "react";

function Group() {
    const [openDialog,setOpenDialog] = useState(false)
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/*left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Typography variant={"h5"}>Groups</Typography>
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
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                variant={"body2"}
                component={Link}
                underline="none"
                color={"secondary"}
                sx={{ fontWeight: "bold" }}
              >
                Create New Group
              </Typography>
              <IconButton onClick ={()=>setOpenDialog(true)}>
                <Plus />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              spacing={2}
              sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
            >
              <Stack spacing={2.4}>
                <Typography variant="subtitle2">Pinned</Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2">All Groups</Typography>
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/*right */}
      </Stack>
      {openDialog && <CreateGroup open ={openDialog} handleClose={handleCloseDialog}/>}
    </>
  );
}

export default Group;
