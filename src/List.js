import React, { Component } from 'react';
import firebase from './base';
import './list.css';
//import BitArray from './BitArray';
import { filter } from './filter';
import { connect } from 'react-redux';

class List extends Component {
  state = {
    tcs: [],
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
    const flds = ['id', 'calc_type', 'pbc', 'dob', 'doe', 'crd', 'completed','ric'];

    //console.log({hide: this.props.hide});
    const tcount = tcs.length
    tcs = filter(this.props.hide, tcs);
    const pcount = tcs.length


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

    // let dat = tcs.reduce((total, tc) => {
    //   let key = tc["pbc"];
    //   if (key === undefined || key === "") {
    //     key = "blank";
    //   }
    //   total[key] ? total[key]++ : (total[key] = 1);
    //   return total;
    // }, {});
    // const ks = Object.keys(dat);
    // let data = ks.map(k => { return [k, dat[k], true]});
    // console.log(ks, data);

    return (
      <div className="List">

        {/* <BitArray
          data={[['aaa', 3, true], ['b', 2, false], ['ccc', 2, true]]}
        />

        <BitArray data={[['here', 3, true]]} />

        <BitArray data={[['here', 3, true], ['there', 2, true]]} /> */}

        <table>
          <caption>
            {pcount} of {tcount}
          </caption>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hide: state.hide,
  };
};

export default connect(mapStateToProps)(List);
