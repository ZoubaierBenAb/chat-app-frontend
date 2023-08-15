import { themeSettings } from './theme';
import { Button, ThemeProvider,useTheme } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { setMode } from './state';
import { useSelector,useDispatch } from 'react-redux';
import { useMemo } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const themee = useTheme()
const mode = useSelector((state)=>state.global.mode)
console.log("🚀 ~ file: App.js:14 ~ App ~ mode :", mode )
const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
 
  return (
   <BrowserRouter>
   <ThemeProvider theme={theme}>

   </ThemeProvider>
   
   </BrowserRouter>
  );
}

export default App;
