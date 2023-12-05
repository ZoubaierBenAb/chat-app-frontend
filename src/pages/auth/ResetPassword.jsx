import { Link, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { setModeToLight } from "../../state";
import { dispatch } from "../..";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

function ResetPassword() {
  useEffect(() => {
    dispatch(setModeToLight());
  }, []);
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant={"h3"} paragraph>
        Forget your password?
      </Typography>
      <Typography sx={{ mb: 5 }}>
        Please enter the email address associated with your account,we will
        email you a link to reset your password.
      </Typography>
    <ResetPasswordForm/>
      <Link
        component={RouterLink}
        to="/auth/login"
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: "3",
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        
        }}
        underline="none"
      >
        <CaretLeft/>
        Return to Login
      </Link>
    </Stack>
  );
}

export default ResetPassword;
