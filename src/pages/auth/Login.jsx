import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";
import { useEffect } from "react";
import { setModeToLight } from "../../state";
import { dispatch } from "../..";
function Login() {
  useEffect(() => {
    dispatch(setModeToLight());
  }, []);
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography color={"#525252"} variant={"h4"}>
          Login to ChitChat
        </Typography>
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          <Typography color={"#858585"} variant="body2">
            New User?
          </Typography>
          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
            color={"secondary"}
          >
            {" "}
            Create an account{" "}
          </Link>
        </Stack>
        {/*login Form */}
        <LoginForm />
        {/*Social Auth */}
        <AuthSocial />
      </Stack>
    </>
  );
}

export default Login;
