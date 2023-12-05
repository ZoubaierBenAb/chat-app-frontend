import React, { useCallback } from "react";
import * as Yup from "yup";
import { RHFTextField } from "../../components/react-hook-form";
import FormProvider from "../../components/react-hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Alert, Button } from "@mui/material";
import { useForm } from "react-hook-form";
function ProfileForm() {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("Bio is required"),
    avatarUrl: Yup.string().required("Avatar is required").nullable("true"),
  });
  const defaultValues = {
    name: "",
    about: "",
  };
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = methods;
  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const onSubmit = async (data) => {
    try {
      //submit data to the backend
      console.log("data", data);
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
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
        </Stack>
        <Stack spacing={2}>
          <RHFTextField
            name="name"
            label="Name"
            helperText={"this name is visible to your contacts"}
          />
          <RHFTextField
            name="about"
            multiline
            rows={3}
            maxRows={5}
            label={"Bio"}
          />
        </Stack>
        <Stack justifyContent={"end"} direction="row">
          <Button
            color="secondary"
            size={"large"}
            type="submit"
            variant="outlined"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default ProfileForm;
