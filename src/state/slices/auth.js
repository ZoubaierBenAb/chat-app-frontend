import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackBar } from "./snackBar";


const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
  user_id : ''
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = ''
    },
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default slice.reducer;

// Login

export function LoginUser(formValues) {
  // form values => {email,password}
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        window.localStorage.setItem('user_id',response.data.user_id)
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
            user_id : response.data.user_id
          })
         
        );
        dispatch(
         showSnackBar('success',response.data.message)
        );

         window.localStorage.setItem('user_id',response.data.user_id)
      })

      .catch((error) => {
        dispatch(
          showSnackBar('error',error.message)
        );
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('user_id')
    dispatch(slice.actions.signOut());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        window.localStorage.setItem('user_id',response.data.user_id)
      })
      .catch((error) => {});
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
        error: false,
      })
    );
    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.updateRegisterEmail({
            email: formValues.email,
          })
        );
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
            error: false,
          })
        );
       
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
            error: true,
          })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}

export function VerifyOtp(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
            user_id : response.data.user_id
          })
        );
        window.localStorage.setItem('user_id',response.data.user_id)
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export const selectUserId = (state) => state.auth.user_id;
