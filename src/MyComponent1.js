import React, { Component } from "react";
import Checkboxes0 from "./Checkboxes0";
import "./MyComponent.css";

import Checkbox from "./Checkbox";
import Checkboxes from "./Checkboxes";

const checkboxes = [
  { label: "A", checked: true, count: 4 },
  { label: "B", checked: false, count: 0 },
  { label: "AB", checked: true, count: 4 },
];
const cb_none = c =>
  c.map(x => {
    return { ...x, checked: true };
  });

class MyComponent1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      cbs: this.props.checkboxes,
    };
  }

  componentWillReceiveProps(newProps) {
    console.log("MyComponent1 new props!!!", newProps);
    const { checkboxes, mode } = newProps;
    if (mode === 1) {
      this.setState({
        cbs: checkboxes.map(x => {
          return { ...x, checked: true };
        }),
      });
    }
    console.log(this.state.cbs);
  }

  render() {
    const { cbs, mode } = this.state;
    //const mode = this.state.mode
    console.log({ mode, cbs });

    return (
      <div className="MyComponent">
        {/* <a href='#' onClick={() => this.setState({  mode: 0 })}>None</a> -
        <a href='#' onClick={() => this.setState({  mode: 1 })}>All</a> -
        <a href='#' onClick={() => this.setState({  mode: 2 })}>Flip</a> */}

        <p>mode: {this.state.mode}</p>

        <table>
          <caption>Checkboxes</caption>
          <tbody>
            {cbs.map(({ label, checked, count }) => (
              <tr key={label}>
                <td>
                  <Checkbox
                    label={label}
                    isChecked={checked}
                    handleCheckboxChange={this.toggleCheckbox}
                  />
                </td>
                <td>
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default MyComponent1;
