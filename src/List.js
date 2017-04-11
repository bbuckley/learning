

import React, { Component } from 'react';
import firebase from './base'
import './list.css'


class List extends Component {
  state = {
    tcs: []
  }

  componentWillMount(){
    firebase.database().ref('tcs').on('value', snapshot => {
      const o = snapshot.val();
      let tcs =  Object.keys(o).map(k => { const v = o[k]; v.id = k; return v})
      this.setState({ tcs })
    })
  }

  render(){
    const {tcs} = this.state
    const flds = ['id','calc_type','pbc','dob','doe','crd']

    const rows = tcs.map(t => {
      const { id } = t;
      return (
        <tr key={id}>
          <td></td>
          { flds.map(fld => <td key={fld}>{t[fld]}</td>) }
        </tr>
      )
    })

    return (
      // <div className='List' style={{ border: '1px solid black' }}>
      <div className='List'>
        <table>
          <caption>
            {this.state.tcs.length}
          </caption>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}


export default List;
