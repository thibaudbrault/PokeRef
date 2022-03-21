import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Fonts } from './components/BaseStyles/Fonts';
import { Reset } from './components/BaseStyles/Reset';
import { Theme } from './components/BaseStyles/Themes';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Reset />
      <Fonts />
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);