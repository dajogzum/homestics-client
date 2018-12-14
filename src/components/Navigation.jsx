import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import {connect} from 'react-redux';

import * as Constans from '../enums';
import * as Resources from '../resources';

import './Navigation.css';

import {ChangeModeButton} from './buttons/ChangeModeButton';
import {ChangeViewButton} from './buttons/ChangeViewButton';
import Clock from './Clock';

var socket;

class AppNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log();
  }

  render() {
    return (<div className="menu">
      <ul className="toLeft">
        <li>
          <div className="Header">
            Homestics
          </div>
        </li>
        <ChangeViewButton Target={Constans.View.Charts} Icon="gestures" Text={Resources.Texts.Charts}/>
      </ul>
      <ul className={this.state.mode === null
          ? "toLeft fade"
          : "toLeft"}>
        <li className="separator"></li>
        <li><ChangeModeButton Type={Constans.Mode.Now} Text={Resources.Texts.Now}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Hours} Text={Resources.Texts.Hours}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Days} Text={Resources.Texts.Days}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Months} Text={Resources.Texts.Months}/></li>
      </ul>
      <ul className="toRight">
        <li className={this.state.right
            ? "visible"
            : "hidden"}>
          <ChangeViewButton Target={Constans.View.Config} Icon="settings" Text={Resources.Texts.Config}/>
        </li>
        <li className={this.state.right
            ? "visible"
            : "hidden"}>
          <ChangeViewButton Target={Constans.View.Curve} Icon="show_chart" Text={Resources.Texts.Curve}/>
        </li>
      </ul>
      <ul className="toRight">
        <li>
          {
            this.state.right
              ? <div onClick={() => {
                    this.setState({
                      right: !this.state.right
                    })
                  }} className="slide">
                  <span className="material-icons md-16">chevron_right</span>
                </div>
              : <div onClick={() => {
                    this.setState({
                      right: !this.state.right
                    })
                  }} className="slide">
                  <span className="material-icons md-16">chevron_left</span>
                </div>
          }
        </li>
      </ul>
      <ul className="toRight">
        <li>
          <Clock/>
        </li>
      </ul>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = {};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
