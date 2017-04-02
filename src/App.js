import React, { Component } from 'react';
import './App.css';
import Checkbox from './Checkbox';
import Checkboxes from './Checkboxes';
import MyComponent0 from './MyComponent0';
import MyComponent1 from './MyComponent1';

const checkboxes = [
  { label: 'A', checked: true, count: 4},
  { label: 'B', checked: false, count: 1},
  { label: 'AB', checked: true, count: 4},
  { label: 'Cat', checked: true, count: 2},
  { label: 'D', checked: false, count: 4},
  { label: 'dog', checked: true, count: 4},
  { label: 'E', checked: true, count: 0},
]
const checks = checkboxes.filter(x => x.checked).map(x => x.label)

class App extends Component {
  constructor(){
    super()
    this.state = {
      checkboxes : new Set(checks)
    }
  }

  componentWillMount = () => {
    this.selectedCheckboxes = this.state.checkboxes
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    this.setState(this.selectedCheckboxes)
  }

  render() {

    return (
      <div className="App">
        <p className="App-intro">
        <code>'learning'</code>
        </p>

        <MyComponent1 />



        <MyComponent0 />



       ----0-----
        <br />

        {/* <p>
          <a href='#' onClick={ e => console.log('click app.none') }>None</a>
          -
          <a href='#' onClick={ e => {console.log('clicked app.all'); return <Checkboxes />} }>All</a>
          -
          <a href='#' onClick={ e => {console.log('clicked app.flip'); return <Checkboxes />} }>Flip</a>
        </p> */}

        <Checkboxes />

        <Checkboxes
          checkboxes={ [
            { label: 'A', checked: true, count: 2},
            { label: 'B', checked: false, count: 1},
            { label: 'C', checked: true, count: 1}]
          } />

        <Checkbox label='Foo' isChecked={false}/>
        <Checkbox label='Bar' isChecked={true} />
        <Checkbox label='Baz' />
        <br />

        { checkboxes.map(({label, checked}) =>
          <Checkbox
            key={label}
            label={label}
            isChecked={checked}
            handleCheckboxChange={ this.toggleCheckbox } />
        )}
        <p>{ this.selectedCheckboxes }</p>


      </div>
    );
  }
}

export default App;
