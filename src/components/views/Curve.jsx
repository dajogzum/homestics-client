import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as Constans from '../../enums';
import * as Resources from '../../resources';

import './Curve.css'

import {changeView} from '../../actions';

class AppCurve extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>Curve XD</div>);
  }
}

const mapStateToProps = (state) => {
  return {View: state.View}
};
const mapDispatchToProps = {
  changeView
};

export const Curve = connect(mapStateToProps, mapDispatchToProps)(AppCurve);
