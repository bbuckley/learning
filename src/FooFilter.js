import React, { Component } from 'react';
import { connect } from 'react-redux';
import  Foo from './Foo';
import  BitField from './BitField';
import firebase, { FIRE_NAME } from './base';
import { filter} from './filter'

class FooFilter extends Component {
  constructor(){
    super()
    this.state = {
      tcs: []
    }
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
    let orig = this.state.tcs
    let tcs = filter(this.props.hide, orig);

    return (
      <div>
        <p>FooFilter {`${tcs.length} of ${orig.length}`}</p>

        <BitField fld='pbc' />
        <Foo tcs={tcs} flds={['tc','pbc','calc_type']} />
      </div>
    );
  }


}
const mapStateToProps = state => {
   return {
     hide: state.hide,
     personal: state.personal
   };
 };
export default connect(mapStateToProps)(FooFilter);
//export default FooFilter;
