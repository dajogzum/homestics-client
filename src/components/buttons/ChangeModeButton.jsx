import React, {Component} from 'react';
import {connect} from 'react-redux';

import './ChangeModeButton.css'

import {changeMode} from 'actions';

class AppChangeModeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className={this.props.Mode === this.props.Type
        ? "navigationButton selectedMode"
        : "navigationButton"} onClick={() => {
        this.props.changeMode(this.props.Type)
      }}>{this.props.Text}</div>);
  }
}

const mapStateToProps = (state) => {
  return {Mode: state.Mode}
};
const mapDispatchToProps = {
  changeMode
};

export const ChangeModeButton = connect(mapStateToProps, mapDispatchToProps)(AppChangeModeButton);
