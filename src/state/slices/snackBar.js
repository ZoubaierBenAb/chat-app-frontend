import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    snackBar : {
        open  : null,
        message : null,
        severity  : null,
    }
}

const slice = createSlice({
    name : 'snackBar',
    initialState,
    reducers : {
        openSnackBar(state, action) {
            state.snackBar.open = true;
            state.snackBar.severity = action.payload.severity;
            state.snackBar.message = action.payload.message;
          },
          closeSnackBar(state, action) {
            state.snackBar.open = false;
            state.snackBar.severity = null;
            state.snackBar.message = null;
          },
    }
})

export function showSnackBar(severity, message) {
    return async (dispatch, getState) => {
      dispatch(
        slice.actions.openSnackBar({
          message,
          severity,
        })
      );
      setTimeout(() => {
        dispatch(slice.actions.closeSnackBar());
      }, 4000);
    };
  }
  
  export function hideSnackBar() {
    return async (dispatch, getState) => {
      dispatch(slice.actions.closeSnackBar());
    };
  }
  
  export default slice.reducer;