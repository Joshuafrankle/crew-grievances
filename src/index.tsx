import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { theme } from "components/MUITheme";
import { ThemeProvider } from "@mui/material/styles";
import "assets/css/style.scss";
import App from "./App";
import { AuthProvider } from "hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
