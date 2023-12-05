import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import globalReducer from "./index";
import authReducer from "./slices/auth";
import snackBarReducer from "./slices/snackBar";
import { createMigrate } from "redux-persist";

import conversationReducer from "./slices/conversation";
import usersReducer from "./slices/users";

// slices

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
 
  
  blackList : ['users'] 
};

const rootReducer = combineReducers({
  app: appReducer,
  snackBar: snackBarReducer,
  users :usersReducer ,
  auth: authReducer,
  global: globalReducer,
  conversation : conversationReducer
});

export { rootPersistConfig, rootReducer };
