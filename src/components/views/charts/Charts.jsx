import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';

import * as Constans from 'enums';
import * as Resources from 'resources';

import './Charts.css'

import {changeView} from 'actions';

class AppCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  GenerateData(prop) {
    const data = {
      labels: [],
      datasets: [
        {
          label: this.props.Config.wykresy[prop].name,
          backgroundColor: this.props.Config.wykresy[prop].fillColor,
          borderColor: this.props.Config.wykresy[prop].borderColor,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };
    return data;
  }

  GenerateOptions(prop) {
    const options = {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            ticks: {
              stepSize: this.props.Config.wykresy[prop].grid
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            ticks: {
              autoSkipPadding: 20,
              maxRotation: 0
            }
          }
        ]
      }
    };
    return options;
  }

  render() {
    const widthCanvas = (((Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 2));
    const heightCanvas = (((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 70) / 3));
    let size = {
      width: widthCanvas + "px",
      height: heightCanvas + "px",
      float: "left",
    }
    let component = [];
    for (let item in this.props.Config.wykresy) {
      let data = this.GenerateData(item);
      let options = this.GenerateOptions(item);
      component.push(<div style={size} className="positions"><Line width={widthCanvas} height={heightCanvas} data={data} options={options}/></div>)
    }
    return (<div className="container">{component}</div>);
  }
}

const mapStateToProps = (state) => {
  return {Config: state.Config}
};
const mapDispatchToProps = {
  changeView
};

export const Charts = connect(mapStateToProps, mapDispatchToProps)(AppCharts);
