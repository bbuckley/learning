import React from 'react';
import { branch } from 'recompose';

//import BitArray from './BitArray';

const Headline = BaseComponent => () => {
  return <h1><BaseComponent />!</h1>;
};
const Paragraph = BaseComponent => () => {
  return <p><BaseComponent /></p>;
};

const Example = () => <span>Hello World</span>;

// function Example() {
//   return <span>Hello World</span>;
// }

export default branch(
  // Write a test function
  ({ isReady }) => {
    return !!isReady;
  },
  // If our test function returns true, render the Headline Enhanced Example
  Headline,
  // If our test function returns false, render the Paragraph Enhanced Example
  Paragraph,
  // BitArray,
)(Example);
