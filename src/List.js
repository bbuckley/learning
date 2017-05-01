import React, { Component } from 'react';
import firebase from './base';
import './List.css';
//import BitArray from './BitArray';
import { filter } from './filter';
import { connect } from 'react-redux';
import {store} from './index'

class List extends Component {
  state = {
    tcs: []
  };

  componentWillMount() {
    firebase.database().ref('tcs').on('value', snapshot => {
      const o = snapshot.val();
      let tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });
      this.setState({ tcs });

      // let dat = tcs.reduce((total, tc) => {
      //   let key = tc["pbc"];
      //   if (key === undefined || key === "") {
      //     key = "blank";
      //   }
      //   total[key] ? total[key]++ : (total[key] = 1);
      //   return total;
      // }, {});
      // const ks = Object.keys(dat);
      // let data = ks.map(k => [k, dat[k], true]);
      // this.setState({ data });
      // console.log(this.state);
    });
  }

  render() {
    let { tcs } = this.state;
    const flds = [
      // 'id',
      'calc_type',
      'pbc',
      'dob',
      'doe',
      'crd',
      'completed',
      'ric',
      'status',
      'tags'
    ];

    const tcount = tcs.length;
    tcs = filter(this.props.hide, tcs);
    const pcount = tcs.length;

    const header = flds.map(fld => <td key={fld}>{fld}</td>);

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

        <table>
          <caption>
            {pcount}
            {' '}
            of
            {' '}
            <a href='#' onClick={() => store.dispatch({ type: 'HIDE_CLEAR' })}>
              {tcount}
            </a>
          </caption>
          <tbody>
            <td />{header}
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hide: state.hide
  };
};

export default connect(mapStateToProps)(List);
