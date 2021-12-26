import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import "./PaymenrFilters.css";
import { currencyFormat } from "../../helpers/general";

export const PaymentFilters = ({
  total,
  filterOrigins,
  filterStatuses,
  filterByOrigins,
  filterByStatuses,
  getTotalAmount,
}: {
  total: number;
  filterOrigins: IPaymentOperationOrigin[];
  filterStatuses: IPaymentOperationStatus[];
  filterByOrigins: (originCodes: string[]) => void;
  filterByStatuses: (statusCodes: string[]) => void;
  getTotalAmount: () => number;
}) => {
  const [openOriginSelect, setOpenOriginSelect] = useState(false);
  const [openStatusSelect, setOpenStatusSelect] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Finalizado",
  ]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);

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

  const handleOriginsApply = () => {
    const originCodes = filterOrigins
      .filter((fo) => selectedOrigins.includes(fo.description))
      .map((fo1) => fo1.code);
    filterByOrigins(originCodes);
    setOpenOriginSelect(false);
  };
  const handleStatusesApply = () => {
    const statusCodes = filterStatuses
      .filter((fs) => selectedStatuses.includes(fs.description))
      .map((fs1) => fs1.code);
    filterByStatuses(statusCodes);
    setOpenStatusSelect(false);
  };

  useEffect(() => {
    handleStatusesApply();
  }, []);

  return (
    <>
      <Paper className="paper-container" elevation={0}>
        <FormGroup sx={{ m: 1 }}>
          <Stack direction="row" gap="0.5rem" flexWrap="wrap">
            <Button
              id="openOriginSelect"
              onClick={() => setOpenOriginSelect(true)}
              className="select-button"
            >
              Origen<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
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
              // onChange={}
            >
              {filterOrigins.map((filOri) => (
                <MenuItem key={filOri.code} value={filOri.description}>
                  <ListItemText primary={filOri.description} />
                  <Checkbox
                    checked={selectedOrigins.includes(filOri.description)}
                    className="checkbox-filter"
                  />
                </MenuItem>
              ))}
              <MenuItem className="apply-filter" onClick={handleOriginsApply}>
                Aplicar
              </MenuItem>
            </Select>

            <Button
              id="openStatusSelect"
              onClick={() => setOpenStatusSelect(true)}
              className="select-button"
            >
              Estado<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
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
              {filterStatuses.map((filSta) => (
                <MenuItem key={filSta.code} value={filSta.description}>
                  <ListItemText primary={filSta.description} />
                  <Checkbox
                    checked={selectedStatuses.includes(filSta.description)}
                    className="checkbox-filter"
                  />
                </MenuItem>
              ))}
              <MenuItem className="apply-filter" onClick={handleStatusesApply}>
                Aplicar
              </MenuItem>
            </Select>
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
      </Paper>
    </>
  );
};
