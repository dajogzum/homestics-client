import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

import {connect} from 'react-redux';

import {configFetched} from '../actions'

var socket;

class AppMainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    socket = socketIOClient(this.props.Endpoint);
    await socket.emit('CONFIGONLY', (config) => {
      this.props.configFetched(config);
    });
  }

  render() {
    return (<div>{
        this.props.Config
          ? <div>WYKRESY</div>
          : <div className="Header">LOADING</div>
      }</div>)
  }
}

const mapStateToProps = (state) => {
  return {Endpoint: state.Endpoint, Config: state.Config,}
};
const mapDispatchToProps = {
  configFetched
};

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(AppMainScreen);
