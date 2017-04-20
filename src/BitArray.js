import React, { Component } from "react";

class BitArray extends Component {
  setAll() {
    const a = this.state.a.map(e => [e[0],e[1],true])
    console.log('setAll');
    this.setState({
      a,
      count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
    });
}
setNone() {
  const a = this.state.a.map(e => [e[0],e[1],false])
  this.setState({
    a,
    count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
  });
}

setFlip() {
  const a = this.state.a.map(e => [e[0],e[1],!e[2]])
  this.setState({
    a,
    count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
  });
}

  constructor(props) {
    super(props);

    const a = this.props.data;
    this.state = {
      a: a.map(e => e),
      count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
    };

    console.log(this.state.count, a);

    this.onChange = this.onChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.setNone = this.setNone.bind(this);
    this.setFlip = this.setFlip.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
    let { a } = this.state;
    let x = a.find(b => b[0] === e.target.value);
    x = [x[0], x[1], !x[2]];

    const i = a.findIndex(b => b[0] === e.target.value);
    a = [...a.slice(0, i), x, ...a.slice(i + 1)]

    this.setState({
      a,
      count: a.filter(e => e[2] === true).reduce((a, b) => a + b[1], 0)
    });
  }

  render() {
    const { a, checked } = this.state;

    // const { d } = this.state;
    //
    // const fns = ([label, isChecked]) => (
    //   <div key={label} className="Checkbox">
    //     <label>
    //       <input type="checkbox" checked={isChecked} onChange={this.onChange} />
    //       {label}
    //     </label>
    //   </div>
    // );
    //
    // const as = a.map(e => fns(e));
    // const bs = b.map(e => fns(e));
    // const cs = c.map(e => fns(e));

    return (
      <div>
        {a.map(e => {
          const [label, count, checked] = e;
          return (
            <div key={label} className="Checkbox">
              <label>
                <input
                  value={label}
                  type="checkbox"
                  checked={checked === true}
                  onChange={this.onChange}
                />
                {label}, {count}
              </label>
            </div>
          );
        })}

        <div><p>{this.state.count}</p></div>

        <p>
        <a href='#' onClick={this.setNone}>None</a> -
        <a href='#' onClick={this.setAll}>All</a> -
        <a href='#' onClick={this.setFlip}>Flip</a>
        </p>

      </div>
    );
  }
}

export default BitArray;
