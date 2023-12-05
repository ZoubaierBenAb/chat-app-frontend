import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/settings/ProfileForm";

function Profile() {
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/*left */}
        <Box
          height="100vh"
          sx={{ width: 320, boxShadow: "0px 0px 2px rgba(0,0,0.25)" }}
        >
          <Stack p={4} spacing={4}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton>
                <CaretLeft size={24} />
              </IconButton>
              <Typography variant="h4">Profile</Typography>
            </Stack>
            {/*Profile form */}
            <ProfileForm/>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default Profile;
