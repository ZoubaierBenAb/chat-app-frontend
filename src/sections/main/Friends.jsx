import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FetchFriends,
  FetchRequests,
  FetchSentRequests,
  FetchUsers,
} from "../../state/slices/users";
import { dispatch } from "../..";
import { useSelector } from "react-redux";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/UserElement";

const UsersList = () => {
  useEffect(() => {
    dispatch(FetchUsers());
    dispatch(FetchSentRequests())
  }, []);

  const { users } = useSelector((state) => state.users);
  console.log('aDadada',users)

  return (
    <>
      {users.map((el, index) => {
        
        return <UserElement key={index} {...el}/>;
      })}
    </>
  );
};
const FriendsList = () => {
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  const { friends } = useSelector((state) => state.users);

  return (
    <>
      {friends.map((el, index) => {
        // to do render friends  component
        return <FriendElement  key={index} {...el}/>;
      })}
    </>
  );
};
const RequestsList = () => {
  useEffect(() => {
    dispatch(FetchRequests());
  }, []);

  const { requests } = useSelector((state) => state.users);

  return (
    <>
      {requests.map((el, index) => {
        // to do render requests component
        return <FriendRequestElement key={el._id} {...el.sender} id={el._id}/>;
      })}
    </>
  );
};

function Friends({ open, handleClose }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="secondary"
        >
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      {/*Dialog content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0: // display all users
                  return <UsersList />;
                case 1: // display friends
                  return <FriendsList />;
                case 2: // diplay requests
                  return <RequestsList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default Friends;
