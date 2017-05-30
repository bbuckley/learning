import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

class Foo extends Component {
  constructor() {
    super();
    this.state = {
      tcs: [],
    };
  }

  componentDidMount() {
    firebase.database().ref(FIRE_NAME).on('value', snapshot => {
      const o = snapshot.val();
      let tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });

      tcs = tcs.map(tc => {
        const b = new Date(tc.dob).getFullYear();
        const h = new Date(tc.doe).getFullYear();
        const e = new Date(tc.crd).getFullYear();

        const hir_age = h - b;
        const calc_age = e - b;
        return { ...tc, hir_age, calc_age };
      });

      this.props.personal.forEach(p => {
        const i = tcs.findIndex(t => t.id === p.id);
        if (i !== -1) tcs[i]['ptags'] = p['ptags'];
      });

      this.setState({ tcs });
    });
  }

  render() {
    //const flds = ['id', 'status','dob', 'doe', 'pbc', 'hir_age', 'ptags'];
    const flds = this.props.flds;
    const header = <tr>{flds.map(fld => <th key={fld}>{fld}</th>)}</tr>;

    const rows = this.state.tcs.map(tc => (
      <tr key={tc['id']}>
        {flds.map(fld => <td key={fld}>{tc[fld]}</td>)}
      </tr>
    ));

    return (
      <div>
        <p>Fooooo!{this.state.tcs.length}!</p>
        <table>
          <tbody>
            {header}
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

//export default Foo;

// const mapStateToProps = state => {
//   let tcs;
//   firebase.database().ref(FIRE_NAME).on('value', snapshot => {
//     const o = snapshot.val();
//     tcs = Object.keys(o).map(k => {
//       const v = o[k];
//       v.id = k;
//       return v;
//     });
//     return {
//       foos: 'testing...'
//     }
//   });
// };

const mapStateToProps = state => {
  return {
    //     hide: state.hide,
    //     edit: state.edit,
    personal: state.personal,
  };
};
export default connect(mapStateToProps)(Foo);
//
//export connect(mapStateToProps)(Foo);
//
