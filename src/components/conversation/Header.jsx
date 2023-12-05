import { Stack,Typography,IconButton,Box,Divider,Avatar,Fade,Menu,MenuItem} from "@mui/material"
import { StyledBadge } from "../StyledBadge"
import { CaretDown,MagnifyingGlass,VideoCamera,Phone } from "phosphor-react"
import { faker } from "@faker-js/faker"
import { dispatch } from "../.."
import { toggleSideBar } from "../../state/slices/app"
import useResponsive from "../../hooks/useResponsive";
import { StartAudioCall } from "../../state/slices/audioCall";
import { StartVideoCall } from "../../state/slices/videoCall";
import { useState } from "react"
import { useSelector } from "react-redux"


const Conversation_Menu = [
  {
    title: "Contact info",
  },
  {
    title: "Mute notifications",
  },
  {
    title: "Clear messages",
  },
  {
    title: "Delete chat",
  },
];



function Header() {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const {current_conversation} = useSelector((state) => state.conversation.direct_chat);
  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    useState(null);
    const openConversationMenu = Boolean(conversationMenuAnchorEl);
    const handleClickConversationMenu = (event) => {
      setConversationMenuAnchorEl(event.currentTarget);
    };
    const handleCloseConversationMenu = () => {
      setConversationMenuAnchorEl(null);
    };
  return (
    <Box
    p={2}
    sx={{
      width: "100%",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
    }}
  >
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ height: "100%", width: "100%" }}
    >
      <Stack onClick ={()=> dispatch(toggleSideBar())} direction={"row"} spacing={2}>
        <Box>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt={current_conversation?.name}
              src={faker.image.avatar()}
            />
          </StyledBadge>
        </Box>
        <Stack spacing={0.2}>
          <Typography variant="subtilte2">
            {current_conversation?.name}
          </Typography>
          <Typography variant="caption">Online</Typography>
        </Stack>
      </Stack>
      <Stack  spacing={isMobile ? 1 : 3} alignItems="center" direction="row">
        <IconButton 
         onClick={() => {
                
          dispatch(StartAudioCall(current_conversation.user_id));
        }}>
          <Phone />
        </IconButton>
        <IconButton
        onClick={() => {
          dispatch(StartVideoCall(current_conversation.user_id));
        }}>
          <VideoCamera />
        </IconButton>
        {!isMobile && (
              <IconButton>
                <MagnifyingGlass />
              </IconButton>
            )}
        <Divider orientation="vertical" flexItem />
        <IconButton
        id="conversation-positioned-button"
        aria-controls={
          openConversationMenu
            ? "conversation-positioned-menu"
            : undefined
        }
        aria-haspopup="true"
        aria-expanded={openConversationMenu ? "true" : undefined}
        onClick={handleClickConversationMenu}>
          <CaretDown />
        </IconButton>
        <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              TransitionComponent={Fade}
              id="conversation-positioned-menu"
              aria-labelledby="conversation-positioned-button"
              anchorEl={conversationMenuAnchorEl}
              open={openConversationMenu}
              onClose={handleCloseConversationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={1}>
                <Stack spacing={1}>
                  {Conversation_Menu.map((el) => (
                    <MenuItem onClick={handleCloseConversationMenu}>
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <span>{el.title}</span>
                      </Stack>{" "}
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            </Menu>
      </Stack>
    </Stack>
  </Box>
  )
}

export default Header