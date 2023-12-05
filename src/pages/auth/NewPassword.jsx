import { Link, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { setModeToLight } from "../../state"
import { dispatch } from "../.."
import {Link as RouterLink} from 'react-router-dom'
import { CaretLeft } from "phosphor-react"
import NewPasswordForm from "../../sections/auth/NewPasswordForm"
function NewPassword() {
    useEffect(()=>{
dispatch(setModeToLight())
    },[])
  return (
    <>
    <Stack spacing={2} sx={{mb : 5,position : 'relative'}}>
<Typography variant="h3" paragraph>
Reset Password
</Typography>
<Typography sx={{mb : 5}}>
    Please set your new password
</Typography>
    </Stack>
    <NewPasswordForm/>
    <Link
        component={RouterLink}
        to="/auth/login"
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: "3",
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        
        }}
        underline="none"
      >
        <CaretLeft/>
        Return to Login
      </Link>
    </>
  )
}

export default NewPassword