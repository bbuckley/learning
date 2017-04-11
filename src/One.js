
import React, { Component } from 'react';
import firebase from './base'

class One extends Component {
  state = {
    tc: null
  }

  componentWillMount(){
    console.log('compoent will mount');

    firebase.database().ref('tcs/' + this.props.id).on('value', snapshot => {
      const tc = snapshot.val();
      this.setState({ tc })
    })
  }

  componentDidMount(){
     console.log('compoent did mount');
  }


  render(){
    const { id } = this.props;
    const { tc } = this.state;

    console.log(JSON.stringify(tc))
    const t = JSON.parse(JSON.stringify(tc));
    //const { calc_type } = t;


    return (
      <div>
        One! {id}
        <p>{JSON.stringify(this.state)}</p>
        <p>{JSON.stringify(tc)}</p>
        {/* {Object.keys(tc).map(k => k)} */}

      </div>
     )
  }
}


export default One;
