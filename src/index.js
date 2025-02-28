import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ThemeProvider } from "theme-ui";
import * as serviceWorker from "./utils/serviceWorker";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import theme from "./utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Route path="/" component={App} />
        </QueryParamProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
