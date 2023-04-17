import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import { Chip, ListItemIcon, SvgIconTypeMap } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Stack from "@mui/material/Stack";
import moment from "moment-timezone";
import "moment/locale/es";
import { GiReceiveMoney } from "react-icons/gi";
import { currencyFormat } from "../../helpers/general";
import { IMacroPayment } from "../../models/apis/macro/payment";
import "./paymentDetailMacro.css";
export const PaymentDetailMacro = ({
  payment,
}: {
  payment: IMacroPayment | null;
}) => {
  const {
    monto = 0,
    montoBruto = 0,
    montoDescuento = 0,
    medioPagoNombre = "",
    fecha,
    transaccionComercioId,
    estadoId,
  } = payment || {};

  const cardDetail = `Operó con ${medioPagoNombre}`;

  const statusPayment: any = {
    "0": {
      class: "",
      text: "",
      icon: NotInterestedOutlinedIcon,
    },
    "3": {
      class: "list-item-icon-success",
      text: "El pago fue aprobado y acreditado.",
      icon: CheckCircleOutlineOutlinedIcon,
    },
    "4": {
      class: "list-item-icon-error",
      text: "El pago fue rechazado. El usuario podría reintentar el pago.",
      icon: CheckCircleOutlineOutlinedIcon,
    },
  };

  const FinalStatusIcon = statusPayment[`${estadoId}`]
    .icon as OverridableComponent<SvgIconTypeMap<{}, "svg">>;

  return (
    payment && (
      <Stack flexWrap="wrap" flexDirection="row" gap="1rem">
        <Box className="box-mercadopago">
          <List disablePadding={true}>
            <ListItem key={-1} disablePadding={true}>
              <ListItemIcon className="list-item-icon">
                <PaidOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cobro" />
              <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
                <Chip
                  label={currencyFormat(+montoBruto)}
                  size="small"
                  className="chip-container"
                />
              </Stack>
            </ListItem>

            <ListItem key={1} disablePadding={true}>
              <ListItemIcon className="list-item-icon">
                <GiReceiveMoney size="1.1rem" />
              </ListItemIcon>
              <ListItemText primary="Cargos de Macro Click" />
              <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
                <Chip
                  label={`- ${currencyFormat(montoDescuento || 0)}`}
                  size="small"
                  className="chip-container-fee"
                />
              </Stack>
            </ListItem>
            <ListItem key={-2} disablePadding={true}>
              <ListItemIcon className="list-item-icon">
                <PriceCheckOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Total" />
              <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
                <Chip
                  label={currencyFormat(+monto)}
                  size="small"
                  className="chip-container"
                />
              </Stack>
            </ListItem>
          </List>
        </Box>
        <Box className="box-mercadopago">
          <List disablePadding={true}>
            <ListItem
              key={-1}
              disablePadding={true}
              className={statusPayment[`${estadoId}`].class}
            >
              <ListItemIcon className={`list-item-icon`}>
                {
                  <FinalStatusIcon
                    fontSize="small"
                    className={statusPayment[`${estadoId}`].class}
                  />
                }
              </ListItemIcon>
              <ListItemText primary={statusPayment[`${estadoId}`].text} />
            </ListItem>
            <ListItem key={-2} disablePadding={true}>
              <ListItemIcon className={`list-item-icon`}>
                {<CreditCardOutlinedIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText primary={cardDetail} />
            </ListItem>
          </List>
        </Box>
        <Box className="box-mercadopago">
          <List disablePadding={true}>
            <ListItem key={-1} disablePadding={true}>
              <ListItemIcon className={`list-item-icon`}>
                {<AlarmOnIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText
                primary={`Creado el ${moment
                  .tz(fecha, "America/Argentina/Buenos_Aires")
                  .format("DD MMMM YYYY, HH:mm:ss")}`}
              />
            </ListItem>
            <ListItem key={-2} disablePadding={true}>
              <ListItemIcon className={`list-item-icon`}>
                {<InfoOutlinedIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText
                primary={`Referencia Externa: ${transaccionComercioId}`}
              />
            </ListItem>
          </List>
        </Box>
      </Stack>
    )
  );
};
