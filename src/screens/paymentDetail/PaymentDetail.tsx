import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentDetailAccordion } from "../../components/paymentDetailAccordion/PaymentDetailAccordion";
import { PaymentDetailHeader } from "../../components/paymentDetailHeader/PaymentDetailHeader";
import { EGateway } from "../../helpers/enums";
import { IMacroPayment } from "../../models/apis/macro/payment";
import { IMercadopagoPayment } from "../../models/apis/mercadopago/payment";
import { IPointOfSale } from "../../models/apis/store/pointOfSale";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationAttempt } from "../../models/apis/wallet/paymentOperationAttempts";
import { IPaymentOperationLifecycle } from "../../models/apis/wallet/paymentOperationLifecycle";
import {
  getPaymentMacroByExternalReference,
  getPaymentMercadopagoById,
  getPaymentOperationAttempts,
  getPaymentOperationById,
  getPaymentOperationLifecycle,
} from "../../services/payments";
import "./PaymentDetail.css";

export const PaymentDetail = ({ currentView }: { currentView: string }) => {
  const [loadAttempts, setLoadAttempts] = useState(true);
  const [loadLifecycle, setLoadLoadLifecycle] = useState(true);
  const [pointOfSale, setPointOfSale] = useState<IPointOfSale | null>(null);
  const [gatewayCode, setGatewayCode] = useState<string>("");
  const [attempts, setAttempts] = useState<IPaymentOperationAttempt[]>([]);
  const [lifecycle, setLifecycle] = useState<IPaymentOperationLifecycle[]>([]);
  const [mercadopagoPayment, setMercadopagoPayment] =
    useState<IMercadopagoPayment | null>(null);
  const [macroPayment, setMacroPayment] = useState<IMacroPayment[]>([]);
  const [paymentOperation, setPaymentOperation] =
    useState<IPaymentOperation | null>();

  const { payment_operation_id } = useParams();

  const getAttempts = async () => {
    const attemptsTemp = await getPaymentOperationAttempts(
      payment_operation_id
    );
    setAttempts(attemptsTemp);
    setLoadAttempts(false);
  };

  const getLifecycle = async () => {
    const lifecycleTemp = await getPaymentOperationLifecycle(
      payment_operation_id
    );
    setLifecycle(lifecycleTemp);
    setLoadLoadLifecycle(false);
  };

  const getPaymentMercadopago = async (paymentId: string | number) => {
    const payMP = await getPaymentMercadopagoById(paymentId);
    setMercadopagoPayment(payMP);
  };

  const getPaymentsMacro = async (external_references: string[]) => {
    const pPaysMacro = external_references.map(async (er) => {
      const pay = await getPaymentMacroByExternalReference(er);
      return pay;
    });
    const paysMacro = await Promise.all(pPaysMacro);
    const filteredPayMacro = paysMacro.filter((pm) => pm) as IMacroPayment[];
    setMacroPayment(filteredPayMacro);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {
    if (panel === "attempts") {
      getAttempts();
    }

    if (panel === "lifecycle") {
      getLifecycle();
    }
  };

  const SkeletonDetail = () => {
    return (
      <>
        <Stack gap="0.5rem">
          <Paper className="paper-container-detail" elevation={0}>
            <Skeleton
              animation="wave"
              width={"7rem"}
              height={"3rem"}
              sx={{ borderRadius: "8px" }}
            />
          </Paper>
          <Paper
            className="paper-container-detail"
            elevation={0}
            sx={{ height: "20rem" }}
          >
            <Skeleton
              animation="wave"
              height={"3rem"}
              width={"7rem"}
              sx={{ borderRadius: "8px" }}
            />
          </Paper>
        </Stack>
      </>
    );
  };

  useEffect(() => {
    const init = async () => {
      const payOp = await getPaymentOperationById(payment_operation_id);
      setPaymentOperation(payOp);
    };
    init();
  }, [payment_operation_id]);

  useEffect(() => {
    if (paymentOperation) {
      const {
        external_references,
        result: { payment: { reference: mpPaymentID = "" } = {} } = {},
        point_of_sale,
        gateway,
      } = paymentOperation;
      const { code: gatewayCodeOp = "" } = gateway;

      setGatewayCode(gatewayCodeOp);

      setPointOfSale(point_of_sale);

      // console.log(mpPaymentID);
      if (gatewayCodeOp === EGateway.MERCADOPAGO)
        getPaymentMercadopago(mpPaymentID);
      if (gatewayCodeOp === EGateway.MACRO)
        getPaymentsMacro(external_references);
    }
  }, [paymentOperation]);

  return (
    <>
      <div className="page-container">
        {paymentOperation ? (
          <Stack gap="0.5rem">
            <PaymentDetailHeader
              paymentOperationId={paymentOperation._id}
              paymentReference={
                paymentOperation.result?.payment?.reference || ""
              }
              statusDescription={paymentOperation.status.description}
              resultPaymentCode={paymentOperation.result?.payment?.code}
              statusCode={paymentOperation.status.code}
              createdAt={paymentOperation.createdAt}
            ></PaymentDetailHeader>
            <PaymentDetailAccordion
              panelId="items"
              title="Detalle de items"
              handleChange={handleChange}
              defaultExpanded={true}
              items={paymentOperation.items}
              subtotal={paymentOperation.subtotal}
              transaction_amount={paymentOperation.transaction_amount}
              pointOfSale={pointOfSale}
            ></PaymentDetailAccordion>
            <PaymentDetailAccordion
              panelId="partner"
              title="Datos de Comprador"
              handleChange={handleChange}
              defaultExpanded={false}
              partner={paymentOperation.partner}
            ></PaymentDetailAccordion>
            <PaymentDetailAccordion
              panelId="lifecycle"
              title="Ciclo de vida"
              handleChange={handleChange}
              defaultExpanded={false}
              lifecycle={lifecycle}
              lifecycleLoading={loadLifecycle}
            ></PaymentDetailAccordion>
            <PaymentDetailAccordion
              panelId="status"
              title="Estado de Transacciones"
              handleChange={handleChange}
              defaultExpanded={false}
              result={paymentOperation.result}
            ></PaymentDetailAccordion>
            <PaymentDetailAccordion
              panelId="attempts"
              title="Intentos"
              handleChange={handleChange}
              defaultExpanded={false}
              attempts={attempts}
              attemptsLoading={loadAttempts}
            ></PaymentDetailAccordion>
            {gatewayCode === EGateway.MERCADOPAGO && (
              <PaymentDetailAccordion
                panelId="mercadopago"
                title="Mercadopago"
                handleChange={handleChange}
                defaultExpanded={false}
                transaction_amount={paymentOperation.transaction_amount}
                paymentMercadopago={mercadopagoPayment}
              ></PaymentDetailAccordion>
            )}
            {gatewayCode === EGateway.MACRO && (
              <PaymentDetailAccordion
                panelId="macropago"
                title="Macro"
                handleChange={handleChange}
                defaultExpanded={false}
                transaction_amount={paymentOperation.transaction_amount}
                paymentsMacro={macroPayment}
              ></PaymentDetailAccordion>
            )}
          </Stack>
        ) : (
          <SkeletonDetail />
        )}
      </div>
    </>
  );
};
