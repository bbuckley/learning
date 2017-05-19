import React, { Component } from 'react';
import { connect } from 'react-redux';

class Foo extends Component {
  render() {
    return (
      <div>
        Foo
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(Foo);
