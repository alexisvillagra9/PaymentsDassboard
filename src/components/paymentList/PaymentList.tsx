import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { PaymentListItem } from "../paymentListItem/PaymentListItem";
import "./PaymentList.css";

export const PaymentList = ({
  paymentOperations,
}: {
  paymentOperations: IPaymentOperation[];
}) => {
  const navigate = useNavigate();

  const handlePaymentDetail = (operation: IPaymentOperation) => {
    navigate("/payment-detail", { state: operation });
  };

  return (
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
          } = payOp;
          return (
            <>
              <ListItem
                key={_id}
                divider={idx + 1 < paymentOperations.length}
                disablePadding
              >
                <ListItemButton onClick={() => handlePaymentDetail(payOp)}>
                  <PaymentListItem
                    origin={origin}
                    status={status}
                    partner={partner}
                    result={result}
                    transaction_amount={transaction_amount}
                    createdAt={createdAt}
                    key={_id}
                  ></PaymentListItem>
                </ListItemButton>
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );
};
