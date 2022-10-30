import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { IPaymentOperationFilter } from "../../models/apis/wallet/paymentOperationFilter";
import { PaymentListItem } from "../paymentListItem/PaymentListItem";
import "./PaymentList.css";

export const PaymentList = ({
  actualPage,
  totalPages,
  pageSize,
  dateFrom,
  dateTo,
  operationStatusesFilter,
  operationOriginsFilter,
  search,
  paymentOperations,
  getOperations,
}: {
  actualPage: number;
  totalPages: number;
  pageSize: number;
  dateFrom: Date | null;
  dateTo: Date | null;
  operationStatusesFilter: string[] | null;
  operationOriginsFilter: string[] | null;
  search: string;
  paymentOperations: IPaymentOperation[];
  getOperations: (e: IPaymentOperationFilter) => void;
}) => {
  const navigate = useNavigate();
  const handlePaymentDetail = (paymentOperationId: string) => {
    navigate(`/payment-detail/${paymentOperationId}`);
  };

  const handlePagination = (event: ChangeEvent<any>, pageSelect: number) => {
    getOperations({
      page: pageSelect,
      pageSize,
      dateFrom,
      dateTo,
      search,
      origins: operationOriginsFilter,
      statuses: operationStatusesFilter,
    });
  };

  return (
    <>
      <div className="payment-list-container">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {paymentOperations.map((payOp: IPaymentOperation, idx: number) => {
            const {
              _id,
              origin,
              status,
              partner,
              result = {},
              createdAt,
              transaction_amount,
              point_of_sale,
            } = payOp;
            return (
              <ListItem
                key={_id}
                divider={idx + 1 < paymentOperations.length}
                disablePadding
              >
                <ListItemButton onClick={() => handlePaymentDetail(_id)}>
                  <PaymentListItem
                    origin={origin}
                    status={status}
                    partner={partner}
                    result={result}
                    transaction_amount={transaction_amount}
                    createdAt={createdAt}
                    point_of_sale={point_of_sale}
                  ></PaymentListItem>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <Stack alignItems="center">
        <Pagination
          count={totalPages}
          // color="primary"
          page={actualPage}
          onChange={handlePagination}
        />
      </Stack>
    </>
  );
};
