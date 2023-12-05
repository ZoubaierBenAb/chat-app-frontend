import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode : 'light'
}
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setModeToLight : (state)=>{
      state.mode = 'light'
    }
  },
});
export const {setMode,setModeToLight} = globalSlice.actions

export default globalSlice.reducer