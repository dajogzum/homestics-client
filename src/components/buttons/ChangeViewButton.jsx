import React, {Component} from 'react';
import {connect} from 'react-redux';

import './ChangeViewButton.css'

import {changeView} from '../../actions';

class AppChangeViewButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className={this.props.View === this.props.Target
        ? "Nav-Button selectedView"
        : "Nav-Button"} onClick={() => {
        this.props.changeView(this.props.Target)
      }}>
      <span className="material-icons md-16">{this.props.Icon}</span>
      {this.props.Text}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {View: state.View}
};
const mapDispatchToProps = {
  changeView
};

export const ChangeViewButton = connect(mapStateToProps, mapDispatchToProps)(AppChangeViewButton);
