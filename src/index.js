import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './App2';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import index from './reducers/index';

import { BrowserRouter as Router } from 'react-router-dom';

//const NAME = 'learning';
// if (!localStorage.getItem(NAME)) {
//   localStorage.setItem(NAME, JSON.stringify({}));
// }

export const store = createStore(
  index,
  //    JSON.parse(localStorage.getItem(NAME))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App2 />
    </Router>
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  //console.log(NAME, "am writing to local", JSON.stringify(store.getState()));
  //localStorage.setItem(NAME, JSON.stringify(store.getState()));
});
