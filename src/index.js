import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Fonts } from './components/BaseStyles/Fonts';
import { Reset } from './components/BaseStyles/Reset';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Fonts />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);