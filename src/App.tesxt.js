import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';

it('renders without crashing', () => {
  //const div = document.createElement('root');
  ReactDOM.render(<App />,  
    document.getElementById('root'));
});
