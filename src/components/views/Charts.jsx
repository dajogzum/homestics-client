import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Constans from '../../enums';
import * as Resources from '../../resources';

import './Charts.css'

import {changeView} from '../../actions';

class AppCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>Charts XD</div>);
  }
}

const mapStateToProps = (state) => {
  return {View: state.View}
};
const mapDispatchToProps = {
  changeView
};

export const Charts = connect(mapStateToProps, mapDispatchToProps)(AppCharts);
