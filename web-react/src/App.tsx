import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';

import { ActivityList } from './Activities/ActivityList';
import { Loading } from './Shared/Loading';

function App() {
  return (
    <div className="content-wrapper">
      <Router>
        <Switch>
          <Route path="/upload">
            <Todo />
            <Loading />
          </Route>
          <Route path={["/", "activities"]}>
            <ActivityList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Todo = () => {
  return (
    <div>
      TODO
    </div>
  )
}

export default App;
