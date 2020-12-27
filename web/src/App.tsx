import React from 'react';
import {
  Switch,
  Route,
  HashRouter
} from 'react-router-dom';

import './App.scss';
import './styles/styles.scss';

import { Activities } from './Activities';

function App() {
  return (
    <HashRouter>
      <div className="content-wrapper">
        <Switch>
          <Route path='/activities'>
            <Activities />
          </Route>
          <Route path='/' exact>
            <Activities />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
