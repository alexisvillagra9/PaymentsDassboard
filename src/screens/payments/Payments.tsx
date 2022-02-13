import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React, { useContext, useEffect, useState } from "react";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { GeneralContext } from "../../context/general/generalContext";
import { EPaymentOperationStatus } from "../../helpers/enums";
import { useFilters } from "../../hooks/useFilters";
import {
  getPaymentOperationOrigins,
  getPaymentOperationsByFilter,
  getPaymentOperationStatuses,
} from "../../services/payments";
import "./Payments.css";

export const Payments = () => {
  const {
    getTotalAmount,
  }: {
    getTotalAmount: () => number;
  } = useFilters();

  const [loading, setLoading] = useState(true);
  const [initComp, setInitComp] = useState(false);
  const {
    paymentOperations: payOpsContext,
    operationStatuses: operationStatusesContext,
    operationOrigins: operationOriginsContext,
    setPaymentOperations: setPaymentOperationsContext,
    setOperationStatuses: setOperationStatusesContex,
    setOperationOrigins: setOperationOriginsContext,
  } = useContext(GeneralContext);

  useEffect(() => {
    const paymentInit = async () => {
      try {
        if (!initComp) {
          // console.log("Cargando...", new Date());

          if (!payOpsContext) {
            console.log("Entra por carga");
            const pStatuses = getPaymentOperationStatuses();
            const pOrigins = getPaymentOperationOrigins();
            const pPayOps = getPaymentOperationsByFilter({
              statuses: [EPaymentOperationStatus.Terminated],
            }); // Init with terminated payments only
            const [payOps, sts, ors] = await Promise.all([
              pPayOps,
              pStatuses,
              pOrigins,
            ]);

            setPaymentOperationsContext(payOps);
            setOperationStatusesContex(sts);
            setOperationOriginsContext(ors);
          }

          setInitComp(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    paymentInit();
  }, [
    payOpsContext,
    setPaymentOperationsContext,
    setOperationStatusesContex,
    setOperationOriginsContext,
    initComp,
    loading,
  ]);

  const skeletonList = (
    <>
      <List
        className="skeleton-container"
        sx={{ width: "100%", padding: 0, bgcolor: "background.paper" }}
      >
        {[...Array(8)].map((x, idx) => (
          <ListItem divider={true} key={idx}>
            <Skeleton
              animation="wave"
              variant="circular"
              className="skeleton-payment-avatar"
            />
            <ListItemText
              primary={
                <Skeleton
                  animation="wave"
                  height={"1.8rem"}
                  className="skeleton-title"
                />
              }
              secondary={
                <Skeleton
                  animation="wave"
                  height={"1.3rem"}
                  className="skeleton-subtitle"
                />
              }
            />
            <Stack spacing={1} alignItems="flex-end" marginLeft="0.5rem">
              <Skeleton animation="wave" width={"6rem"} height={"1.8rem"} />
              <Skeleton animation="wave" width={"6rem"} height={"1.8rem"} />
            </Stack>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <div className="page-container">
      <PaymentFilters
        total={(payOpsContext || []).length}
        filterOrigins={operationOriginsContext}
        filterStatuses={operationStatusesContext}
        getTotalAmount={getTotalAmount}
        paymentOperationsFilter={payOpsContext || []}
        initComp={initComp}
        loading={loading}
        setLoading={setLoading}
      ></PaymentFilters>
      {loading ? (
        skeletonList
      ) : (
        <PaymentList paymentOperations={payOpsContext || []}></PaymentList>
      )}
    </div>
  );
};
