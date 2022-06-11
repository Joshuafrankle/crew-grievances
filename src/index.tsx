import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "components/MUITheme";
import { ThemeProvider } from "@mui/material/styles";
import "assets/css/style.scss";
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
