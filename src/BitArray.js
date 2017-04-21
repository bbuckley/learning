import React, { Component } from "react";
import firebase from "./base";

class BitArray extends Component {
  setAll() {
    this.setInternals(this.state.a.map(e => [e[0], e[1], true]));
  }

  setNone() {
    this.setInternals(this.state.a.map(e => [e[0], e[1], false]));
  }

  setFlip() {
    this.setInternals(this.state.a.map(e => [e[0], e[1], !e[2]]));
  }

  componentWillMount() {
    console.log('here');
    firebase.database().ref("tcs").on("value", snapshot => {
      const o = snapshot.val();
      let tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });
      this.setState({ tcs });


    });


  }

  setInternals(state) {
    this.setState({
      a: state,
      count: state
        .filter(([, , checked]) => checked)
        .reduce((total, [, count]) => total + count, 0)
    });
  }

  constructor(props) {
    super(props);

    const aa = props.data;
    console.log(aa);
    this.state = {
      a: aa.map(e => e),
      count: aa.filter(e => e[2]).reduce((total, b) => total + b[1], 0)
    };

    this.onChange = this.onChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.setNone = this.setNone.bind(this);
    this.setFlip = this.setFlip.bind(this);
    this.setInternals = this.setInternals.bind(this);
  }

  onChange(e) {
    const { a } = this.state;
    const [value, label, checked] = a.find(([v]) => v === e.target.value);
    console.log(e.target.value, value, label, checked);
    const i = a.findIndex(([value]) => value === e.target.value);
    console.log(i);
    this.setInternals([
      ...a.slice(0, i),
      [value, label, !checked],
      ...a.slice(i + 1)
    ]);
  }

  render() {
    const { a, count } = this.state;

    return (
      <div>
        {a.map(e => {
          const [v, co, ch] = e
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
          {count}
        </div>
        <p>
          <a href="#" onClick={this.setNone}>None</a> -
          <a href="#" onClick={this.setAll}>All</a> -
          <a href="#" onClick={this.setFlip}>Flip</a>
        </p>

      </div>
    );
  }
}

export default BitArray;
