import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import axiosInstance from "../../utils/axios";

const initialState = {
  users: [],
  friends: [],
  requests:[],
  chat_type: 'individual',
  room_id: null,
  sent_requests : [],
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      state.users = action.payload.user;
    },
    updateUser(state, action) {
      state.users = action.payload.user;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateRequests(state, action) {
      state.requests = action.payload.requests;
    },
    updateSentFriendRequests(state, action) {
      state.sent_requests = action.payload.sent_requests;
    },
    selectConvo(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
  },
});

// thunk actions

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get(
        "/users/get-users",

        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        

        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-friends", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateFriends({
            friends: response.data.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateRequests({
            requests: response.data.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchSentRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get_sent_friend_requests", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(slice.actions.updateSentFriendRequests({
          sent_requests: response.data.data,
        }))
      }).catch((err)=>{
        console.log(err)
      });
  };
};

export const DeleteRequest = (user_id) => {
  return (dispatch, getState) => {
    axios
      .delete('/users/delete_friend_request', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${getState().auth.token}`,
        },
        data: { user_id: user_id }
      })
      .then(() => {
        // Update the state after successful deletion
        const updatedSentRequests = getState().users.sent_requests.filter((request) => {
          return request.recipient !== user_id;
        });

        dispatch(
          slice.actions.updateSentFriendRequests({
            sent_requests: updatedSentRequests,
          })
        );
      })
      .catch((error) => {
        
        console.log(error)
      });
  };
};


export const SelectConvo = ({ room_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConvo({ room_id }));
  };
};

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axios
      .get("/users/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default slice.reducer;
