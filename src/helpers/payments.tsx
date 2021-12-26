import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";

export const getOrigins = (
  payOps: IPaymentOperation[]
): IPaymentOperationOrigin[] => {
  let origins: IPaymentOperationOrigin[] = [];
  payOps.forEach((po: IPaymentOperation) => {
    const { origin } = po;
    if (origins.length) {
      if (
        !origins.some(
          (poo: IPaymentOperationOrigin) => poo.code === origin.code
        )
      ) {
        origins.push(origin);
      }
    } else {
      origins.push(origin);
    }
  });
  return origins;
};

export const getStatuses = (
  payOps: IPaymentOperation[]
): IPaymentOperationStatus[] => {
  let statuses: IPaymentOperationStatus[] = [];
  payOps.forEach((po: IPaymentOperation) => {
    const { status } = po;
    if (statuses.length) {
      if (
        !statuses.some(
          (poo: IPaymentOperationStatus) => poo.code === status.code
        )
      ) {
        statuses.push(status);
      }
    } else {
      statuses.push(status);
    }
  });
  return statuses;
};
