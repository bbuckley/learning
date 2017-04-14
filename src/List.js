import React, { Component } from "react";
import firebase from "./base";
import "./list.css";
import { Route } from "react-router-dom";
import { browserHistory } from "react-router";
import One from "./One";

class List extends Component {
  state = {
    tcs: []
  };

  componentWillMount() {
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

  render() {
    const { tcs } = this.state;
    const flds = ["id", "calc_type", "pbc", "dob", "doe", "crd", "completed"];

    const rows = tcs.map(t => {
      const { id } = t;
      return (
        <tr key={id}>
          <td>
            <input
              type="button"
              onClick={() => {
                console.log(id);
              }}
            />

          </td>
          {flds.map(fld => <td key={fld}>{t[fld]}</td>)}
        </tr>
      );
    });

    return (
      <div className="List">
        <Route render={({ match }) => <One id={this.xid} />} />
        <Route render={({ match }) => <One id="-KeY8FVZ5QFnFWth_SIe" />} />

        <table>
          <caption>
            {this.state.tcs.length}
          </caption>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
