import { Routes, Route, HashRouter } from "react-router-dom";

import { ActivityRoutes } from "./Activities";
import { Grommet } from "grommet";

function App() {
  return (
    <Grommet>
      <HashRouter>
        <Routes>
          <Route path="/activities">
            <ActivityRoutes />
          </Route>
          <Route path="/">
            <ActivityRoutes />
          </Route>
        </Routes>
      </HashRouter>
    </Grommet>
  );
}

export default App;
