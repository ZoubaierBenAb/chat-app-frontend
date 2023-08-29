import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.jsx";
import { Box,useTheme } from "@mui/material";
import Chats from "../../pages/dashboard/Chats.jsx";

function DashboardLayout() {
  const theme = useTheme()
  return (
    <Box sx={{backgroundColor : theme.palette.background.alt}} display='flex'>
      <SideNav />
      <Chats/>
      <Outlet />
    </Box>
  );
}

export default DashboardLayout;
