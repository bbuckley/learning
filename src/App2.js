import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import { Switch } from 'react-router';

import Checkboxes from './Checkboxes';
import One from './One';
import List from './List';
import BasicExample from './basic';
import { Schedule } from './team';
import BitArray from './BitArray';
import BitField from './BitField';
import BitField2 from './BitField2';
import ListView from './ListView';
import PgaTourView from './pgatourview';
import Foo from './Foo';
import FooFilter from './FooFilter';
import A from './A';

import { store } from './index';

import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';

import Example from './branch';
import Presentation from './Presentation';

const NotFound = () => <div>not found</div>;
// const Foo = () => <div style={{ padding: '20px' }}>this is foo</div>;
const Bar = props => <div>Bar {props.name}</div>;
const Barp = ({ name, age }) => <div><h1>Barp</h1> <p>{name}, {age}</p></div>;

const ListOne = () => {
  const ids = [
    '-KeVt1dUDpeOTBKLK5uH',
    '-KeY8FVZ5QFnFWth_SIe',
    '-KeY8wPa0_TaQhSCcO-N',
  ];
  const i = Math.floor(Math.random() * ids.length);
  const x = ids[i];
  return (
    <div>
      <One id={x} />
    </div>
  );
};

const randomBarp = () => {
  const names = ['David', 'Brian', 'Karl'];
  const i = Math.floor(Math.random() * names.length);
  const j = Math.floor(Math.random() * 44 + 21);
  const i2 = Math.floor(Math.random() * names.length);
  const j2 = Math.floor(Math.random() * 44 + 21);
  return (
    <div>
      <Barp name={names[i]} age={j} />
      <Barp name={names[i2]} age={j2} />
    </div>
  );
};

class Count extends Component {
  state = {
    n: 0,
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        n {this.state.n}
        <input
          type="button"
          value="n clicks"
          onClick={() => {
            let { n } = this.state;
            n++;
            this.setState({ n });
          }}
        />
      </div>
    );
  }
}

class App2 extends Component {
  constructor() {
    super();
    this.state = {
      tcs: [{ id: '1' }, { id: '2' }], //two fake starter tc
    };
  }

  componentDidMount() {
    //console.log('App 2componentDidMount');
    //console.log(this.props);
    this.prepareTcs(this.props);
  }
  componentWillMount() {
    //console.log('App 2componentWillMount');
    this.prepareTcs();
  }

