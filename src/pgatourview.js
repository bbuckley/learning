import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

import { store } from './index';
import { EDIT_ID_TOGGLE, EDIT_PROMPT } from './actions/index';

const style1 = {
  backgroundColor: 'tan',
};
const style2 = {
  backgroundColor: 'yellow',
};

const Tc11 = ({ tc }) => <div style={style1}>{tc.calc_type}</div>;

const Tc1 = ({ tc }) => (
  <div style={style1}>
    <table style={{ padding: '10px 15px 10px 15px' }}>
      <tbody>
        <tr>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => store.dispatch({ type: EDIT_ID_TOGGLE, id: tc.id })}
          >
            x
          </td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => store.dispatch({ type: EDIT_ID_TOGGLE, id: tc.id })}
          >
            {tc.calc_type}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Tc2 = ({ tc }) => {
  const flds = ['tc', 'calc_type', 'pbc', 'ric', 'crd', 'dob', 'doe'];
  const fld_show = flds.map(f => (
    <tr key={f}>
      <td>{f}</td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => store.dispatch({ type: EDIT_PROMPT, id: tc.id, fld: f })}
      >
        {tc[f]}
      </td>
    </tr>
  ));
  return <div style={style2}><table><tbody>{fld_show}</tbody></table></div>;
};

class PgaTourView extends Component {
  constructor() {
    super();
    this.state = {
      tcs: [],
    };
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
    });
  }

  render() {
    const { tcs } = this.state;

    const rows = tcs.map(t => (
      <div key={t.id}>
        <table>
          <tbody>
            <tr>
              <td>
                <Tc1 tc={t} />
              </td>
            </tr>
            <tr>
              <td>
                <Tc2 tc={t} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ));

    const rows1 = tcs.map(t => {
      if (t.id === this.props.edit.id) {
        return (
          <div key={t.id}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Tc1 tc={t} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Tc2 tc={t} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      return (
        <div key={t.id}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Tc1 tc={t} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

    return (
      <div>
        PgaTourView {tcs.length}
        <table>
          <table><tbody><tr /></tbody></table>
          {rows1}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    edit: state.edit,
  };
};

export default connect(mapStateToProps)(PgaTourView);
