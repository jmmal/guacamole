import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ActivityList } from './ActivityList';
import { DetailedActivity } from './DetailedActivity';
import { Upload } from './Upload';

export const Activities = () => {
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