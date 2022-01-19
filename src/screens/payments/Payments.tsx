import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { EPaymentOperationStatus } from "../../helpers/enums";
import { useFilters } from "../../hooks/useFilters";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import {
  getPaymentOperationOrigins,
  getPaymentOperationsByFilter,
  getPaymentOperationStatuses,
} from "../../services/payments";
import "./Payments.css";

export const Payments = () => {
  const {
    paymentOperationsFilter,
    setPaymentOperations,
    getTotalAmount,
  }: {
    paymentOperationsFilter: IPaymentOperation[];
    setPaymentOperations: (payOps: IPaymentOperation[]) => void;
    getTotalAmount: () => number;
  } = useFilters();

  const [loading, setLoading] = useState(true);
  const [initComp, setInitComp] = useState(false);
  const [statuses, setStatuses] = useState<IPaymentOperationStatus[]>([]);
  const [origins, setOrigins] = useState<IPaymentOperationOrigin[]>([]);

  useEffect(() => {
    const paymentInit = async () => {
      try {
        if (!initComp) {
          // console.log("Cargando...", new Date());
          const pPayops = getPaymentOperationsByFilter({
            statuses: [EPaymentOperationStatus.Terminated],
          }); // Init with terminated payments only
          const pStatuses = getPaymentOperationStatuses();
          const pOrigins = getPaymentOperationOrigins();
          const [payOps, sts, ors] = await Promise.all([
            pPayops,
            pStatuses,
            pOrigins,
          ]);

          setPaymentOperations(payOps);
          setStatuses(sts);
          setOrigins(ors);
          setInitComp(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    paymentInit();
  }, [setPaymentOperations, initComp, loading]);

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
        total={paymentOperationsFilter.length}
        filterOrigins={origins}
        filterStatuses={statuses}
        getTotalAmount={getTotalAmount}
        paymentOperationsFilter={paymentOperationsFilter}
        setPaymentOperations={setPaymentOperations}
        initComp={initComp}
        loading={loading}
        setLoading={setLoading}
      ></PaymentFilters>
      {loading ? (
        skeletonList
      ) : (
        <PaymentList paymentOperations={paymentOperationsFilter}></PaymentList>
      )}
    </div>
  );
};
