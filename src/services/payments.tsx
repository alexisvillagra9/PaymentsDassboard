import axios from "axios";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationAttempt } from "../models/apis/wallet/paymentOperationAttempts";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";

const environment = "P";
const WALLET_URI =
  environment === "P"
    ? process.env.REACT_APP_WALLET_URI
    : process.env.REACT_APP_WALLET_URI_DEV;

export const getPaymentOperationsByFilter = async (
  filters: any = {}
): Promise<IPaymentOperation[]> => {
  try {
    const res = await axios.post(
      `${WALLET_URI}/payment-operation/filters`,
      filters
    );
    let { data: paymentOperations = [] }: { data: IPaymentOperation[] } = res;

    // Sort array ba date desc
    paymentOperations = paymentOperations.sort(
      (a: IPaymentOperation, b: IPaymentOperation) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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
