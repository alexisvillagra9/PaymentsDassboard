import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import SimCardOutlinedIcon from "@mui/icons-material/SimCardOutlined";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import moment from "moment-timezone";
import "moment/locale/es";
import { FaRegHandshake } from "react-icons/fa";
import { EPaymentOperationOrigin } from "../../helpers/enums";
import { currencyFormat } from "../../helpers/general";
import {
  operationStatusColor,
  paymentStatusColor,
  paymentStatusDesc
} from "../../helpers/payments";
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
      {originCode === EPaymentOperationOrigin.Reactivate && (
        <ModelTrainingOutlinedIcon></ModelTrainingOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.ActivateChip && (
        <SimCardOutlinedIcon></SimCardOutlinedIcon>
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
            icon={<PaidOutlinedIcon style={{ color: "unset" }} />}
            sx={operationStatusColor(statusCode)}
          />
          {resultPaymentCode && (
            <Chip
              className="status-chip"
              label={paymentStatusDesc(resultPaymentCode)}
              size="small"
              sx={paymentStatusColor(resultPaymentCode)}
              icon={<FaRegHandshake style={{ color: "unset" }} />}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};
