import React, { Component, PropTypes } from 'react';
//import React, { Component } from 'react';

import Checkbox from './Checkbox'
import './Checkboxes.css';

const checkboxes_default = [
  { label: 'A', checked: true, count: 4},
  { label: 'B', checked: false, count: 1},
  { label: 'AB', checked: true, count: 4},
  { label: 'C', checked: true, count: 2},
  { label: 'D', checked: false, count: 4},
  { label: 'E', checked: true, count: 0},
]
//const c1 = checkboxes.map(x => { return {...x, checked: true }})

class Checkboxes extends Component {
  constructor(props){
    super(props)
    const { checkboxes } = props
    const checks = checkboxes.filter(x => x.checked).map(x => x.label)
    this.state = {
      checkboxes: new Set(checks)
    }
    this.selectedCheckboxes = this.state.checkboxes

  }

  componentWillReceiveProps(newProps){
    // const cbs = [
    //   { label: 'A', checked: true, count: 4},
    //   { label: 'B', checked: false, count: 1} ]
    console.log('new props', newProps);



    const { checkboxes } = newProps
    const checks = checkboxes.filter(x => x.checked).map(x => x.label)
    this.state = {
      checkboxes: new Set(checks)
    }
    this.selectedCheckboxes = this.state.checkboxes
    this.setState(this.selectedCheckboxes)

    console.log({ state: this.state });
  }


  uncheckAll = () => {
     console.log('uncheck all');
     const { checkboxes } = this.props

     const list = checkboxes.map(x => x.label)
     const checked = checkboxes.filter(x => x.checked).map(x => x.label)
     this.setState({
       list,
       checked,
     });
     console.log(this.state);

     //this.setState({ checkboxes: new Set() });
     //this.selectedCheckboxes = new Set()
     //this.setState(this.selectedCheckboxes)
     //this.toggleCheckbox('A')
     this.selectedCheckboxes.forEach(e=>{
       console.log(e);
       //this.toggleCheckbox(e)
     });
  }

  componentWillMount = () => {
    //this.selectedCheckboxes = this.state.checkboxes
  }

  toggleCheckbox = label => {
    // const ch = this.state.checked;
    // if (ch.has(label)) {
    //   ch.delete(label);
    // } else {
    //   ch.add(label);
    // }
    // this.setState(ch)

    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    this.setState(this.selectedCheckboxes)
  }

  render() {
    const { checkboxes } = this.props


    const n = checkboxes.reduce((p, c) => p + c.count, 0)
    const m = checkboxes.filter(x => this.selectedCheckboxes.has(x.label)).reduce((p, c) => p + c.count, 0)

    return (
      <div className="Checkboxes">
        <table>
          <caption>Checkboxes</caption>
          <tbody>
            { checkboxes.map(({label, checked, count}) =>
            <tr key={label}>
              <td>
                <Checkbox
                  label={label}
                  isChecked={checked}
                  handleCheckboxChange={ this.toggleCheckbox }
                />
              </td>
              <td>
                {count}
              </td>
            </tr>
          )}
          </tbody>
        </table>

        <p>{n} : {m} - { this.selectedCheckboxes }</p>
        <p>{JSON.stringify(this.props.checkboxes)}</p>
        <p>{ JSON.stringify(this.selectedCheckboxes) }</p>
        <p>{ this.selectedCheckboxes }</p>
        <p>
          <a href='#' onClick={e => { console.log('here with call - none'); this.uncheckAll(); } }>None</a>
          -
          <a href='#' onClick={e => console.log('here - all') }>All</a>
          -
          <a href='#' onClick={e => console.log('here - flip') }>Flip</a>
        </p>

      </div>
    );
  }
}

Checkboxes.propTypes = {
  foo: PropTypes.string.isRequired,
  checkboxes: PropTypes.array.isRequired,
  two: React.PropTypes.oneOf(['News', 'Photos']),  //testing
};
Checkboxes.defaultProps = {
  foo: 'xxx',
  checkboxes: checkboxes_default,


};


export default Checkboxes;
