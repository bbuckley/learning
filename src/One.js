
import React, { Component } from 'react';
import firebase from './base'

class One extends Component {
  constructor(){
    super()
    this.flds = ['pbc','calc_type','dob','doe','completed','id']
    this.state = {
      tc: null
    }
  }

  componentWillMount(){
    firebase.database().ref('tcs/' + this.props.id).on('value', snapshot => {
      const tc = snapshot.val();
      this.setState({ tc })
    })
  }


  render(){
    const { tc } = this.state;
    if(tc === null) return <p>no tc</p>;

    const rows = this.flds.map(fld =><p key={fld}>{fld}, {tc[fld]}</p>)

    return (
      <div>
        {rows}
      </div>
     )
  }
}


export default One;
