import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

const Header = ({flds}) => (
  <thead>
    <tr>
      {flds.map(fld => <th key={fld}>{fld}</th>)}
    </tr>
  </thead>
);

const Row = ({flds, tc}) => (
   <tr>
      {flds.map(fld => <td key={fld}>{tc[fld]}</td>)}
   </tr>
);

const Rows = ({tcs, flds}) => (
  <tbody>
    {tcs.map(tc => <Row key={tc.id} tc={tc} flds={flds}/>)}
  </tbody>
)

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
    const {flds} = this.props;
    const {tcs} = this.state;
    return (
      <div>
        <p>Foo {tcs.length}!</p>
          <table>
              <Header flds={flds}/>
              <Rows flds={flds} tcs={tcs} />
          </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personal: state.personal,
  };
};

export default connect(mapStateToProps)(Foo);
