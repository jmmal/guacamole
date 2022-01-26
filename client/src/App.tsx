import { Routes, Route, HashRouter } from "react-router-dom";

import { ThemeProvider, BaseStyles } from "@primer/react";
import { Activities } from "./Activities/Activities";
import DetailedActivityContainer from "./Activities/DetailedActivityContainer";
import { lazy, Suspense } from "react";

const Upload = lazy(() => import("./Activities/Upload"));

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="activities" element={<Activities />} />
            <Route
              path="activities/upload"
              element={
                <Suspense fallback={<></>}>
                  <Upload />
                </Suspense>
              }
            />
            <Route
              path="activities/:activityId"
              element={<DetailedActivityContainer />}
            />
          </Routes>
        </HashRouter>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
