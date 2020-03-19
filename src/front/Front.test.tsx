import React from 'react';
import ReactDOM from 'react-dom';
import Front from './Front';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Front />, div);
  ReactDOM.unmountComponentAtNode(div);
});
