import {
  combineReducers
} from "redux";

import {
  Config,
  Endpoint,
  View,
  Mode
} from "./configuration";

export default combineReducers({
  Config,
  Endpoint,
  View,
  Mode
});