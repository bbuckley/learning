import React, { Component } from "react";
import firebase from "./base";
import PropTypes from "prop-types";

class BitField extends Component {
  setAll() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, true]));
  }

  setNone() {
    this.setInternals(this.state.data.map(([val, ct]) => [val, ct, false]));
  }

  setFlip() {
    this.setInternals(this.state.data.map(([v, ct, ch]) => [v, ct, !ch]));
  }

  componentWillMount() {
    firebase.database().ref("tcs").on("value", snapshot => {
      const o = snapshot.val();
      const tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });
      this.setState({ tcs });

      let dat = tcs.reduce((total, tc) => {
        let key = tc[this.props.fld];
        if (key === undefined || key === "") {
          key = "<blank>";
        }
        total[key] ? total[key]++ : (total[key] = 1);
        return total;
      }, {});
      const ks = Object.keys(dat).sort();
      let data = ks.map(k => [k, dat[k], true]);
      this.setState({ data });
      //console.log(this.state);
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

    //const aa = [["a", 10, true]];
    this.state = {
      //a: aa.map(e => e),
      //count: aa.filter(e => e[2]).reduce((total, b) => total + b[1], 0)
    };

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

    return (
      <div>
      <p>
      <a href="#" onClick={this.setNone}>None</a> -
      <a href="#" onClick={this.setAll}>All</a> -
      <a href="#" onClick={this.setFlip}>Flip</a>
      </p>
        {this.props.fld}
        {this.state.data.map(e => {
          const [v, co, ch] = e;

          return (
            <div key={v}>
              <label>
                <input
                  value={v}
                  type="checkbox"
                  checked={ch}
                  onChange={this.onChange}
                />
                {v}, {co}
              </label>
            </div>
          );
        })}

        <div>
          {count} of {tcount}
        </div>

      </div>
    );
  }
}

BitField.propTypes = {
  fld: PropTypes.string.isRequired
};

export default BitField;
