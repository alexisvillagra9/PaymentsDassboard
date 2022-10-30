import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import moment from "moment-timezone";
import "moment/locale/es";
import { ChangeEvent, useEffect, useState } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { EPaymentOperationStatus } from "../../helpers/enums";
import { currencyFormat } from "../../helpers/general";
import { IPaymentFilter } from "../../models/app/payment/paymentFilter";
import { PaymentFilterModal } from "../paymentFilterModal/PaymentFilterModal";
import "./PaymenrFilters.css";

export const PaymentFilters = ({
  totalCount,
  totalAmount,
  pageSize,
  operationStatuses,
  operationOrigins,
  operationStatusesFilter,
  operationOriginsFilter,
  search,
  dateTo,
  dateFrom,
  loadingPOExcel,
  setDateTo,
  setDateFrom,
  setOperationOriginsFilter,
  setOperationStatusesFilter,
  setSearch,
  getOperations,
  downloadExcel,
}: IPaymentFilter) => {
  const [openOriginSelect, setOpenOriginSelect] = useState(false);
  const [openStatusSelect, setOpenStatusSelect] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatusesSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedStatuses(value);
  };

  const onCloseStatuses = () => {
    // console.log("llega aca");
    setOperationStatusesFilter(
      operationStatuses
        .filter((os) => selectedStatuses.includes(os.description))
        .map((oss) => oss.code)
    );
    setOpenStatusSelect(false);
  };

  const onCloseOrigins = () => {
    setOperationOriginsFilter(
      operationOrigins
        .filter((os) => selectedOrigins.includes(os.description))
        .map((oss) => oss.code)
    );
    setOpenOriginSelect(false);
  };

  const handleOriginsSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedOrigins(value);
  };

  const handleApply = async () => {
    getOperations({
      page: 1,
      pageSize,
      dateFrom,
      dateTo,
      search,
      origins: operationOriginsFilter,
      statuses: operationStatusesFilter,
    });
  };

  const handleSelectAllOrigins = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrigins(
        operationOrigins.map((oo) => oo.description).concat(["all-origins"])
      );
    } else {
      setSelectedOrigins([]);
    }
  };

  const handleSelectAllStatuses = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStatuses(
        operationStatuses.map((oo) => oo.description).concat(["all-statuses"])
      );
    } else {
      setSelectedStatuses([]);
    }
  };

  const iconFilter = () => {
    return (
      <>
        {true ? (
          <KeyboardArrowDownIcon htmlColor="var(--color-primary)" />
        ) : (
          <CircularProgress className="filter-circular-progress" />
        )}
      </>
    );
  };

  const resetFilters = async () => {
    setDateFrom(null);
    setDateTo(null);
    setSearch("");
    setOperationOriginsFilter(null);
    setOperationStatusesFilter([EPaymentOperationStatus.Terminated]);
    getOperations({
      page: 1,
      pageSize,
      dateFrom: null,
      dateTo: null,
      origins: null,
      search: "",
      statuses: [EPaymentOperationStatus.Terminated],
    });
  };

  useEffect(() => {
    let selStatuses: string[] = ["all-statuses"];
    if (operationStatusesFilter)
      selStatuses = (operationStatuses || [])
        .filter((os) => operationStatusesFilter.includes(os.code))
        .map((oos) => oos.description);
    setSelectedStatuses(selStatuses);
  }, [operationStatuses]);

  useEffect(() => {
    let selOrigins: string[] = ["all-origins"];
    if (operationOriginsFilter)
      selOrigins = (operationOrigins || [])
        .filter((os) => operationOriginsFilter.includes(os.code))
        .map((oos) => oos.description);
    setSelectedOrigins(selOrigins);
  }, [operationOrigins]);

  const ExcelIcon = () => {
    return (
      <>
        {loadingPOExcel ? (
          <Box position="relative" display="inline-flex">
            <CircularProgress className="filter-circular-progress-excel" />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaRegFileExcel size="0.9rem" />
            </Box>
          </Box>
        ) : (
          <IconButton
            className="icon-button"
            aria-label="Descargar Excel"
            size="medium"
            onClick={downloadExcel}
            disabled={loadingPOExcel}
          >
            <FaRegFileExcel size="1.3rem" />
          </IconButton>
        )}
      </>
    );
  };

  return (
    <>
      <Paper className="paper-container" elevation={0}>
        <FormGroup sx={{ m: 1 }}>
          <Stack direction="row">
            <Stack direction="row" gap="0.5rem" flexWrap="wrap" flex="1">
              <Button
                id="openOriginSelect"
                onClick={() => setOpenOriginSelect(true)}
                className="select-button"
                disabled={false}
              >
                Origen
                {iconFilter()}
              </Button>
              <Select
                multiple
                input={<Input id="select-multiple-origin" />}
                onClose={onCloseOrigins}
                onChange={handleOriginsSelect}
                style={{ display: "none" }}
                open={openOriginSelect}
                value={selectedOrigins}
                MenuProps={{
                  anchorEl: document.getElementById("openOriginSelect"),
                }}
              >
                <MenuItem key={"ORI"} value={"all-origins"}>
                  <ListItemText primary={"Todos"} />
                  <Checkbox
                    checked={selectedOrigins.includes("all-origins")}
                    className="checkbox-filter"
                    onChange={handleSelectAllOrigins}
                  />
                </MenuItem>
                <Divider />
                {operationOrigins.map((filOri) => (
                  <MenuItem key={filOri.code} value={filOri.description}>
                    <ListItemText primary={filOri.description} />
                    <Checkbox
                      checked={selectedOrigins.includes(filOri.description)}
                      className="checkbox-filter"
                    />
                  </MenuItem>
                ))}
              </Select>
              <Button
                id="openStatusSelect"
                onClick={() => setOpenStatusSelect(true)}
                className="select-button"
                disabled={false}
              >
                Estado
                {iconFilter()}
              </Button>
              <Select
                multiple
                input={<Input id="select-multiple-statuses" />}
                onChange={handleStatusesSelect}
                onClose={onCloseStatuses}
                style={{ display: "none" }}
                open={openStatusSelect}
                value={selectedStatuses}
                MenuProps={{
                  anchorEl: document.getElementById("openStatusSelect"),
                }}
                // onChange={}
              >
                <MenuItem key={"STS"} value={"all-statuses"}>
                  <ListItemText primary={"Todos"} />
                  <Checkbox
                    checked={selectedStatuses.includes("all-statuses")}
                    className="checkbox-filter"
                    onChange={handleSelectAllStatuses}
                  />
                </MenuItem>
                <Divider />
                {operationStatuses.map((filSta) => (
                  <MenuItem key={filSta.code} value={filSta.description}>
                    <ListItemText primary={filSta.description} />
                    <Checkbox
                      checked={selectedStatuses.includes(filSta.description)}
                      className="checkbox-filter"
                    />
                  </MenuItem>
                ))}
              </Select>
              <Button
                id="openStarDate"
                onClick={() => setOpenStartDate(true)}
                className="select-button"
                disabled={false}
              >
                {dateFrom
                  ? `Desde: ${moment
                      .tz(dateFrom, "America/Argentina/Buenos_Aires")
                      .format("DD/MM/YYYY")}`
                  : "Fecha Desde"}
                {iconFilter()}
              </Button>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dateFrom}
                  onChange={(newDate) => setDateFrom(newDate)}
                  onClose={() => setOpenStartDate(false)}
                  open={openStartDate}
                  renderInput={() => <></>}
                  PopperProps={{
                    anchorEl: document.getElementById("openStarDate"),
                  }}
                />
              </LocalizationProvider>
              <Button
                id="openEndDate"
                onClick={() => setOpenEndDate(true)}
                className="select-button"
                disabled={false}
              >
                {dateTo
                  ? `Hasta: ${moment
                      .tz(dateTo, "America/Argentina/Buenos_Aires")
                      .format("DD/MM/YYYY")}`
                  : "Fecha Hasta"}
                {iconFilter()}
              </Button>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dateTo}
                  onChange={(newDate) => setDateTo(newDate)}
                  onClose={() => setOpenEndDate(false)}
                  open={openEndDate}
                  renderInput={() => <></>}
                  PopperProps={{
                    anchorEl: document.getElementById("openEndDate"),
                  }}
                />
              </LocalizationProvider>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gap="0.5rem"
            >
              <IconButton
                className="icon-button"
                aria-label="Limpiar Filtros"
                size="medium"
                onClick={resetFilters}
              >
                <RestartAltIcon />
              </IconButton>
              <Button
                id="openStarDate"
                onClick={handleApply}
                variant="contained"
                disableElevation
                className="select-button select-button-apply"
                disabled={false}
              >
                Aplicar
              </Button>
            </Stack>
          </Stack>
        </FormGroup>
        <Divider></Divider>
        <Stack direction="row" className="filters-footer">
          <Stack
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="1rem"
            flex="1"
            flexWrap="wrap"
          >
            <div>
              Total de Operaciones:
              <Chip
                label={totalCount}
                size="small"
                className="chip-container"
              />
            </div>
            <div>
              Total Recaudado:
              <Chip
                label={currencyFormat(totalAmount)}
                size="small"
                className="chip-container"
              />
            </div>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              className="icon-button"
              aria-label="Estadisticas"
              size="medium"
              onClick={handleOpen}
            >
              <BarChartOutlinedIcon />
            </IconButton>
            <ExcelIcon />
          </Stack>
        </Stack>
        <PaymentFilterModal open={open} handleClose={handleClose} />
      </Paper>
    </>
  );
};
