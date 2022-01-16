// Material UI
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { axiosInterceptors } from "./helpers/axios";
import { AppRoutes } from "./routes/reactRoutes";

const THEME = createTheme({
  typography: {
    fontFamily: "Lato, Helvetica, sans-serif",
  },
});

function App() {
  // Init axios interceptors
  axiosInterceptors();
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <Header></Header>
        <Offset />
        <Container maxWidth="lg">
          <AppRoutes />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
