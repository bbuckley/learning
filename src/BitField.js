import React, { Component } from 'react';
import firebase from './base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from './index';

class BitField extends Component {
  setAll() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, true]));
    const values = this.state.data.map(([keys]) => keys);
    store.dispatch({
      type: 'HIDE_ALL',
      field: this.props.fld,
      values
    });
  }

  setNone() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, false]));
    store.dispatch({
      type: 'HIDE_CLEAR',
      field: this.props.fld,
      values: []
    });
  }

  setFlip() {
    this.setInternals(this.state.data.map(([v, ct, ch]) => [v, ct, !ch]));
  }

  componentWillMount() {
    firebase.database().ref('tcs').on('value', snapshot => {
      const o = snapshot.val();
      const tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });
      this.setState({ tcs });

      let dat = tcs.reduce((total, tc) => {
        let key = tc[this.props.fld];
        if (key === undefined || key === '') {
          key = '<blank>';
        }
        total[key] ? total[key]++ : (total[key] = 1);
        return total;
      }, {});
      const ks = Object.keys(dat).sort();
      let data = ks.map(k => [k, dat[k], true]);

      this.setState({ data });
    });
  }

  setInternals(data) {


    this.setState({
      data: data,
      count: data
        .filter(([, , checked]) => checked)
        .reduce((total, [, count]) => total + count, 0),
      tcount: data.reduce((total, [, count]) => total + count, 0)
    });
  }

  constructor(props) {
    super(props);

    this.state = {};

    console.log(props.hide);

    this.onChange = this.onChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.setNone = this.setNone.bind(this);
    this.setFlip = this.setFlip.bind(this);
    this.setInternals = this.setInternals.bind(this);
  }

  onChange(e) {
    const { data } = this.state;
    const [value, label, checked] = data.find(([v]) => v === e.target.value);
    const i = data.findIndex(([value]) => value === e.target.value);
    this.setInternals([
      ...data.slice(0, i),
      [value, label, !checked],
      ...data.slice(i + 1)
    ]);
    store.dispatch({
      type: 'HIDE_FLIP',
      field: this.props.fld,
      value
    });
  }

  render() {
    const { data } = this.state;
    if (data === undefined) {
      return <div>no data</div>;
    }

    const count = data
      .filter(([, , checked]) => checked)
      .reduce((total, [, count]) => total + count, 0);
    const tcount = data.reduce((total, [, count]) => total + count, 0);

    const Lk = ({ label, onClick }) => (
      <a href="#" onClick={onClick}>{label}</a>
    );

    const footer = (
      <div>
        <Lk label="All" onClick={this.setAll} /> -
        <Lk label="None" onClick={this.setNone} /> -
        <Lk label="Flip" onClick={this.setFlip} />
      </div>
    );

    return (
      <div>
        {this.props.fld}

        {this.state.data.map(([value, count, checked]) => {
          return (
            <div key={value}>
              <label>
                <input
                  value={value}
                  type="checkbox"
                  checked={checked}
                  onChange={this.onChange}
                />
                {value}, {count}
              </label>
            </div>
          );
        })}

        <div>
          {count} of {tcount}
        </div>

        {footer}

      </div>
    );
  }
}

BitField.propTypes = {
  fld: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    hide: state.hide[ownProps.fld]
  };
};

//export default BitField;
export default connect(mapStateToProps)(BitField);
