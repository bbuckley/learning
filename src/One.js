import React, { Component } from "react";
import firebase from "./base";

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
      "id",
      "tags",
    ];
    this.state = {
      tc: null,
    };
  }

  update(id) {
    firebase.database().ref("tcs/" + id).on("value", snapshot => {
      const tc = snapshot.val();
      this.setState({ tc });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps.id);
  }

  componentWillMount() {
    this.update(this.props.id);
  }

  render() {
    const { tc } = this.state;

    const isEditing = true;

    if (tc === null || this.props.id === "") return <p>no tc</p>;

    const headers = <tr><th>field</th><th>value</th></tr>;

    const rows = this.flds.map(fld => (
      <tr key={fld}><td>{fld}</td><td>{tc[fld]}</td></tr>
    ));

    return (
      <div>
        <table>
          <tbody>
            {headers}
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default One;
