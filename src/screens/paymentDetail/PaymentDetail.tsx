import Stack from "@mui/material/Stack";
import React from "react";
import { useLocation } from "react-router-dom";
import { PaymentDetailAccordion } from "../../components/paymentDetailAccordion/PaymentDetailAccordion";
import { PaymentDetailHeader } from "../../components/paymentDetailHeader/PaymentDetailHeader";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";

export const PaymentDetail = () => {
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

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {};

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
        </Stack>
      </div>
    </>
  );
};
