import React from "react";
import FormProvider from "../../components/react-hook-form/FormProvider";
import * as Yup from "yup";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { RHFTextField } from "../../components/react-hook-form";
import { useForm } from "react-hook-form";
import { dispatch } from "../..";
import { setModeToLight } from "../../state";
import { ResetPassword } from "../../state/slices/auth";
import { useSearchParams } from "react-router-dom";

function NewPasswordForm() {
  const [ queryParameters]  = useSearchParams();
  console.log(queryParameters)
  useEffect(() => {
    dispatch(setModeToLight());
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a new password"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
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
      dispatch(ResetPassword({ ...data, token: queryParameters.get('token') }));
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
        <RHFTextField
          name="password"
          label="New password"
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
        <RHFTextField
          name="confirmPassword"
          label="Confirm new password"
          type={showPassword ? "text" : "password"}
        />
        <Button
          fullWidth
          color={"inherit"}
          size="large"
          type="submit"
          variant="contained"
          sx={{ bgcolor: "text.primary", color: "#c2c2c2" }}
        >
          Confirm new password
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default NewPasswordForm;
