// Material UI
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { axiosInterceptors } from "./helpers/axios";
import { Payments } from "./screens/payments/Payments";

const THEME = createTheme({
  typography: {
    fontFamily: "Lato, Helvetica, sans-serif",
  },
});

function App() {
  // Init axios interceptors
  axiosInterceptors();

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <Header></Header>
        <Container maxWidth="lg">
          <Payments></Payments>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
