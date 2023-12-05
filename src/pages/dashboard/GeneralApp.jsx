import React from "react";
import { Box, useTheme, Typography, Link, Stack } from "@mui/material";
import { useSelector } from "react-redux";

import Chats from "./Chats";
import Conversation from "../../components/conversation";
import HighlightedMessages from "../../components/HighlightedMessages";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";

function GeneralApp() {
  const { sideBar } = useSelector((state) => state.app);
  const { room_id, chat_type } = useSelector((state) => state.users);

  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.background.alt }} display="flex">
      <Chats />
      <Box
        sx={{
          width: sideBar.isOpen ? "calc(100vw - 720px)" : "calc(100vw - 400px)",
        }}
      >
        {room_id !== null && chat_type === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>
      {sideBar.isOpen &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;
            case "HIGHLIGHTED":
              return <HighlightedMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              return null;
          }
        })()}
    </Box>
  );
}

export default GeneralApp;
