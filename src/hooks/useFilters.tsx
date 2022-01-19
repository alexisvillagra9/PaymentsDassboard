import { useEffect, useState } from "react";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";

export const useFilters = (initialState = []) => {
  const [paymentOperations, setPaymentOperations] =
    useState<IPaymentOperation[]>(initialState);
  const [paymentOperationsFilter, setPaymentOperationsFilter] =
    useState<IPaymentOperation[]>(initialState);

  useEffect(() => {
    let poFiltered: IPaymentOperation[] = paymentOperations;
    setPaymentOperationsFilter(poFiltered);
  }, [paymentOperations]);

  const getTotalAmount = () => {
    const total = paymentOperationsFilter
      .filter((po) => po?.result?.payment?.code === "OK")
      .reduce((sum: number, po1) => sum + po1?.transaction_amount || 0, 0);
    return total;
  };

  return {
    paymentOperationsFilter,
    setPaymentOperations,
    getTotalAmount,
  };
};
