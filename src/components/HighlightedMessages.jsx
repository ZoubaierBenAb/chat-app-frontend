import {Stack,Box,IconButton,Typography} from '@mui/material'
import { CaretLeft } from "phosphor-react"
import { dispatch } from '..'
import { updateSideBarType } from '../state/slices/app'
import Messages from './conversation/Messages'

function HighlightedMessages() {
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
    <Stack sx={{ height: "100%" }}>
      <Box sx={{ boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", width: "100%" }}>
        <Stack
          direction="row"
          sx={{ height: "100%", p: 2 }}
          alignItems="center"
          spacing={3}
        >
          <IconButton onClick={() => dispatch(updateSideBarType("CONTACT"))}>
            <CaretLeft />
          </IconButton>
          <Typography variant="subtitle2">Highlighted Messages</Typography>
        </Stack>
      </Box>
      <Stack
        sx={{
          height: "100%",
          position: "relative",
          flexGrow: 1,
          overflowY: "scroll",
        }}
        p={1}
        spacing={3}
      >
       <Messages/>
      </Stack>
    </Stack>
  </Box>
  )
}

export default HighlightedMessages