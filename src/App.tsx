// Material UI
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <Header></Header>
        <Container maxWidth="lg">
          <Router>
            <AppRoutes />
          </Router>
          {/* <Payments></Payments> */}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
