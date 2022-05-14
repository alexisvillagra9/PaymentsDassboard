import { EPaymentOperationStatus, EPaymentStatus } from "./enums";

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
