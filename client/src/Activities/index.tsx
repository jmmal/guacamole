import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Activities } from "./Activities";
import { DetailedActivity } from "./DetailedActivity";
import { Upload } from "./Upload";

export const ActivityRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Activities />
      </Route>
      <Route path={`${path}/upload`}>
        <Upload />
      </Route>
      <Route path={`${path}/:activityId`}>
        <DetailedActivity />
      </Route>
    </Switch>
  );
};
