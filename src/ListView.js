import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';
import { store } from './index';
import { VIEW_SET } from './actions/index';
import { Link } from 'react-router-dom';

class ListView extends Component {
  render() {
    const { view } = this.props;

    let x;
    switch (view) {
      case 'all':
        x = <List flds={['calc_type','pbc', 'crd', 'dob', 'doe']} />;
        break;
      case 'dates':
        x = <List flds={['crd', 'dob', 'doe']} />;
        break;
      default:
        x = <List />;
    }

    return (
      <div>
        <a href="#" onClick={() => console.log(store.getState())}>
          state
        </a>
        <a
          href="#"
          onClick={() => {
            store.dispatch({ type: VIEW_SET, value: 'all' });
          }}
        >
          all
        </a> -
        <a
          href="#"
          onClick={() => store.dispatch({ type: VIEW_SET, value: 'dates' })}
        >
          dates
        </a>
        {' '}
        -
        {x}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view,
  };
};

export default connect(mapStateToProps)(ListView);
