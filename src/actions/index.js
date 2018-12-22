export const configFetched = (config) => ({
  type: 'CONFIG_FETCHED',
  config
});

export const changeEndpoint = (endIp) => ({
  type: 'CHANGE_ENDPOINT',
  endIp
});

export const changeView = (view) => ({
  type: 'CHANGE_VIEW',
  view
});

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
});

export const updateTemporaryConfig = (config) => ({
  type: 'UPDATE_CONFIG',
  config
});

export const setSocket = (socket) => ({
  type: 'SOCKET_CONNECTED',
  socket
});
