import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  HashRouter
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

const Activities = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ActivityList />
      </Route>
      <Route path={`${path}/upload`}>
        <Upload />
      </Route>
      <Route path={`${path}/:activityId`}>
        <DetailedActivity />
      </Route>
    </Switch>
  )
}

export default App;
