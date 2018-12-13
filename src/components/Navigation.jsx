import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import {connect} from 'react-redux';

import * as Constans from '../enums';
import * as Resources from '../resources';

import {ChangeModeButton} from './buttons/ChangeModeButton';
import Clock from './Clock';

import {changeView} from '../actions';

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
        <li>
          <div onClick={() => {
              this.props.changeView(Constans.View.Charts)
            }}>
            <span className="material-icons md-16">gesture</span>
            Wykresy
          </div>
        </li>
      </ul>
      <ul className={this.state.mode === null
          ? "toLeft fade"
          : "toLeft"}>
        <li className="separator"></li>
        <ChangeModeButton Type={Constans.Mode.Now} Text={Resources.Texts.Now}/>
        <ChangeModeButton Type={Constans.Mode.Hours} Text={Resources.Texts.Hours}/>
        <ChangeModeButton Type={Constans.Mode.Days} Text={Resources.Texts.Days}/>
        <ChangeModeButton Type={Constans.Mode.Months} Text={Resources.Texts.Months}/>
      </ul>
      <ul className={this.state.right
          ? "toRight"
          : "toRight hide"}>
        <li>
          <div onClick={() => {
              this.props.changeView(Constans.View.Config)
            }}>
            <span className="material-icons md-16">settings</span>
            Ustawienia
          </div>
        </li>
        <li>
          <div onClick={() => {
              this.props.changeView(Constans.View.Curve)
            }}>
            <span className="material-icons md-16">show_chart</span>
            Krzywa Grzewcza
          </div>
        </li>
      </ul>
      <ul className="toRight">
        {
          this.state.right
            ? <li onClick={() => {
                  this.setState({
                    right: !this.state.right
                  })
                }} className="slide">
                <span className="material-icons md-16">chevron_right</span>
              </li>
            : <li onClick={() => {
                  this.setState({
                    right: !this.state.right
                  })
                }} className="slide">
                <span className="material-icons md-16">chevron_left</span>
              </li>
        }
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
  return {View: state.View}
};
const mapDispatchToProps = {
  changeView
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
