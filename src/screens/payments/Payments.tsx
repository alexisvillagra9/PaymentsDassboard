import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { PaymentFilters } from "../../components/paymentFilters/PaymentFilters";
import { PaymentList } from "../../components/paymentList/PaymentList";
import { IPaymentFilter } from "../../models/app/payment/paymentFilter";
import { IPaymentRoute } from "../../models/app/payment/paymentRoute";
import "./Payments.css";

export const Payments = ({
  totalCount,
  totalAmount,
  actualPage,
  totalPages,
  pageSize,
  operationStatuses,
  operationOrigins,
  operationStatusesFilter,
  operationOriginsFilter,
  search,
  dateTo,
  dateFrom,
  loadingPO,
  loadingPOExcel,
  paymentOperations,
  selectedOrigins,
  selectedStatuses,
  setDateTo,
  setDateFrom,
  setOperationOriginsFilter,
  setOperationStatusesFilter,
  setSearch,
  setSelectedOrigins,
  setSelectedStatuses,
  getOperations,
  downloadExcel,
}: IPaymentRoute) => {
  const paymentFilterProps: IPaymentFilter = {
    totalCount,
    totalAmount,
    pageSize,
    operationStatuses,
    operationOrigins,
    operationStatusesFilter,
    operationOriginsFilter,
    search,
    dateTo,
    dateFrom,
    selectedOrigins,
    selectedStatuses,
    loadingPOExcel,
    setDateTo,
    setDateFrom,
    setOperationOriginsFilter,
    setOperationStatusesFilter,
    setSearch,
    setSelectedOrigins,
    setSelectedStatuses,
    getOperations,
    downloadExcel,
  };
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
      <PaymentFilters {...paymentFilterProps}></PaymentFilters>
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
          paymentOperations={paymentOperations || []}
        ></PaymentList>
      )}
    </div>
  );
};
