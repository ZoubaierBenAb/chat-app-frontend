import { Stack, Box, Typography, Divider, IconButton,Link } from "@mui/material";
import Search from "../../components/search-custom-components/Search";
import SearchIconWrapper from "../../components/search-custom-components/SearchIconWrapper";
import InputBase from "../../components/search-custom-components/InputBase";
import { MagnifyingGlass,PhoneCall } from "phosphor-react";
import { useState } from "react";
import { CallLogElement } from "../../components/CallLogElement";
import { CallList } from "../../data";
import NewCall from "../../sections/main/NewCall";



function Call() {
    const [openDialog,setOpenDialog] = useState(false)
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/*left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
           
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Typography variant={"h5"}>Call log</Typography>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass />
                </SearchIconWrapper>
                <InputBase
                  placeholder="Search...."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
          
            >
              <Typography
                variant={"body2"}
                component={Link}
                underline="none"
                color={"secondary"}
                sx={{ fontWeight: "bold" }}
              >
                Start a new Call 
              </Typography>
              <IconButton onClick ={()=>setOpenDialog(true)}>
                <PhoneCall/>
              </IconButton>
            </Stack>
            <Divider />
            <Stack spacing={3} sx={{overflow : 'scroll',height : '100%' ,flexGrow : 1}}>
            {CallList.map((el)=>
            <CallLogElement {...el}/>)}
            </Stack>
        
          </Stack>
        </Box>

        {/*right */}
      </Stack>
      {openDialog && <NewCall open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  );
}

export default Call;
