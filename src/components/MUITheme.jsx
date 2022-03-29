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
      light: "#3c44b126",
      main: "#333996",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f8324526",
      main: "#f83245",
      dark: "#ba000d",
      contrastText: "#ffffff",
    },
  },
});
