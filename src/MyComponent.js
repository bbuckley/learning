import React, { Component } from "react";
import Checkboxes from "./Checkboxes";
import "./MyComponent.css";

const checkboxes = [
  { label: "A", checked: true, count: 4 },
  { label: "B", checked: false, count: 1 },
  { label: "AB", checked: true, count: 4 },
  { label: "C", checked: true, count: 3 }
];
const c1 = checkboxes.map(x => {
  return { ...x, checked: true };
});

const cb_none = c =>
  c.map(x => {
    return { ...x, checked: true };
  });

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent
    });
  }

  render() {
    return (
      <div className="MyComponent">
        <a href="#" onClick={this._onButtonClick}>Toggle</a>
        {this.state.showComponent
          ? <Checkboxes checkboxes={cb_none(checkboxes)} />
          : <Checkboxes checkboxes={checkboxes} />}
        <p>
          <a href="#" onClick={e => console.log("nonep")}>Nonep</a>
          -
          Allp
          -
          Flipp
        </p>
      </div>
    );
  }
}

export default MyComponent;
