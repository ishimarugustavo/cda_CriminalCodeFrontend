import { combineReducers } from "redux";
import criminalCodes from "./criminalCodes";
import status from "./status";
import users from "./users";
import common from "./common";

export default combineReducers({
  users,
  status,
  criminalCodes,
  common,
});
