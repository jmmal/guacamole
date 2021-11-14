import { Routes, Route, HashRouter } from "react-router-dom";

import { Grommet } from "grommet";
import { Upload } from "./Activities/Upload";
import { Activities } from "./Activities/Activities";
import { DetailedActivity } from "./Activities/DetailedActivity";

function App() {
  return (
    <Grommet>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="activities" element={<Activities />} />
          <Route path="activities/upload" element={<Upload />} />
          <Route path="activities/:activityId" element={<DetailedActivity />} />
        </Routes>
      </HashRouter>
    </Grommet>
  );
}

export default App;
