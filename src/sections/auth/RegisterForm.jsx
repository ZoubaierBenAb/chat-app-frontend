import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Stack, Alert, IconButton, InputAdornment,Button } from "@mui/material";
import { RHFTextField } from "../../components/react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import FormProvider from "../../components/react-hook-form/FormProvider";
import { Eye, EyeSlash } from "phosphor-react";
import { dispatch } from "../..";
import { RegisterUser } from "../../state/slices/auth";




function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid Email address"),
    password: Yup.string().required("Password is required"),
  });
  const defaultValues = {
    fisrtName: "Zoubaier",
    lastName: "Ben Abdallah",
    email: "demo@chitchat.com",
    password: "demo1234",
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    formState: { errors },
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    try {
      dispatch(RegisterUser(data))
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First-name" />
          <RHFTextField name="lastName" label="Last-name" />
        </Stack>
        <RHFTextField name="email" label="Email" />
        <RHFTextField
          name="password"
          label="Password"
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
          <Button
        fullWidth
        color={"inherit"}
        size="large"
        type="submit"
        variant="contained"
        sx={{ bgcolor: "text.primary" ,color : "#c2c2c2"}}
      >
        Create account
      </Button>
      </Stack>
    </FormProvider>
  );
}

export default RegisterForm;
