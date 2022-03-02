import axios from "axios";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationAttempt } from "../models/apis/wallet/paymentOperationAttempts";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";
import { IMercadopagoPayment } from "../models/apis/mercadopago/payment";

const environment = "P";
const WALLET_URI =
  environment === "P"
    ? process.env.REACT_APP_WALLET_URI
    : process.env.REACT_APP_WALLET_URI_DEV;

export const getPaymentOperationById = async (
  paymentOperationId: string = ""
): Promise<IPaymentOperation> => {
  try {
    const res = await axios.get(
      `${WALLET_URI}/payment-operation/${paymentOperationId}`
    );
    let { data: paymentOperation }: { data: IPaymentOperation } = res;
    return paymentOperation;
  } catch (error) {
    throw error;
  }
};

export const getPaymentOperationsByFilter = async (
  filters: any = {}
): Promise<IPaymentOperation[]> => {
  try {
    let { dateFrom, dateTo }: { dateFrom: Date; dateTo: Date } = filters;

    // Fix Filter by date
    if (dateFrom) {
      dateFrom.setHours(0);
      dateFrom.setMinutes(0);
      dateFrom.setSeconds(0);
      filters = { ...filters, dateFrom };
    }

    if (dateTo) {
      dateTo.setHours(23);
      dateTo.setMinutes(59);
      dateTo.setSeconds(59);
      filters = { ...filters, dateTo };
    }

    const res = await axios.post(
      `${WALLET_URI}/payment-operation/filters`,
      filters
    );
    let { data: paymentOperations = [] }: { data: IPaymentOperation[] } = res;
    return paymentOperations;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const getPaymentOperationAttempts = async (
  paymentOperationId: string = ""
): Promise<IPaymentOperationAttempt[]> => {
  try {
    const res = await axios.get(
      `${WALLET_URI}/payment-operation/attempts/${paymentOperationId}`
    );
    let {
      data: paymentOperationAttempts = [],
    }: { data: IPaymentOperationAttempt[] } = res;

    return paymentOperationAttempts;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const getPaymentOperationOrigins = async (): Promise<
  IPaymentOperationOrigin[]
> => {
  try {
    const res = await axios.get(`${WALLET_URI}/payment-operation/origins/all`);
    let {
      data: paymentOperationOrigins = [],
    }: { data: IPaymentOperationOrigin[] } = res;

    return paymentOperationOrigins;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const getPaymentOperationStatuses = async (): Promise<
  IPaymentOperationStatus[]
> => {
  try {
    const res = await axios.get(`${WALLET_URI}/payment-operation/statuses/all`);
    let {
      data: paymentOperationStatuses = [],
    }: { data: IPaymentOperationStatus[] } = res;

    return paymentOperationStatuses;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const getPaymentMercadopagoById = async (
  paymentId: number | string
): Promise<IMercadopagoPayment> => {
  try {
    const res = await axios.get(
      `${WALLET_URI}/mercadopago/payments/${paymentId}`
    );
    let { data: payment }: { data: IMercadopagoPayment } = res;

    return payment;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};
