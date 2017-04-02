
import React, { Component } from 'react'
import Checkboxes0 from './Checkboxes0'
import './MyComponent.css'


const checkboxes = [
  { label: 'A', checked: true, count: 4},
  { label: 'B', checked: false, count: 0},
  { label: 'AB', checked: true, count: 4},
]
const c1 = checkboxes.map(x => { return {...x, checked: true }})
const cb_none = (c) => c.map(x => { return {...x, checked: true }})


class MyComponent0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  }

  render() {
    return (
      <div className='MyComponent'>
        <a href='#' onClick={this._onButtonClick}>Toggle</a>
        {this.state.showComponent ?
           <Checkboxes0 checkboxes={cb_none(checkboxes)} /> :
           <Checkboxes0 checkboxes={checkboxes}/>
        }
      </div>
    );
  }
}

export default MyComponent0;
