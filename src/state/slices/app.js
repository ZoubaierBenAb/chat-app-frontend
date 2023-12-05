import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../..";

const initialState = {
  sideBar: {
    isOpen: false,
    type: "CONTACT",
  },

};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBar.isOpen = !state.sideBar.isOpen;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },

  },
});

export function toggleSideBar() {
  return async () => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function updateSideBarType(type) {
  return async () => {
    dispatch(
      slice.actions.updateSideBarType({
        type,
      })
    );
  };
}



export default slice.reducer;
