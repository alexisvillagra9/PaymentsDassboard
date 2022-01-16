import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
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
        // console.log("Cargando...", new Date());
        const payOps = await getPaymentOperationsByFilter();
        setPaymentOperations(payOps);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    paymentInit();
  }, [setPaymentOperations]);

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
        filterOrigins={getFiltersOrigin}
        filterStatuses={getFiltersStatus}
        filterByOrigins={filterByOrigins}
        filterByStatuses={filterByStatuses}
        getTotalAmount={getTotalAmount}
        paymentOperationsFilter={paymentOperationsFilter}
      ></PaymentFilters>
      {loading ? (
        skeletonList
      ) : (
        <PaymentList paymentOperations={paymentOperationsFilter}></PaymentList>
      )}
    </div>
  );
};
