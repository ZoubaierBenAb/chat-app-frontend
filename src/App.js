import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider,useTheme } from '@mui/material';
import { createTheme } from "@mui/material/styles";

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
function App() {


const mode = useSelector((state)=>state.global.mode)

const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
 
  return (
   <BrowserRouter>
   <ThemeProvider theme={theme}>
   <CssBaseline/>

   <Router/>
   </ThemeProvider>
   
   </BrowserRouter>
  );
}

export default App;
