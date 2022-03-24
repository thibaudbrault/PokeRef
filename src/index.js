import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

import { Fonts } from './components/BaseStyles/Fonts';
import { Reset } from './components/BaseStyles/Reset';
import { darkTheme, lightTheme } from './components/BaseStyles/Themes';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme === 'light' ? lightTheme : darkTheme}
    >
      <Reset />
      <Fonts />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);