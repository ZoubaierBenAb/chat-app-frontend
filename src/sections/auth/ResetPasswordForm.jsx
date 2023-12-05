import FormProvider from "../../components/react-hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Alert, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { RHFTextField } from "../../components/react-hook-form";
import { useEffect } from "react";
import { setModeToLight } from "../../state";
import { dispatch } from "../..";
import { ForgotPassword } from "../../state/slices/auth";
function ResetPasswordForm() {
  useEffect(() => {
    dispatch(setModeToLight());
  }, []);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid Email address"),
  });
  const defaultValues = {
    email: "demo@chitchat.com",
  };
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
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
      await dispatch(ForgotPassword(data))
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
        <Button
          fullWidth
          color={"inherit"}
          size="large"
          type="submit"
          variant="contained"
          sx={{ bgcolor: "text.primary", color: "#c2c2c2" }}
        >
          Send reset link
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default ResetPasswordForm;
