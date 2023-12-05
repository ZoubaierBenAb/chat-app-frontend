import { Dialog, DialogContent, DialogTitle, Slide ,Stack} from "@mui/material";
import { forwardRef } from "react";
import Search from "../../components/search-custom-components/Search";
import SearchIconWrapper from "../../components/search-custom-components/SearchIconWrapper";
import StyledInputBase from "../../components/search-custom-components/InputBase";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallLogElement";
import { CallList } from "../../data";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewCall({ open, handleClose }) {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        sx={{ p: 4 }}
        onClose={handleClose}
      >
        <DialogTitle sx={{mb : 1}}>Start a new Call</DialogTitle>
        <DialogContent>
        <Stack sx={{ width: "100%" }} spacing={3}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search...."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {CallList.map((el)=> <CallElement {...el}/>)}
            </Stack>
           
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewCall;
