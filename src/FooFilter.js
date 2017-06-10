import React, { Component } from 'react';
import { connect } from 'react-redux';
import  Foo from './Foo';
import  BitField2 from './BitField2';
import  A from './A';
import { filter} from './filter'

class FooFilter extends Component {

  render() {
    let orig = this.props.tcs;
    let tcs = filter(this.props.hide, orig);

    return (
      <div>
        <p>FooFilter {`${tcs.length} of ${orig.length}`}</p>

        <div>
          <table>
            <tbody>
              <tr><td>
                <BitField2 tcs={orig} fld='pbc' />
                  <BitField2 tcs={orig} fld='calc_type' />
                    <BitField2 tcs={tcs} fld='status' />
                <A tcs={tcs} fld='status' />
              </td></tr>
            </tbody>
          </table>
        </div>

        <Foo tcs={tcs} flds={this.props.flds} />
      </div>
    );
  }


}


FooFilter.defaultProps = {
  tcs: [],
  flds: ['tc','pbc','calc_type','hir_age', 'calc_age']
};

const mapStateToProps = state => {
   return {
     hide: state.hide,
     personal: state.personal
   };
 };
export default connect(mapStateToProps)(FooFilter);
