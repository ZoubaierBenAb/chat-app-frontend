import { faker } from "@faker-js/faker";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  Image,
  Note,
  Info,
} from "phosphor-react";

function Settings() {
  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },

    {
      key: 3,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];
  return (
    <>
      <Stack direction="row" sx={{ width: "100% " }}>
        {/*left panel */}
        <Box
          sx={{

            width: 320,
            height: "100vh",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/*Header */}
            <Stack direction="row" spacing={3} alignItems={"center"}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h4">Settings</Typography>
            </Stack>
            {/*Profile */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <Avatar
                sx={{ height: 56, width: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.4}>
                <Typography variant={"article"}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              {list.map(({ key, title, icon, onclick }) => (
                <>
                  <Stack
                    spacing={2}
                    sx={{ cursor: "pointer" }}
                    onClick={onclick}
                    key ={key}
                  >
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                    {key !== 5 && <Divider />}
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default Settings;
