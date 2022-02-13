import { Button, Paper, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";
import { types } from "../../types/types";
import "./Login.css";
import { loginValid } from "../../services/login";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    setErrorLabel(false);
    const login = await loginValid(username, password);
    if (login) {
      const action = {
        type: types.login,
        payload: login,
      };

      dispatch(action);

      const lastPath = localStorage.getItem("lastPath") || "/home";

      navigate(lastPath, {
        replace: true,
      });
    } else {
      setErrorLabel(true);
    }
  };

  return (
    <div className="page-container">
      <Paper className="paper-container-login" elevation={0}>
        <Stack flexDirection="row" flex="1">
          <Stack
            flexDirection="column"
            gap="1rem"
            marginTop="1rem"
            alignItems="center"
            paddingX="3rem"
            paddingY="1rem"
          >
            <img
              src="https://cluster.uxshows.com/img/logo.4e98bf81.png"
              className="belgrano-logo"
              alt="Chancha Belgrano"
            />
            <div className="login-title">Hola, ingresá a Belgrano Pagos</div>
            <TextField
              className="login-text-field"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              label="Usuario"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{
                style: { color: "var(--color-primary)" },
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
            />
            <TextField
              className="login-text-field"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              label="Contraseña"
              variant="filled"
              type="password"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{
                style: { color: "var(--color-primary)" },
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
            />
            {errorLabel && (
              <div style={{ color: "red" }}>
                Usuario o contraseña incorrecto/s
              </div>
            )}
            <Button
              variant="contained"
              className="login-button"
              type="submit"
              disableElevation
              fullWidth
              onClick={handleLogin}
            >
              Ingresar
            </Button>
          </Stack>
          <Stack flex="1" className="login-image"></Stack>
        </Stack>
      </Paper>
    </div>
  );
};
