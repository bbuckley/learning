import React, { Component } from 'react';
import firebase, { FIRE_NAME } from './base';
import './One.css';

class One extends Component {
  constructor() {
    super();
    this.flds = [
      'pbc',
      'ric',
      'tags',
      'tc',
      'calc_type',
      'dob',
      'doe',
      'dot',
      'crd',
      'completed',
    ];
    this.state = {
      tc: null,
      edit: {},
    };
  }

  update(id) {
    firebase.database().ref(FIRE_NAME + '/' + id).on('value', snapshot => {
      const tc = snapshot.val();

      const edit = {};
      this.flds.forEach(f => {
        edit[f] = tc[f] === undefined ? '' : tc[f];
      });

      edit['notes'] = tc['notes'] === undefined ? '' : tc['notes'];

      this.setState({ tc, edit });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps.id);
  }

  componentWillMount() {
    this.update(this.props.id);
  }

  onChange(e) {
    const edit = { ...this.state.edit, [e.target.name]: e.target.value };
    this.setState({ edit });
  }

  onSubmit(e) {
    e.preventDefault();
    firebase
      .database()
      .ref(FIRE_NAME + '/' + this.props.id + '/')
      .update({ ...this.state.edit });
    console.log('saved');
  }

  render() {
    const { tc } = this.state;

    // const isEditing = true;

    if (tc === null || this.props.id === '') return <p>no tc</p>;

    const header = (
      <tr>
        <th>field</th>
        <th colSpan="2">value</th>
      </tr>
    );

    const rows = this.flds.map(fld => (
      <tr key={fld}>
        <td>{fld}</td>
        {/* <td><input value={tc[fld]} /></td>  */}
        <td>
          <input
            style={{ fontFamily: 'Courier New' }}
            name={fld}
            value={this.state.edit[fld]}
            onChange={this.onChange.bind(this)}
          />
        </td>
        <td>{tc[fld]}</td>
      </tr>
    ));

    const form = (
      <form onSubmit={this.onSubmit.bind(this)}>
        <table
          style={{ width: '100%', height: '200px', fontFamily: 'Courier New' }}
        >
          <caption>{tc.id}</caption>
          <tbody>
            {header}
            {rows}
            <tr>
              <td>notes</td>
              <td colSpan="2">
                <textarea
                  placeholder='describe test case'
                  style={{
                    width: '100%',
                    height: '200px',
                    fontFamily: 'Courier New',
                    fontSize: 20,
                  }}
                  name='notes'
                  onChange={this.onChange.bind(this)}
                >{this.state.edit['notes']}</textarea>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <input type="submit" value="submit" />
                <input type="button" value="cancel" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );

    // const rows_e = this.flds.map(fld => (
    //   <tr key={fld}><td>{fld}</td><td><input value={tc[fld]} /></td></tr>
    // ));

    return (
      <div className="One">
        {form}
      </div>
    );
  }
}

export default One;
