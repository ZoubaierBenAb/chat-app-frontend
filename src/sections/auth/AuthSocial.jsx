import { Divider, Box, Stack, IconButton } from "@mui/material";
import { FacebookLogo, GithubLogo, GoogleLogo } from "phosphor-react";

function AuthSocial() {
  return (
    <Box>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <Stack spacing={2} direction={"row"} justifyContent={"center"}>
        <IconButton>
          <GoogleLogo color="#F26A6A" />
        </IconButton>
        <IconButton>
          <GithubLogo color="#666666" />
        </IconButton>
        <IconButton>
          <FacebookLogo color="#005b96" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default AuthSocial;
