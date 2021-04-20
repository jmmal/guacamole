import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import { ActivityRoutes } from "./Activities";
import { Grommet } from "grommet";

function App() {
  return (
    <Grommet>
      <HashRouter>
        <Switch>
          <Route path="/activities">
            <ActivityRoutes />
          </Route>
          <Route path="/" exact>
            <ActivityRoutes />
          </Route>
        </Switch>
      </HashRouter>
    </Grommet>
  );
}

export default App;
