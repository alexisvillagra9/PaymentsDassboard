import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { PaymentListItem } from "../paymentListItem/PaymentListItem";
import "./PaymentList.css";

export const PaymentList = ({
  paymentOperations,
}: {
  paymentOperations: IPaymentOperation[];
}) => {
  return (
    <div className="payment-list-container">
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {paymentOperations.map((payOp: IPaymentOperation, idx: number) => {
          const {
            _id,
            origin,
            status,
            partner,
            result,
            createdAt,
            transaction_amount,
          } = payOp;
          return (
            <>
              <ListItem key={_id} divider={idx + 1 < paymentOperations.length}>
                <PaymentListItem
                  origin={origin}
                  status={status}
                  partner={partner}
                  result={result}
                  transaction_amount={transaction_amount}
                  createdAt={createdAt}
                ></PaymentListItem>{" "}
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );
};
