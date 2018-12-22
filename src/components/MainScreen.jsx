import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

import {Charts} from './views/charts/Charts'
import {Config} from './views/config/Config'
import {Curve} from './views/curve/Curve'

import * as Constans from '../enums';
import * as Resources from '../resources';

import {connect} from 'react-redux';

import {configFetched, setSocket,} from '../actions'

class AppMainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    let socket = socketIOClient(this.props.Endpoint);
    this.props.setSocket(socket);
    await socket.emit('CONFIGONLY', (config) => {
      this.props.configFetched(config);
    });
  }

  CurrentView(View) {
    switch (View) {
      case Constans.View.Charts:
        return <Charts/>;
      case Constans.View.Config:
        return <Config/>;
      case Constans.View.Curve:
        return <Curve/>;
      default:

    }
  }

  render() {
    return (<div>{
        this.props.Config !== false
          ? <div className="Header">{this.CurrentView(this.props.View)}</div>
          : <div className="Header">LOADING</div>
      }</div>)
  }
}

const mapStateToProps = (state) => {
  return {Endpoint: state.Endpoint, Config: state.Config, View: state.View,}
};
const mapDispatchToProps = {
  configFetched,
  setSocket,
};

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(AppMainScreen);
