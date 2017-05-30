import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

class Foo extends Component {
  constructor(){
    super()
    this.state = {
      tcs: []
    }
  }

  componentDidMount() {
    firebase.database().ref(FIRE_NAME).on('value', snapshot => {
      const o = snapshot.val();
      const tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });


      this.setState({
        //tcs: [1,6,9,223,3]
        tcs: tcs
      });
    });
  }

  render() {
    return (
      <div>
        <p>Fooooo!{this.state.tcs.length}!</p>
      </div>
    );
  }
}

export default Foo;

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

//export default connect(mapStateToProps)(Foo);

// const mapStateToProps = state => {
//   return {
//     hide: state.hide,
//     edit: state.edit,
//     personal: state.personal,
//   };
// };
//
// export default connect(mapStateToProps)(List);
//
