import { TextField, styled } from "@mui/material";

export const StyledMessageInput = styled(TextField)(({theme})=>({
    '& .MuiInputBase-input' : {
        paddingTop : '12px',
        paddingBottom : '12px'
    }
}))