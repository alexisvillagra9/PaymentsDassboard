import Stack from "@mui/material/Stack";
import React from "react";
import { useLocation } from "react-router-dom";
import { PaymentDetailAccordion } from "../../components/paymentDetailAccordion/PaymentDetailAccordion";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";

export const PaymentDetail = () => {
  const { state: paymentOperation } = useLocation();
  const { items } = paymentOperation as IPaymentOperation;

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {};

  return (
    <>
      <div className="page-container">
        <Stack gap="0.5rem">
          <PaymentDetailAccordion
            panelId="items"
            title="Detalle de items"
            handleChange={handleChange}
            defaultExpanded={true}
            items={items}
          ></PaymentDetailAccordion>
          <PaymentDetailAccordion
            panelId="partner"
            title="Datos de Comprador"
            handleChange={handleChange}
            defaultExpanded={false}
          ></PaymentDetailAccordion>
        </Stack>
      </div>
    </>
  );
};
