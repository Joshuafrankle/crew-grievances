import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: "#4e9992",
      contrastText: "#fffff",
    },
    secondary: {
      main: "#f83245",
      contrastText: "#ffffff",
    },
  },
});
