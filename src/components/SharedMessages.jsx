import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { dispatch } from "..";
import { updateSideBarType } from "../state/slices/app";
import { CaretLeft } from "phosphor-react";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Shared_docs, Shared_links } from "../data";
import { DocMessage, LinkMessage } from "./conversation/MessageTypes";
function SharedMessages() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ px: 2, pt: 2 }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab onClick={()=>setValue(0)} label="Media" />
          <Tab onClick={()=>setValue(1)} label="Links" />
          <Tab onClick={()=>setValue(2)} label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={value === 2 ? 6 : 3}
          spacing={3}
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={0.5}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) => {
                      return (
                        <Grid item xs={4}>
                          <img
                            style={{ height: 70, width: 70 }}
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              case 1:
                return Shared_links.map((el)=>(
                  <LinkMessage el={el}/>
                ))
              case 2:
                return Shared_docs.map((el)=> <DocMessage el={el}/>)

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
}

export default SharedMessages;
