
import React, { Component } from 'react'
import Checkboxes0 from './Checkboxes0'
import './MyComponent.css'


const checkboxes = [
  { label: 'A', checked: true, count: 4},
  { label: 'B', checked: false, count: 0},
  { label: 'AB', checked: true, count: 4},
]
const cb_none = (c) => c.map(x => { return {...x, checked: true }})


class MyComponent1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 2,
    };

    this._onClick1 = this._onClick1.bind(this);
    this._onClick2 = this._onClick2.bind(this);
    this._onClick3 = this._onClick3.bind(this);
  }

  _onClick1() { this.setState({  mode: 1 }); }
  _onClick2() { this.setState({  mode: 2 }); }
  _onClick3() { this.setState({  mode: 3 }); }

  render() {
    return (
      <div className='MyComponent'>
        <a href='#' onClick={this._onClick1}>None</a> -
        <a href='#' onClick={this._onClick2}>All</a> -
        <a href='#' onClick={this._onClick3}>Flip</a>


        <p>{this.state.mode}</p>


      </div>
    );
  }
}

export default MyComponent1;
