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
import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { EPaymenMethodId, EPaymenTypeId } from "../../helpers/enums";
import { currencyFormat } from "../../helpers/general";
import { IMercadopagoPayment } from "../../models/apis/mercadopago/payment";
import "./PaymentDetailMercadopago.css";
export const PaymentDetailMercadopago = ({
  payment,
}: {
  payment: IMercadopagoPayment | null;
}) => {
  const {
    transaction_amount = 0,
    transaction_details: { net_received_amount = 0 } = {},
    fee_details = [],
    status = "",
    payment_method_id = "",
    payment_type_id = "",
    card: { first_six_digits = "", last_four_digits = "" } = {},
    date_created,
    external_reference,
  } = payment || {};

  const cardDetail = `Operó con ${
    EPaymenTypeId[payment_type_id as keyof typeof EPaymenTypeId]
  } ${
    EPaymenMethodId[payment_method_id as keyof typeof EPaymenMethodId]
  }: ${first_six_digits}******${last_four_digits}`;

  const statusPayment: any = {
    "": {
      class: "",
      text: "",
      icon: NotInterestedOutlinedIcon,
    },
    approved: {
      class: "list-item-icon-success",
      text: "El pago fue aprobado y acreditado.",
      icon: CheckCircleOutlineOutlinedIcon,
    },
    rejected: {
      class: "list-item-icon-error",
      text: "El pago fue rechazado. El usuario podría reintentar el pago.",
      icon: CheckCircleOutlineOutlinedIcon,
    },
  };

  const FinalStatusIcon = statusPayment[status].icon as OverridableComponent<
    SvgIconTypeMap<{}, "svg">
  >;

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
                  label={currencyFormat(transaction_amount)}
                  size="small"
                  className="chip-container"
                />
              </Stack>
            </ListItem>
            {fee_details.map((fee, idx) => {
              const { amount: fee_amount = 0 } = fee;
              return (
                <ListItem key={idx} disablePadding={true}>
                  <ListItemIcon className="list-item-icon">
                    <GiReceiveMoney size="1.1rem" />
                  </ListItemIcon>
                  <ListItemText primary="Cargos de Mercadopago" />
                  <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
                    <Chip
                      label={`- ${currencyFormat(fee_amount)}`}
                      size="small"
                      className="chip-container-fee"
                    />
                  </Stack>
                </ListItem>
              );
            })}
            <ListItem key={-2} disablePadding={true}>
              <ListItemIcon className="list-item-icon">
                <PriceCheckOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Total" />
              <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
                <Chip
                  label={currencyFormat(net_received_amount)}
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
              className={statusPayment[status].class}
            >
              <ListItemIcon className={`list-item-icon`}>
                {
                  <FinalStatusIcon
                    fontSize="small"
                    className={statusPayment[status].class}
                  />
                }
              </ListItemIcon>
              <ListItemText primary={statusPayment[status].text} />
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
                  .tz(date_created, "America/Argentina/Buenos_Aires")
                  .format("DD MMMM YYYY, HH:mm:ss")}`}
              />
            </ListItem>
            <ListItem key={-2} disablePadding={true}>
              <ListItemIcon className={`list-item-icon`}>
                {<InfoOutlinedIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText
                primary={`Referencia Externa: ${external_reference}`}
              />
            </ListItem>
          </List>
        </Box>
      </Stack>
    )
  );
};
