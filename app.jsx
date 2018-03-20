import React from 'react';
import ReactDOM from 'react-dom';
import './src/styles/style.scss';
import App from 'components/index';
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <App />
  </ HashRouter>
  , document.querySelector('.container'));