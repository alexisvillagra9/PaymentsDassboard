import axios from "axios";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";

const WALLET_URI = process.env.REACT_APP_WALLET_URI;

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
