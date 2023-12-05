import {
  useTheme,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import logo from "../../assests/logo.png";
import { Nav_Buttons, Nav_Setting, Profile_Menu } from "../../data";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Avatar } from "@mui/material";
import { ModeSwitch } from "../../components/ModeSwitch";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import { LogOutUser } from "../../state/slices/auth";

function SideNav() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getMenuPath = (index) => {
    switch (index) {
      case 0:
        return "/profile";
      case 1:
        return "/settings";
      case 2:
        return "/auth/login";

      default:
        break;
    }
  };

  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,
        backgroundColor: theme.palette.background.alt,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
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
              fontWeight={"bold"}
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
                      onClick={() => {
                        setSelected(el.index);
                        navigate(el.path);
                      }}
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
            <IconButton
              key={el.index}
              onClick={() => {
                setSelected(el.index);
                navigate("/settings");
              }}
            >
              {el.icon}
            </IconButton>
          ))}
        </Stack>

        <Stack spacing={4} alignItems="center">
          {" "}
          <ModeSwitch onClick={() => dispatch(setMode("light"))} />
          <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={faker.image.avatar()}
          />
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            TransitionComponent={Fade}
            id="profile-positioned-menu"
            aria-labelledby="profile-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, i) => (
                <MenuItem onClick={handleClick}>
                  <Stack
                    onClick={() => {
                      navigate(getMenuPath(i));
                      if (i === 2) {
                        dispatch(LogOutUser());
                      }
                    }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: 100 }}
                  >
                    <span> {el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SideNav;
