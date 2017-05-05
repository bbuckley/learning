import React, { Component } from 'react';
import firebase from './base';
import './List.css';
//import BitArray from './BitArray';
import { filter } from './filter';
import { connect } from 'react-redux';
import { store } from './index';
import { EDIT_ID, EDIT_PROMPT } from './actions/index';

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

      if (this.props.edit.id === id) {
        return (
          <tr key={this.props.edit.id}>
            <td>xxx</td>
            {flds.map(fld => {
              if (this.props.edit.fld === fld) {
                return (
                  <td>
                    {t[fld]}
                    <input />
                  </td>
                )
              } else {
                return (
                  <td
                    onClick={() => {
                      console.log(EDIT_PROMPT, id, fld);
                      store.dispatch({ type: EDIT_PROMPT, id, fld });
                    }}
                    key={fld}
                  >
                    {t[fld]}

                  </td>
                );
              }
            })}
          </tr>
        );
      }

      return (
        <tr
          key={id}
          // className="ListSelected"
          // onClick={() => {
          //   console.log('ListSelected', EDIT_ID, id);
          //   //store.dispatch({ type: EDIT_ID, id });
          // }}
        >
          <td>
            <input
              type="button"
              onClick={() => {
                console.log(id);
                //store.dispatch({ type: EDIT_ID, id });
              }}
            />yyy
          </td>

          {flds.map(fld => (
            <td
              key={fld}
              onClick={() => {
                console.log(EDIT_PROMPT, id, fld);
                store.dispatch({ type: EDIT_PROMPT, id, fld })
              }}
            >
              {t[fld]}
            </td>
          ))}

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
            <a href="#" onClick={() => store.dispatch({ type: 'HIDE_CLEAR' })}>
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
    hide: state.hide,
    edit: state.edit
  };
};

export default connect(mapStateToProps)(List);
