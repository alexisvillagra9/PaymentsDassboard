import HomeIcon from "@mui/icons-material/Home";
import { Container, Divider, Drawer, ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import axios, { CancelTokenSource } from "axios";
import moment from "moment-timezone";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import XLSX from "xlsx";
import { Header } from "../components/header/Header";
import { EPaymentOperationStatus } from "../helpers/enums";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationFilter } from "../models/apis/wallet/paymentOperationFilter";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";
import { IPaymentRoute } from "../models/app/payment/paymentRoute";
import { Login } from "../screens/login/Login";
import {
  getPaymentOperationOrigins,
  getPaymentOperationsByFilter,
  getPaymentOperationStatuses,
} from "../services/payments";
import { PaymentRoutes } from "./PaymentRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [cancelRequests] = useState<CancelTokenSource>(
    axios.CancelToken.source()
  );

  const [currentView, setCurrentView] = useState("payments");
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [loadingPO, setLoadingPO] = useState(true);
  const [loadingPOExcel, setLoadingPOExcel] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [paymentOperations, setPaymentOperations] = useState<
    IPaymentOperation[] | null
  >(null);
  const [operationStatuses, setOperationStatuses] = useState<
    IPaymentOperationStatus[]
  >([]);
  const [operationOrigins, setOperationOrigins] = useState<
    IPaymentOperationOrigin[]
  >([]);
  const [operationStatusesFilter, setOperationStatusesFilter] = useState<
    string[] | null
  >([EPaymentOperationStatus.Terminated]);
  const [operationOriginsFilter, setOperationOriginsFilter] = useState<
    string[] | null
  >(null);

  const getFilters = async () => {
    const pStatuses = getPaymentOperationStatuses();
    const pOrigins = getPaymentOperationOrigins();
    const [sts, ors] = await Promise.all([pStatuses, pOrigins]);
    setOperationStatuses(sts);
    setOperationOrigins(ors);
  };

  const getOperations = async (filters: IPaymentOperationFilter) => {
    setLoadingPO(true);
    const payops = await getPaymentOperationsByFilter(filters);
    const {
      data,
      totalCount: totCount,
      totalAmount: totAmount,
      totalPages: totPages,
      currentPage,
    } = payops;
    setTotalCount(totCount);
    setTotalAmount(totAmount);
    setTotalPages(totPages);
    setLoadingPO(false);
    setActualPage(currentPage);
    setPaymentOperations(data);
    console.log("Operaciones Cargadas");
  };

  const downloadExcel = async () => {
    setLoadingPOExcel(true);
    const payops = await getPaymentOperationsByFilter({
      page: 0,
      pageSize: 0,
      statuses: operationStatusesFilter,
      origins: operationOriginsFilter,
      dateFrom,
      dateTo,
      search,
    });
    const {
      data: paymentsToXLS,
      totalCount: totCount,
      totalAmount: totAmount,
      totalPages: totPages,
      currentPage,
    } = payops;

    const data = paymentsToXLS.map((payop) => {
      return {
        fecha_creacion: moment
          .tz(payop.createdAt, "America/Argentina/Buenos_Aires")
          .format(),
        origen: payop.origin.description,
        estado: payop.status.description,
        fecha_pago: payop.result?.payment?.date,
        estado_pago: payop.result?.payment?.description,
        numero_pago: payop.result?.payment?.reference,
        susbtotal: payop.subtotal,
        total: payop.transaction_amount,
        nombre: payop.partner.name,
        apellido: payop.partner.lastName,
        nro_documento: payop.partner.dni,
        tipo_documento: payop.partner.tpdId,
        nro_telefono: payop.partner.phone_number,
        sexo: payop.partner.sex,
        fec_nacimiento: payop.partner.birthday,
        punto_venta: payop?.point_of_sale?.description,
      };
    });
    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `operaciones.xlsx`);
    setLoadingPOExcel(false);
  };

  const paymentRouteProps: IPaymentRoute = {
    totalCount,
    totalAmount,
    operationStatuses,
    operationOrigins,
    operationStatusesFilter,
    operationOriginsFilter,
    search,
    dateFrom,
    dateTo,
    pageSize,
    actualPage,
    totalPages,
    paymentOperations,
    loadingPO,
    loadingPOExcel,
    selectedOrigins,
    selectedStatuses,
    currentView,
    setDateFrom,
    setDateTo,
    setOperationOriginsFilter,
    setOperationStatusesFilter,
    setSearch,
    setSelectedOrigins,
    setSelectedStatuses,
    setCurrentView,
    getOperations,
    downloadExcel,
  };

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

  useEffect(() => {
    console.log("se carga una sola vez");
    getFilters();
  }, []);

  useEffect(() => {
    if (!(search.length % 4)) {
      getOperations({
        page: actualPage,
        pageSize,
        statuses: operationStatusesFilter,
        origins: operationOriginsFilter,
        dateFrom,
        dateTo,
        search,
      });
    }
  }, [search]);

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Header
          search={search}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setSearch={setSearch}
        />
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
            onClick={() => setOpenDrawer(false)}
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
          {paymentOperations ? (
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
                      <PaymentRoutes {...paymentRouteProps} />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          ) : null}
        </Main>
      </Box>
    </BrowserRouter>
  );
};
