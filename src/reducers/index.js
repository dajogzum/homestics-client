import {
  combineReducers
} from "redux";

import {
  SocketIOClient,
  Config,
  TemporaryConfig,
  Endpoint,
  View,
  Mode
} from "./configuration";

export default combineReducers({
  SocketIOClient,
  Config,
  TemporaryConfig,
  Endpoint,
  View,
  Mode
});