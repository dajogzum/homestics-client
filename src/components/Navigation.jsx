import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import {connect} from 'react-redux';

import * as Constans from 'enums';
import * as Resources from 'resources';

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

  componentDidMount() {}

  drawer() {
    let expanded = this.state.right
      ? "chevron_right"
      : "chevron_left";
    return (<div onClick={() => {
        this.setState({
          right: !this.state.right
        })
      }} className="navigationSlide">
      <span className="material-icons md-16">{expanded}</span>
    </div>)
  }

  render() {
    let drawerVisibility = this.state.right
      ? "navigationVisible"
      : "navigationHidden";
    let modeVisibility = this.props.View !== Constans.View.Charts
      ? "navigationToLeft navigationFade"
      : "navigationToLeft";
    return (<div className="navigationMenu">
      <ul className="navigationToLeft">
        <li>
          <div className="navigationHeader">
            Homestics
          </div>
        </li>
        <ChangeViewButton Target={Constans.View.Charts} Icon="gestures" Text={Resources.Texts.Charts}/>
      </ul>
      <ul className={modeVisibility}>
        <li className="navigationSeparator"></li>
        <li><ChangeModeButton Type={Constans.Mode.Now} Text={Resources.Texts.Now}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Hours} Text={Resources.Texts.Hours}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Days} Text={Resources.Texts.Days}/></li>
        <li><ChangeModeButton Type={Constans.Mode.Months} Text={Resources.Texts.Months}/></li>
      </ul>
      <ul className="navigationToRight">
        <li className={drawerVisibility}>
          <ChangeViewButton Target={Constans.View.Config} Icon="settings" Text={Resources.Texts.Config}/>
        </li>
        <li className={drawerVisibility}>
          <ChangeViewButton Target={Constans.View.Curve} Icon="show_chart" Text={Resources.Texts.Curve}/>
        </li>
      </ul>
      <ul className="navigationToRight">
        <li>
          {this.drawer()}
        </li>
      </ul>
      <ul className="navigationToRight">
        <li>
          <Clock/>
        </li>
      </ul>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {View: state.View}
};
const mapDispatchToProps = {};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
