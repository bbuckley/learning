import React, { Component, PropTypes } from "react";

import "./Checkbox.css";

class Checkbox extends Component {
  manuallySetValue(value) {
    this.setState(({ isChecked }) => ({
      isChecked: value
    }));
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked
    };

    this.onChange = this.onChange.bind(this);
    this.manuallySetValue = this.manuallySetValue.bind(this);
  }

  onChange() {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));
    handleCheckboxChange(label);
  }

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;

    return (
      <div className="Checkbox">
        <label>
          <input type="checkbox" checked={isChecked} onChange={this.onChange} />
          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};
Checkbox.defaultProps = {
  handleCheckboxChange: () => {
    console.log("handleCheckboxChange");
  },
  isChecked: true
};

export default Checkbox;
