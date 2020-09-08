import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import './App.scss';
import './styles/styles.scss';

import { 
  DetailedActivity,
  ActivityList,
  Upload
} from './Activities';

function App() {
  return (
    <div className="content-wrapper">
      <Router>
        <Switch>
          <Route path='/activities'>
            <Activities />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Activities = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ActivityList />
      </Route>
      <Route path={`${path}/:activityId`}>
        <DetailedActivity />
      </Route>
      <Route path={`${path}/upload`}>
        <Upload />
      </Route>
    </Switch>
  )
}

export default App;
