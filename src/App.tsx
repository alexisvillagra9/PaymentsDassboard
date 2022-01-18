// Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useReducer } from "react";
import "./App.css";
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import { axiosInterceptors } from "./helpers/axios";
import { AppRoutes } from "./routes/AppRoutes";

const THEME = createTheme({
  typography: {
    fontFamily: "Lato, Helvetica, sans-serif",
  },
});

const init = () => {
  return (
    JSON.parse(localStorage.getItem("user") || "null") || { logged: false }
  );
};

function App() {
  // Init axios interceptors
  axiosInterceptors();

  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <AuthContext.Provider
          value={{
            user,
            dispatch,
          }}
        >
          <AppRoutes />
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
