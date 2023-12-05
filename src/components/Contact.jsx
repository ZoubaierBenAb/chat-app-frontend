import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide
} from "@mui/material";
import {
  X,
  Phone,
  VideoCamera,
  CaretRight,
  Star,
  Bell,
  Prohibit,
  Trash,
} from "phosphor-react";
import { dispatch } from "..";
import { toggleSideBar, updateSideBarType } from "../state/slices/app";
import { faker } from "@faker-js/faker";
import CustomizedSwitch from "./CutomizedSwitch";
import {  forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({open,handleClose})=>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Block this contact</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to block this chat?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color ='secondary' onClick={handleClose}>Disagree</Button>
      <Button color = 'error' onClick={handleClose}>Agree</Button>
    </DialogActions>
  </Dialog>
  )
}
const DeleteDialog = ({open,handleClose})=>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Delete this contact</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to delete this contact?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color = 'secondary' onClick={handleClose}>Disagree</Button>
      <Button color = 'error' onClick={handleClose}>Agree</Button>
    </DialogActions>
  </Dialog>
  )
}


function Contact() {
  const [openBlockDialog,setOpenBlockDialog] = useState(false)
  const [openDeleteDialog,setOpenDeleteDialog] = useState(false)

const handleCloseBlock = ()=>{
  setOpenBlockDialog(false)
}
const handleCloseDelete = ()=>{
  setOpenDeleteDialog(false)
}
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box sx={{ boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", width: "100%" }}>
          <Stack
            direction="row"
            sx={{ height: "100%", p: 2 }}
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(toggleSideBar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/*body*/}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          {/*This section displays information about the person you're chatting with */}
          <Stack alignItems={"center"} direction="row" spacing={3}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.firstName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}></Typography>
              {faker.name.fullName()}
              <Typography>{"00216 95 086 485"}</Typography>
            </Stack>
          </Stack>
          {/*Audio and Video call section */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Stack spacing={0.2} alignItems="center">
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Audio Call</Typography>
            </Stack>
            <Stack spacing={0.2} alignItems="center">
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video Call</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">quote from the backend</Typography>
          </Stack>
          <Divider />
          {/* Shared files and links section*/}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media,links and docs</Typography>
            <Button color = 'secondary'
              onClick={() => dispatch(updateSideBarType("SHARED"))}
              endIcon={<CaretRight />}
            >
              401
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img
                  key={el}
                  src={faker.image.food()}
                  alt={faker.name.fullName()}
                  style={{ height: 90, width: 120 }}
                />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItem="center"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star />
              <Typography variant="subtitle2">highlited messages</Typography>
            </Stack>
            <IconButton
              onClick={() => dispatch(updateSideBarType("HIGHLIGHTED"))}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItem="center"
          >
            <Stack spacing={2} alignItems={"center"} direction="row">
              <Bell />
              <Typography variant={"subtitle2"}>Mute Notifications</Typography>
            </Stack>
            <CustomizedSwitch />
          </Stack>
          <Divider />
          <Typography>1 groupe in common</Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack>
              <Typography variant="subtitle">Zoubaier Ben Abdallah</Typography>
              <Typography variant="subtitle2"> React,nodejs,express</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent={"space-evenly"}
            alignItems="center"
          >
            <Button onClick={()=>setOpenBlockDialog(true)} variant="outlined" color={"error"} startIcon={<Prohibit />}>
              Block
            </Button>
            <Button onClick={()=>setOpenDeleteDialog(true)} variant="outlined" color={"error"} startIcon={<Trash />}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlockDialog && <BlockDialog open={openBlockDialog} handleClose={handleCloseBlock}/>}
      {openDeleteDialog && <DeleteDialog open = {openDeleteDialog} handleClose={handleCloseDelete}/>}
    </Box>
  );
}

export default Contact;
