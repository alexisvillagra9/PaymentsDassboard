import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PaymentDetailAccordion } from "../../components/paymentDetailAccordion/PaymentDetailAccordion";
import { PaymentDetailHeader } from "../../components/paymentDetailHeader/PaymentDetailHeader";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationAttempt } from "../../models/apis/wallet/paymentOperationAttempts";
import { getPaymentOperationAttempts } from "../../services/payments";

export const PaymentDetail = () => {
  const [loadAttempts, setLoadAttempts] = useState(true);
  const [attempts, setAttempts] = useState<IPaymentOperationAttempt[]>([]);
  const { state: paymentOperation } = useLocation();
  const {
    _id,
    items,
    transaction_amount,
    subtotal,
    createdAt,
    partner,
    result,
  } = paymentOperation as IPaymentOperation;

  // useEffect(() => {
  //   // console.log(attempts);
  // }, [attempts]);

  const getAttempts = async () => {
    const attemptsTemp = await getPaymentOperationAttempts(_id);
    setAttempts(attemptsTemp);
    setLoadAttempts(false);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {
    if (panel === "attempts") {
      getAttempts();
    }
  };

  return (
    <>
      <div className="page-container">
        <Stack gap="0.5rem">
          <PaymentDetailHeader
            paymentOperationId={_id}
            createdAt={createdAt}
          ></PaymentDetailHeader>
          <PaymentDetailAccordion
            panelId="items"
            title="Detalle de items"
            handleChange={handleChange}
            defaultExpanded={true}
            items={items}
            subtotal={subtotal}
            transaction_amount={transaction_amount}
          ></PaymentDetailAccordion>
          <PaymentDetailAccordion
            panelId="partner"
            title="Datos de Comprador"
            handleChange={handleChange}
            defaultExpanded={false}
            partner={partner}
          ></PaymentDetailAccordion>
          <PaymentDetailAccordion
            panelId="status"
            title="Estado de Transacciones"
            handleChange={handleChange}
            defaultExpanded={false}
            result={result}
          ></PaymentDetailAccordion>
          <PaymentDetailAccordion
            panelId="attempts"
            title="Intentos"
            handleChange={handleChange}
            defaultExpanded={false}
            attempts={attempts}
            attemptsLoading={loadAttempts}
          ></PaymentDetailAccordion>
        </Stack>
      </div>
    </>
  );
};
