import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext, SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";
import { GeneralContext } from "../../context/general/generalContext";
import { types } from "../../types/types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Header = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    paymentOperations: payOpsContext,
    setPaymentOperationsFiltered: setPaymentOperationsFilteredContext,
  } = useContext(GeneralContext);

  const handleLogout = () => {
    dispatch({ type: types.logout });

    navigate("/login", {
      replace: true,
    });
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filterString = `${event.currentTarget.value}`.toUpperCase();
    if (filterString.length) {
      const payOpsFil = (payOpsContext || [])?.filter(
        (payOp) =>
          (payOp?.partner?.name || "").toUpperCase().includes(filterString) ||
          (payOp?.partner?.lastName || "")
            .toUpperCase()
            .includes(filterString) ||
          (payOp?.partner?.email || "").toUpperCase().includes(filterString) ||
          (payOp?.partner?.dni || "")
            .toString()
            .toUpperCase()
            .includes(filterString) ||
          (payOp?.partner?.phone_number || "")
            .toUpperCase()
            .includes(filterString) ||
          (payOp.result?.payment?.reference || "")
            .toUpperCase()
            .includes(filterString) ||
          (payOp?.transaction_amount || "")
            .toString()
            .toUpperCase()
            .includes(filterString)
      );
      setPaymentOperationsFilteredContext(payOpsFil);
    } else {
      setPaymentOperationsFilteredContext(payOpsContext);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "var(--color-primary)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon />
        </IconButton>
        {/* <Button sx={{ color: "white" }} onClick={() => navigate("/home")}> */}
        {/* <HomeIcon sx={{ mr: 1 }} /> */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          PAYMENT APP
        </Typography>
        {/* </Button> */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleSearch(e)}
            onKeyPress={(event) => {
              if (event.key === "Enter") navigate("/");
            }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {user.logged && (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
