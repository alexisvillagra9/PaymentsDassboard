import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useContext(AuthContext);

  return user.logged ? children : <Navigate to="/login" />;
};
