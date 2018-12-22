import React, {Component} from 'react';
import {connect} from 'react-redux';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

import * as Constans from 'enums';
import * as Resources from 'resources';

import {updateTemporaryConfig} from 'actions';

class AppConfigureCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.removeChart = this.removeChart.bind(this);
    this.handleChangeGraph = this.handleChangeGraph.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  AddButton(position) {
    return (<div className="btn btn-default" onClick={() => {
        this.handleAddButton(position);
      }}>
      <span className="material-icons md-16">
        add
      </span>Pozycja {position + 1}</div>)
  }

  AddChart(number) {
    return (<div id={number}>
      <p>
        Pozycja {number + 1}
      </p>
      <input name="name" type="text" value={this.props.TemporaryConfig.wykresy[`position${number}`].name} className="smallInput" placeholder="Nazwa wykresu" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <input name="id" type="number" value={this.props.TemporaryConfig.wykresy[`position${number}`].id} className="smallInput" placeholder="ID" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <ColorPicker className="cstmpicker" defaultColor="#abcdef" defaultAlpha={100} alpha={this.setAlpha(this.props.TemporaryConfig.wykresy[`position${number}`].borderColor)} animation="slide-up" color={this.convertColor(this.props.TemporaryConfig.wykresy[`position${number}`].borderColor)} onClose={(color) => {
          this.handleColorPicker(color, number, "borderColor")
        }}/>
      <input name="borderColor" type="text" value={this.props.TemporaryConfig.wykresy[`position${number}`].borderColor} className="smallInput" placeholder="Kolor Wypełnienia" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <ColorPicker className="cstmpicker" defaultColor="#abcdef" defaultAlpha={100} alpha={this.setAlpha(this.props.TemporaryConfig.wykresy[`position${number}`].fillColor)} animation="slide-up" color={this.convertColor(this.props.TemporaryConfig.wykresy[`position${number}`].fillColor)} onClose={(color) => {
          this.handleColorPicker(color, number, "fillColor")
        }}/>
      <input name="fillColor" type="text" value={this.props.TemporaryConfig.wykresy[`position${number}`].fillColor} className="smallInput" placeholder="Kolor Konturu" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input>
      <input name="grid" type="number" value={this.props.TemporaryConfig.wykresy[`position${number}`].grid} className="smallInput" placeholder="Podziałka" onChange={(event) => {
          this.handleChangeGraph(event, number)
        }}></input >
      <span title="Usuń wykres" onClick={this.removeChart} className="material-icons md-24 remove">
        close
      </span>
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

  removeChart(event) {
    let clone = this.props.TemporaryConfig;
    delete clone.wykresy[`position${event.target.parentNode.id}`]
    console.log(clone);
    //this.props.updateTemporaryConfig(clone);
    this.setState({dummy: ""});
  }

  handleColorPicker(color, number, prop) {
    const newcolor = `rgba(${parseInt(color.color.substr(1, 2), 16)},${parseInt(color.color.substr(3, 2), 16)},${parseInt(color.color.substr(5, 2), 16)},${ (color.alpha) / 100})`
    console.log(newcolor);
    let newcfg = this.props.TemporaryConfig;
    newcfg.wykresy[`position${number}`][prop] = newcolor;
    this.props.updateTemporaryConfig(newcfg)
    this.setState({dummy: ""});
  }

  handleChangeGraph(event, number) {
    let newcfg = this.props.TemporaryConfig;
    newcfg.wykresy[`position${number}`][event.target.name] = event.target.value;
    this.props.updateTemporaryConfig(newcfg);
    this.setState({dummy: ""});
  }

  handleAddButton(ch) {
    if (typeof this.props.TemporaryConfig.wykresy[`position${ch}`] === 'undefined') {
      let newcfg = this.props.TemporaryConfig;
      newcfg.wykresy[`position${ch}`] = {
        name: "",
        id: "",
        borderColor: `rgba(${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)},0.5)`,
        fillColor: `rgba(${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)},0.5)`,
        grid: "",
      };
      this.props.updateTemporaryConfig(newcfg);
    }
    this.setState({dummy: ""});
  }

  render() {
    let component = [];
    for (var i = 0; i < 6; i++) {
      if (this.props.TemporaryConfig.wykresy[`position${i}`]) {
        component.push(<div className="container-button">{this.AddChart(i)}</div>);
      } else {
        component.push(<div className="container-button">{this.AddButton(i)}</div>);
      }
    }
    return component;
  }
}
const mapStateToProps = (state) => {
  return {TemporaryConfig: state.TemporaryConfig}
};
const mapDispatchToProps = {
  updateTemporaryConfig
};

export const ConfigureCharts = connect(mapStateToProps, mapDispatchToProps)(AppConfigureCharts);
