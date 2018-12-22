import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Constans from 'enums';
import * as Resources from 'resources';

import {ConfigureCharts} from './modules/ConfigureCharts'

import './Config.css'

import {updateTemporaryConfig} from 'actions';

class AppConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Save = this.Save.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
  }

  Save() {
    this.props.SocketIOClient.emit('SAVECONFIG', this.props.TemporaryConfig);
    console.log(this.props.TemporaryConfig);
  }

  HandleChange(event) {
    let newcfg = this.props.TemporaryConfig;
    newcfg[event.target.name] = event.target.value;
    this.props.updateTemporaryConfig(newcfg);
  }

  render() {
    return (<div className="Config">
      <div className="Header">
        <span className="material-icons md-29">settings</span>
        <h1>Ustawienia</h1>
        <div className="btn btn-success right" onClick={this.Save}>
          <span className="material-icons md-16">done</span>Zapisz
        </div>
      </div>
      <div className="forms">
        <h3>Ogólne</h3>
        <ul>
          <li>
            <p>IP serwera</p>
            <input name="ip" type="text" value={this.props.TemporaryConfig.ip} placeholder="192.168.0.35:8060" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Użytkownik</p>
            <input name="user" type="text" value={this.props.TemporaryConfig.user} placeholder="admin" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Hasło</p>
            <input name="password" type="password" value={this.props.TemporaryConfig.password} placeholder="•••••••••••" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Baza Danych</p>
            <input name="dbName" type="text" value={this.props.TemporaryConfig.dbName} placeholder="myDatabase" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Dni wstecz</p>
            <input name="daysAgo" type="number" value={this.props.TemporaryConfig.daysAgo} placeholder="365" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Godziny wstecz</p>
            <input name="hoursAgo" type="number" value={this.props.TemporaryConfig.hoursAgo} placeholder="48" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Minuty wstecz</p>
            <input name="minutesAgo" type="number" value={this.props.TemporaryConfig.minutesAgo} placeholder="48" onChange={this.HandleChange}></input>
          </li>
          <li>
            <p>Limit wczytywania</p>
            <input name="limit" type="number" value={this.props.TemporaryConfig.limit} placeholder="50" onChange={this.HandleChange}></input>
          </li>
        </ul>
      </div>
      <div className="forms">
        <h3>Wykresy</h3>
        <ConfigureCharts/>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {TemporaryConfig: state.TemporaryConfig, SocketIOClient: state.SocketIOClient}
};
const mapDispatchToProps = {
  updateTemporaryConfig
};

export const Config = connect(mapStateToProps, mapDispatchToProps)(AppConfig);
