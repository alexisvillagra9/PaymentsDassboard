import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import moment from "moment-timezone";
import "moment/locale/es";
import React from "react";
import {
  EPaymentOperationOrigin,
  EPaymentOperationStatus,
  EPaymentStatus,
} from "../../helpers/enums";
import { currencyFormat } from "../../helpers/general";
import { IPartnerOperation } from "../../models/apis/wallet/partnerOperation";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import { IResult } from "../../models/apis/wallet/result";
import "./PaymentListItem.css";

export const PaymentListItem = ({
  origin: { code: originCode, description: originDesciption },
  status: { code: statusCode, description: statusDesciption },
  partner: { name, lastName, dni },
  result: { payment: { code: resultPaymentCode } = {} } = {},
  transaction_amount,
  createdAt,
}: {
  origin: IPaymentOperationOrigin;
  status: IPaymentOperationStatus;
  partner: IPartnerOperation;
  result: IResult;
  transaction_amount: number;
  createdAt: Date;
}) => {
  const title = `${originDesciption} - ${name} ${lastName}`;
  const susbtitle = moment
    .tz(createdAt, "America/Argentina/Buenos_Aires")
    .format("DD MMMM YYYY, HH:mm:ss");

  const statusColor = () => {
    let color:
      | "default"
      | "primary"
      | "secondary"
      | "info"
      | "error"
      | "success"
      | "warning"
      | undefined = "default";
    if (statusCode === EPaymentOperationStatus.Generated) color = "info";
    if (statusCode === EPaymentOperationStatus.VoluntarilyCanceled)
      color = "warning";
    if (statusCode === EPaymentOperationStatus.Terminated) color = "success";
    if (statusCode === EPaymentOperationStatus.PendingSubscription)
      color = "secondary";
    return color;
  };

  const paymentStatusColor = () => {
    let color:
      | "default"
      | "primary"
      | "secondary"
      | "info"
      | "error"
      | "success"
      | "warning"
      | undefined = "default";
    if (resultPaymentCode === EPaymentStatus.Error) color = "error";
    if (resultPaymentCode === EPaymentStatus.Success) color = "success";
    if (resultPaymentCode === EPaymentStatus.Pending) color = "warning";
    return color;
  };

  const paymentStatusDesc = () => {
    let description = "Error en el Pago";
    if (resultPaymentCode === EPaymentStatus.Success) description = "Pagado";
    if (resultPaymentCode === EPaymentStatus.Pending)
      description = "Pago Pendiente";
    return description;
  };

  const iconSelect = (
    <>
      {originCode === EPaymentOperationOrigin.RegistreNewPartner && (
        <HowToRegOutlinedIcon></HowToRegOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.PaymentOfFees && (
        <EventAvailableOutlinedIcon></EventAvailableOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.Subscription && (
        <CreditCardOutlinedIcon></CreditCardOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.SubscriptionToAD && (
        <CreditScoreOutlinedIcon></CreditScoreOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.QRPayment && (
        <QrCodeScannerOutlinedIcon></QrCodeScannerOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.LocationBuy && (
        <AddLocationOutlinedIcon></AddLocationOutlinedIcon>
      )}
    </>
  );

  return (
    <>
      <ListItemAvatar>
        <Avatar className="payment-avatar">{iconSelect}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={susbtitle}
        primaryTypographyProps={{
          fontSize: 16,
          fontWeight: "medium",
          letterSpacing: 0,
          color: "var(--color-primary)",
        }}
      />
      <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
        <div className="operation-price">
          {currencyFormat(transaction_amount)}
        </div>
        <Stack
          direction="row"
          gap="0.5rem"
          flexWrap="wrap"
          justifyContent="flex-end"
        >
          {/* <Chip label="Small" size="small" /> */}
          <Chip
            className="status-chip"
            label={statusDesciption}
            size="small"
            color={statusColor()}
          />
          {resultPaymentCode && (
            <Chip
              className="status-chip"
              label={paymentStatusDesc()}
              size="small"
              variant="outlined"
              color={paymentStatusColor()}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};
