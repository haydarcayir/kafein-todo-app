import React from "react";
import ReactDOM from "react-dom";
import App from "./router/app";

import Container from "@material-ui/core/Container";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
