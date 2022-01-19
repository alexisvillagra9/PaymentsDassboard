import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import moment from "moment-timezone";
import "moment/locale/es";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import XLSX from "xlsx";
import { EPaymentOperationStatus } from "../../helpers/enums";
import { currencyFormat } from "../../helpers/general";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import { getPaymentOperationsByFilter } from "../../services/payments";
import { PaymentFilterModal } from "../paymentFilterModal/PaymentFilterModal";
import "./PaymenrFilters.css";

export const PaymentFilters = ({
  total,
  filterOrigins,
  filterStatuses,
  getTotalAmount,
  paymentOperationsFilter,
  setPaymentOperations,
  initComp,
  loading,
  setLoading,
}: {
  total: number;
  filterOrigins: IPaymentOperationOrigin[];
  filterStatuses: IPaymentOperationStatus[];
  getTotalAmount: () => number;
  paymentOperationsFilter: IPaymentOperation[];
  setPaymentOperations: (payOps: IPaymentOperation[]) => void;
  initComp: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const [openOriginSelect, setOpenOriginSelect] = useState(false);
  const [openStatusSelect, setOpenStatusSelect] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
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

  const handleOriginsSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedOrigins(value);
  };

  const handleApply = async () => {
    setLoading(true);

    const statuses = filterStatuses
      .filter((fs) => selectedStatuses.includes(fs.description))
      .map((fs1) => fs1.code);

    const origins = filterOrigins
      .filter((fo) => selectedOrigins.includes(fo.description))
      .map((fo1) => fo1.code);

    const payops = await getPaymentOperationsByFilter({
      statuses,
      origins,
      dateFrom,
      dateTo,
    });
    setPaymentOperations(payops);
    setLoading(false);
  };

  const handleSelectAllOrigins = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrigins(
        filterOrigins.map((po) => po.description).concat(["all-origins"])
      );
    } else {
      setSelectedOrigins([]);
    }
  };

  const handleSelectAllStatuses = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStatuses(
        filterStatuses.map((po) => po.description).concat(["all-statuses"])
      );
    } else {
      setSelectedStatuses([]);
    }
  };

  const handleDownloadExcel = () => {
    const data = paymentOperationsFilter.map((payop) => {
      return {
        fecha_creacion: payop.createdAt,
        origen: payop.origin.description,
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
      };
    });
    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `operaciones.xlsx`);
  };

  const iconFilter = () => {
    return (
      <>
        {initComp ? (
          <KeyboardArrowDownIcon htmlColor="var(--primary-color)" />
        ) : (
          <CircularProgress className="filter-circular-progress" />
        )}
      </>
    );
  };

  useEffect(() => {
    if (initComp) {
      setSelectedStatuses([
        filterStatuses.find(
          (po) => po.code === EPaymentOperationStatus.Terminated
        )?.description || "",
      ]);
      setSelectedOrigins(
        filterOrigins.map((po) => po.description).concat(["all-origins"])
      );
    }
  }, [initComp, filterOrigins, filterStatuses]);

  return (
    <>
      <Paper className="paper-container" elevation={0}>
        <FormGroup sx={{ m: 1 }}>
          <Stack direction="row" gap="0.5rem" flexWrap="wrap">
            <Button
              id="openOriginSelect"
              onClick={() => setOpenOriginSelect(true)}
              className="select-button"
              disabled={!initComp}
            >
              Origen
              {iconFilter()}
            </Button>
            <Select
              multiple
              input={<Input id="select-multiple-origin" />}
              onClose={() => setOpenOriginSelect(false)}
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
              {filterOrigins.map((filOri) => (
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
              disabled={!initComp}
            >
              Estado
              {iconFilter()}
            </Button>
            <Select
              multiple
              input={<Input id="select-multiple-statuses" />}
              onChange={handleStatusesSelect}
              onClose={() => setOpenStatusSelect(false)}
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
              {filterStatuses.map((filSta) => (
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
              disabled={!initComp}
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
              disabled={!initComp}
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
            <Button
              id="openStarDate"
              onClick={handleApply}
              variant="contained"
              disableElevation
              className="select-button select-button-apply"
              disabled={!initComp}
            >
              Aplicar
            </Button>
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              flex="1"
            >
              <IconButton
                className="icon-button"
                aria-label="Estadisticas"
                size="medium"
                onClick={handleOpen}
              >
                <BarChartOutlinedIcon />
              </IconButton>
              <IconButton
                className="icon-button"
                aria-label="Descargar Excel"
                size="medium"
                onClick={handleDownloadExcel}
              >
                <FaRegFileExcel size="1.3rem" />
              </IconButton>
            </Stack>
          </Stack>
        </FormGroup>
        <Divider></Divider>
        <Stack
          direction="row"
          gap="1rem"
          flexWrap="wrap"
          className="filters-footer"
        >
          <div>
            Total de Operaciones:
            <Chip label={total} size="small" className="chip-container" />
          </div>
          <div>
            Total Recaudado:
            <Chip
              label={currencyFormat(getTotalAmount())}
              size="small"
              className="chip-container"
            />
          </div>
        </Stack>
        <PaymentFilterModal open={open} handleClose={handleClose} />
      </Paper>
    </>
  );
};
