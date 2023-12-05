import {Stack, Typography} from '@mui/material'
import VerifyForm from '../../sections/auth/VerifyForm'

function Verify() {
  return (
    <Stack spacing={2} sx={{mb : 5,position :'relative'}}>
<Typography variant={'h4'}>Please verify your account</Typography>

<Stack direction={'row'} spacing={0.5}>
    <Typography>OTP sent to your email </Typography>
</Stack>
<VerifyForm/>
    </Stack>
  )
}

export default Verify