
import { Avatar, Box, Stack, Badge, Typography,styled,useTheme,alpha } from "@mui/material";
import { faker } from "@faker-js/faker";
import { StyledBadge } from "./StyledBadge";
import { dispatch } from "..";
import { SelectConvo } from "../state/slices/users";
import { useSelector } from "react-redux";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));


function ChatElement({id,name,img,msg,time,unread,online}) {
  const theme = useTheme()
  const {room_id} = useSelector((state) => state.users);
  const selectedChatId = room_id?.toString();
  let isSelected = +selectedChatId === id;
  if (!selectedChatId) {
    isSelected = false;
  }
 
  return (
    <StyledChatBox
    onClick={()=>{
      dispatch(SelectConvo({room_id : id}))
    }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
        ? theme.palette.mode === "light"
          ? alpha(theme.palette.primary.main, 0.5)
          : theme.palette.primary.main
        : theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.paper,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
         {online ?  <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={faker.image.avatar()} />
          </StyledBadge> : <Avatar src={faker.image.avatar()}/>}
          <Stack spacing={0.3}>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge badgeContent={unread} color="primary" />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
}

export default ChatElement;
