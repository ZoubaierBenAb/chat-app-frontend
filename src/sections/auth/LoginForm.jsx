import FormProvider from "../../components/react-hook-form/FormProvider";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { dispatch } from "../..";
import { LoginUser } from "../../state/slices/auth";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid Email address"),
    password: Yup.string().required("Password is required"),
  });
  const defaultValues = {
    email: "demo@chitchat.com",
    password: "demo1234",
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    try {
      dispatch(LoginUser(data));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </Stack>
      <Stack spacing={2}>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/reset-password"
          variant={"body2"}
          color={"inherit"}
          underline={"always"}
        >
          Forget Password?
        </Link>
      </Stack>
      <Button
        fullWidth
        color={"inherit"}
        size="large"
        type="submit"
        variant="contained"
        sx={{ bgcolor: "text.primary", color: "#c2c2c2" }}
      >
        Login
      </Button>
    </FormProvider>
  );
}

export default LoginForm;
