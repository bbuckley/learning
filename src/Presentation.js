import React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';

function Presentation({
  title,
  message,
  toggleVisibility,
  isVisible,
  onAClick,
}) {
  return (
    <div>
      <h1>{title}</h1>
      {isVisible ? <p>I am visible</p> : <p> Not Visible </p>}
      <p><a href="#" onClick={onAClick}>{message}</a></p>
      <button onClick={toggleVisibility}> Click me! </button>
    </div>
  );
}

export default compose(
  withState('isVisible', 'toggleVis', false),
  withHandlers({
    onAClick: props => () => {
      return console.log(JSON.stringify(props));
    },
    toggleVisibility: ({ toggleVis, isVisible }) => {
      return event => {
        return toggleVis(!isVisible);
      };
    },
  }),
  withProps(({ isVisible }) => {
    return {
      title: isVisible
        ? 'This is the visible title'
        : 'This is the default title',
      message: isVisible
        ? 'Hello I am Visible'
        : 'I am not visible yet, click the button!',
    };
  }),
)(Presentation);
