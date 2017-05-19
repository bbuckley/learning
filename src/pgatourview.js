import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

import { store } from './index';
import { EDIT_ID } from './actions/index';

const style1 = {
  backgroundColor: 'red',
};
const style2 = {
  backgroundColor: 'yellow',
};

const Tc11 = ({ tc }) => <div style={style1}>{tc.calc_type}</div>;

const Tc1 = ({ tc }) => (
  <div style={style1}>
    <table>
      <tbody>
        <tr>
          <td style={{cursor:'pointer'}} onClick={() => store.dispatch({ type: EDIT_ID, id: tc.id })}>
            x
          </td>
          <td>{tc.calc_type}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Tc2 = ({ tc }) => {
  const { calc_type, pbc, ric } = tc;
  return <div style={style2}>{calc_type} {pbc}, {ric} xxx</div>;
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

    // const fn = id => {
    //   const t = tcs.find(t => t.id === id);
    // //   console.log(id===this.props.edit, t);
    // //   if (id === this.props.edit) {
    // //     return <Tc1 tc={t} />
    // //   } else {
    // //     return <Tc2 tc={t} />
    // //   }
    // };

    // if (this.props.edit === tcs.id) {
    // //   tc = <table><tbody><tr><td>{t.calc_type}</td></tr></tbody></table>;
    // } else {
    // //   tc = (
    // //     <table>
    // //       <tbody><tr><td>{t.calc_type} {t.pbc}, {t.ric}</td></tr></tbody>
    // //     </table>
    // //   );
    // }

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
