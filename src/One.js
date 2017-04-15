import React, { Component } from "react";
import firebase from "./base";
import "./One.css";

class One extends Component {
  constructor() {
    super();
    this.flds = [
      "pbc",
      "tc",
      "calc_type",
      "dob",
      "doe",
      "dot",
      "crd",
      "completed",
      "id"
    ];
    this.state = {
      tc: null,
      edit: {}
    };
  }

  update(id) {
    firebase.database().ref("tcs/" + id).on("value", snapshot => {
      const tc = snapshot.val();

      const edit = {};
      this.flds.forEach(f => {
        edit[f] = tc[f] === undefined ? "" : tc[f];
      });

      this.setState({ tc, edit });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps.id);
  }

  componentWillMount() {
    this.update(this.props.id);
  }

  onChange(e) {
    const edit = { ...this.state.edit, [e.target.name]: e.target.value };
    this.setState({ edit });
  }

  onSubmit(e) {
    e.preventDefault();
    firebase
      .database()
      .ref("tcs/" + this.props.id + "/")
      .update({ ...this.state.edit });
    console.log("saved");
  }

  render() {
    const { tc } = this.state;

    // const isEditing = true;

    if (tc === null || this.props.id === "") return <p>no tc</p>;

    const header = (
      <tr>
        <th>field</th>
        <th colSpan="2">value</th>
      </tr>
    );

    const rows = this.flds.map(fld => (
      <tr key={fld}>
        <td>{fld}</td>
        <td>{tc[fld]}</td>
        {/* <td><input value={tc[fld]} /></td>  */}
        <td>
          <input
            name={fld}
            value={this.state.edit[fld]}
            onChange={this.onChange.bind(this)}
          />
        </td>
      </tr>
    ));

    const form = (
      <form onSubmit={this.onSubmit.bind(this)}>
        <table>
          <tbody>
            {header}
            {rows}
            <tr>
              <td /><td />
              <td>
                <input type="submit" value="submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );

    // const rows_e = this.flds.map(fld => (
    //   <tr key={fld}><td>{fld}</td><td><input value={tc[fld]} /></td></tr>
    // ));

    return (
      <div className="One">
        {form}
      </div>
    );
  }
}

export default One;
