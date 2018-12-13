import * as Constans from '../enums';
import * as Resources from '../resources';

export const Config = (state = false, action) => {
  switch (action.type) {
    case 'CONFIG_FETCHED':
      return action.config
    default:
      return state
  }
}

export const Endpoint = (state = "http://127.0.0.1:4949", action) => {
  switch (action.type) {
    case 'CHANGE_ENDPOINT':
      return action.endIp
    default:
      return state
  }
}

export const View = (state = Constans.View.Charts, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return action.view
    default:
      return state
  }
}

export const Mode = (state = Constans.Mode.Now, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return action.mode
    default:
      return state
  }
}