import { styled } from "@mui/material/styles";
import { Avatar, Box, Stack, Badge, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ChatElement() {
  return (
    <Box
      sx={{
        width: "100%",

        borderRadius: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={faker} />
          </StyledBadge>
          <Stack spacing={0.3}>
            <Typography variant="subtitle1">zoubaier</Typography>
            <Typography variant="caption">wineeeek</Typography>
          </Stack>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            10:52
          </Typography>
          <Badge badgeContent={3} color="primary" />
        </Stack>
      </Stack>
    </Box>
  );
}

export default ChatElement;
