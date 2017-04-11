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

class Checkboxes0 extends Component {
  constructor(props){
    super(props)
    const { checkboxes } = props
    const checks = checkboxes.filter(x => x.checked).map(x => x.label)
    this.state = {
      checked: new Set(checks),
      list: checkboxes.map(x => x.label),
    }
  }

  componentWillReceiveProps(newProps){
    // const cbs = [
    //   { label: 'A', checked: true, count: 4},
    //   { label: 'B', checked: false, count: 1} ]
    console.log('new props', newProps);
    const { checkboxes } = newProps
    const checks = checkboxes.filter(x => x.checked).map(x => x.label)
    this.setState({
      checked: new Set(checks),
      list: checkboxes.map(x => x.label)
    });

  }

  uncheckAll = () => {
     console.log('uncheck all');
   
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

    const checked = this.state.checked;

    if (checked.has(label)) {
      checked.delete(label);
    } else {
      checked.add(label);
    }
    this.setState({ checked })
  }

  render() {
    const { checkboxes } = this.props

    const ch = this.state.checked;


    const n = checkboxes.reduce((p, c) => p + c.count, 0)
    const m = checkboxes.filter(x => ch.has(x.label)).reduce((p, c) => p + c.count, 0)

    return (
      <div className="Checkboxes">
        dddddd
        <table>
       <caption>Checkboxes0</caption>
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
          <a href='#' onClick={e => { console.log('uncheck all here with call - none'); this.uncheckAll(); } }>None</a>
          -
          <a href='#' onClick={e => console.log('here - all') }>All</a>
          -
          <a href='#' onClick={e => console.log('here - flip') }>Flip</a>
        </p>

      </div>
    );
  }
}

Checkboxes0.propTypes = {
  checkboxes: PropTypes.array.isRequired,
};
Checkboxes0.defaultProps = {
  checkboxes: checkboxes_default,


};


export default Checkboxes0;
