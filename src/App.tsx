// Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { AuthContext } from "./context/auth/authContext";
import { authReducer } from "./context/auth/authReducer";
import { GeneralContext } from "./context/general/generalContext";
import { axiosInterceptors } from "./helpers/axios";
import { IPaymentOperation } from "./models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "./models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "./models/apis/wallet/paymentOperationStatus";
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
  const [actualPage, setActualPage] = useState(1);
  const [paymentOperations, setPaymentOperations] = useState<
    IPaymentOperation[] | null
  >(null);
  const [paymentOperationsFiltered, setPaymentOperationsFiltered] = useState<
    IPaymentOperation[] | null
  >(null);
  const [operationStatuses, setOperationStatuses] = useState<
    IPaymentOperationStatus[]
  >([]);
  const [operationOrigins, setOperationOrigins] = useState<
    IPaymentOperationOrigin[]
  >([]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <GeneralContext.Provider
          value={{
            paymentOperations,
            paymentOperationsFiltered,
            operationStatuses,
            operationOrigins,
            actualPage,
            setPaymentOperations,
            setPaymentOperationsFiltered,
            setOperationStatuses,
            setOperationOrigins,
            setActualPage,
          }}
        >
          <AuthContext.Provider
            value={{
              user,
              dispatch,
            }}
          >
            <AppRoutes />
          </AuthContext.Provider>
        </GeneralContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
