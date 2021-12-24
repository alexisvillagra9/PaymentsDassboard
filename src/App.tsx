import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import Container from "@mui/material/Container";
import { Payments } from "./screens/payments/Payments";
import { axiosInterceptors } from "./helpers/axios";

function App() {
  // Init axios interceptors
  axiosInterceptors();

  return (
    <div className="App">
      <Header></Header>
      <Container maxWidth="lg">
        <Payments></Payments>
      </Container>
    </div>
  );
}

export default App;
