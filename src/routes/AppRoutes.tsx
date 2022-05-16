import HomeIcon from "@mui/icons-material/Home";
import { Container, Divider, Drawer, ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Login } from "../screens/login/Login";
import { PaymentRoutes } from "./PaymentRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const drawerWidth = 240;
  const maxWidthDrawer = 760;
  const isMaxWidthDrawer = window.innerWidth < maxWidthDrawer;

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isMaxWidthDrawer ? "0px" : `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Header openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Drawer
          variant={isMaxWidthDrawer ? "temporary" : "persistent"}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Offset />
          <ListItem
            button
            key={1}
            component={Link}
            to={"/home"}
            onClick={() => isMaxWidthDrawer && setOpenDrawer(false)}
            sx={{ color: "var(--color-primary)!important" }}
            color="primary"
          >
            <ListItemIcon style={{ color: "unset" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <Divider />
        </Drawer>
        <Main open={openDrawer}>
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
        </Main>
      </Box>
    </BrowserRouter>
  );
};
