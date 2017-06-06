import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from './index';

class A extends Component {

  render() {
    return (<div>A {this.props.fld}</div>)
  }
}

A.propTypes = {
  fld: PropTypes.string.isRequired,
  tcs: PropTypes.object.isRequired,
};
A.defaultProps = {
  fld: 'pbc',
};

const mapStateToProps = (state, ownProps) => {
  return {
    personal: state.personal,
    hide: state.hide[ownProps.fld],
  };
};

export default connect(mapStateToProps)(A);
