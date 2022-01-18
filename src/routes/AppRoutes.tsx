import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Login } from "../screens/login/Login";
import { PaymentRoutes } from "./PaymentRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <BrowserRouter>
      <Header />
      <Offset />
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex" }}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PaymentRoutes />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
