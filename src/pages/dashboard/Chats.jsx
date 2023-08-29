import { Box, Stack, Typography, IconButton, Button, Divider } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import Search from "../../components/search-custom-components/Search";
import InputBase from "../../components/search-custom-components/InputBase";
import SearchIconWrapper from "../../components/search-custom-components/SearchIconWrapper";
import ChatElement from "../../components/ChatElement";

function Chats() {
  return (
    <Box
      height="100vh"
      sx={{ width: 300, boxShadow: "0px 0px 2px rgba(0,0,0.25)" }}
    >
      <Stack p={3} spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
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
            <ArchiveBox size={20}/>
            <Button>Archive</Button>
          </Stack>
          <Divider/>
        </Stack>
        <ChatElement/>
      </Stack>
    </Box>
  );
}

export default Chats;
