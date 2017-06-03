import React, { Component } from 'react';
import { connect } from 'react-redux';
import  Foo from './Foo';
import  BitField from './BitField';
import firebase, { FIRE_NAME } from './base';

class FooFilter extends Component {
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
    return (
      <div>
        <p>FooFilter</p>

        <BitField fld='pbc' />
        <Foo flds={['pbc','calc_type']} />
      </div>
    );
  }


}
const mapStateToProps = state => {
   return {
     personal: state.personal
   };
 };
export default connect(mapStateToProps)(FooFilter);
//export default FooFilter;
