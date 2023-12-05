import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assests/logo.png";
import { useSelector } from "react-redux";

function MainLayout() {
  const {isLoggedIn} = useSelector((state)=>state.auth)
  if(isLoggedIn){
    return <Navigate to='/app'/>
  }
  return (
    <Container sx={{ mt: 5 }} maxWidth={"sm"}>
      <Stack spacing={5}>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <img style={{ height: 120, width: 120 }} alt="logo" src={Logo} />
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
}

export default MainLayout;
