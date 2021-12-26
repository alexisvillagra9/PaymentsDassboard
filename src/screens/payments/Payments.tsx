import React, { useEffect, useState } from "react";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { useFilters } from "../../hooks/useFilters";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import { getPaymentOperationsByFilter } from "../../services/payments";
import "./Payments.css";

export const Payments = () => {
  const {
    paymentOperationsFilter,
    setPaymentOperations,
    getFiltersOrigin,
    getFiltersStatus,
    filterByOrigins,
    filterByStatuses,
    getTotalAmount,
  }: {
    paymentOperationsFilter: IPaymentOperation[];
    setPaymentOperations: (payOps: IPaymentOperation[]) => void;
    getFiltersOrigin: IPaymentOperationOrigin[];
    getFiltersStatus: IPaymentOperationStatus[];
    filterByOrigins: (originCodes: string[]) => void;
    filterByStatuses: (statusCodes: string[]) => void;
    getTotalAmount: () => number;
  } = useFilters();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentInit = async () => {
      try {
        console.log("Cargando...", new Date());
        const payOps = await getPaymentOperationsByFilter();
        setPaymentOperations(payOps);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    paymentInit();
  }, [setPaymentOperations]);

  return (
    <div className="payment-container">
      <PaymentFilters
        total={paymentOperationsFilter.length}
        filterOrigins={getFiltersOrigin}
        filterStatuses={getFiltersStatus}
        filterByOrigins={filterByOrigins}
        filterByStatuses={filterByStatuses}
        getTotalAmount={getTotalAmount}
      ></PaymentFilters>
      {loading ? (
        <>CARGANDO</>
      ) : (
        <PaymentList paymentOperations={paymentOperationsFilter}></PaymentList>
      )}
    </div>
  );
};
