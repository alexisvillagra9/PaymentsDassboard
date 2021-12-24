import React, { useEffect, useState } from "react";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { getPaymentOperationsByFilter } from "../../services/payments";
import "./Payments.css";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";

export const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [paymentOperations, setPaymentOperations] = useState<
    IPaymentOperation[]
  >([]);

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
  }, []);

  return (
    <div className="payment-container">
      <PaymentFilters total={paymentOperations.length}></PaymentFilters>
      {loading ? (
        <>CARGANDO</>
      ) : (
        <PaymentList paymentOperations={paymentOperations}></PaymentList>
      )}
    </div>
  );
};
