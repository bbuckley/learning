import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from './index';
import './BitField.css';

import {
  HIDE_FLIP_ALL,
  HIDE_ALL,
  HIDE_TOGGLE,
  HIDE_ONLY,
} from './actions/index';

const tagParse = str => {
  if (!str || !/[^\s*$]/.test(str)) {
    //return ['<blank>'];
    return [];
  } else {
    str = str.split(/\s*[, ]\s*/);
    return str.filter(x => x !== '');
  }
};

class BitField2 extends Component {
  // componentWillReceiveProps(nextProps) {
  //   //console.log('BitField props changed', { data: this.state.data, nextProps });
  //   const vs = nextProps.hide || [];
  //   const data = this.state.data.map(([v, ct, ch]) => [v, ct, !vs.includes(v)]);
  //   this.setState({ data });
  // }

  setAll() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, true]));
    store.dispatch({
      type: HIDE_ALL,
      field: this.props.fld,
      values: [],
    });
    //console.log('setAll', []);
  }

  setNone() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, false]));
    const values = this.state.data.map(([val]) => val);
    store.dispatch({
      type: HIDE_ALL,
      field: this.props.fld,
      values,
    });
    //console.log('setNone', values);
  }

  setFlip() {
    this.setInternals(this.state.data.map(([v, ct, ch]) => [v, ct, !ch]));
    const values = this.state.data.map(([val]) => val);
    store.dispatch({
      type: HIDE_FLIP_ALL,
      field: this.props.fld,
      values,
    });
  }

  onChange(e) {
    const { data } = this.state;
    const [value, label, checked] = data.find(([v]) => v === e.target.value);
    const i = data.findIndex(([value]) => value === e.target.value);
    this.setInternals([
      ...data.slice(0, i),
      [value, label, !checked],
      ...data.slice(i + 1),
    ]);
    store.dispatch({ type: 'HIDE_FLIP', field: this.props.fld, value });
  }

  //componentWillMount() {
componentWillReceiveProps(nextProps){
    console.log('in componentWillRecieveProps');

     const tcs = nextProps.tcs

      if (nextProps.distribution) {
        //console.log('here1');
        let dat = tcs.reduce((total, tc) => {
          let k = tc[nextProps.fld];
          if (!k || /^\s*$/.test(k)) {
            k = '<blank>';
          } else {
            k = nextProps.distribution(k);
          }
          total[k] ? total[k]++ : (total[k] = 1);
          return total;
        }, {});
        const ks = Object.keys(dat).sort();
        let data = ks.map(k => [k, dat[k], true]);
        this.setState({ data });
      } else if (nextProps.fld === 'tags') {
        let dat = tcs.reduce((total, tc) => {
          let k = tc['tags'];
          k = tagParse(k);
          if (k.length === 0) {
            total['<blank>'] ? total['<blank>']++ : (total['<blank>'] = 1);
          }
          k.forEach(k => {
            total[k] ? total[k]++ : (total[k] = 1);
          });
          return total;
        }, {});

        //const ks = Object.keys(dat).sort();
        let data = Object.keys(dat).sort().map(k => [
          k,
          dat[k],
          !(nextProps.hide || []).includes(k),
        ]);

        this.setState({ data });
      } else {
        let dat = tcs.reduce((total, tc) => {
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
  }

  setInternals(data) {
    this.setState({
      data: data,
      count: data
        .filter(([, , checked]) => checked)
        .reduce((total, [, count]) => total + count, 0),
      tcount: data.reduce((total, [, count]) => total + count, 0),
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      tc: []
    };

    //console.log(props.hide);

    this.onChange = this.onChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.setNone = this.setNone.bind(this);
    this.setFlip = this.setFlip.bind(this);
    this.setInternals = this.setInternals.bind(this);
  }

  render() {
    const { data } = this.state;
    if (data === undefined) {
    //if (this.props.tcs === []) {
      return <div>no data</div>;
    }

    const count = data
      .filter(([, , checked]) => checked)
      .reduce((total, [, count]) => total + count, 0);
    const tcount = data.reduce((total, [, count]) => total + count, 0);

    const Lk = ({ label, onClick }) => (
      <a href="#" onClick={onClick}>{label}</a>
    );

    // const footer = (
    //   <div>
    //     <Lk label="All" onClick={this.setAll} /> -
    //     <Lk label="None" onClick={this.setNone} /> -
    //     <Lk label="Flip" onClick={this.setFlip} />
    //   </div>
    // );

    let row_count;
    if (this.props.fld !== 'tags') {
      row_count = (
        <tr>
          <td colSpan="2">
            <a
              href="#"
              onClick={() =>
                store.dispatch({
                  type: 'HIDE_OTHER_FIELDS_CLEAR',
                  field: this.props.fld,
                })}
            >
              {count}
            </a> of {tcount}
          </td>
        </tr>
      );
    }

    return (
      <div className="BitField">

        <table>
          <caption>
            <Lk
              label={this.props.fld}
              onClick={() =>
                store.dispatch({
                  type: HIDE_TOGGLE,
                  field: this.props.fld,
                  values: this.state.data.map(([val]) => val),
                })}
            />
          </caption>
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
                    <a
                      href="#"
                      onClick={() => {
                        const values = this.state.data.map(([val]) => val);
                        store.dispatch({
                          type: HIDE_ONLY,
                          field: this.props.fld,
                          value,
                          values,
                        });
                        //console.log('only cicked', this.props.fld, value);
                      }}
                    >
                      {count}
                    </a>
                  </td>

                </tr>
              );
            })}
            {row_count}
            {/*
            <tr>
              <td colSpan="2">{footer}</td>
            </tr>
            */}

          </tbody>
        </table>

      </div>
    );
  }
}

BitField2.propTypes = {
  fld: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    personal: state.personal,
    hide: state.hide[ownProps.fld],
  };
};

//export default BitField;
export default connect(mapStateToProps)(BitField2);
