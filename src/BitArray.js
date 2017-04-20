import React, { Component } from "react";

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

  setInternals(state) {
    this.setState({
      a: state,
      count: state.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
    });
  }

  constructor(props) {
    super(props);

    const a = this.props.data;
    this.state = {
      //a: a.map(e => e),
      a: [...a],
      count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
    };

    this.onChange = this.onChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.setNone = this.setNone.bind(this);
    this.setFlip = this.setFlip.bind(this);
    this.setInternals = this.setInternals.bind(this);
  }

  onChange(e) {
    const { a } = this.state;
    const [value, label, checked] = a.find(
      ([value]) => value === e.target.value
    );
    const i = a.findIndex(([value]) => value === e.target.value);
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
          const [label, count, checked] = e;
          return (
            <div key={label}>
              <label>
                <input
                  value={label}
                  type="checkbox"
                  checked={checked}
                  onChange={this.onChange}
                />
                {label}, {count}
              </label>
            </div>
          );
        })}

        <div><p>{count}</p></div>

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
