import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { forwardRef } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/react-hook-form/FormProvider";
import { RHFTextField } from "../../components/react-hook-form";
import RHFAutoComplete from "../../components/react-hook-form/RHFAutoComplete";

const MEMBERS = ["Friend1", "Friend2", "Friend3"];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required("Please enter group name"),
    members: Yup.array().min(2, "Group must have at least 2 members"),
  });
  const defaultValues = {
    groupName: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      reset();
      console.log("error", error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="groupName" label="Type group name" />
        <RHFAutoComplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack justifyContent="end" direction="row" alignItems="center" spacing={2}>
          <Button variant ='error' onClick={handleClose}>Close</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

function CreateGroup({ open, handleClose }) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      open={open}
      onClose={handleClose}
    >
      <Stack spacing={1}>
        {/*title */}
        <DialogTitle sx={{mb : 3}}>Create New Group</DialogTitle>
        {/*content */}
        <DialogContent>
          <CreateGroupForm handleClose={handleClose} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

export default CreateGroup;
