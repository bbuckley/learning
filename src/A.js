import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { store } from './index';

class A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    //this.prepareComponentState(props)
    //this.prepareComponentState = this.prepareComponentState.bind(this);
  }

  prepareComponentState(props) {
    const usedProps = this.props || props;
    let dat = usedProps.tcs.reduce((total, tc) => {
      let k = usedProps.f(usedProps.fld, tc);
      if (!k || /^\s*$/.test(k)) {
        k = '<blank>';
      }
      total[k] ? total[k]++ : (total[k] = 1);
      return total;
    }, {});
    let data = Object.keys(dat).sort().map(k => {
      return [k, dat[k], !(usedProps.hide || []).includes(k)];
    });
    this.setState({ data });
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillMount() {
    console.log('componentWillMount', this.props);
    this.prepareComponentState(this.props);

    // let dat = this.props.tcs.reduce((total, tc) => {
    //   let k = this.props.f(this.props.fld, tc)
    //   if (!k || /^\s*$/.test(k)) {
    //     k = '<blank>';
    //   }
    //   total[k] ? total[k]++ : (total[k] = 1);
    //   return total;
    // }, {});
    // let data = Object.keys(dat).sort().map(k => {
    //   return [k, dat[k], !(this.props.hide || []).includes(k)];
    // });
    // this.setState({ data });
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.tcs.length);
    this.prepareComponentState(nextProps);

    // let dat = nextProps.tcs.reduce((total, tc) => {
    //
    //
    //   let k = nextProps.f(nextProps.fld, tc)
    //
    //   if (!k || /^\s*$/.test(k)) {
    //     k = '<blank>';
    //   }
    //   total[k] ? total[k]++ : (total[k] = 1);
    //   return total;
    // }, {});
    //
    // let data = Object.keys(dat).sort().map(k => {
    //   return [k, dat[k], !(nextProps.hide || []).includes(k)];
    // });
    // this.setState({ data });

  }

  render() {
    const { data } = this.state;
    console.log({data});
    //if ((data === undefined) || (data.length === 0))  {
    if (data.length === 0)  {
      return <div>no data</div>;
    }

    return (
      <div>
        {/*
        <p> data is {data}</p>
        <p>bar is {this.props.bar}</p>
        <p>foo is {this.props.foo}</p>
        <p>nfld is {this.props.nfld}</p>
        <p>fld is {this.props.fld}</p>
        <p>count is tcs is {this.props.tcs.length}</p>
        <p>count is tcs_def is {JSON.stringify(this.props.tcs_def)}</p>
        <p>tcs is '{JSON.stringify(this.props.tcs)}'</p>
        <p>personal is '{JSON.stringify(this.props.personal)}'</p>
        <p>hide is '{JSON.stringify(this.props.hide)}'</p>
        */}
        <p>here</p>
        <table>
          <tbody>
            {this.state.data.map(([value, count, checked]) => {
              return (
                <tr key={value}>
                  <td>
                    <div>
                      <label>
                        <input
                          value={value}
                          type="checkbox"
                          checked={checked}
                          onChange={this.onChange}
                        />
                        {value}
                      </label>
                    </div>
                  </td>
                  <td>
                    {count}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

A.propTypes = {
  //   f: PropTypes.function.isRequired,
};

A.defaultProps = {
  fld: 'pbc',
  //tcs_def: [{ tc: '111' }],
  //tcs: [{},{}],
  f: (fld, tc) => tc[fld],
};

const mapStateToProps = (state, ownProps) => {
  return {
    personal: state.personal,
    hide: state.hide[ownProps.fld],
  };
};

export default connect(mapStateToProps)(A);
