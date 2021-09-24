import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import makeServer from "./mocks/server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  integrations: [new TracingIntegrations.BrowserTracing()()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
