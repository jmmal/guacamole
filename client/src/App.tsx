import { Routes, Route, HashRouter } from "react-router-dom";
import { useLocalStorage } from "@rehooks/local-storage";

import { ThemeProvider, BaseStyles, Box } from "@primer/react";
import { Activities } from "./Activities/Activities";
import DetailedActivityContainer from "./Activities/DetailedActivityContainer";

import { lazy, Suspense, useEffect } from "react";

const Upload = lazy(() => import("./Activities/Upload"));

function App() {
  const [theme] = useLocalStorage("theme", "day");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-color-scheme",
      theme === "day" ? "light" : "dark"
    );
  }, [theme]);

  return (
    <ThemeProvider colorMode={theme as any} nightScheme="dark_dimmed">
      <BaseStyles>
        <Box bg="canvas.default" minHeight={"100vh"}>
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
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
