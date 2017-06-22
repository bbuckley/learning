import React, { Component } from 'react';
//import firebase, { FIRE_NAME } from './base';
import './List.css';
//import BitArray from './BitArray';
import { filter } from './filter';
import { connect } from 'react-redux';
import { store } from './index';
import {
  EDIT_PROMPT,
  EDIT_VALUE,
  EDIT_CLEAR,
  EDIT_DELETE,
  EDIT_ID,
  HIDE_FLIP,
  HIDE_CLEAR,
  PERSONAL_EDIT,
} from './actions/index';
// import BitField from './BitField';
import { fields } from './fields';

class List extends Component {
  state = {
    tcs: [],
    input: {},
  };

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.edit.id);
    if (nextProps.edit.id && nextProps.edit.fld) {
      const { id, fld } = nextProps.edit;
      const { input } = this.state;
      const { tcs } = this.props;
      console.log(tcs.length);
      const i = tcs.findIndex(t => t.id === id);
      //console.log({ i, id });
      if (i !== -1) {
        //console.log('here', tcs[i][fld]);
        input[fld] = tcs[i][fld];
        //this.setState({ input });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { id, fld } = this.props.edit;
    const value = this.state.input[fld];
    if (['ptags', 'pnotes'].includes(fld)) {
      store.dispatch({ type: PERSONAL_EDIT, id, fld, value });
      store.dispatch({ type: EDIT_ID, id });
    } else {
      store.dispatch({ type: EDIT_VALUE, id, fld, value });
    }
  }

  onChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    //console.log({input, value: e.target.value, name: e.target.name});
    //console.log('onChange');
    this.setState({ input });
  }

  render() {
    let { tcs } = this.props;
    const flds = this.props.flds; //|| flds1;

    const tcount = tcs.length;
    tcs = filter(this.props.hide, tcs);
    const pcount = tcs.length;

    // this.props.personal.forEach(p => {
    //   const i = tcs.findIndex(t => t.id === p.id);
    //   if (i !== -1) tcs[i]['ptags'] = p['ptags'];
    // });

    const header_row = (
      <tr>
        <td>{pcount} of {tcount}</td>{flds.map(fld => <td key={fld}>{fld}</td>)}
      </tr>
    );

    // const style = { verticalAlign: 'top' };
    // const header_row2 = (
    //   <tr>
    //     <td />{flds.map(fld => {
    //       if (['tc', 'dob', 'crd', 'doe'].includes(fld))
    //         return <td key={fld} />;
    //       return <td style={style} key={fld}><BitField fld={fld} /></td>;
    //     })}
    //   </tr>
    // );

    const rows = tcs.map(t => {
      const { id } = t;

      if (this.props.edit.id === id) {
        return (
          <tr key={this.props.edit.id}>
            <td>
              <a href="#" onClick={() => store.dispatch({ type: EDIT_CLEAR })}>
                Clear
              </a>
              -
              <a
                href="#"
                onClick={() => store.dispatch({ type: EDIT_DELETE, id })}
              >
                Delete
              </a>
              -
              <a
                href="#"
                onClick={() =>
                  store.dispatch({ type: HIDE_FLIP, field: 'id', value: id })}
              >
                Hide
              </a>
            </td>
            {flds.map(fld => {
              if (this.props.edit.fld === fld && fields[fld].editable) {
                console.log(this.state.input[fld]);
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
                        onClick={() => store.dispatch({ type: EDIT_ID, id })}
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
        <tr key={id} className="ListSelected">
          <td>
            <a
              href="#"
              onClick={() => store.dispatch({ type: EDIT_CLEAR, id })}
            >
              Done
            </a>
            -
            <a
              href="#"
              onClick={() => store.dispatch({ type: EDIT_DELETE, id })}
            >
              Delete
            </a>
            -
            <a
              href="#"
              onClick={() =>
                store.dispatch({ type: HIDE_FLIP, field: 'id', value: id })}
            >
              Hide
            </a>

          </td>

          {flds.map(fld =>
            <td
              className="ListSelected"
              key={fld}
              onClick={() => {
                store.dispatch({ type: EDIT_ID, id, fld });
              }}
            >
              {t[fld]}
            </td>,
          )}

        </tr>
      );
    });

    let filters = Object.keys(this.props.hide)
      .filter(k => {
        const x = this.props.hide[k];
        return !x || x.length !== 0;
      })
      .sort()
      .join(', ');
    if (filters === '') {
      filters = 'no filters';
    }

    return (
      <div className="List">
        <table>
          <caption>
            {pcount}
            {' '}
            of
            {' '}
            <a href="#" onClick={() => store.dispatch({ type: HIDE_CLEAR })}>
              {tcount}
            </a>
            <span>, {filters}</span>
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

List.defaultProps = {
  tcs: [],
  flds: [
    'id',
    'tc',
    'pbc',
    'ric',
    'status',
    'calc_type',
    'dob',
    'doe',
    'crd',
    'completed',
    'tags',
    'ptags',
    'run',
    'hir_age',
    'calc_age',
  ],
};

const mapStateToProps = state => {
  return {
    hide: state.hide,
    edit: state.edit,
    personal: state.personal,
  };
};

export default connect(mapStateToProps)(List);
