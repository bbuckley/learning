import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}!!!</h3>

    <p>blah, blah, blah</p>
  </div>
)

const Topics = ({ match }) =>
{
  console.log(match);
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
        Components
      </Link>
    </li>
    <li>
      <Link to={`${match.url}/props-v-state`}>
      Props v. State
    </Link>
  </li>
</ul>


<Route path={`${match.url}/:topicId`} component={Topic}/>
<Route exact path={match.url} render={() => (
  <h3>Please select a topic!!</h3>
)}/>

<p>
  <Link to="/about">About</Link>
</p>
</div>
)
}







const BasicExample = () => (
  <Router>
    <div>
      <p>
        <Link to="/">Home</Link> -
        <Link to="/about">About</Link> -
        <Link to="/topics">Topics</Link>
      </p>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)


export default BasicExample
