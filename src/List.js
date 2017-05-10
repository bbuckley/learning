import React, { Component } from 'react';
import firebase, { FIRE_NAME } from './base';
import './List.css';
//import BitArray from './BitArray';
import { filter } from './filter';
import { connect } from 'react-redux';
import { store } from './index';
import { /*EDIT_ID,*/ EDIT_PROMPT, EDIT_VALUE, EDIT_CLEAR, EDIT_DELETE } from './actions/index';

class List extends Component {
  state = {
    tcs: [],
    input: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit.id && nextProps.edit.fld) {
      const { id, fld } = nextProps.edit;
      const { input, tcs } = this.state;
      const i = tcs.findIndex(t => t.id === id);
      if (i !== -1) {
        input[fld] = tcs[i][fld];
        //this.setState({ input });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { id, fld } = this.props.edit;
    const value = this.state.input[fld];
    store.dispatch({ type: EDIT_VALUE, id, fld, value });
  }

  onChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    //console.log({input, value: e.target.value, name: e.target.name});
    this.setState({ input });
  }

  componentWillMount() {
    firebase.database().ref(FIRE_NAME).on('value', snapshot => {
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
      'id',
      'tc',
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

    const header_row = (
      <tr><td />{flds.map(fld => <td key={fld}>{fld}</td>)}</tr>
    );

    const rows = tcs.map(t => {
      const { id } = t;

      if (this.props.edit.id === id) {
        return (
          <tr key={this.props.edit.id}>
            <td>xxx</td>
            {flds.map(fld => {
              if (this.props.edit.fld === fld) {
                return (
                  <td key={fld}>
                    {t[fld]}
                    <form onSubmit={this.onSubmit.bind(this)}>
                      <input
                        autoFocus={true}
                        name={fld}
                        value={this.state.input[fld]}
                        onChange={this.onChange.bind(this)}
                      />
                      <input
                        type="button"
                        value="cancel"
                        onClick={() => store.dispatch({type: EDIT_CLEAR })}
                      />
                      <input
                        type="button"
                        value="submit"
                        onClick={() => this.onSubmit.bind(this)}
                      />
                    </form>
                  </td>
                );
              } else {
                return (
                  <td
                    onClick={() => {
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
          className="ListSelected"
        >
          <td>
            <input
              type="button"
              onClick={() => {
                console.log(id, EDIT_DELETE);
                store.dispatch({ type: EDIT_DELETE, id });
              }}
            />rrr
          {/*
          // <a href='#' onClick={store.dispatch({ type: EDIT_DELETE, id })}>Delete</a>
          y
          */}
          </td>

          {flds.map(fld => (
            <td className="ListSelected"
              key={fld}
              onClick={() => {
                store.dispatch({ type: EDIT_PROMPT, id, fld });
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
            {header_row}
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