  prepareTcs(props) {
    const usedProps = this.props || props;
    firebase.database().ref(FIRE_NAME).on('value', snapshot => {
      const o = snapshot.val();
      let tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });
      tcs = tcs.map(tc => {
        const b = new Date(tc.dob).getFullYear();
        const h = new Date(tc.doe).getFullYear();
        const e = new Date(tc.crd).getFullYear();
        const hir_age = h - b;
        const calc_age = e - b;
        return { ...tc, hir_age, calc_age };
      });
      usedProps.personal.forEach(p => {
        const i = tcs.findIndex(t => t.id === p.id);
        if (i !== -1) tcs[i]['ptags'] = p['ptags'];
      });
      this.setState({ tcs });
    });
  }

  render() {
    const style = { verticalAlign: 'top' };

    return (
      <div style={{ padding: '15px' }}>
        <Link to="/">Home</Link>
        - <Link to="/testview">TestView</Link>
        - <Link to="/pgatour">PgaTour!</Link>
        - <Link to="/BitField">BitField</Link>
        - <Link to="/BitArray">ArrayBit</Link>
        - <Link to="/BitArray2">ArrayBit2</Link>
        - <Link to="/team">Team!!</Link>
        - <Link to="/basic">Basic</Link>
        - <Link to="/barp">Barp</Link>
        - <Link to="/foo">Foo</Link>
        - <Link to="/foo_filter">FooFilter</Link>
        - <Link to="/rand">Rand</Link>
        - <Link to="/ch">ch</Link>
        - <Link to="/count">count</Link>
        - <Link to="/count2">count2</Link>
        - <Link to="/one_s">one_s</Link>
        - <Link to="/one">one</Link>
        - <Link to="/one_id/-Kjr-Z-ZS88_5m9VTlCv">brian </Link>
        - <Link to="/one_id/-KeY8wPngcOzIF7X8vmg">karl</Link>
        - <Link to="/one_id/-KeY8wPngcO">no tc</Link>
        - <Link to="/list">List</Link>
        - <Link to="/RandomOne">RandomOne</Link>
        - <Link to="/aaa">A</Link>
        <a href="#" onClick={() => console.log(store.getState())}>state </a>

        <Switch>
          <Route
            exact={true}
            path="/testview"
            render={() =>
              <div>
                <ListView tcs={this.state.tcs} />
              </div>}
          />
          <Route exact={true} path="/" render={() => <p>Welcome</p>} />
          <Route
            exact={true}
            path="/aaa"
            render={() =>
              <div>
                <A fld="calc_type" tcs={this.state.tcs} />
                <A
                  fld="calc_age"
                  tcs={this.state.tcs}
                  f={(fld, tc) => {
                    return tc[fld] % 5 * 5;
                  }}
                />
                <A
                  fld="doe"
                  tcs={this.state.tcs}
                  f={(fld, tc) => {
                    return new Date(tc[fld]).getFullYear();
                  }}
                />
                <A fld="pbc" tcs={this.state.tcs} />

              </div>}
          />
          <Route exact={true} path="/team" component={Schedule} />
          <Route exact={true} path="/pgatour" component={PgaTourView} />
          <Route
            exact={true}
            path="/BitField"
            render={() =>
              <div>
                <p>
                  <a
                    href="#"
                    onClick={() => store.dispatch({ type: 'EDIT_SAMPLE' })}
                  >
                    Sample
                  </a>
                  {' '}
                  -
                  <a
                    href="#"
                    onClick={() => store.dispatch({ type: 'HIDE_CLEAR' })}
                  >
                    All
                  </a>
                  {' '}
                  -
                  <a
                    href="#"
                    onClick={() => console.log(store.getState().hide)}
                  >
                    hide-state
                  </a>
                  {' '}
                  -
                  <a href="#" onClick={() => console.log(store.getState())}>
                    state
                  </a>
                </p>

                <table>
                  <tbody>
                    <tr>
                      {/*
                      <td style={style}>


                        <BitField
                          fld="crd"
                          distribution={x => {
                            return new Date(x).getFullYear();
                          }}
                        />

                           <BitField
                          fld="crd"
                          distribution={x => new Date(x).getMonth()}
                        />

                      </td>
                      <td style={style}>
                        <BitField fld="tc" />
                      </td>
                      */}
                      <td style={style}>
                        <BitField fld="dot" />
                      </td>
                      <td style={style}>
                        <BitField fld="pbc" />
                      </td>
                      <td style={style}>
                        <BitField fld="ric" />
                      </td>
                      <td style={style}>
                        <BitField fld="completed" />
                      </td>
                      <td style={style}>
                        <BitField fld="calc_type" />
                      </td>
                      <td style={style}>
                        <BitField fld="status" />
                      </td>
                      <td style={style}>
                        <BitField fld="tags" />
                      </td>
                      <td style={style}>
                        <BitField2 tcs={this.state.tcs} fld="pbc" />
                      </td>

                    </tr>
                  </tbody>
                </table>

                <List tcs={this.state.tcs} />

              </div>}
          />
          <Route
            exact={true}
            path="/BitArray"
            render={() =>
              <div>
                <BitArray
                  data={[
                    ['One', 4, true],
                    ['Two', 0, true],
                    ['Three', 4, false],
                    ['Four', 4, true],
                    ['Fourx', 0, false],
                    ['Foury', 3, false],
                    ['[blank]', 4, true],
                  ]}
                />

                <BitArray
                  data={[['A', 4, true], ['B', 2, true], ['C', 15, false]]}
                />

              </div>}
          />
          <Route
            exact={true}
            path="/BitArray2"
            render={() =>
              <div>

                <BitArray
                  data={[['A', 4, true], ['B', 2, true], ['C', 15, false]]}
                />
                <List />

              </div>}
          />
          <Route exact={true} path="/basic" component={BasicExample} />
          <Route
            exact={true}
            path="/barp"
            render={({ name }) =>
              <div>
                <Barp name="Sam" age="33" />
                <Example isReady={true} />
                <Example isReady={false} />
                <Example isReady="true" />
                <Example isReady="true" />

                <Presentation />
                <Presentation />

              </div>}
          />
          <Route exact={true} path="/ch" component={Checkboxes} />
          <Route
            exact={true}
            path="/foo"
            render={() =>
              <div>
                <Foo
                  tcs={this.state.tcs}
                  flds={[
                    'tc',
                    'pbc',
                    'hir_age',
                    'calc_age',
                    'calc_type',
                    'dob',
                    'doe',
                    'dot',
                    'bcd',
                    'status',
                    'tags',
                    'ptags',
                  ]}
                />
                <Foo />
              </div>}
          />
          <Route
            exact={true}
            path="/foo_filter"
            render={() => <FooFilter tcs={this.state.tcs} />}
          />
          <Route exact={true} path="/rand" render={randomBarp} />
          <Route exact={true} path="/bar" render={() => <Bar name="Joe" />} />
          <Route exact={true} path="/count" render={() => <Count />} />
          <Route
            exact={true}
            path="/count2"
            render={() => <div><Count /><Count /></div>}
          />
          <Route exact={true} path="/list" component={List} />
          <Route exact={true} path="/one_s" component={One} />
          <Route
            exact={true}
            path="/one"
            render={() => <One id={'-KeY8wPa0_TaQhSCcO-N'} />}
          />
          <Route
            path="/one_id/:id"
            render={({ match }) => <One id={match.params.id} />}
          />
          <Route path="/xxx" component={Foo} />
          <Route path="/RandomOne" component={ListOne} />
          <Route component={NotFound} />
        </Switch>

      </div>
    );
  }
}

App2.defaultProps = {
  personal: [],
};

export default App2;
//export default App2;

const mapStateToProps = state => {
  return {
    personal: state.personal,
  };
};
//
//export default connect(mapStateToProps)(App2);
connect(mapStateToProps)(App2);
