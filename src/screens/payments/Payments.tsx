import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { EPaymentOperationStatus } from "../../helpers/enums";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationFilter } from "../../models/apis/wallet/paymentOperationFilter";
import { IPaymentOperationOrigin } from "../../models/apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../models/apis/wallet/paymentOperationStatus";
import {
  getPaymentOperationOrigins,
  getPaymentOperationsByFilter,
  getPaymentOperationStatuses,
} from "../../services/payments";
import "./Payments.css";

export const Payments = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [loadingPO, setLoadingPO] = useState(true);
  const [paymentOperations, setPaymentOperations] = useState<
    IPaymentOperation[]
  >([]);
  const [operationStatuses, setOperationStatuses] = useState<
    IPaymentOperationStatus[]
  >([]);
  const [operationOrigins, setOperationOrigins] = useState<
    IPaymentOperationOrigin[]
  >([]);
  const [operationStatusesFilter, setOperationStatusesFilter] = useState<
    string[] | null
  >([EPaymentOperationStatus.Terminated]);
  const [operationOriginsFilter, setOperationOriginsFilter] = useState<
    string[] | null
  >(null);

  const getFilters = async () => {
    const pStatuses = getPaymentOperationStatuses();
    const pOrigins = getPaymentOperationOrigins();
    const [sts, ors] = await Promise.all([pStatuses, pOrigins]);
    setOperationStatuses(sts);
    setOperationOrigins(ors);
  };

  const getOperations = async (filters: IPaymentOperationFilter) => {
    setLoadingPO(true);
    const payops = await getPaymentOperationsByFilter(filters);
    const {
      data,
      totalCount: totCount,
      totalAmount: totAmount,
      totalPages: totPages,
      currentPage,
    } = payops;
    setPaymentOperations(data);
    setTotalCount(totCount);
    setTotalAmount(totAmount);
    setTotalPages(totPages);
    setLoadingPO(false);
    setActualPage(currentPage);
    console.log("Operaciones Cargadas");
  };

  useEffect(() => {
    console.log("Inicia componente");
    getFilters();
    getOperations({
      page: actualPage || 1,
      pageSize,
      statuses: operationStatusesFilter,
      origins: operationOriginsFilter,
      dateFrom,
      dateTo,
      search,
    });

    return () => {
      console.log("alexis desmonta");
    };
  }, []);

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
        totalCount={totalCount}
        totalAmount={totalAmount}
        operationStatuses={operationStatuses}
        operationOrigins={operationOrigins}
        operationStatusesFilter={operationStatusesFilter}
        operationOriginsFilter={operationOriginsFilter}
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        pageSize={pageSize}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setOperationOriginsFilter={setOperationOriginsFilter}
        setOperationStatusesFilter={setOperationStatusesFilter}
        setSearch={setSearch}
        getOperations={getOperations}
      ></PaymentFilters>
      {loadingPO ? (
        skeletonList
      ) : (
        <PaymentList
          actualPage={actualPage}
          totalPages={totalPages}
          dateFrom={dateFrom}
          dateTo={dateTo}
          pageSize={pageSize}
          search={search}
          operationOriginsFilter={operationOriginsFilter}
          operationStatusesFilter={operationStatusesFilter}
          getOperations={getOperations}
          paymentOperations={paymentOperations}
        ></PaymentList>
      )}
    </div>
  );
};
