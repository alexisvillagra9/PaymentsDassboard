import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import RemoveDoneOutlinedIcon from "@mui/icons-material/RemoveDoneOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SimCardOutlinedIcon from "@mui/icons-material/SimCardOutlined";
import StartIcon from "@mui/icons-material/Start";
import {
  TbDatabase,
  TbDatabaseOff,
  TbTicket,
  TbTicketOff,
} from "react-icons/tb";
import {
  EPaymentOperationLifecycleType,
  EPaymentOperationOrigin,
  EPaymentOperationStatus,
  EPaymentStatus,
} from "./enums";
import { CardGiftcard } from "@mui/icons-material";

export const operationStatusColor = (statusCode: string) => {
  let colorStyle = {
    backgroundColor: "var(--background-success) !important",
    color: "var(--color-success) !important",
  };
  if (statusCode === EPaymentOperationStatus.Generated)
    colorStyle = {
      backgroundColor: "var(--background-secondary) !important",
      color: "var(--color-primary) !important",
    };
  if (statusCode === EPaymentOperationStatus.VoluntarilyCanceled)
    colorStyle = {
      backgroundColor: "var(--background-warn) !important",
      color: "var(--color-warn) !important",
    };
  if (statusCode === EPaymentOperationStatus.PendingSubscription)
    colorStyle = {
      backgroundColor: "var(--background-default) !important",
      color: "var(--color-default) !important",
    };
  if (statusCode === EPaymentOperationStatus.Error)
    colorStyle = {
      backgroundColor: "var(--background-error) !important",
      color: "var(--color-error) !important",
    };
  if (statusCode === EPaymentOperationStatus.Test)
    colorStyle = {
      backgroundColor: "var(--background-default) !important",
      color: "var(--color-default) !important",
    };
  if (statusCode === EPaymentOperationStatus.Retry)
    colorStyle = {
      backgroundColor: "var(--background-default) !important",
      color: "var(--color-default) !important",
    };
  return colorStyle;
};

export const paymentStatusColor = (resultPaymentCode: string) => {
  let colorStyle = {
    backgroundColor: "var(--background-success) !important",
    color: "var(--color-success) !important",
  };
  if (resultPaymentCode === EPaymentStatus.Error)
    colorStyle = {
      backgroundColor: "var(--background-error) !important",
      color: "var(--color-error) !important",
    };
  if (resultPaymentCode === EPaymentStatus.Pending)
    colorStyle = {
      backgroundColor: "var(--background-warn) !important",
      color: "var(--color-warn) !important",
    };
  return colorStyle;
};

export const paymentStatusDesc = (resultPaymentCode: string) => {
  let description = "Error en el Pago";
  if (resultPaymentCode === EPaymentStatus.Success) description = "Pagado";
  if (resultPaymentCode === EPaymentStatus.Pending)
    description = "Pago Pendiente";
  return description;
};

export const getIconAndColorLifecycle = (type: string) => {
  let iconsAndColors: [JSX.Element, string] = [<></>, "secondary"];
  if (type === EPaymentOperationLifecycleType.OpCreation)
    iconsAndColors = [<StartIcon />, "secondary"];
  if (type === EPaymentOperationLifecycleType.OpRetry)
    iconsAndColors = [<ReplayIcon />, "default"];
  if (type === EPaymentOperationLifecycleType.OpCanceled)
    iconsAndColors = [<DoDisturbOutlinedIcon />, "warn"];
  if (type === EPaymentOperationLifecycleType.OpTerminated)
    iconsAndColors = [<DoneAllOutlinedIcon />, "success"];
  if (type === EPaymentOperationLifecycleType.OpTerminatedError)
    iconsAndColors = [<RemoveDoneOutlinedIcon />, "error"];
  if (type === EPaymentOperationLifecycleType.CreationPayment)
    iconsAndColors = [<AttachMoneyOutlinedIcon />, "secondary"];
  if (type === EPaymentOperationLifecycleType.RejectedPayment)
    iconsAndColors = [<MoneyOffCsredOutlinedIcon />, "error"];
  if (type === EPaymentOperationLifecycleType.PendingPayment)
    iconsAndColors = [<QueryBuilderOutlinedIcon />, "warn"];
  if (type === EPaymentOperationLifecycleType.TerminatedPayment)
    iconsAndColors = [<PriceCheckOutlinedIcon />, "success"];
  if (type === EPaymentOperationLifecycleType.HermesIp)
    iconsAndColors = [<TbDatabase />, "success"];
  if (type === EPaymentOperationLifecycleType.ErrHermesImp)
    iconsAndColors = [<TbDatabaseOff />, "error"];
  if (type === EPaymentOperationLifecycleType.CreationTkt)
    iconsAndColors = [<TbTicket />, "success"];
  if (type === EPaymentOperationLifecycleType.ErrCreationTkt)
    iconsAndColors = [<TbTicketOff />, "error"];
  if (type === EPaymentOperationLifecycleType.InitRetry)
    iconsAndColors = [<StartIcon />, "default"];
  return iconsAndColors;
};

export const iconByOperationOrigin = (originCode: string) => {
  return (
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
      {originCode === EPaymentOperationOrigin.ExtraordinaryPayment && (
        <SellOutlinedIcon></SellOutlinedIcon>
      )}
      {originCode === EPaymentOperationOrigin.Contribution && (
        <CardGiftcard></CardGiftcard>
      )}
    </>
  );
};
