import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  // localStorage.setItem("lastPath", pathname + search);

  return user.logged ? children : <Navigate to="/login" />;
};
