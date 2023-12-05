import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";
import { useState } from "react";

function Timeline({ el, menu }) {
  return (
    menu ? (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Divider width="46%" />
        <Typography variant="caption">{el.text}</Typography>
        <Divider width="46%" />
      </Stack>
    ) : null
  );
}
function TextMessage({ el,menu }) {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "#90a4ae"
            : theme.palette.secondary.main,
          borderRadius: 4,
          width: "max-content",
        }}
      >
        <Typography variant="body2">{el.message}</Typography>
      </Box>
      {menu && <MessageOptions /> } 
    </Stack>
  );
}

function ImageMessage({ el,menu }) {
  return (
    <Stack direction="row">
      <Box
        p={1.5}
        sx={{
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxWidth: 210, borderRadius: "10px" }}
          />
          <Typography variant="body2">{el.message}</Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions /> } 
    </Stack>
  );
}

function ReplyMessage({ el,menu }) {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "#90a4ae"
            : theme.palette.secondary.main,
          borderRadius: 4,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            p={2}
            direction={"column"}
            spacing={3}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.neutral[600],
              borderRadius: 1.5,
            }}
          >
            <Typography variant="body2">{el.message}</Typography>
          </Stack>
          <Typography variant="body2">{el.reply}</Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions /> } 
    </Stack>
  );
}

function LinkMessage({ el,menu }) {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          borderRadius: 4,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={3} p={2} sx={{ borderRadius: 1 }}>
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 160, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">creating chat app</Typography>
              <Typography
                variant="subtitle2"
                component={Link}
                color={theme.palette.neutral[300]}
              >
                www.google.com
              </Typography>
            </Stack>
            <Typography variant="body2">{el.message}</Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions /> } 
    </Stack>
  );
}
function DocMessage({ el,menu }) {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: 4,
          width: "max-content",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            backgroundColor: el.incoming
              ? "#90a4ae"
              : theme.palette.secondary.main,
            borderRadius: 4,
          }}
        >
          <Stack
            p={2}
            direction="row"
            spacing={3}
            alignItems={"center"}
            sx={{ borderRadius: 1 }}
          >
            <Image size={24} />
            <Typography variant={"content"}>Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
        </Stack>
        <Stack p={1} direction="row" alignItems="center">
          <Typography variant="body2">{el.message}</Typography>
        </Stack>
      </Box>
     {menu && <MessageOptions /> } 
    </Stack>
  );
}

function MessageOptions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        aria-labelledby="basic-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClick}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}

export {
  Timeline,
  TextMessage,
  ImageMessage,
  ReplyMessage,
  LinkMessage,
  DocMessage,
};
