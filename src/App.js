import { themeSettings } from "./theme";
import {
  CssBaseline,
  ThemeProvider,
  Snackbar,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";

import { useSelector } from "react-redux";
import { forwardRef, useMemo } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { dispatch } from ".";
import { hideSnackBar } from "./state/slices/snackBar";


const vertical = "bottom";
const horizontal = "center";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const { open, message, severity } = useSelector((state) => state.snackBar.snackBar);

  

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router />
        </ThemeProvider>
      </BrowserRouter>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal}}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(hideSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(hideSnackBar());
            }}
         severity = {severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
