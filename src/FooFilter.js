import React, { Component } from 'react';
import { connect } from 'react-redux';
import  Foo from './Foo';
import  BitField from './BitField';
import firebase, { FIRE_NAME } from './base';
import { filter} from './filter'

class FooFilter extends Component {

  render() {
    let orig = this.props.tcs;
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
