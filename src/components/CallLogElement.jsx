import { faker } from "@faker-js/faker";
import { Avatar, Stack, Box, Typography, IconButton } from "@mui/material";
import React from "react";
import { StyledBadge } from "./StyledBadge";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from "phosphor-react";
import { dispatch } from "..";
import { StartAudioCall } from "../state/slices/audioCall";
import { StartVideoCall } from "../state/slices/videoCall";

function CallLogElement({ online, incoming, missed }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.name.fullName()}
                />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            )}
            <Stack spacing={0.3}>
              <Typography variant={"subtitle2"}>
                {faker.name.fullName()}
              </Typography>
              <Stack direction="row" spacing={1}>
                {incoming ? (
                  <ArrowDownLeft color={missed ? "red" : "green"} />
                ) : (
                  <ArrowUpRight color={missed ? "red " : "green"} />
                )}
                <Typography variant="caption" alignItems="center">
                  Yesterday 16:34
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'}>
          <IconButton>
            {" "}
            <Phone size={18} color={"green"} />
           
          </IconButton>
          <IconButton>
          <VideoCamera size={18} />
          </IconButton>
          </Stack>
         
        </Stack>
      </Box>
    </>
  );
}
const CallElement = ({ online,name,id,handleClose }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant={"subtitle2"}>
              {faker.name.fullName()}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction ='row'>
        <IconButton onClick={()=>dispatch(StartAudioCall(id))}>
          {" "}
          <Phone size={18} color={"green"} />
        </IconButton>
        <IconButton onClick={()=>dispatch(StartVideoCall(id))}>
          <VideoCamera />
        </IconButton>
        </Stack>
       
      </Stack>
    </Box>
  );
};
export { CallElement, CallLogElement };
