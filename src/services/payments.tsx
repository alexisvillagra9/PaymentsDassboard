import axios from "axios";
import { IMercadopagoPayment } from "../models/apis/mercadopago/payment";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationAttempt } from "../models/apis/wallet/paymentOperationAttempts";
import { IPaymentOperationFilter } from "../models/apis/wallet/paymentOperationFilter";
import { IPaymentOperationLifecycle } from "../models/apis/wallet/paymentOperationLifecycle";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationResult } from "../models/apis/wallet/paymentOperationResult";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";
import { IMacroPayment } from "../models/apis/macro/payment";

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
  filters: IPaymentOperationFilter
): Promise<IPaymentOperationResult> => {
  try {
    let { dateFrom, dateTo, page, pageSize, search, statuses, origins } =
      filters;

    // Fix Filter by date
    if (dateFrom) {
      dateFrom.setHours(0);
      dateFrom.setMinutes(0);
      dateFrom.setSeconds(0);
    }

    if (dateTo) {
      dateTo.setHours(23);
      dateTo.setMinutes(59);
      dateTo.setSeconds(59);
    }

    const res = await axios.get(
      `${WALLET_URI}/payment-operation/admin/list?page=${page}` +
        `&pageSize=${pageSize}&search=${
          search || ""
        }&sort=createdAt&sortCriteria=desc` +
        `&statuses=${
          statuses ? encodeURIComponent(JSON.stringify(statuses)) : ""
        }` +
        `&origins=${
          origins ? encodeURIComponent(JSON.stringify(origins)) : ""
        }` +
        `&dateFrom=${dateFrom?.getTime() || ""}&dateTo=${
          dateTo?.getTime() || ""
        }`
    );
    let { data: paymentOperationResult }: { data: IPaymentOperationResult } =
      res;
    return paymentOperationResult;
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

export const getPaymentOperationLifecycle = async (
  paymentOperationId: string = ""
): Promise<IPaymentOperationLifecycle[]> => {
  try {
    const res = await axios.get(
      `${WALLET_URI}/payment-operation/lifecycle/${paymentOperationId}`
    );
    let {
      data: paymentOperationLifecycle = [],
    }: { data: IPaymentOperationLifecycle[] } = res;

    return paymentOperationLifecycle;
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

export const getPaymentMacroByExternalReference = async (
  paymentId: number | string
): Promise<IMacroPayment | null> => {
  try {
    const res = await axios.get<IMacroPayment | null>(
      `${WALLET_URI}/macro/payments/${paymentId}`
    );
    let { data: payment } = res;

    return payment;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};
