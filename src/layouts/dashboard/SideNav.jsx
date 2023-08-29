import {
  useTheme,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import logo from "../../assests/logo.png";
import { Nav_Buttons, Nav_Setting } from "../../data";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Avatar } from "@mui/material";
import { ModeSwitch } from "../../components/ModeSwitch";
import { useDispatch,useSelector } from "react-redux";
import { setMode } from "../../state";


function SideNav() {
  const dispatch = useDispatch()
  const mode = useSelector((state)=>state.global.mode)
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,
        backgroundColor: theme.palette.background.alt,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
      }}
    >
      <Stack
        py={3}
        sx={{ height: "100%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={4} alignItems="center">
          <Box borderRadius="0.55rem" p={1}>
            <img
              src={logo}
              style={{
                height: "64px",
                background: theme.palette.background.alt,
              }}
              alt="logo"
            />
            <Typography
              variant="h6"
              fontStyle="italic"
              color={theme.palette.secondary[200]}
            >
              ChiTchat
            </Typography>
          </Box>
          <Box>
            <Stack
              alignItems="center"
              spacing={4}
              sx={{ width: "max-content" }}
            >
              {Nav_Buttons.map((el) =>
                el.index === selected ? (
                  <Box
                    key={el.index}
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <IconButton key={el.index}>{el.icon}</IconButton>
                  </Box>
                ) : (
                  <Box key={el.index}>
                    <IconButton
                      onClick={() => setSelected(el.index)}
                      key={el.index}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                )
              )}
            </Stack>
            <Divider />
          </Box>
          {Nav_Setting.map((el) => (
            <IconButton key={el.index} onClick={() => setSelected(el.index)}>
              {el.icon}
            </IconButton>
          ))}
        </Stack>

        <Stack spacing={4} alignItems='center'>
          {" "}
          <ModeSwitch onClick={()=>dispatch(setMode('light'))} />
          <Avatar src={faker.image.avatar()} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default SideNav;
