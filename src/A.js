import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { store } from './index';

class A extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('x', nextProps.tcs.length);
    let dat = nextProps.tcs.reduce((total, tc) => {
      let k = tc[nextProps.fld];
      if (!k || /^\s*$/.test(k)) {
        k = '<blank>';
      }
      total[k] ? total[k]++ : (total[k] = 1);
      return total;
    }, {});

    let data = Object.keys(dat).sort().map(k => {
      return [k, dat[k], !(nextProps.hide || []).includes(k)];
    });
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    // if (data === undefined) {
    //    return <div>no data</div>;
    // }

    return (
      <div>
        <p>data is {data}</p>
        <p>bar is {this.props.bar}</p>
        <p>foo is {this.props.foo}</p>
        <p>nfld is {this.props.nfld}</p>
        <p>fld is {this.props.fld}</p>
        <p>count is tcs is {this.props.tcs.length}</p>
        <p>count is tcs_def is {JSON.stringify(this.props.tcs_def)}</p>
        <p>tcs is '{JSON.stringify(this.props.tcs)}'</p>
        <p>personal is '{JSON.stringify(this.props.personal)}'</p>
        <p>hide is '{JSON.stringify(this.props.hide)}'</p>

      </div>
    );
  }
}

// A.propTypes = {
//   fld: PropTypes.string.isRequired,
// };

A.defaultProps = {
  fld: 'tc',
  //tcs_def: [{ tc: '111' }],
  //tcs: [{},{}],
};

const mapStateToProps = (state, ownProps) => {
  return {
    personal: state.personal,
    hide: state.hide[ownProps.fld],
  };
};

export default connect(mapStateToProps)(A);
