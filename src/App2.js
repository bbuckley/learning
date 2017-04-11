
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Checkboxes from './Checkboxes';
import One from './One';
import List from './List';

const Foo = () => (<div style={{ padding: '20px'}}>this is foo</div>);
const Bar = (props) => (<div>Bar {props.name}</div>);
const Barp = ({name, age}) => (<div>Barp {name}, {age}</div>);

const randomBarp = () => {
  const names = ['David','Brian','Karl']
  const i = Math.floor(Math.random() * names.length)
  const j = Math.floor(Math.random() * 44 + 21)
  return <Barp name={names[i]} age={j} />
}

class Count extends Component {
  state = {
    n: 0
  }

  render(){
    return (
      <div style={{ padding: '20px'}}>n {this.state.n}
      <input type='button' value='n clicks' onClick={
        () => {
          let { n } = this.state;
          n++;
          this.setState({ n })
        }
      }/>
      </div>
    )
  }
}



class App2 extends Component {

  render(){
  return (
          <div style={{ padding: '10px'}}>
              <Link to="/">Home</Link>
            - <Link to="/barp">Barp</Link>
            - <Link to="/foo">Foo</Link>
            - <Link to="/rand">Rand</Link>
            - <Link to="/ch">ch</Link>
            - <Link to="/count">count</Link>
            - <Link to="/count2">count2</Link>
            - <Link to="/list">list</Link>
            - <Link to="/one">one</Link>

            <Route exact={true} path="/" render={() => (<p>Welcome</p>)} />
            <Route exact={true} path="/barp" render={({name}) => (<Barp name={name}/>)} />
            <Route exact={true} path="/ch" component={Checkboxes} />
            <Route exact={true} path="/foo" component={Foo} />
            <Route exact={true} path="/rand" render={randomBarp} />
            <Route exact={true} path="/bar" render={() => <Bar name='Joe'/>} />
            <Route exact={true} path="/count" render={() => <Count />} />
            <Route exact={true} path="/count2" render={() => (<div><Count /><Count /></div>)} />
            <Route exact={true} path="/list" component={List} />
            {/* <Route exact={true} path='/one' component={One} /> */}
            <Route exact={true} path='/one' render={() => (<One id={'-KeY8wPa0_TaQhSCcO-N'} />)} />

          </div>
    )
}

}

// export default App2;
export default App2;
