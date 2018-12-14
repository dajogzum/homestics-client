import React, {Component} from 'react';
import {connect} from 'react-redux';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

import * as Constans from '../../enums';
import * as Resources from '../../resources';

import './Config.css'

import {changeView} from '../../actions';

class AppConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  AddButton(position) {
    return (<div className="btn btn-default" onClick={() => {
        this.handleAddButton(position);
      }}>
      <span className="material-icons md-16">add</span>Pozycja {position + 1}</div>)
  }

  AddChart(number) {
    return (<div id={number}>
      <p>Pozycja {number + 1}</p>
      <input name="name" type="text" value={this.props.Config.wykresy[`position${number}`].name} className="smallInput" placeholder="Nazwa wykresu" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <input name="id" type="number" value={this.props.Config.wykresy[`position${number}`].id} className="smallInput" placeholder="ID" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <ColorPicker className="cstmpicker" defaultColor="#abcdef" defaultAlpha={100} alpha={this.setAlpha(this.props.Config.wykresy[`position${number}`].borderColor)} animation="slide-up" color={this.convertColor(this.props.Config.wykresy[`position${number}`].borderColor)} onClose={(color) => {
          this.handleColorPicker(color, number, "borderColor")
        }}/>
      <input name="borderColor" type="text" value={this.props.Config.wykresy[`position${number}`].borderColor} className="smallInput" placeholder="Kolor Wypełnienia" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <ColorPicker className="cstmpicker" defaultColor="#abcdef" defaultAlpha={100} alpha={this.setAlpha(this.props.Config.wykresy[`position${number}`].fillColor)} animation="slide-up" color={this.convertColor(this.props.Config.wykresy[`position${number}`].fillColor)} onClose={(color) => {
          this.handleColorPicker(color, number, "fillColor")
        }}/>
      <input name="fillColor" type="text" value={this.props.Config.wykresy[`position${number}`].fillColor} className="smallInput" placeholder="Kolor Konturu" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>

      <input name="grid" type="number" value={this.props.Config.wykresy[`position${number}`].grid} className="smallInput" placeholder="Podziałka" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <span title="Usuń wykres" onClick={this.removeChart} className="material-icons md-24 remove">close</span>
    </div>);
  }

  convertColor(rgb) {
    if (rgb !== "") {
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4)
        ? "#" + (
        "0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
        : '';
    } else {
      return "#fffff";
    }
  }

  setAlpha(orig) {
    if (orig !== "") {
      let rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
      let alpha = (rgb && rgb[4]).trim();
      if (alpha !== "") {
        return (alpha * 100);
      } else {
        return 100;
      }
    } else {
      return 1;
    }
  }

  RenderChartConfig() {
    let counter = 0;
    let component = [];
    for (var chart in this.props.Config.wykresy) {
      component.push(<div className="container-button">{
          chart.id === ""
            ? this.AddButton(counter++)
            : this.AddChart(counter++)
        }
      </div>);
    }
    return component;
  }

  render() {
    return (<div className="Config">
      <div className="Header">
        <span className="material-icons md-29">settings</span>
        <h1>Ustawienia</h1>
        <div className="btn btn-success right" onClick={this.save}>
          <span className="material-icons md-16">done</span>Zapisz
        </div>
      </div>
      <div className="forms">
        <h3>Ogólne</h3>
        <ul>
          <li>
            <p>IP serwera</p>
            <input name="ip" type="text" value={this.props.Config.ip} placeholder="192.168.0.35:8060" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Użytkownik</p>
            <input name="user" type="text" value={this.props.Config.user} placeholder="admin" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Hasło</p>
            <input name="password" type="password" value={this.props.Config.password} placeholder="•••••••••••" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Baza Danych</p>
            <input name="dbName" type="text" value={this.props.Config.dbName} placeholder="myDatabase" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Dni wstecz</p>
            <input name="daysAgo" type="number" value={this.props.Config.daysAgo} placeholder="365" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Godziny wstecz</p>
            <input name="hoursAgo" type="number" value={this.props.Config.hoursAgo} placeholder="48" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Minuty wstecz</p>
            <input name="minutesAgo" type="number" value={this.props.Config.minutesAgo} placeholder="48" onChange={this.handleChange}></input>
          </li>
          <li>
            <p>Limit wczytywania</p>
            <input name="limit" type="number" value={this.props.Config.limit} placeholder="50" onChange={this.handleChange}></input>
          </li>
        </ul>
      </div>
      <div className="forms">
        <h3>Wykresy</h3>
        {this.RenderChartConfig()}
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {Config: state.Config}
};
const mapDispatchToProps = {
  changeView
};

export const Config = connect(mapStateToProps, mapDispatchToProps)(AppConfig);
