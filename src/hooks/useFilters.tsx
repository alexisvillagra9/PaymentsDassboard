import { useEffect, useState } from "react";
import { IPaymentOperation } from "../models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "../models/apis/wallet/paymentOperationOrigin";
import { getOrigins, getStatuses } from "../helpers/payments";
import { IPaymentOperationStatus } from "../models/apis/wallet/paymentOperationStatus";

export const useFilters = (initialState = []) => {
  const [paymentOperations, setPaymentOperations] =
    useState<IPaymentOperation[]>(initialState);
  const [paymentOperationsFilter, setPaymentOperationsFilter] =
    useState<IPaymentOperation[]>(initialState);
  const [getFiltersOrigin, setGetFiltersOrigin] = useState<
    IPaymentOperationOrigin[]
  >([]);
  const [getFiltersStatus, setGetFiltersStatus] = useState<
    IPaymentOperationStatus[]
  >([]);
  const [originFilterCodes, setOriginFilterCodes] = useState<string[]>([]);
  const [statusFilterCodes, setStatusFilterCodes] = useState<string[]>([]);

  // useEffect(() => {
  //   setPaymentOperationsFilter(paymentOperations);
  // }, [paymentOperations]);

  useEffect(() => {
    // console.log("aaaa", paymentOperations);
    const origins = getOrigins(paymentOperations);
    setGetFiltersOrigin(origins);

    const statuses = getStatuses(paymentOperations);
    setGetFiltersStatus(statuses);
  }, [paymentOperations]);

  useEffect(() => {
    let poFiltered: IPaymentOperation[] = paymentOperations;
    if (originFilterCodes.length) {
      poFiltered = poFiltered.filter((po: IPaymentOperation) =>
        originFilterCodes.includes(po.origin.code)
      );
    }
    if (statusFilterCodes.length) {
      poFiltered = poFiltered.filter((po: IPaymentOperation) =>
        statusFilterCodes.includes(po.status.code)
      );
    }
    setPaymentOperationsFilter(poFiltered);
  }, [originFilterCodes, statusFilterCodes, paymentOperations]);

  const filterByOrigins = (origins: string[]) => {
    setOriginFilterCodes(origins);
  };

  const filterByStatuses = (statuses: string[]) => {
    setStatusFilterCodes(statuses);
  };

  const getTotalAmount = () => {
    const total = paymentOperationsFilter
      .filter((po) => po?.result?.payment?.code === "OK")
      .reduce((sum: number, po1) => sum + po1?.transaction_amount || 0, 0);
    return total;
  };

  return {
    paymentOperationsFilter,
    setPaymentOperations,
    getFiltersOrigin,
    getFiltersStatus,
    filterByOrigins,
    filterByStatuses,
    getTotalAmount,
  };
};
