import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';
import RootComponent from './components/rootcomponent';

ReactDOM.render(
    <HashRouter>
      <RootComponent></RootComponent>
    </HashRouter>,
  document.getElementById('root')
);

