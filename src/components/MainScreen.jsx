import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

import {Charts} from './views/Charts'
import {Config} from './views/Config'
import {Curve} from './views/Curve'

import * as Constans from '../enums';
import * as Resources from '../resources';

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
        this.props.Config
          ? <div className="Header">{this.CurrentView(this.props.View)}</div>
          : <div className="Header">LOADING</div>
      }</div>)
  }
}

const mapStateToProps = (state) => {
  return {Endpoint: state.Endpoint, Config: state.Config, View: state.View}
};
const mapDispatchToProps = {
  configFetched
};

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(AppMainScreen);
