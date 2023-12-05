import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import RegisterForm from "../../sections/auth/RegisterForm";
import { dispatch } from "../..";
import { setModeToLight } from "../../state";
import { useEffect } from "react";
import AuthSocial from "../../sections/auth/AuthSocial";

function Register() {
  useEffect(()=>{
    dispatch(setModeToLight())
  },[])
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography color="#525252" variant="h4">
          Get Started with ChitChat
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography color="#525252" variant="body2">
            Already have an acouunt?
          </Typography>
          <Link
            color="secondary"
            component={RouterLink}
            to="/auth/login"
            variant="subtitle2"
          >
            Sign in
          </Link>
        </Stack>
        <RegisterForm/>
        {/*RegisterForm */}
        <Typography
          component={"div"}
          sx={{
            typography: "caption",
            mt: 3,
            textAlign: "center",
            color: "#525252",
          }}
        >
          {"By signining up , I agree to "}
          <Link underline="always" color="secondary">
            Terms and Conditions
          </Link>
          {' and '}
          <Link underline="always" color="secondary">
            Privacy and Policy
          </Link>
        </Typography>
        <AuthSocial/>
      </Stack>
    </>
  );
}

export default Register;
